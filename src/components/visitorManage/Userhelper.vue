<template>
  <div class="CreateMeeting">
    <div class="ti">
      用户指南
    </div>
    <el-card class="box-card">
      <el-card class="invi-card">
        <!-- your content here -->
        <div class="card-ti">
          主持人操作
        </div>
        <el-timeline>
          <el-timeline-item placement="top" v-for="(activity, index) in hostProcess" :key="index">
            <el-card style="height: 100px;">
              <h4 style="margin: 0px; padding: 0px;">{{ activity.content }}</h4>
              <el-link type="primary" @click="goToRoute(activity.router)">跳转页面：{{ activity.router }}</el-link>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
      <el-card class="invi-card">
        <!-- your content here -->
        <div class="card-ti">
          会议成员操作
        </div>
        <el-timeline>
          <el-timeline-item placement="top" v-for="(activity, index) in memberProcess" :key="index">
            <el-card style="height: 100px;">
              <h4 style="margin: 0px; padding: 0px;">{{ activity.content }}</h4>
              <el-link type="primary" @click="goToRoute(activity.router)">跳转页面：{{ activity.router }}</el-link>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>


    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reverse: true,
      hostProcess: [{
        content: '（可选）腾讯会议官网进行会议预约',
        router: 'ParticipantInvite'
      }, {
        content: '粘贴完整的会议链接并新建会议',
        router: 'ParticipantInvite'
      }, {
        content: '（可选）发送会议邀请邮件',
        router: 'newpati'
      }, {
        content: '查看会议议程',
        router: 'MeetingProcess'
      }],
      memberProcess: [{
        content: '确认是否接受会议邀请，查看个人主页',
        router: 'MyState'
      }, {
        content: '添加分享内容，选择参会形式',
        router: 'newProcess'

      }, {
        content: '查看会议议程',
        router: 'MeetingProcess'
      }]
    };
  },
  computed: {

  },
  created() {
  },
  methods: {
    goToRoute(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.invi-card {
  margin-left: 2%;
  margin-top: 2%;
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 500;
  line-height: 34px;
  margin-bottom: 2%;
}

.form_input {
  margin-left: 3%;
  width: 50%;
}

.ti {
  margin-left: 1%;
  margin-top: 1%;
  color: #1a1a1a;
  font-size: 24px;
  font-weight: 500;
  line-height: 34px;
}

.invi-card {
  margin-left: 1%;
  margin-right: 3%;
  margin-top: 1%;
  border-radius: 8px;
}

.box-card {
  margin-left: 1%;
  margin-right: 3%;
  margin-top: 1%;
  border-radius: 8px;
}

.buttonnew {
  margin-top: 175px;
  clear: both;
}

.patichoose {
  float: left;
  /*background: lawngreen;*/
  width: 150px;
  height: 50px;

  .text {
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

.slideTwo input[type=checkbox]:checked+label {
  left: 54px;
}

.slideTwo input[type=checkbox]:checked+label:after {
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

.CreateMeeting {
  position: relative;

  .MeetingInfo {
    .name {
      margin-top: 20px;
      width: 600px;
    }

    .stuid {
      margin-left: 10px;
      margin-top: 5px;
      width: 600px;
    }

    .roler {
      margin-top: 5px;
      width: 600px;
    }

    .ispermanent {
      margin-left: 10px;
      margin-top: 5px;
      width: 600px;
    }
  }

  .MeetingPati {}
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