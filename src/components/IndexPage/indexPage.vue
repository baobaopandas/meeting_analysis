<template>
  <div class="indexPage-wrapper">
    <div class="welcome-wrapper">
      <span class="userDuty">管理人员</span>
      <span class="welcome">线下参会人员专注度分析管理平台欢迎您！</span>
    </div>
    <div class="graphicDisplay">
      <div id="useOfTheLastSevenYears" class="useOfTheLastSevenYears"></div>
    </div>
  </div>
</template>

<script>
import Echarts from "echarts";
import Fetch from "mixins/fetch";

export default {
  components: {},
  props: {},
  data() {
    return {
      theLastSevenYearsData: {
        sevenYears: [],
        sevenYearsData: [],
        cancelReservation: [],
        breakReservation: []
      }
    };
  },
  mixins: [Fetch],
  created() {},
  mounted() {
    // 近七年会议室图表
    let useOfTheLastSevenYears = Echarts.init(
      document.getElementById("useOfTheLastSevenYears")
    );
    // 获取近七年会议室使用数据
    Promise.all([
      this.$_fetch_visitReservation(),
      this.$_fetch_cancelReservation(),
      this.$_fetch_breakReservation()
    ])
      .then(res => {
        console.log(res);
        for (let i = 0; i < res[0].length; i++) {
          this.theLastSevenYearsData.sevenYears.push(res[0][i].key);
        }
        this.theLastSevenYearsData.sevenYearsData = res[0];
        this.theLastSevenYearsData.cancelReservation = res[1];
        this.theLastSevenYearsData.breakReservation = res[2];
        let lastSevenYearsOption = {
          color: ["#003366", "#4cabce", "#e5323e"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {
            left: "3%",
            right: "3%",
            bottom: "5%",
            containLabel: true
          },
          title: {
            text: "近七年使用情况"
          },
          legend: {
            data: ["会议室使用次数", "取消预约次数", "爽约次数"]
          },
          xAxis: {
            type: "category",
            data: this.theLastSevenYearsData.sevenYears
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "会议室使用次数",
              type: "bar",
              data: this.theLastSevenYearsData.sevenYearsData,
              barGap: "10%",
              barCategoryGap: "60%",
              animation: false,
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              }
            },
            {
              name: "爽约次数",
              type: "bar",
              data: this.theLastSevenYearsData.cancelReservation,
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              }
            },
            {
              name: "取消预约次数",
              type: "bar",
              data: this.theLastSevenYearsData.breakReservation,
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" }
                ]
              }
            }
          ]
        };
        useOfTheLastSevenYears.setOption(lastSevenYearsOption);
      })
      .catch(err => {
        console.log(err);
      });
  },
  destroyed() {},
  computed: {},
  methods: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.indexPage-wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .welcome-wrapper {
    border-left: 5px solid #009688;
    background: #f2f2f2;
    height: 75px;
    line-height: 24px;
    padding: 15px;
    .userDuty {
      display: block;
      color: #ff5722;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .graphicDisplay {
    margin-top: 15px;
    width: 100%;
    padding: 15px;
    .useOfTheLastSevenYears {
      height: 300px;
    }
  }
}
</style>