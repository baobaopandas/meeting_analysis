<template>
  <div class="accessRecord-wrapper">
    <div>
      <div class="ti">
        新增议程
      </div>

      <el-card class="box-card">
        <el-card style="margin-bottom: 10px;">
          <el-descriptions title="会议信息">
            <el-descriptions-item label="当前会议">{{ meeting.Theme }}</el-descriptions-item>
            <el-descriptions-item label="会议时间">{{ meeting.Date }}</el-descriptions-item>
            <el-descriptions-item label="会议主持人">{{ meeting.Hoster }}</el-descriptions-item>
            <el-descriptions-item label="会议号">{{ meeting.number }}</el-descriptions-item>
            <el-descriptions-item label="会议链接"><a :href="meeting.link">{{ meeting.link }}</a></el-descriptions-item>
          </el-descriptions>
        </el-card>

        <div style="margin-right: 40%; margin-top: 3%;">
          <el-form ref="form" :model="form" label-width="80px">

            <el-form-item label="分享主题">
              <el-input v-model="form.topicName" style="width: 40%" clearable></el-input>
            </el-form-item>

            <el-form-item label="分享时长">
              <el-select v-model="form.time" placeholder="请选择时长">
                <el-option label="10min" value="10min"></el-option>
                <el-option label="15min" value="15min"></el-option>
                <el-option label="20min" value="20min"></el-option>
                <el-option label="30min" value="30min"></el-option>
                <el-option label="45min" value="45min"></el-option>
                <el-option label="60min" value="60min"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="参加形式">
              <el-radio-group v-model="form.participation_mode">
                <el-radio label="线下参加"></el-radio>
                <el-radio label="线上参加"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="课题">
              <el-select v-model="form.project" placeholder="请选择课题">
                <el-option label="数字助教" value="数字助教"></el-option>
                <el-option label="研讨会助" value="研讨会助"></el-option>
                <el-option label="交易欺诈" value="交易欺诈"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="分享内容">
              <el-checkbox-group v-model="form.checkbox" @change="checkboxchange">
                <el-checkbox label="实验分析" name="type"></el-checkbox>
                <el-checkbox label="算法模型" name="type"></el-checkbox>
                <el-checkbox label="论文进展" name="type"></el-checkbox>
                <el-checkbox label="下周计划" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

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
      meeting: [],
      curmeeting: "",
      meetingtime: "",
      context: "",
      time: "",
      user: '',
      hoster: '',
      role: "",
      people: "",
      form: {
        curmeeting: '',
        topicName: '',
        time: "15min",
        people: '',
        role: '',
        meetingid: '',
        participation: '',
        participation_mode: "线下参加",
        project: '',
        experiment: '',
        algorithm: '',
        paper: '',
        nextweekplan: '',
        completion: '',
        checkbox: [],
        id: 'default'
      }
    };
  },
  mounted() {
  },

  created() {
    this.getMeetingData();
    let userInfo = sessionStorage.getItem("userInfo");
    let MyProcessData = sessionStorage.getItem('MyProcessData');
    this.form.id = JSON.parse(MyProcessData).id;

    if (userInfo) {
      this.form.people = JSON.parse(userInfo).admin;
      this.form.topicName = this.form.people + "的会议分享"
      this.form.role = JSON.parse(userInfo).role
    }
  },
  methods: {
    checkboxchange() {

    },
    onSubmit() {
      if (this.form.checkbox.includes("实验分析")) {
        this.form.experiment = "实验分析";
      }
      if (this.form.checkbox.includes("算法模型")) {
        this.form.algorithm = "算法模型";
      }
      if (this.form.checkbox.includes("论文进展")) {
        this.form.paper = "论文进展";
      }
      if (this.form.checkbox.includes("下周计划")) {
        this.form.nextweekplan = "下周计划";
      }

      this.newProcess()
    },
    getMeetingData() {
      const path = '/api/getCurrentmeeting';
      axios.post(path, { aaa: "hhhhhhh" }).then(res => {
        this.meeting = res.data.reslist[0];
        this.meetingtime = this.meeting.Date;
        this.curmeeting = this.meeting.Theme;
        this.form.curmeeting = this.meeting.Theme;
        this.form.meetingid = this.meeting.id;
        console.log(this.meeting)
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
      const path = '/api/updateProcess';
      if (this.form.id === 'default') {
        this.getparticipation();
      }
      axios.post(path, { form: this.form })
        .then(res => {
          this.sendVal = true;
        }).catch(error => {
          console.error(error);
          this.falsemeeting2 = true;
        });
    },
    getparticipation() {
      const path = '/api/getMyProcessData';
      axios.post(path, { meetingid: this.meeting.id, people: this.userInfo.name }).then(res => {
        this.myprocess = res.data.reslist[0];
        sessionStorage.setItem(
          "MyProcessData",
          JSON.stringify({
            id: this.myprocess.id,
            participation: this.myprocess.participation
          })
        );
      }).catch(error => {
        console.error(error);
        this.dialogVisible = true;
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.thismeeting {

  margin: 1%;
  width: 280px;
}

.el-table {
  margin-bottom: 3%;
}

.ti {
  margin-left: 1%;
  margin-top: 1%;
  color: #1a1a1a;
  font-size: 24px;
  font-weight: 500;
  line-height: 34px;
}


.box-card {
  margin-left: 1%;
  margin-right: 3%;
  margin-top: 1%;
  border-radius: 8px;
}

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
}
</style>