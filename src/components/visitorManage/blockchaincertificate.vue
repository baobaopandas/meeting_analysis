<template>
  <div class="CreateMeeting">
    <div class="tableTitle"><span class="midText">存证服务器基本信息</span></div>
    <div class="MeetingInfo">
      <el-input
        placeholder="服务器存证"
        v-model="name"
        class ="name"
        disabled
      >
        <template slot="prepend">服务器存证</template>
      </el-input>
      <el-input
              placeholder="请输入学号或其他证件号"
              v-model="stuid"
              class ="stuid"
              disabled
      >
        <template slot="prepend">区块链</template>
      </el-input>
      <el-input
              placeholder="请选择角色"
              v-model="roler"
              class ="roler"
              disabled
      >
        <template slot="prepend">实现框架</template>
      </el-input>
      <el-input
              placeholder="请选择是否是常驻人员"
              v-model="ispermanent"
              class ="ispermanent"
              disabled
      >
        <template slot="prepend">数据安全性</template>
      </el-input>
    </div>

    <dialog-bar v-model="sendVal" type="confirm" :title=name content="参会人员创建成功" v-on:confirm="clickConfirm()"></dialog-bar>
    <dialog-bar v-model="falsemeeting" type="confirm" :title=name content="姓名不得为空，参会人员创建失败" v-on:cancel="clickConfirm1()" ></dialog-bar>
  </div>
</template>

<script>
import axios from 'axios';
import dialogBar from '@/components/common/dialog.vue'
export default {
  components: {
    'dialog-bar': dialogBar,
  },
  data() {
    return {
      falsemeeting: false,
      sendVal: false,
      name:"CN_FstHMST_CyberTA",
      stuid:"root",
      roler:"HyperLedger Composer",
      ispermanent:"暂无数据",
    };
  },
  created() {
    this.pageSize = 8; // 分页数据条数
    this.pageCount = 5; // 显示分页数

    // // 页面初始数据
    // this.$_fetch_visitorInfo().then(res => {
    //   this.visiInfo = res.pageBean.dataList;
    //   this.recordNum = res.pageBean.recordNum;
    // });
  },
  methods: {
    clickCancel(){
      console.log('点击了取消');
    },
    clickDanger(){
      console.log('这里是danger回调')
    },
    clickConfirm(){
      console.log('点击了confirm');
      this.$router.push({
        path: 'ParticipantInvite',
        // name: 'mallList',

      })
    },
    clickConfirm1(){
      console.log('点击了confirm');
      this.$router.push({
        path: 'newpati',
        // name: 'mallList',

      })
    },
    newpati(){
      console.log(this.name)
      if(this.name == ""){
        console.log("创建人员失败")
        this.falsemeeting = true;
      }else {
        console.log("新建人员");
        // 设置对应python的接口，这里使用的是localhost:5000
        const path = 'http://127.0.0.1:5000//newpati';
        axios.post(path, {name: this.name, stuid: this.stuid, role: this.roler, ispermanent:this.ispermanent}).then(res => {
          console.log(res);
          this.sendVal = true;
        }).catch(error => {
          this.falsemeeting = true;
          console.error(error);
        });


      }


    },

    //查询沮
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
  .buttonnew{
    margin-top: 175px;
    clear:both;
  }
  .patichoose{
    float: left;
    /*background: lawngreen;*/
    width: 150px;
    height: 50px;
    .text{
      font-size: 20px;
      text-align: center;
    }
  }
  .slideTwo {
    width: 80px;
    height: 30px;
    background: #333;
    margin: 20px auto;
    position: relative;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    -moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
    -webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
  }
  .slideTwo:after {
    content: '';
    position: absolute;
    top: 14px;
    left: 14px;
    height: 2px;
    width: 52px;
    background: #111;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    -moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
    -webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
    box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
  }
  .slideTwo label {
    display: block;
    width: 22px;
    height: 22px;
    cursor: pointer;
    position: absolute;
    top: 4px;
    z-index: 1;
    left: 4px;
    background: #fcfff4;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    -moz-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    background: -moz-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
    background: -webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
    background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
  }
  .slideTwo label:after {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    top: 6px;
    left: 6px;
    background: #333;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    -moz-box-shadow: inset 0px 1px 1px black, 0px 1px 0px rgba(255, 255, 255, 0.9);
    -webkit-box-shadow: inset 0px 1px 1px black, 0px 1px 0px rgba(255, 255, 255, 0.9);
    box-shadow: inset 0px 1px 1px black, 0px 1px 0px rgba(255, 255, 255, 0.9);
  }
  .slideTwo input[type=checkbox] {
    visibility: hidden;
  }
  .slideTwo input[type=checkbox]:checked + label {
    left: 54px;
  }
  .slideTwo input[type=checkbox]:checked + label:after {
    background: #00bf00;
  }
  .tableTitle {
    position: relative;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 15px;

    width: 100%;
    height: 3px;
    background-color: #d4d4d4;
    text-align: center;
    font-size: 16px;
    color: rgba(101, 101, 101, 1);
  }
  .midText {
    position: absolute;
    left: 50%;
    background-color: #ffffff;
    padding: 0 15px;
    transform: translateX(-50%) translateY(-50%);
  }

.CreateMeeting{
  position: relative;
  .MeetingInfo{
    .name{
      margin-top: 20px;
      width: 600px;
    }
    .stuid{
      margin-left: 10px;
      margin-top: 5px;
      width: 600px;
    }
    .roler{
      margin-top: 5px;
      width: 600px;
    }
    .ispermanent{
      margin-left: 10px;
      margin-top: 5px;
      width: 600px;
    }
  }
  .MeetingPati{

  }
}
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