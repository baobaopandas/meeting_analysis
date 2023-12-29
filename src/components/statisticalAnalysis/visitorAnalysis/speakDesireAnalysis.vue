<template>
  <div class="behaviorAnalysis-wrapper">
    <el-card>
      <el-row>
        <el-col :span="12">
          <div class="demo">
            <video id="videoElement" controls autoplay muted width="100%" height="400px"></video>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="margin-left: 5px">
            <!-- <div id="drawGuestEmotion" class="drawGuestEmotion" style="margin-left:5px;height:400px"></div> -->
            <el-button @click="dialogVisible = true" type="primary">新增议程</el-button>
            <!-- <el-card style="height:400px">
        <speak-chart style="margin-top:-100px"></speak-chart>
        </el-card> -->
            <el-table :data="topicData" style="width: 100%; margin-top: 5px" border>
              <el-table-column prop="topicName" label="议程" width="180">
              </el-table-column>
              <el-table-column prop="people" label="主讲人" width="100">
              </el-table-column>
              <el-table-column prop="role" label="角色" width="100">
              </el-table-column>
              <el-table-column prop="start_time" label="开始时间" width="100">
              </el-table-column>
              <el-table-column prop="end_time" label="结束时间" width="100">
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <!-- 如果start_time为空，则显示开始按钮 -->
                  <el-button size="mini" type="primary" v-show="!scope.row.start_time"
                    @click="handleStart(scope.$index, scope.row)">开始</el-button>
                  <!-- 如果start_time不为空且end_time为空，则显示结束按钮 -->
                  <el-button size="mini" type="danger" v-show="scope.row.start_time && !scope.row.end_time"
                    @click="handleEnd(scope.$index, scope.row)">结束</el-button>
                  <!-- 如果start_time和end_time都不为空，则显示已完成标记 -->
                  <el-button v-show="scope.row.start_time && scope.row.end_time" type="success" icon="el-icon-check"
                    circle size="mini"></el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <!-- <button v-if="!ismotion" @click="startDesire">情感检测开始</button> -->
    <!-- <button v-if="ismotion" class="orange" @click="stopEmotion">Stop</button> -->
    <!-- <el-button style="float: right; padding: 3px 0" type="text">切换视图</el-button> -->
    <div class="bottom">
      <el-card>
        <el-row>
          <el-col :span="12">
            <el-card class="box-card" style="width: 100%; height: 450px">
              <speak-chart style="margin-top: -50px"></speak-chart>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card" style="width: 100%; height: 450px">

              <el-tabs type="border-card">

                <el-tab-pane label="实时转录">

                  <p>徐峥(00:20): 好的，到了预定的会议开始时间了，我们正式开始我们的周三讨论班。</p>
                  <p>徐铮(00:25): 首先还是第一个环节，老师有话说。</p>
                  <p>李银胜(00:35): 我主要有三点想说...</p>
                </el-tab-pane>
                <el-tab-pane label="状态统计">
                  <el-card>
                    <div style="margin-bottom:20px">
                      <el-time-select style="width:30%;height:5px" placeholder="起始时间" :picker-options="{
                        start: '00:00',
                        step: '00:01',
                        end: '01:00'
                      }">
                      </el-time-select>
                      <el-time-select style="width:30%;margin-left:50px" placeholder="结束时间" :picker-options="{
                        start: '00:00',
                        step: '00:01',
                        end: '00:30',
                        minTime: startTime
                      }">
                      </el-time-select>
                      <el-button style="float:right;margin-right:50px" type="primary">确定</el-button>
                    </div>

                    <el-table :data="tableData" style="width: 100%:margin-top:10px" border caption="表达欲望" height="250px">
                      <!-- <el-table-column prop="topic" label="当前主题" width="80">
            </el-table-column> -->
                      <el-table-column prop="name" label="姓名" fixed width="80">
                      </el-table-column>
                      <!-- <el-table-column prop="percent" label="说话占比"  width="100">
              <template slot-scope="scope">{{scope.row.percent?scope.row.percent:'0'}}</template>
            </el-table-column> -->
                      <el-table-column prop="engagement" label="发言参与度" width="100">
                        <template slot-scope="scope">{{
                          scope.row.engagement ? scope.row.engagement : "0"
                        }}</template>
                      </el-table-column>
                      <el-table-column label="上一次发言" prop="lastspeak" width="100"></el-table-column>
                      <!-- <el-table-column prop="sentiment" label="情绪" width="100">
              <template slot-scope="scope">{{scope.row.sentiment?scope.row.sentiment:'-'}}</template>
            </el-table-column> -->
                      <!-- <template slot-scope="scope">{{scope.row.desirein5?scope.row.desirein5:'0'}}</template> -->
                      <el-table-column label="中断失败" prop="desirein3" width="100">
                        <!-- <el-table-column prop="interrupt" label="中断失败" width="100">
              <template slot-scope="scope">{{scope.row.interrupt?scope.row.interrupt:'-'}}</template>
            </el-table-column> -->
                      </el-table-column>
                      <el-table-column label="赞成" prop="desirein4" width="100">
                        <!-- <el-table-column prop="yyy" label="赞同行为" width="100"></el-table-column>
            <el-table-column prop="xxx" label="不赞同行为" width="100"></el-table-column> -->
                      </el-table-column>
                      <el-table-column label="不赞成" prop="desirein4" width="80"></el-table-column>
                      <el-table-column label="疑惑" prop="desirein4" width="100"></el-table-column>
                      <!-- <el-table-column prop="desirein5" label="表达欲望指数">
              </el-table-column>
              <el-table-column prop="desirein6" label="表达欲望排序">
              </el-table-column> -->
                    </el-table>
                  </el-card>
                </el-tab-pane>
                <el-tab-pane label="发言参与"><el-row>
                    <el-col :span=16>
                      <div id="participant" class="participant" style="width: 500px; height: 350px"></div>
                    </el-col>
                    <el-col :span="8">
                      <el-card>
                        <div slot="header" class="clearfix" style="margin-left:25%">
                          <span style="font-weight:bold">时间范围选择</span>
                        </div>
                        <el-time-select style="width:100%" placeholder="起始时间" :picker-options="{
                          start: '00:00',
                          step: '00:01',
                          end: '00:30'
                        }">
                        </el-time-select>
                        <el-time-select style="width:100%;margin-top:10px" placeholder="结束时间" :picker-options="{
                          start: '00:00',
                          step: '00:01',
                          end: '00:30',
                          minTime: startTime
                        }">
                        </el-time-select>
                        <el-button style="margin-left:30%;margin-top:10px;padding:10px 20px" type="primary">确定</el-button>
                      </el-card>
                    </el-col>
                  </el-row>
                </el-tab-pane>

                <el-tab-pane>
                  <span slot="label">
                    消息中心<el-badge :value="1"></el-badge>
                  </span>
                  <el-alert title="类别：中断失败" type="warning" show-icon>

                    <template #default>
                      描述："00:06:06，参与者C尝试发言未成功
                      <el-button size="mini" type="info" style="margin-left:100px">忽略</el-button> "
                      <el-button size="mini" @click="reloadChart" type="success">查看详情</el-button>

                      <el-button size="mini" type="primary">稍后处理</el-button>
                    </template>
                  </el-alert>
                </el-tab-pane>
                <el-tab-pane label="其他">其他......</el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
        </el-row>
        <el-row v-show="false">
          <el-card class="box-card" style="width: 100%; height: 550px">
            <speak-chart :key="componentkey"></speak-chart>
          </el-card>
        </el-row>
        <el-col :span="9" v-show="false"> </el-col>
      </el-card>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible">
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
  </div>
</template>

<script>
// import Echarts from "echarts";
import flvjs from "flv.js";
import Fetch from "mixins/fetch";
import Echarts from "echarts";
import axios from "axios";
// import {videoPlayer} from 'vue-video-player'
import "vue-video-player/node_modules/video.js/dist/video-js.css";

import speakerdesireChart from "../../visitorManage/speakDesireAnalysis.vue";

var mytimer2;
var timer;
var curwang = 2.36;
var curyao = 1.24;
var currentTopic = "会议未开始";
export default {
  components: {
    "speak-chart": speakerdesireChart,
    // videoPlayer
  },
  props: {
    pati: {
      type: String,
    },
  },
  watch: {
    pati() {
      this.getid();
    },
  },
  data() {
    return {
      meeting: [],
      curmeeting: "",
      meetingtime: "",
      topicData: [],
      dialogVisible: false,
      onlineParticipation: [],
      offlineParticipation: [],
      unParticipation: [],
      timer: null,
      falsemeeting2: false,
      sendVal: false,
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
      componentkey: 0,
      sliderValue: [0, 120], // 默认滑块范围是0到120
      startTime: new Date(2000, 0, 1, 0, 0, 0), // 起始时间，默认为 00:00:00
      endTime: new Date(2000, 0, 1, 2, 0, 0), // 结束时间，默认为 02:00:00
      pickerOptions: {
        start: "00:00",
        step: "00:01",
        end: "02:00",
      },
      picture: "状态",
      loading: true,
      ismotion: false,
      id: 0,
      new_time_data: [],
      new_angry_data: [],
      new_disgusted_data: [],
      new_fearful_data: [],
      new_happy_data: [],
      new_sad_data: [],
      new_surprised_data: [],
      new_neutral_data: [],
      itemkey: "",
      tableData: [
        {
          topic: currentTopic,
          name: "李银胜",
          percent: "50%",
          engagement: "40",
          sentiment: "积极",
          lastspeak: "2分钟前",
          interrupt: 1,
          desirein3: 2,
          desirein4: 3,
          desirein5: curwang,
          desirein6: 1,
        },
        {
          topic: currentTopic,
          name: "吴斌",
          percent: "10%",
          engagement: "60",
          sentiment: "中性",
          lastspeak: "5分钟前",
          interrupt: 1,
          desirein3: 1,
          desirein4: 2,
          desirein5: curyao,
          desirein6: 2,
        },
        {
          topic: currentTopic,
          name: "姚鑫玉",
        },
        {
          topic: currentTopic,
          name: "王帅宇",
        },
        {
          topic: currentTopic,
          name: "王朔",
        },
        {
          topic: currentTopic,
          name: "包智超",
        },
        {
          topic: currentTopic,
          name: "徐峥",
        },
        {
          topic: currentTopic,
          name: "谢万超",
        },
        {
          topic: currentTopic,
          name: "苏永甫",
        },
      ],
      // topicData: [
      //   {
      //     topicName: "开场白",
      //     people: "苏永甫",
      //     role: "学生/主持人",
      //     state: 0, // 0，未开始，1，进行中，2，已结束
      //     start_time: 0,
      //     end_time: 0,
      //   },
      //   {
      //     topicName: "外出调研分享",
      //     people: "李银胜",
      //     role: "教师/组织者",
      //     state: 0, // 0，未开始，1，进行中，2，已结束
      //     start_time: 0,
      //     end_time: 0,
      //   },
      //   {
      //     topicName: "供应链金融欺诈检测研究",
      //     people: "吴斌",
      //     role: "博士/参与者",
      //     state: 0, // 0，未开始，1，进行中，2，已结束
      //     start_time: 0,
      //     end_time: 0,
      //   },
      //   {
      //     topicName: "供应链施策仿真",
      //     people: "王朔",
      //     role: "硕士/参与者",
      //     state: 0, // 0，未开始，1，进行中，2，已结束
      //     start_time: 0,
      //     end_time: 0,
      //   },
      //   {
      //     topicName: "会议结束语",
      //     people: "苏永甫",
      //     role: "学生/主持人",
      //     state: 0, // 0，未开始，1，进行中，2，已结束
      //     start_time: 0,
      //     end_time: 0,
      //   },
      // ],
    };
  },
  mixins: [Fetch],
  created() {
    this.getMeetingData()
      .then(() => {
        this.getMeetingProcessData();
      })
      .catch(error => {
        console.error(error);
      });
  },
  mounted() {
    this.drawparticipant();
    // 访客行为统计，圆饼图
    // this.drawGuestBehave();
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById("videoElement");
      this.flvPlayer = flvjs.createPlayer({
        type: "flv",
        isLive: true,
        hasAudio: false,
        // url: 'http://123.60.55.75:7001/live/movie.flv',
        url: "http://124.222.217.145:8090/live/154.flv",
      });
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
      this.flvPlayer.play();
    }
    this.drawGuestEmotion();
    this.drawGuestEmotion2();
  },
  computed: {},
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
    newProcess() {
      const path = '/api/newProcess';
      console.log(this.form)
      axios.post(path, { form: this.form })
        .then(res => {
          this.$message({
            type: "success",
            message: "创建成功!"
          });
          this.getMeetingProcessData()
        }).catch(error => {
          this.$message({
            type: "info",
            message: "创建失败！"
          });
        });
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
      axios.post(path, { meetingid: this.meeting.id })
        .then(res => {
          this.topicData = res.data.reslist.filter(row => row.topicName !== null);
          console.log(this.topicData);
        });
    },
    addProcess() {
      this.$router.push({ name: 'newProcess' });
    },
    reloadChart() {
      this.componentkey++
    },
    updateTime() {
      const startMinutes = Math.floor(this.sliderValue[0]);
      const endMinutes = Math.floor(this.sliderValue[1]);

      const startDate = new Date(2000, 0, 1, 0, 0, 0);
      startDate.setMinutes(startDate.getMinutes() + startMinutes);

      const endDate = new Date(2000, 0, 1, 0, 0, 0);
      endDate.setMinutes(endDate.getMinutes() + endMinutes);

      this.startTime = startDate;
      this.endTime = endDate;
    },
    drawparticipant() {
      console.log("ben方法调用");
      let myChart = Echarts.init(document.getElementById("participant"));
      let option = {
        title: {
          text: "会议总体发言占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "bottom",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "李银胜" },
              { value: 580, name: "吴斌" },
              { value: 300, name: "赵一飞" },
              { value: 484, name: "姚鑫玉" },
              { value: 300, name: "王帅宇" },
              { value: 735, name: "包智超" },
              { value: 300, name: "王朔" },
              { value: 300, name: "苏永甫" },
              { value: 300, name: "谢万超" },
              { value: 300, name: "徐峥" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    formatDate(date) {
      const pad = (s) => (s < 10 ? '0' + s : s);
      var year = date.getFullYear();
      var month = pad(date.getMonth() + 1); // 月份是从0开始的
      var day = pad(date.getDate());
      var hour = pad(date.getHours());
      var minute = pad(date.getMinutes());
      var second = pad(date.getSeconds());
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    },
    handleStart(index, row) {
      row.start_time = this.formatDate(new Date())
      console.log(row)
      const path = '/api/updateProcess';
      axios.post(path, { form: row })
        .then(res => {
          console.log("开始时间设置成功")
        }).catch(error => {
          console.log("开始时间设置失败")
        });
    },
    handleEnd(index, row) {
      row.end_time = this.formatDate(new Date())
      console.log(row)
      const path = '/api/updateProcess';
      axios.post(path, { form: row })
        .then(res => {
          console.log("结束时间设置成功")
        }).catch(error => {
          console.log("结束时间设置失败")
        });
    },
    handleSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const rowspan = this.tableData.length;
        if (rowIndex === 0) {
          return {
            rowspan,
            colspan: 1,
          };
        }
        return { rowspan: 0, colspan: 0 };
      }
    },
    startEmotion() {
      mytimer2 = window.setInterval(this.timer2, 8000);
      this.ismotion = true;
    },
    stopEmotion() {
      window.clearInterval(mytimer2);
      this.ismotion = false;
    },
    startDesire() {
      timer = window.setInterval(this.desireTimer, 5000);
    },
    stopDesire() {
      window.clearInterval(timer);
    },
    desireTimer: function () {
      this.getDesireData();
    },
    timer2: function () {
      //写成timer()也可
      this.getData2();
      console.log("time"); //打印查看效果
    },
    getid() {
      const path = "/api/getId";
      axios
        .post(path, { name: this.pati })
        .then((res) => {
          var msg = res.data.id;
          this.id = msg;
          console.log(this.id);
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getDesireData() {
      var currentDate = new Date();
      var hour = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      var seconds = currentDate.getSeconds();
      var curtime = hour + ":" + minutes + ":" + seconds;
      this.new_time_data.push(curtime);
      curwang = Math.random();
      this.new_angry_data.push(curwang);
      curyao = Math.random();
      this.new_disgusted_data.push(curyao);
      this.yao = curyao;
      this.new_fearful_data.push(Math.random());
      this.new_happy_data.push(Math.random());
      this.new_sad_data.push(Math.random());
      this.new_surprised_data.push(Math.random());
      this.new_neutral_data.push(Math.random());
      this.drawGuestEmotion();
      this.itemkey = Math.random();
      this.tableData[0].desirein5 = this.judge(curwang);
      this.tableData[1].desirein5 = this.judge(curyao);
    },
    judge(desire) {
      if (desire >= 0.7) return "高";
      else if (desire <= 0.4) return "低";
      else return "一般";
    },
    getData2() {
      console.log("获取数据");
      // 设置对应python的接口，这里使用的是localhost:5000
      const path = "/api/getEmotionById";
      axios
        .post(path, { id: this.id })
        .then((res) => {
          if (res.data.success) {
            var msg = res.data.time;
            this.new_time_data.push(msg);
            msg = res.data.angry;
            this.new_angry_data.push(msg);
            msg = res.data.disgusted;
            this.new_disgusted_data.push(msg);
            msg = res.data.fearful;
            this.new_fearful_data.push(msg);
            msg = res.data.happy;
            this.new_happy_data.push(msg);
            msg = res.data.sad;
            this.new_sad_data.push(msg);
            msg = res.data.surprised;
            this.new_surprised_data.push(msg);
            msg = res.data.neutral;
            this.new_neutral_data.push(msg);
          }
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
      this.drawGuestEmotion();
      this.get_avg2();
      this.drawGuestEmotion2();
    },
    get_avg2() {
      const path = "/api/getEmotionById";
      axios
        .post(path, { id: this.id })
        .then((res) => {
          if (res.data.success) {
            var all =
              res.data.angry +
              res.data.disgusted +
              res.data.fearful +
              res.data.happy +
              res.data.sad +
              res.data.surprised +
              res.data.neutral;
            console.log(all);
            this.res2[0] = res.data.angry / all;
            this.res2[1] = res.data.disguested / all;
            this.res2[2] = res.data.fearful / all;
            this.res2[3] = res.data.happy / all;
            this.res2[4] = res.data.sad / all;
            this.res2[5] = res.data.surprised / all;
            this.res2[6] = res.data.neutral / all;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    drawGuestEmotion() {
      console.log(document.getElementById("drawGuestEmotion"));
      let myChart = Echarts.init(document.getElementById("drawGuestEmotion"));
      let option = {
        //画布背景色设置
        backgroundColor: "#f0caca",
        title: {
          text: "参会人员" + this.picture + "分析图",
          x: "center",
          // textStyle: {
          //   //设置主标题字体颜色
          //   color: "#90E5E7"
          // },
          // subtext: "这个是副标题"
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["分类一", "分类二"],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.new_time_data,
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              //y轴
              show: false,
            },
            axisTick: {
              //刻度线
              show: false,
            },
            splitLine: {
              //网格线
              show: true,
            },
          },
        ],
        series: [
          {
            name: "姚鑫玉",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            data: this.new_angry_data,
            itemStyle: {
              normal: {
                //柱形图圆角，顺时针左上，右上，右下，左下）
                barBorderRadius: [12, 12, 12, 12],
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#f75d5d",
                  },
                  {
                    offset: 1,
                    color: "#f0caca",
                  },
                ]),
              },
            },
          },
          {
            name: "王朔",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            //柱状图间距
            barGap: "200%",
            data: this.new_disgusted_data,
            itemStyle: {
              normal: {
                // 统一设置四个角的圆角大小
                barBorderRadius: 12,
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#5ad9e8",
                  },
                  {
                    offset: 1,
                    color: "#caecf0",
                  },
                ]),
              },
            },
          },
          {
            name: "王帅宇",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            //柱状图间距
            barGap: "200%",
            data: this.new_fearful_data,
            itemStyle: {
              normal: {
                // 统一设置四个角的圆角大小
                barBorderRadius: 12,
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#e8378f",
                  },
                  {
                    offset: 1,
                    color: "#caecf0",
                  },
                ]),
              },
            },
          },

          {
            name: "包智超",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            //柱状图间距
            barGap: "200%",
            data: this.new_happy_data,
            itemStyle: {
              normal: {
                // 统一设置四个角的圆角大小
                barBorderRadius: 12,
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#262fe8",
                  },
                  {
                    offset: 1,
                    color: "#caecf0",
                  },
                ]),
              },
            },
          },

          {
            name: "谢万超",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            //柱状图间距
            barGap: "200%",
            data: this.new_sad_data,
            itemStyle: {
              normal: {
                // 统一设置四个角的圆角大小
                barBorderRadius: 12,
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#e8a940",
                  },
                  {
                    offset: 1,
                    color: "#caecf0",
                  },
                ]),
              },
            },
          },

          {
            name: "徐峥",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            //柱状图间距
            barGap: "200%",
            data: this.new_surprised_data,
            itemStyle: {
              normal: {
                // 统一设置四个角的圆角大小
                barBorderRadius: 12,
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#3fe84c",
                  },
                  {
                    offset: 1,
                    color: "#caecf0",
                  },
                ]),
              },
            },
          },

          {
            name: "苏永甫",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            //柱状图间距
            barGap: "200%",
            data: this.new_neutral_data,
            itemStyle: {
              normal: {
                // 统一设置四个角的圆角大小
                barBorderRadius: 12,
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#cde8e0",
                  },
                  {
                    offset: 1,
                    color: "#caecf0",
                  },
                ]),
              },
            },
          },
        ],
      };
      //  使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.behaviorAnalysis-wrapper {
  height: 800px;
  margin: 20px;

  /*background: #E04147;*/
  .demo {
    height: 50%;
    /*background: aqua;*/
  }

  .bottom {
    margin-top: 20px;
    height: 300px;
    width: 100%;

    /*background: pink;*/
    .drawGuestEmotion,
    .drawGuestEmotion2 {
      height: 300px;
      /*background: #ff9001;*/
    }
  }
}
</style>
