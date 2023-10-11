<template>
  <div>
    <div class="ti">
      当前会议流程
    </div>
    <el-card class="box-card">
      <el-input class="thismeeting" placeholder="当前会议" v-model="curmeeting" disabled>
        <template slot="prepend">当前会议</template>
      </el-input>
      <el-input class="thismeeting" placeholder="会议时间" v-model="meetingtime" disabled>
        <template slot="prepend">会议时间</template>
      </el-input>
      <el-table :data="topicData" stripe class="accessRecord-table">
        <el-table-column prop="time" label="时长"></el-table-column>
        <el-table-column prop="topicName" label="分享主题"></el-table-column>
        <el-table-column prop="people" label="主讲人"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
      </el-table>
      <el-button type="primary" @click="dialogVisible = true">增加议程</el-button>
    </el-card>

    <el-dialog title="增加议程" :visible.sync="dialogVisible" width="30%" @close="closedialog">
      <newProcess></newProcess>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import newProcess from './newProcess.vue';
export default {
  components: {
    newProcess // 注册导入的组件
  },
  data() {
    return {
      curmeeting: "",
      meetingtime: "",
      topicData: [],
      dialogVisible: false,
    };
  },
  created() {
    this.getMeetingData()
      .then(() => {
        this.getMeetingProcessData();
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    closedialog() {
      this.getMeetingProcessData()
    },
    getMeetingData() {
      const path = '/api/getCurrentmeeting';
      return axios.post(path, { aaa: "hhhhhhh" })
        .then(res => {
          this.meeting = res.data.reslist[0];
          this.meetingtime = this.meeting.date.split(" ")[0];
          this.curmeeting = this.meeting.theme;
          console.log(res);
          sessionStorage.setItem(
            "meetingInfo",
            JSON.stringify({
              theme: this.meeting.theme,
              hoster: this.meeting.host,
              selectDay: this.meeting.selectDay,
              link: this.meeting.link,
              number: this.meeting.number
            })
          );
        });
    },
    getMeetingProcessData() {
      const path = '/api/getMeetingProcessData';
      return axios.post(path, { curmeeting: this.curmeeting })
        .then(res => {
          this.topicData = res.data.reslist;
          console.log(res);
        });

    },
    addProcess() {
      this.$router.push({ name: 'newProcess' });
    }
  }
};
</script>

<style scoped>
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

.accessRecord-wrapper {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.accessRecord-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.accessRecord-header {
  font-size: 24px;
  font-weight: 600;
  color: #444;
  /* Adjusted the color to a deep gray */
  letter-spacing: 0.5px;
  /* Added some letter-spacing for better readability */
}

.inputs {
  display: flex;
  gap: 10px;
  /* or you can use margin-right on child elements if the browser doesn't support 'gap' */
}

.accessRecord-table {
  background-color: #fff;
}
</style>
