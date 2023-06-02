<template>
  <div class="accessRecord-wrapper">

    <div class = "Meetingtitle">
      <p>电子商务实验室每周例会会议</p>
    </div>

    <div class = "MeetingInfopicture">
      <img src="https://img2.baidu.com/it/u=470613898,2467022164&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" >
    </div>


    <!-- 表格 -->
    <div class="useRecord-result-wrapper">
      <div class = "MeetingInfo">
        <p>实验室简介：
          1.电子商务交易技术国家工程实验室联合发起者；上海市区块链工程研究中心重要组成部分；众智科学与工程
          国际联盟共同发起者
          2.研究领域：自制信用制度及风险评估；面向理解的互动答疑机器人；基于机器学习及知识图谱的人性化用户
          建模及分析
          3.承担国家、国际、企业课题 30 余项，发表有影响、有原创成果的论文 60 余篇，主笔形成行业正式标准 4
          项，专利及软件产品 30 余项，获省部级科技进步一等奖、三等奖及多项教学成果奖
          4.国内外较大影响学术成果：内生参数建模方法（数字灵魂），支撑创新性的为用户模型、数字孪生以及基于
          知识图谱的推荐、推理与关联分析；自治信用制度及评价模型，支撑创新性的不可信环境交易模式及技术保障
          5.市场龙头或填补空白成果：跨境溯源区块链及贸易监测平台（转化企业：魔橙区块链）；旅游解散中心调度
          系统；供应链安全评估及施策仿真系统（相关成果获国办及中物联感谢信）；虚拟仿真营运沙盘系列产品；支持远
          程评价的教育竞赛区块链及可视化管理系统（转化企业：晨鸟科技）；支持互动答疑及状态监测的数字助教（转化
          企业：高瞩科技）</p>
        <P>会议内容主要为：
        1.基于多模态融合的金融风险分析
        2.供应链安全评估及施策仿真系统
        3.支持互动答疑及状态监测的数字助教（转化企业：高瞩科技）
        4.基于状态检测的会情分析系统
        5.基于区块链无人机的农业病虫害检测的元宇宙项目</P>

      </div>
      <div class="port-btn">
        <el-button type="primary" size="small" class="port-btn" @click="exportExcel">导出</el-button>
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
      appointPurpose: {},
      userRecords: [],
      recordNum: 0,
      Purpose: "",
      useRecordTime: "",
      beginTime: "",
      endTime: ""
    };
  },
  mixins: [Fetch],
  created() {
    this.pageSize = 8;
    this.pageCount = 5;
    // 获取预约用途下拉框数据
    this.$_fetch_appointPurpose().then(res => {
      this.appointPurpose = res.roomTagList;
    });
    // 获取页面初始化数据
    this.$_fetch_visitorUsedRecordInfo().then(res => {
      this.userRecords = res.pageBean.dataList;
      this.recordNum = res.pageBean.recordNum;
      this.$_formateData(this.userRecords);
    });
  },
  mounted() {},
  computed: {},
  methods: {
    // 格式化时间
    $_formateData(useRecordTime) {
      if (!useRecordTime) return;
      for (let item of useRecordTime) {
        // 修改时间
        item.visitArriveTime = dateFormate(
          item.visitArriveTime,
          "yyyy-MM-dd hh:mm:ss"
        );
        item.visitLeaveTime = dateFormate(
          item.visitLeaveTime,
          "yyyy-MM-dd hh:mm:ss"
        );
      }
    },
    // 导出excel
    exportExcel() {
      this.$_fetch_visitorUsedRecordInfo({
        pageNum: -1,
        guestName: this.visitorName,
        tagId: this.Purpose,
        visitArriveTime: this.beginTime,
        visitLeaveTime: this.endTime
      }).then(res => {
        let excelData = res.pageBean.dataList;
        this.$_formateData(excelData);
        let fileName = "accessRecord";
        let headers =
          "姓名,用途,会议室名称,容纳人数,占地面积/㎡,开始时间,结束时间,";
        let json = [];
        for (let i in excelData) {
          let temp = {};
          temp["姓名"] = excelData[i].guestName;
          temp["用途"] = excelData[i].tagName;
          temp["会议室名称"] = excelData[i].roomName;
          temp["容纳人数"] = excelData[i].roomPeople;
          temp["占地面积/㎡"] = excelData[i].roomArea;
          temp["开始时间"] = excelData[i].visitArriveTime;
          temp["结束时间"] = excelData[i].visitLeaveTime;
          json.push(temp);
        }
        json = JSON.stringify(json);
        Excelpost({ fileName, headers, json });
      });
    },
    // 条件查询
    useRecordSearch() {
      this.$_fetch_visitorUsedRecordInfo({
        guestName: this.visitorName,
        tagId: this.Purpose,
        visitArriveTime: this.beginTime,
        visitLeaveTime: this.endTime
      }).then(res => {
        this.userRecords = res.pageBean.dataList;
        this.recordNum = res.pageBean.recordNum;
        this.$_formateData(this.userRecords);
      });
    },
    // 分页
    currentChange(num) {
      this.$_fetch_visitorUsedRecordInfo({
        pageNum: num,
        guestName: this.visitorName,
        tagId: this.Purpose,
        visitArriveTime: this.beginTime,
        visitLeaveTime: this.endTime
      }).then(res => {
        this.userRecords = res.pageBean.dataList;
        this.recordNum = res.pageBean.recordNum;
        this.$_formateData(this.userRecords);
      });
    }
  },
  watch: {
    useRecordTime() {
      this.beginTime = dateFormate(
        this.useRecordTime[0].getTime(),
        "yyyy-MM-dd"
      );
      this.endTime = dateFormate(this.useRecordTime[1].getTime(), "yyyy-MM-dd");
    }
  }
};
</script>

<style lang="scss" scoped>
.accessRecord-wrapper {
  .Meetingtitle{
    background: #EEE url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC) repeat;
    text-shadow: 5px -5px black, 4px -4px white;
    font-weight: bold;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    text-align: center;
    font-size: 30px;
  }
  .MeetingInfopicture{
    text-align: center;
  }
  .useRecord-search {
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
    .useRecordTime {
      display: inline-block;
      height: 40px;
      margin-left: 5px;
      /deep/ .el-input__inner {
        width: 380px;
      }
    }
  }
  .useRecord-result-wrapper {
    .MeetingInfo{
      margin-top: 55px;
      margin-left: 100px;
      margin-right: 100px;
      text-align: left;
      text-indent: 2em;
      line-height:25px;
      font-family:微软雅黑;
      font-size:medium;
    }
    .port-btn {
      border-top: 1px solid #ccc;
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: right;
    }
    .useRecord-result {
      text-align: center;
      .pagination {
        margin-top: 20px;
      }
    }
  }
}
</style>