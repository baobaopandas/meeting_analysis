<template>
  <div class="visitorInfo-wrapper">
    <div class="appoint-result-wrapper">
      <div class="port-btn">
        <el-button type="primary" size="small" class="port-btn" @click="export2Excel">导出</el-button>
      </div>
      <div class="appoint-result">
        <el-table :data="appointInfo" stripe>
          <el-table-column prop="name" label="姓名" header-align="center" align="center"></el-table-column>
          <el-table-column prop="stuid" label="学号" header-align="center" align="center"></el-table-column>
          <el-table-column prop="role" label="角色" header-align="center" align="center"></el-table-column>
          <el-table-column prop="ispermanent" label="是否常驻人员" header-align="center" align="center"></el-table-column>
          <el-table-column prop="nearlessforce" label="最近一次会议专注度" header-align="center" align="center"></el-table-column>
          <el-table-column
                  prop="nearless7force"
                  label="最近七次会议专注度"
                  width="300"
                  header-align="center"
                  align="center"
          ></el-table-column>
          <el-table-column
                  prop="isdanger"
                  label="心理隐患"
                  header-align="center"
                  width="150"
                  align="center"
          ></el-table-column>
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
import InfoSearch from "comm/InfoSearch.vue";
import axios from 'axios';
// import { Excelpost } from "@/utils";
import Fetch from "mixins/fetch";


export default {
  components: {
    InfoSearch
  },
  data() {
  },
  mixins: [Fetch],
  created() {
    this.pageSize = 8; // 分页数据条数
    this.pageCount = 5; // 显示分页数

    // // 页面初始数据
    // this.$_fetch_visitorInfo().then(res => {
    //   this.visiInfo = res.pageBean.dataList;
    //   this.recordNum = res.pageBean.recordNum;
    // });
    // this.getpatistateData();
  },
  methods: {
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['编号','姓名','学号','角色','是否是常驻成员'];
        const filterVal = ['id', 'name', 'stuid', 'role','ispermanent' ];
        const list = this.appointInfo;
        const data = this.formatJson(filterVal,list);
        export_json_to_excel(tHeader, data, '参会人员状态表');
      })
    },

    getpatistateData(){
      const path = '/api/getPatistate';
      axios.post(path,{aaa: "hhhhhhh"}).then(res => {
        // var msg = res.data.id;
        // this.new_time_data.push(msg);
        this.appointInfo = res.data.reslist;
        console.log(this.appointInfo);
        console.log(res);
      }).catch(error => {
        console.error(error);
      });
    },
    //查询沮丧分析
    depress_analyze(){
      this.$_fetch_depress_analyze({
        groupIp: this.groupIp,
        stuId: this.stuId,
        weiboId: this.weiboId,
      }).then(res => {
        this.data = res.data();
        console.log(this.data);
      })
    },
    //修改表格第一列样式
    // guestNameCellStyle({ columnIndex }) {
    //   let textCenter = "text-align: center;";
    //   if (columnIndex === 0) {
    //     return textCenter + "color: blue; cursor:pointer;";
    //   }
    //   return textCenter;
    // },
    // // 跳转到对应访客预约信息
    // jumpToAppointmentInfo(row, event, column) {
    //   if (column.label === "姓名") {
    //     this.$router.push({
    //       name: "VisitorAppointmentInfo",
    //       params: { guestId: row.guestId }
    //     });
    //   }
    // },

    exportExcel(){

    }
    // //导出excel
    // exportExcel() {
    //   this.$_fetch_visitorInfo({
    //     pageNum: -1,
    //     guestName: this.visitorName,
    //     guestCredit: this.visitorCredit
    //   }).then(res => {
    //     let excelData = res.pageBean.dataList;
    //     let fileName = "visitInfo";
    //     let headers = "姓名,身份证,联系方式,邮箱,单位,信誉分,";
    //     let json = [];
    //     for (let i in excelData) {
    //       let temp = {};
    //       temp["姓名"] = excelData[i].guestName;
    //       temp["身份证"] = excelData[i].guestId;
    //       temp["联系方式"] = excelData[i].guestTelephone;
    //       temp["邮箱"] = excelData[i].guestEmail;
    //       temp["单位"] = excelData[i].guestCompany;
    //       temp["信誉分"] = excelData[i].guestCredit.toString();
    //       json.push(temp);
    //     }
    //     json = JSON.stringify(json);
    //     // Excelpost({ fileName, headers, json });
    //   });
    // },
    // //分页
    // currentChange(num) {
    //   this.$_fetch_visitorInfo({
    //     pageNum: num,
    //     guestName: this.visitorName,
    //     guestCredit: this.visitorCredit
    //   }).then(res => {
    //     this.visiInfo = res.pageBean.dataList;
    //     this.recordNum = res.pageBean.recordNum;
    //   });
    // },
    // //查询访客信息
    // visitorInfoSearch() {
    //   this.$_fetch_visitorInfo({
    //     guestName: this.visitorName,
    //     guestCredit: this.visitorCredit
    //   }).then(res => {
    //     this.visiInfo = res.pageBean.dataList;
    //     this.recordNum = res.pageBean.recordNum;
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
.visitorInfo-wrapper {
  .info-search {
    .search-item {
      margin-top: 5px;
      width: 300px;
      &.visitorCredit {
        margin-left: 5px;
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
      text-align: center;
      .pagination {
        margin-top: 20px;
      }
    }
  }
  .info-result-wrapper {
    .port-btn {
      border-top: 1px solid #ccc;
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: right;
    }
    .info-result {
      text-align: center;
      .pagination {
        margin-top: 20px;
      }
    }
  }
}
</style>