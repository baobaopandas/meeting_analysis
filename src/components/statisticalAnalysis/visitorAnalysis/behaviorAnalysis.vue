<template>
  <div class="behaviorAnalysis-wrapper">
    <div class='demo'>
      <video id="videoElement" controls autoplay muted width="100%" height="400px"></video>
    </div>
    <!--<button @click="stopData">stop</button>-->
    <button v-if="!isaction" @click="startAction">
      动作检测开始
    </button>
    <button v-if="isaction" class="orange" @click="stopAction">
      Stop
    </button>
    <div class='bottom'>
      <div id="drawGuestBehave" class="drawGuestBehave" ></div>
      <div id="drawGuestBehave2" class="drawGuestBehave2"></div>
    <!--<div id="drawGuestBehaveAnalysic" v-loading="loading" class="drawGuestBehaveAnalysic"></div>-->
    </div>
  </div>
</template>

<script>
// import Echarts from "echarts";
import flvjs from 'flv.js'
import Fetch from "mixins/fetch";
import Echarts from "echarts";
import axios from 'axios';
// import {videoPlayer} from 'vue-video-player'
import 'vue-video-player/node_modules/video.js/dist/video-js.css'
var mytimer1;
export default {
  components: {
  // videoPlayer
  },
  props: {
    pati:{
      type: String
    }
  },
  watch:{
    pati(){
      this.getid();
    }
  },
  data() {
    return {
      res2:['0.12','0.15','0.16','0.57','5','6'],
      res2name:['喝奶茶','睡觉','玩手机','挥手','发言','学习'],
      loading: true,
      name:"",
      id:0,
      isaction:0,
      new_time_data:[],
      new_eatdrink_data:[],
      new_sleep_data:[],
      new_phone_data:[],
      new_rehand_data:[],
      new_calling_data:[],
      new_study_data:[],
    };
  },
  mixins: [Fetch],
  created:function() {
  },
  mounted() {
    // this.drawGuestBehave();
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById('videoElement')
      this.flvPlayer = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        hasAudio: false,
        // url: 'http://123.60.55.75:7001/live/movie.flv'
        // url: 'http://221.181.94.90:8090/live/129.flv',
        url: 'http://124.222.217.145:8090/live/154.flv'
      })
      this.flvPlayer.attachMediaElement(videoElement)
      this.flvPlayer.load()
      this.flvPlayer.play()
    }
    this.drawGuestBehave();
    this.drawGuestBehave2();
  },
  computed: {
  },
  methods: {
    startAction(){
      mytimer1 = window.setInterval(this.timer1,8000);
      this.isaction = true;
    },
    stopAction(){
      window.clearInterval(mytimer1)
      this.isaction = false;
    },
    timer1: function () {//写成timer()也可
      this.getData1();
    },
    getid(){
      const path = '/api/getId';
      axios.post(path,{name:this.pati}).then(res => {
        var msg = res.data.id;
        this.id = msg;
        console.log(this.id);
        console.log(res);
      }).catch(error => {
        console.error(error);
      });
    },
    getData1() {
      console.log("获取数据");
      // 设置对应python的接口，这里使用的是localhost:5000
      const path = '/api/getActionById';
      axios.post(path,{id: this.id}).then(res => {
        var msg = res.data.time;
        this.new_time_data.push(msg);
        msg = res.data.eatdrink;
        this.new_eatdrink_data.push(msg);
        msg = res.data.sleep;
        this.new_sleep_data.push(msg);
        msg = res.data.phone1;
        this.new_phone_data.push(msg);
        msg = res.data.rehand;
        this.new_rehand_data.push(msg);
        msg = res.data.calling;
        this.new_calling_data.push(msg);
        msg = res.data.study;
        this.new_study_data.push(msg);

        console.log(res);
      }).catch(error => {
        console.error(error);
      });
      this.drawGuestBehave();
      this.get_avg1();
      this.drawGuestBehave2();
    },
    get_avg1(){
      const path = '/api/getActionById';
      axios.post(path,{id: this.id}).then(res => {
        if(res.data.success){
          var all = res.data.eatdrink + res.data.sleep +res.data.phone1 + res.data.rehand +res.data.calling + res.data.study;
          this.res2[0] = res.data.eatdrink / all;
          this.res2[1] = res.data.sleep / all;
          this.res2[2] = res.data.phone1 / all;
          this.res2[3] = res.data.rehand / all;
          this.res2[4] = res.data.calling / all;
          this.res2[5] = res.data.study / all;
        }
      }).catch(error => {
        console.error(error);
      });
    },
    drawGuestBehave(){
      console.log(document.getElementById("drawGuestBehave"))
      let myChart = Echarts.init(document.getElementById("drawGuestBehave"));
      let option = {
        //画布背景色设置
        backgroundColor: "#f0caca",
        title: {
          text: "参会人员动作分析",
          x: "center",
          // textStyle: {
          //   //设置主标题字体颜色
          //   color: "#90E5E7"
          // },
          // subtext: "这个是副标题"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["分类一", "分类二"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.new_time_data,
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              //y轴
              show: false
            },
            axisTick: {
              //刻度线
              show: false
            },
            splitLine: {
              //网格线
              show: true
            }
          }
        ],
        series: [
          {
            name: "喝奶茶指数",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            data: this.new_eatdrink_data,
            itemStyle: {
              normal: {
                //柱形图圆角，顺时针左上，右上，右下，左下）
                barBorderRadius: [12, 12, 12, 12],
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#f75d5d"
                          },
                          {
                            offset: 1,
                            color: "#f0caca"
                          }
                        ]
                )
              }
            }
          },
          {
            name: "睡觉指数",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            data: this.new_sleep_data,
            itemStyle: {
              normal: {
                //柱形图圆角，顺时针左上，右上，右下，左下）
                barBorderRadius: [12, 12, 12, 12],
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#32e3f7"
                          },
                          {
                            offset: 1,
                            color: "#f0caca"
                          }
                        ]
                )
              }
            }
          },
          {
            name: "玩手机指数",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            data: this.new_phone_data,
            itemStyle: {
              normal: {
                //柱形图圆角，顺时针左上，右上，右下，左下）
                barBorderRadius: [12, 12, 12, 12],
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#e8a940"
                          },
                          {
                            offset: 1,
                            color: "#f0caca"
                          }
                        ]
                )
              }
            }
          },
          {
            name: "举手指数",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            data: this.new_rehand_data,
            itemStyle: {
              normal: {
                //柱形图圆角，顺时针左上，右上，右下，左下）
                barBorderRadius: [12, 12, 12, 12],
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#5360f7"
                          },
                          {
                            offset: 1,
                            color: "#f0caca"
                          }
                        ]
                )
              }
            }
          },
          {
            name: "呼喊指数",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            data: this.new_calling_data,
            itemStyle: {
              normal: {
                //柱形图圆角，顺时针左上，右上，右下，左下）
                barBorderRadius: [12, 12, 12, 12],
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#46f719"
                          },
                          {
                            offset: 1,
                            color: "#f0caca"
                          }
                        ]
                )
              }
            }
          },
          {
            name: "学习指数",
            type: "line",
            //设置柱状图宽度
            barWidth: "13",
            data: this.new_study_data,
            itemStyle: {
              normal: {
                //柱形图圆角，顺时针左上，右上，右下，左下）
                barBorderRadius: [12, 12, 12, 12],
                //设置柱状图颜色渐变
                color: new Echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: "#f72ff5"
                          },
                          {
                            offset: 1,
                            color: "#f0caca"
                          }
                        ]
                )
              }
            }
          }
        ]
      };
      //  使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawGuestBehave2(){
      let nearSevenDays = [];
      for (let i = 0; i < this.res2name.length; i++) {
        nearSevenDays.push(this.res2name[i]);
      }
      console.log(this.res2name[2]);
      console.log(this.res2[2]);
      let meetingRoomUsedNearOption = {
        backgroundColor: "#87CEFA",
        title: {
          text: "参会人员行为分类指数",
          x: "center"
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: nearSevenDays
        },
        series: [
          {
            name: "数量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: this.res2[0],
                name: nearSevenDays[0]
              },
              {
                value: this.res2[1],
                name: nearSevenDays[1]
              },
              {
                value: this.res2[2],
                name: nearSevenDays[2]
              },
              {
                value: this.res2[3],
                name: nearSevenDays[3]
              },
              {
                value:this.res2[4],
                name: nearSevenDays[4]
              },
              {
                value: this.res2[5],
                name: nearSevenDays[5]
              },
              // {
              //   value: this.res2[6],
              //   name: nearSevenDays[6]
              // }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      let drawMeetingRoomUsedNear = Echarts.init(
              document.getElementById("drawGuestBehave2")
      );
      drawMeetingRoomUsedNear.setOption(meetingRoomUsedNearOption);
      // drawMeetingRoomUsedNear.on("mouseover", params => {
      //   this.loading = false;
      //   console.log(params.name);
      //   this.drawMeetingRoomUsedNearAnalysic(params.name);
      // });
    }
    // 访客行为统计，圆饼图
  //   drawGuestBehave() {
  //     // this.$_fetch_drawGuestBehave({ day: +this.visitorTime }).then(res => {
  //     let guestBehaveOption = {
  //       title: {
  //         text: "该参会人员行为分析",
  //         x: "center"
  //       },
  //       tooltip: {
  //         trigger: "item",
  //         // formatter: "{a} <br/>{b} : {c} ({d}%)"
  //       },
  //       legend: {
  //         orient: "vertical",
  //         left: "left",
  //         data: ["培训会", "例会", "节日活动", "学术报告", "招待会", "其他"]
  //       },
  //       series: [
  //         {
  //           name: "数量",
  //           type: "pie",
  //           radius: "55%",
  //           center: ["50%", "60%"],
  //           data: [
  //             { value: res[1], name: "培训会" },
  //             { value: res[2], name: "例会" },
  //             { value: res[3], name: "节日活动" },
  //             { value: res[4], name: "学术报告" },
  //             { value: res[5], name: "招待会" },
  //             { value: res[0], name: "其他" }
  //           ],
  //           itemStyle: {
  //             emphasis: {
  //               shadowBlur: 10,
  //               shadowOffsetX: 0,
  //               shadowColor: "rgba(0, 0, 0, 0.5)"
  //             }
  //           }
  //         }
  //       ]
  //     };
  //     let drawGuestBehave = Echarts.init(
  //       document.getElementById("drawGuestBehave")
  //     );
  //     drawGuestBehave.setOption(guestBehaveOption);
  //     drawGuestBehave.on("mouseover", params =>
  //       this.drawGuestBehaveAnalysic(params.name)
  //     );
  //     // });
  //   },
  //   // 访客行为统计，柱形图
  //   drawGuestBehaveAnalysic(name) {
  //     this.loading = false;
  //     this.$_fetch_drawGuestBehaveAnalysic({
  //       tagName: name,
  //       day: +this.visitorTime
  //     }).then(res => {
  //       let guestName = [];
  //       let guestTimes = [];
  //       for (var i = 0; i < res.length - 1; i++) {
  //         guestName.push(res[i].key);
  //         guestTimes.push(res[i].value);
  //       }
  //       let guestBehaveAnalysicOption = {
  //         title: {
  //           text: "访问量前5的访客",
  //           x: "center"
  //         },
  //         tooltip: {
  //           trigger: "axis",
  //           axisPointer: {
  //             // 坐标轴指示器，坐标轴触发有效
  //             type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
  //           }
  //         },
  //         grid: {
  //           left: "3%",
  //           right: "4%",
  //           bottom: "3%",
  //           containLabel: true
  //         },
  //         xAxis: [
  //           {
  //             type: "category",
  //             data: guestName,
  //             axisTick: {
  //               alignWithLabel: true
  //             }
  //           }
  //         ],
  //         yAxis: [
  //           {
  //             type: "value"
  //           }
  //         ],
  //         series: [
  //           {
  //             name: "访问次数",
  //             type: "bar",
  //             barWidth: "20%",
  //             data: guestTimes,
  //             itemStyle: {
  //               normal: {
  //                 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
  //                 color: function(params) {
  //                   var colorList = [
  //                     "#878787",
  //                     "#A4D3EE",
  //                     "#836FFF",
  //                     "#63B8FF",
  //                     "#5CACEE"
  //                   ];
  //                   return colorList[params.dataIndex];
  //                 }
  //               },
  //               //鼠标悬停时：
  //               emphasis: {
  //                 shadowBlur: 10,
  //                 shadowOffsetX: 0,
  //                 shadowColor: "rgba(0, 0, 0, 0.5)"
  //               }
  //             }
  //           }
  //         ]
  //       };
  //       let drawGuestBehaveAnalysic = Echarts.init(
  //         document.getElementById("drawGuestBehaveAnalysic")
  //       );
  //       drawGuestBehaveAnalysic.setOption(guestBehaveAnalysicOption);
  //     });
  //   }
  // },
  // watch: {
  //   visitorTime() {
  //     this.drawGuestBehave();
  //     this.loading = true;
  //   }
  }
};
</script>

<style lang="scss" scoped>
.behaviorAnalysis-wrapper {
  height: 800px;
  margin: 20px;
  /*background: #E04147;*/
  .demo {
    height:50%;
    /*background: aqua;*/
  }
  .bottom{
    margin-top: 20px;
    height:300px;
    width:100%;
    /*background: pink;*/
    .drawGuestBehave,
    .drawGuestBehave2{
      display: inline-block;
      width: 50%;
      height: 300px;
      /*background: #ff9001;*/


    }
  }

}
</style>
