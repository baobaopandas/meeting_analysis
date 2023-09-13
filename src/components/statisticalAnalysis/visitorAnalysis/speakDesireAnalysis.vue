<template>
  <div class="behaviorAnalysis-wrapper">
    <div class="demo">
      <video
        id="videoElement"
        controls
        autoplay
        muted
        width="100%"
        height="400px"
      ></video>
    </div>
    <button v-if="!ismotion" @click="startDesire">情感检测开始</button>
    <button v-if="ismotion" class="orange" @click="stopEmotion">Stop</button>
    <div class="bottom">
      <el-row>
        <el-col :span="12">
          <div id="drawGuestEmotion" class="drawGuestEmotion"></div>
          <el-table
            :data="topicData"
            style="width: 100%"
            border
            :row-class-name="tableRowClassName"
          >
            <el-table-column prop="topicName" label="分享主题" width="180">
            </el-table-column>
            <el-table-column prop="people" label="主讲人" width="100">
            </el-table-column>
            <el-table-column prop="role" label="角色" width="100">
            </el-table-column>
            <el-table-column prop="state" label="主题状态" width="100">
              <template scope="scope">
                <span>{{ scope.row.state===0?'未开始':(scope.row.state===1?'进行中':'已结束')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="start_time" label="开始时间" width="100">
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间" width="100">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  v-show="scope.row.state===0"
                  @click="handleStart(scope.$index, scope.row)"
                  >开始</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  v-show="scope.row.state===1"
                  @click="handleEnd(scope.$index, scope.row)"
                  >结束</el-button>
                <el-button v-show="scope.row.state===2" type="success" icon="el-icon-check" circle size="mini"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            :data="tableData"
            style="width: 100%"
            border
            :row-class-name="tableRowClassName"
            caption="表达欲望"
          >
            <!-- <el-table-column prop="topic" label="当前主题" width="80">
            </el-table-column> -->
            <el-table-column prop="name" label="姓名" width="80">
            </el-table-column>
            <!-- <el-table-column prop="percent" label="说话占比"  width="100">
              <template slot-scope="scope">{{scope.row.percent?scope.row.percent:'0'}}</template>
            </el-table-column> -->
            <el-table-column prop="engagement" label="发言参与度" width="100">
              <template slot-scope="scope">{{scope.row.engagement?scope.row.engagement:'0'}}</template>
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
              <el-table-column label="不赞成" prop="desirein4" width="100"></el-table-column>
              <el-table-column prop="desirein5" label="表达欲望指数">
              </el-table-column>
              <el-table-column prop="desirein6" label="表达欲望排序">
              </el-table-column>
          </el-table>
          <!-- <div>
    <el-slider v-model="sliderValue" range :min="0" :max="120" :step="1" @change="updateTime"></el-slider>
    <el-row>
      <el-col :span="12">
        <el-time-picker v-model="startTime" :picker-options="pickerOptions" placeholder="开始时间"></el-time-picker>
      </el-col>.,,
      <el-col :span="12">
        <el-time-picker v-model="endTime" :picker-options="pickerOptions" placeholder="结束时间"></el-time-picker>
      </el-col>
    </el-row>
  </div> -->
        </el-col>
      </el-row>
    </div>
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
var mytimer2;
var timer;
var curwang = 2.36;
var curyao = 1.24;
var currentTopic = "会议未开始";
export default {
  components: {
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
      sliderValue: [0, 120], // 默认滑块范围是0到120
      startTime: new Date(2000, 0, 1, 0, 0, 0), // 起始时间，默认为 00:00:00
      endTime: new Date(2000, 0, 1, 2, 0, 0), // 结束时间，默认为 02:00:00
      pickerOptions: {
        start: '00:00',
        step: '00:01',
        end: '02:00'
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
          desirein3:2,
          desirein4:3,
          desirein5: curwang,
          desirein6:1
        },
        {
          topic: currentTopic,
          name: "吴斌",
          percent: "10%",
          engagement: "60",
          sentiment: "中性",
          lastspeak: "5分钟前",
          interrupt: 1,
          desirein3:1,
          desirein4:2,
          desirein5: curyao,
          desirein6:2
        },
        {
          topic: currentTopic,
          name: "姚鑫玉",
        },
        {
          topic: currentTopic,
          name: "王帅宇",        },
        {
          topic: currentTopic,
          name: "王朔",        },
        {
          topic: currentTopic,
          name: "包智超",        },
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
        }
      ],
      topicData: [
        {
          topicName: "开场白",
          people: "苏永甫",
          role: "学生/主持人",
          state: 0, // 0，未开始，1，进行中，2，已结束
          start_time: 0,
          end_time: 0,
        },
        {
          topicName: "外出调研分享",
          people: "李银胜",
          role: "教师/组织者",
          state: 0, // 0，未开始，1，进行中，2，已结束
          start_time: 0,
          end_time: 0,
        },
        {
          topicName: "供应链金融欺诈检测研究",
          people: "吴斌",
          role: "博士/参与者",
          state: 0, // 0，未开始，1，进行中，2，已结束
          start_time: 0,
          end_time: 0,
        },
        {
          topicName: "供应链施策仿真",
          people: "王朔",
          role: "硕士/参与者",
          state: 0, // 0，未开始，1，进行中，2，已结束
          start_time: 0,
          end_time: 0,
        },
        {
          topicName: "会议结束语",
          people: "苏永甫",
          role: "学生/主持人",
          state: 0, // 0，未开始，1，进行中，2，已结束
          start_time: 0,
          end_time: 0,
        },
      ],
    };
  },
  mixins: [Fetch],
  created: function () {},
  mounted() {
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
    handleStart(index,row){
      row.state = 1
      var currentDate = new Date();
      var hour = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      var seconds = currentDate.getSeconds()
      row.start_time = hour + ":" + minutes + ":" + seconds;
      currentTopic = row.topicName
      this.tableData[0].topic = currentTopic

    },
    handleEnd(index,row){
      row.state = 2
      var currentDate = new Date();
      var hour = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      var seconds = currentDate.getSeconds()
      row.end_time = hour + ":" + minutes + ":" + seconds;
      this.tableData[0].topic = '转场'
      if(index===this.topicData.length-1)
        {
          this.$message({
          message: '本次会议成功结束',
          type: 'success'
        });
        }

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
          text: "参会人员"+this.picture+"分析图",
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
