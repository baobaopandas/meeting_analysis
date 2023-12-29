<template>
  <div>
    <div class="ti">
      当前会议流程
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
        <el-button type="primary" @click="addProcess">增加本人议程</el-button>
        <el-button type="primary" @click="dialogVisible = true">增加其他议程</el-button>
        <el-button type="primary" @click="dialogQuestion = true">设置会议问卷</el-button>

      </el-card>

      <el-card style="margin-bottom: 10px;">
        <div class="card-ti">
          线下参会人员
        </div>
        <el-table :data="offlineParticipation" stripe class="accessRecord-table">
          <el-table-column prop="time" label="时长" align="center"></el-table-column>
          <el-table-column prop="topicName" label="分享主题" align="center" width="180px"></el-table-column>
          <el-table-column prop="people" label="主讲人" align="center"></el-table-column>
          <el-table-column prop="role" label="角色" align="center"></el-table-column>
          <el-table-column prop="project" label="课题" align="center"></el-table-column>
          <el-table-column prop="experiment" label="实验分析" align="center">
            <template v-slot="scope">
              <i :class="getIconClass(scope.row.experiment)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="algorithm" label="算法模型" align="center">
            <template v-slot="scope">
              <i :class="getIconClass(scope.row.algorithm)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="paper" label="论文进展" align="center">
            <template v-slot="scope">
              <i :class="getIconClass(scope.row.paper)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="nextweekplan" label="下周计划" align="center">
            <template v-slot="scope">
              <i :class="getIconClass(scope.row.nextweekplan)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="completion" label="是否完成" align="center"></el-table-column>

          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="delofflinerow(scope.row)" type="text" size="small">删除议程</el-button>
              <el-button @click="scoring(scope.row)" type="text" size="small">议程评价</el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card style="margin-bottom: 10px;">
        <div class="card-ti">
          线上参会人员
        </div>
        <el-table :data="onlineParticipation" stripe class="accessRecord-table">
          <el-table-column prop="time" label="时长" align="center"></el-table-column>
          <el-table-column prop="topicName" label="分享主题" align="center" width="180px"></el-table-column>
          <el-table-column prop="people" label="主讲人" align="center"></el-table-column>
          <el-table-column prop="role" label="角色" align="center"></el-table-column>
          <el-table-column prop="project" label="课题" align="center"></el-table-column>
          <el-table-column prop="experiment" label="实验分析" align="center">
            <template v-slot="scope">
              <i :class="getIconClass(scope.row.experiment)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="algorithm" label="算法模型" align="center">
            <template v-slot="scope">
              <i :class="getIconClass(scope.row.algorithm)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="paper" label="论文进展" align="center">
            <template v-slot="scope">
              <i :class="getIconClass(scope.row.paper)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="nextweekplan" label="下周计划" align="center">
            <template v-slot="scope">
              <i :class="getIconClass(scope.row.nextweekplan)"></i>
            </template>
          </el-table-column>
          <el-table-column prop="completion" label="是否完成" align="center"></el-table-column>


          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="delonlinerow(scope.row)" type="text" size="small">删除议程</el-button>
              <el-button @click="scoring(scope.row)" type="text" size="small">议程评价</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <el-card style="margin-bottom: 10px;">
        <div class="card-ti">
          未参会人员
        </div>
        <el-table :data="unParticipation" stripe class="accessRecord-table">
          <el-table-column prop="people" label="姓名" align="center"></el-table-column>
          <el-table-column prop="role" label="角色" align="center"></el-table-column>
        </el-table>
      </el-card>

    </el-card>


    <el-dialog title="新增议程" :visible.sync="dialogVisible">
      <div>
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

          <el-form-item label="分享人">
            <el-input v-model="form.people" style="width: 40%" clearable></el-input>
          </el-form-item>

          <el-form-item label="角色*">
            <el-select v-model="form.role" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
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
    </el-dialog>

    <el-dialog title="评价" :visible.sync="dialogRate">
      <div class="block" v-for="(question, index) in questionData" :key="index">
        <span class="demonstration">{{ question.question_text }}</span>
        <el-input v-model="question.answer" placeholder="评价分数" clearable></el-input>
        <!-- <el-rate v-model="question.rating" :colors="colors">
        </el-rate> -->
      </div>
      <el-button @click="confirm" type="primary" size="small">确认评价</el-button>
    </el-dialog>

    <el-dialog title="问卷管理" :visible.sync="dialogQuestion">
      <el-button @click="dialogAdd = true" type="primary" size="small">增加问题</el-button>
      <el-table :data="questionData" style="width: 100%">
        <el-table-column type="index" label="编号" width="180" align="center">
        </el-table-column>
        <el-table-column prop="question_text" label="日期" width="280" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="updateQuestion(scope.row)" type="text" size="small">修改问题</el-button>
            <el-button @click="deleteQuestion(scope.row)" type="text" size="small">删除问题</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="设置问题" :visible.sync="dialogAdd">
      <el-form ref="addform" :model="addform" label-width="80px">
        <el-form-item label="问题内容">
          <el-input v-model="addform.question_text" style="width: 40%" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addQuestion">立即创建</el-button>
          <el-button @click="dialogAdd = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改问题" :visible.sync="dialogUpdate">

      <el-form ref="updateform" :model="updateform" label-width="80px">

        <el-form-item label="问题内容">
          <el-input v-model="updateform.question_text" style="width: 40%" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateQuestionForm">立即修改</el-button>
          <el-button @click="dialogUpdate = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <dialog-bar v-model="sendVal" type="confirm" content="议程创建成功" v-on:cancel="clickCancel()"></dialog-bar>
    <dialog-bar v-model="falsemeeting2" type="confirm" content="未连接到数据库，议程创建失败" v-on:cancel="clickCancel()"></dialog-bar>
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
      meeting: [],
      curmeeting: "",
      meetingtime: "",
      topicData: [],
      questionData: [],
      dialogVisible: false,
      dialogRate: false,
      dialogQuestion: false,
      dialogAdd: false,
      dialogUpdate: false,
      onlineParticipation: [],
      offlineParticipation: [],
      unParticipation: [],
      timer: null,
      falsemeeting2: false,
      sendVal: false,
      answerForm:{
        meeting_id:'',
        paticipater_id:'',
        process_id:'',
      },
      addform: {
        meeting_id: '',
        question_text: ''
      },
      updateform: {
        question_id: '',
        question_text: ''
      },
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
        id: ''
      },
      options: [{
        value: '研究生',
        label: '研究生'
      }, {
        value: '博士生',
        label: '博士生'
      }, {
        value: '本科生',
        label: '本科生'
      }, {
        value: '教师',
        label: '教师'
      }, {
        value: '特邀',
        label: '特邀'
      }, {
        value: '其他',
        label: '其他'
      }],
      items: [
        { question: '问题1', rating: 0 },
        { question: '问题2', rating: 0 },
        // 添加更多问题...
      ],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    };
  },
  created() {
    let userInfo = sessionStorage.getItem("userInfo");
    this.answerForm.paticipater_id = JSON.parse(userInfo).ID;
    console.log(this.answerForm)
    this.getMeetingData()
      .then(() => {
        this.getMeetingProcessData();
        this.getQuestionnaire()
      })
      .catch(error => {
        console.error(error);
      });
  },
  mounted() {
    this.timer = setInterval(this.getMeetingProcessData, 5 * 1000); // 5s
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    scoring(row) {
      this.dialogRate = true;
      this.answerForm.process_id = row.id
      console.log(this.answerForm)
    },
    confirm() {
      console.log(this.questionData)
      const path = '/api/addAnswer';
      return axios.post(path, { answerInfo: this.answerForm, answerData:this.questionData })
        .then(res => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.getQuestionnaire()
        }).catch(error => {
          this.$message({
            type: 'info',
            message: '添加失败!'
          });
        });
    },
    getQuestionnaire() {
      const path = '/api/getQuestionnaire';
      return axios.post(path, { meeting_id: this.meeting.id })
        .then(res => {
          this.questionData = res.data.questions
          console.log(this.questionData)
        });
    },
    addQuestion() {
      const path = '/api/addQuestion';
      return axios.post(path, { meeting_id: this.addform.meeting_id, question_text: this.addform.question_text })
        .then(res => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.getQuestionnaire()
        }).catch(error => {
          this.$message({
            type: 'info',
            message: '添加失败!'
          });
        });

    },
    updateQuestion(row) {
      console.log(row)
      this.updateform.question_text = row.question_text
      this.updateform.question_id = row.question_id
      this.dialogUpdate = true
    },
    updateQuestionForm() {
      const path = '/api/updateQuestion';
      return axios.post(path, { question_id: this.updateform.question_id, question_text: this.updateform.question_text })
        .then(res => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.getQuestionnaire()
        }).catch(error => {
          this.$message({
            type: 'info',
            message: '修改失败!'
          });
        });
    },
    deleteQuestion(row) {
      console.log(row)
      const path = '/api/delQuestion';
      return axios.post(path, { question_id: row.question_id })
        .then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getQuestionnaire()
        }).catch(error => {
          this.$message({
            type: 'info',
            message: '删除失败!'
          });
        });
    },

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
    newProcess() {
      const path = '/api/newProcess';
      console.log(this.form)
      axios.post(path, { form: this.form })
        .then(res => {
          this.sendVal = true;
        }).catch(error => {
          console.error(error);
          this.falsemeeting2 = true;
        });
    },
    delonlinerow(row) {
      this.$confirm('确认删除这条议程吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 如果确认了删除，执行删除逻辑
        // 假设有一个名为 agendaList 的数组存储了所有议程
        const index = this.onlineParticipation.indexOf(row);
        if (index !== -1) {
          this.onlineParticipation.splice(index, 1);
          console.log(row);
          const path = '/api/delProcess';
          return axios.post(path, { id: row.id })
            .then(res => {
              this.$message({
                // 提示删除成功
                type: 'success',
                message: '删除成功!'
              });
            });

        }
      }).catch(() => {
        // 如果取消了删除操作，可以不做任何事情或者显示提示
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    delofflinerow(row) {
      this.$confirm('确认删除这条议程吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 如果确认了删除，执行删除逻辑
        // 假设有一个名为 agendaList 的数组存储了所有议程
        const index = this.offlineParticipation.indexOf(row);
        if (index !== -1) {
          this.offlineParticipation.splice(index, 1);
          console.log(row);
          const path = '/api/delProcess';
          return axios.post(path, { id: row.id })
            .then(res => {
              this.$message({
                // 提示删除成功
                type: 'success',
                message: '删除成功!'
              });
            });
        }
      }).catch(() => {
        // 如果取消了删除操作，可以不做任何事情或者显示提示
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getIconClass(value) {
      if (value === null || value === undefined || value === '') {
        return "el-icon-close";
      } else {
        return "el-icon-check";
      }
    },
    closedialog() {
      this.getMeetingProcessData()

    },
    getMeetingData() {
      const path = '/api/getCurrentmeeting';
      return axios.post(path, { aaa: "hhhhhhh" })
        .then(res => {
          this.meeting = res.data.reslist[0];
          console.log(this.meeting);
          this.meetingtime = this.meeting.Date;
          this.curmeeting = this.meeting.Theme;
          this.form.curmeeting = this.meeting.Theme;
          this.form.meetingid = this.meeting.id;
          this.addform.meeting_id = this.meeting.id;
          this.answerForm.meeting_id = this.meeting.id
          sessionStorage.setItem(
            "meetingInfo",
            JSON.stringify({
              id: this.meeting.id,
              theme: this.meeting.curmeeting,
              hoster: this.meeting.host,
              selectDay: this.meeting.selectDay,
              link: this.meeting.link,
              number: this.meeting.number,
              time: this.meeting.time,
            })
          );
        });
    },
    getMeetingProcessData() {
      const path = '/api/getMeetingProcessData';
      return axios.post(path, { meetingid: this.meeting.id })
        .then(res => {
          this.topicData = res.data.reslist;
          // 首先筛选出所有参与方式为'refuse'的数据
          this.unParticipation = this.topicData.filter(topic => topic.participation?.trim().toLowerCase() === 'refuse');

          // 然后从原始数据中移除已经筛选出的数据
          this.topicData = this.topicData.filter(topic => topic.participation?.trim().toLowerCase() !== 'refuse');

          // 接下来筛选出线上参加的数据
          this.onlineParticipation = this.topicData.filter(topic => topic.participation_mode?.trim().toLowerCase() === '线上参加');

          // 最后筛选出线下参加的数据
          this.offlineParticipation = this.topicData.filter(topic => topic.participation_mode?.trim().toLowerCase() === '线下参加');

          // this.onlineParticipation = this.topicData.filter(topic => topic.participation_mode?.trim().toLowerCase() === '线上参加');
          // this.offlineParticipation = this.topicData.filter(topic => topic.participation_mode?.trim().toLowerCase() === '线下参加');
          // this.unParticipation = this.topicData.filter(topic => topic.participation?.trim().toLowerCase() === 'refuse');
        });

    },
    addProcess() {
      this.$router.push({ name: 'newProcess' });
    }
  }
};
</script>

<style scoped>
.card-ti {
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 500;
  line-height: 34px;
}

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
