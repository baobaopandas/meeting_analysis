<template>
  <div class="accessRecord-wrapper">
    <div class="accessRecord-title">
      <div class="inputs">
        <el-input placeholder="当前会议" v-model="curmeeting" disabled>
          <template slot="prepend">当前会议</template>
        </el-input>
        <el-input placeholder="会议时间" v-model="meetingtime" disabled>
          <template slot="prepend">会议时间</template>
        </el-input>
      </div>
    </div>
    <div class="MeetingInfo">
      <el-input placeholder="请输入您分享的内容" v-model="context" class="context">
        <template slot="prepend">分享内容</template>
      </el-input>
      <el-input placeholder="请输入您预估分享时长" v-model="time" class="time">
        <template slot="prepend">分享时长（分钟）</template>
      </el-input>
    </div>

    <div class="buttonnew">
      <el-button @click="newProcess">
        添加议程
      </el-button>
    </div>
    <dialog-bar v-model="sendVal" type="confirm" :title=user content="议程创建成功" v-on:cancel="clickCancel()"></dialog-bar>
    <dialog-bar v-model="falsemeeting" type="confirm" :title=user content="分享不得为空，议程创建失败"
      v-on:cancel="clickCancel()"></dialog-bar>
    <dialog-bar v-model="falsemeeting2" type="confirm" :title=user content="未连接到数据库，议程创建失败"
      v-on:cancel="clickCancel()"></dialog-bar>
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
      falsemeeting2: false,
      sendVal: false,
      curmeeting: "",
      meetingtime: "",
      context: "",
      time: "",
      user: null,
      hoster: '',
      role: "参与者",
      people: "",
    };
  },
  mounted() {
    let userInfo = sessionStorage.getItem("userInfo");
    let meetingInfo = sessionStorage.getItem("meetingInfo");

    if (userInfo) {
      this.user = JSON.parse(userInfo).admin;
      console.log(this.user); // 这将打印出 userName 的值
    }
    if (meetingInfo) {
      this.hoster = JSON.parse(meetingInfo).hoster;
      console.log(this.user); // 这将打印出 hoster 的值
      if(this.hoster == this.user){
        console.log("主持人")
        this.role = '主持人'
      }else{
        this.role = '参与者'
      }
    }
  },

  created() {
    this.getMeetingData();

  },
  methods: {
    getMeetingData() {
      const path = '/api/getCurrentmeeting';
      axios.post(path, { aaa: "hhhhhhh" }).then(res => {
        this.meeting = res.data.reslist[0];
        this.meetingtime = this.meeting.date;
        this.curmeeting = this.meeting.theme;
      }).catch(error => {
        console.error(error);
      });
    },
    clickCancel() {
      console.log('点击了取消');
    },
    clickDanger() {
      console.log('这里是danger回调')
    },
    clickConfirm() {
      console.log('点击了confirm');
    },
    newProcess() {
      console.log(this.curmeeting)
      console.log(this.context)
      console.log(this.time)
      if (this.context == "") {
        console.log("创建会议失败")
        this.falsemeeting = true;
      } else {
        console.log("新建议程");
        // 设置对应python的接口，这里使用的是localhost:5000
        const path = '/api/newProcess';
        axios.post(path, { curmeeting: this.curmeeting, topicName: this.context, time: this.time, people: this.user, role: this.role }).then(res => {
          console.log(res);
          this.sendVal = true;
        }).catch(error => {
          console.error(error);
          this.falsemeeting2 = true;
        });

      }

    },
  }
};
</script>

<style lang="scss" scoped>
.newpati {
  margin-top: 35px;
  color: blue;
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
  background-color: #ffffff;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.tableTitle1 {
  position: relative;
  margin: 0 auto;
  margin-top: 95px;
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
    .theme {
      margin-top: 20px;
      width: 600px;
    }

    .host {
      margin-left: 10px;
      margin-top: 5px;
      width: 600px;
    }

    .date {
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
}</style>