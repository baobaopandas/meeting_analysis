<template>
  <div class="accessRecord-wrapper">
    <div class="accessRecord-title">
      <span class="accessRecord-header">会议当前流程</span>

      <div class="inputs">
        <button @click="addProcess">add</button>
        <el-input
          placeholder="当前会议"
          v-model="curmeeting"
          disabled
        >
          <template slot="prepend">当前会议</template>
        </el-input>
        <el-input
          placeholder="会议时间"
          v-model="meetingtime"
          disabled
        >
          <template slot="prepend">会议时间</template>
        </el-input>
      </div>
    </div>

    <el-table :data="topicData" stripe class="accessRecord-table">
      <el-table-column prop="time" label="时长" ></el-table-column>
      <el-table-column prop="topicName" label="分享主题" ></el-table-column>
      <el-table-column prop="people" label="主讲人" ></el-table-column>
      <el-table-column prop="role" label="角色" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      curmeeting: "2019年第一次会议",
      meetingtime: "2019-05-01",
      topicData: [
        {
          topicName: "开场白",
          people: "苏永甫",
          role: "学生/主持人",
          time: "5min",
        },
        {
          topicName: "外出调研分享",
          people: "李银胜",
          role: "教师/组织者",
          time: "15min",
        },
        {
          topicName: "供应链金融欺诈检测研究",
          people: "吴斌",
          role: "博士/参与者",
          time: "15min",
        },
        {
          topicName: "供应链施策仿真",
          people: "王朔",
          role: "硕士/参与者",
          time: "15min",
        },
        {
          topicName: "会议结束语",
          people: "苏永甫",
          role: "学生/主持人",
          time: "5min",
        },
      ],
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
    getMeetingData() {
    const path = '/api/getCurrentmeeting';
    return axios.post(path, { aaa: "hhhhhhh" })
      .then(res => {
        this.meeting = res.data.reslist[0];
        this.meetingtime = this.meeting.date;
        this.curmeeting = this.meeting.theme;
        console.log(this.meeting);
        console.log(res);
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
  color: #444;  /* Adjusted the color to a deep gray */
  letter-spacing: 0.5px;  /* Added some letter-spacing for better readability */
}

.inputs {
  display: flex;
  gap: 10px; /* or you can use margin-right on child elements if the browser doesn't support 'gap' */
}

.accessRecord-table {
  background-color: #fff;
}
</style>
