<template>
  <div class="appointmentInfo-wrapper">
    <!-- 表格 -->
    <div class="appoint-result-wrapper">
      <div class="port-btn">
        <el-button type="primary" size="small" class="port-btn" @click="export1Excel">导出</el-button>
      </div>
      <div class="appoint-result">
        <el-table :data="appointInfo" stripe>
          <el-table-column prop="name" label="会议序号" header-align="center" align="center"></el-table-column>
          <el-table-column
                  prop="usetime"
                  label="检测时间"
                  width="300"
                  header-align="center"
                  align="center"
          ></el-table-column>
          <el-table-column prop="meetingname" label="异常情况" header-align="center" align="center"></el-table-column>
          <el-table-column prop="meetingtheme" label="数据下载" header-align="center" align="center"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :pager-count="pageCount"
            @current-change="currentChange"
            :total="recordNum"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Fetch from "mixins/fetch";
import { dateFormate, Excelpost } from "@/utils";

export default {
  components: {
  },
  data() {
    return {
      visitorName: "",
      Purpose: "",
      appointPurpose: [],
      appointInfo: [{
        name:"001",
        meetingname:"群体不专注",
        meetingtheme:"数据下载",
        shouldpeonum:"22",
        actualpeonum:"11",
        usetime:"2022-1-5 18:30",
        endtime:"2022-1-5 20:30",


      },
        {
          name:"003",
          meetingname:"群体疲劳",
          meetingtheme:"数据下载",
          shouldpeonum:"22",
          actualpeonum:"13",
          usetime:"2021-12-29 18:30",
          endtime:"2021-12-29 20:30",



        }],

      useTime: "", // 使用时间段
      appointTime: "", // 预约时间段
      recordNum: 0,
      beginTime: "", // 预约开始时间
      endTime: "", // 预约结束时间
      useRoomBeginTime: "", // 使用开始时间
      useRoomEndTime: "" // 使用结束时间
    };
  },
  mixins: [Fetch],
  created() {
    this.pageSize = 8;
    this.pageCount = 5;
    // 预约用途
    this.$_fetch_appointPurpose().then(res => {
      this.appointPurpose = res.roomTagList;
    });
    // 初始化表格数据
    if (this.$route.params.guestId) {
      this.$_fetch_visitorAppointInfo({
        guestId: this.$route.params.guestId
      }).then(res => {
        this.appointInfo = res.pageBean.dataList;
        this.recordNum = res.pageBean.recordNum;
        this.$_formateData(this.appointInfo);
      });
    } else {
      this.$_fetch_visitorAppointInfo().then(res => {
        this.appointInfo = res.pageBean.dataList;
        this.recordNum = res.pageBean.recordNum;
        this.$_formateData(this.appointInfo);
      });
    }
  },
  methods: {
    // 格式化时间
    $_formateData(appointInfo) {
      if (!appointInfo) return;
      for (let item of appointInfo) {
        // 修改时间
        item.appointStart = dateFormate(
          item.appointStart,
          "yyyy-MM-dd hh:mm:ss"
        );
        item.appointEnd = dateFormate(item.appointEnd, "yyyy-MM-dd hh:mm:ss");
        item.appointUse = item.appointStart + "----" + item.appointEnd;
        item.appointCreateDate = dateFormate(
          item.appointCreateDate,
          "yyyy-MM-dd hh:mm:ss"
        );
      }
    },
    // 条件查询
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    export1Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['会议序号','检测时间','异常情况'];
        const filterVal = ['name', 'usetime', 'meetingname'];
        const list = this.appointInfo;
        const data = this.formatJson(filterVal,list);
        export_json_to_excel(tHeader, data, '历史会议异常情况下载');
      })
    },
    appointmentInfoSearch() {
      this.$_fetch_visitorAppointInfo({
        guestName: this.visitorName,
        tagId: this.Purpose,
        // bug
        beginTime: this.beginTime,
        endTime: this.endTime,
        useRoomBeginTime: this.useRoomBeginTime,
        useRoomEndTime: this.useRoomEndTime
      }).then(res => {
        this.appointInfo = res.pageBean.dataList;
        this.recordNum = res.pageBean.recordNum;
        this.$_formateData(this.appointInfo);
      });
    },
    // 导出excel
    exportExcel() {
      this.$_fetch_visitorAppointInfo({
        pageNum: -1,
        guestName: this.visitorName,
        tagId: this.Purpose,
        beginTime: this.beginTime,
        endTime: this.endTime,
        useRoomBeginTime: this.useRoomBeginTime,
        useRoomEndTime: this.useRoomEndTime
      }).then(res => {
        let excelData = res.pageBean.dataList;
        this.$_formateData(excelData);
        let fileName = "visitorAppointmentInfo";
        let headers =
          "姓名,会议室名称,用途,容纳人数,占地面积/㎡,使用时间,预约时间,";
        let json = [];
        for (let i in excelData) {
          let temp = {};
          temp["姓名"] = excelData[i].guestName;
          temp["会议室名称"] = excelData[i].room.roomName;
          temp["用途"] = excelData[i].tagName;
          temp["容纳人数"] = excelData[i].room.roomPeople;
          temp["占地面积/㎡"] = excelData[i].room.roomArea;
          temp["使用时间"] = excelData[i].appointUse;
          temp["预约时间"] = excelData[i].appointCreateDate;
          json.push(temp);
        }
        json = JSON.stringify(json);
        Excelpost({ fileName, headers, json });
      });
    },
    // 分页
    currentChange(num) {
      this.$_fetch_visitorAppointInfo({
        pageNum: num,
        guestName: this.visitorName,
        tagId: this.Purpose,
        beginTime: this.beginTime,
        endTime: this.endTime,
        useRoomBeginTime: this.useRoomBeginTime,
        useRoomEndTime: this.useRoomEndTime
      }).then(res => {
        this.appointInfo = res.pageBean.dataList;
        this.recordNum = res.pageBean.recordNum;
        this.$_formateData(this.appointInfo);
      });
    }
  },
  watch: {
    appointTime() {
      this.beginTime = dateFormate(this.appointTime[0].getTime(), "yyyy-MM-dd");
      this.endTime = dateFormate(this.appointTime[1].getTime(), "yyyy-MM-dd");
    },
    useTime() {
      this.useRoomBeginTime = dateFormate(
        this.useTime[0].getTime(),
        "yyyy-MM-dd"
      );
      this.useRoomEndTime = dateFormate(
        this.useTime[1].getTime(),
        "yyyy-MM-dd"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.appointmentInfo-wrapper {
  text-align: left;
  .info-search {
    .search-item {
      margin-top: 5px;
    }
    .visitorName {
      width: 250px;
    }
    .label {
      display: inline-block;
      width: 80px;
      height: 40px;
      line-height: 39px;
      text-align: center;
      border: 1px solid #dcdfe6;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-right: none;
      background: #f5f7fa;
      color: #909399;
    }
    /deep/ .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .appointPurpose {
      display: inline-block;
      height: 40px;
      margin-left: 5px;
    }
    .appointTime {
      display: inline-block;
      height: 40px;
      margin-left: 5px;
      /deep/ .el-input__inner {
        width: 380px;
      }
    }
    .useTime {
      display: inline-block;
      height: 40px;
      margin-left: 5px;
      /deep/ .el-input__inner {
        width: 380px;
      }
    }
  }
  .appoint-result-wrapper {
    .port-btn {
      border-top: 1px solid #ccc;
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: right;
    }
    .appoint-result {
      margin-top: 50px;
      text-align: center;
      .pagination {
        margin-top: 20px;
      }
    }
  }
}
</style>