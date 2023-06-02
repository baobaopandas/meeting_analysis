<template>
  <div class="timeAnalysis-wrapper">
    <div id="a" class="meetingRoomUsedAll"></div>
    <div class="bottom">
      <div id="meetingRoomUsedNear" class="meetingRoomUsedNear"></div>
      <div id="meetingRoomUsedNearAnalysic" v-loading="loading" class="meetingRoomUsedNearAnalysic"></div>
    </div>
  </div>
</template>

<script>
import Echarts from "echarts";
import Fetch from "mixins/fetch";
// import { dateFormate } from "@/utils";

export default {
  data() {
    return {
      res: ['1','2','3','4','5','6','7'],
      res2:['1','2','3','4','5','6','7'],
      res2name:['独白','对话','讨论','安静'],
      loading: true
    };
  },
  mixins: [Fetch],
  mounted(){
    // 会议室时间统计，总折线图
    this.drawMeetingRoomUsedAll();
    //会议室时间统计，近期圆饼图
    this.drawMeetingRoomUsedNear();
  },
  methods: {
    // 会议室时间统计，总折线图
    drawMeetingRoomUsedAll() {
      let meetingRoomUsedAllOption = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["小组实时状态分析"],
          orient: "vertical",
          left: "center"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "无聊","困惑","沮丧","愉悦","参与"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "小组实时状态分析",
            type: "line",
            data: [
              { value: this.res[0], name: " 无聊" },
              { value: this.res[1], name: " 困惑" },
              { value: this.res[2], name: "沮丧" },
              { value: this.res[3], name: "愉悦" },
              { value: this.res[4], name: "参与" },
            ]
          }
        ]
      };
      console.log(document.getElementById("a"));
      let drawMeetingRoomUsedAll = Echarts.init(
        document.getElementById("a")
      );
      drawMeetingRoomUsedAll.setOption(meetingRoomUsedAllOption);
    },
    // fetch_drawMeetingRoomUsedAll() {
    //   let res = ['1','2','3','4','5','6','7'];
    //   return res;
    //   //   return Ajax({
    //   //     method: 'GET',
    //   //     url: 'admin/statAllVistByHoursRange.action'
    //   //   });
    // },
    //会议室时间统计，近期圆饼图
    drawMeetingRoomUsedNear() {
      let nearSevenDays = [];
      for (let i = 0; i < this.res2name.length; i++) {
        nearSevenDays.push(this.res2name[i]);
      }
      console.log(this.res2name[2]);
      console.log(this.res2[2]);
      let meetingRoomUsedNearOption = {
        title: {
          text: "会议互动情况",
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
              // {
              //   value:this.res2[4],
              //   name: nearSevenDays[4]
              // },
              // {
              //   value: this.res2[5],
              //   name: nearSevenDays[5]
              // },
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
        document.getElementById("meetingRoomUsedNear")
      );
      drawMeetingRoomUsedNear.setOption(meetingRoomUsedNearOption);
      drawMeetingRoomUsedNear.on("mouseover", params => {
        this.loading = false;
        console.log(params.name);
        this.drawMeetingRoomUsedNearAnalysic(params.name);
      });
    },
    // 会议室时间统计，近期折线图
    drawMeetingRoomUsedNearAnalysic(name) {
      let meetingRoomUsedNearAnalysicOption = {
        title: {
          text: "实时会议互动情况",
          x: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["实时会议互动情况"],
          orient: "vertical",
          left: "center"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            '独白',
            '对话',
            '讨论',
            '安静',
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: name + "出现次数",
            type: "line",
            data: ['1','2','3','4','5','6','7'
            ]
          }
        ]
      };
      let drawMeetingRoomUsedNearAnalysic = Echarts.init(
        document.getElementById("meetingRoomUsedNearAnalysic")
      );
      drawMeetingRoomUsedNearAnalysic.setOption(
        meetingRoomUsedNearAnalysicOption
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.timeAnalysis-wrapper {
  height: 100%;
  margin: 10px;
  .meetingRoomUsedAll {
    width: 100%;
    height: 350px;
  }
  .bottom {
    margin-top: 20px;
    width: 100%;
    .meetingRoomUsedNear,
    .meetingRoomUsedNearAnalysic {
      display: inline-block;
      width: 50%;
      height: 350px;
    }
  }
}
</style>