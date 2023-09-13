<template>
  <div class="behaviorAnalysis-wrapper">
      <div id="main" style="width: 100%; height: 550px;"></div>
  </div>
</template>

<script>
// import Echarts from "echarts";
import * as echarts from 'echarts';
import dataTempA from './data/EN2001a.A.json'
import dataTempB from './data/EN2001a.B.json'
import dataTempC from './data/EN2001a.C.json'
import dataTempD from './data/EN2001a.D.json'
import dataTempE from './data/EN2001a.E.json'
// import {videoPlayer} from 'vue-video-player'
import 'vue-video-player/node_modules/video.js/dist/video-js.css'
export default {
  data() {
    return {
      //会议对话情况图表
      data: [],
      categories: ['A', 'B', 'C', 'D', 'E'],
      types: [
        { name: 'A', color: '#7b9ce1' },
        { name: 'B', color: '#bd6d6c' },
        { name: 'C', color: '#75d874' },
        { name: 'D', color: '#e0bc78' },
        { name: 'E', color: '#dc77dc' },
      ],
      startTime: this.getTodayZeroTime(),
      // Replace this with your actual data
      datatemp: [
        dataTempA,
        dataTempB,
        dataTempC,
        dataTempD,
        dataTempE
      ]
    };
  },
  created: function () {
  },
  mounted() {
    //初始化会议对话情况图表
    this.generateMockData();
    this.initChart();
  },
  computed: {},
  methods: {
    //对话情况图表函数
    getTodayZeroTime() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today.getTime();
    },
    generateOneMockData(datatemp, index) {
      for (let i = 0; i < datatemp.length; i++) {
        let baseTime = this.startTime + Number(datatemp[i].start_time) * 1000;
        let typeItem = this.types[index];
        let duration = Math.round(
          (Number(datatemp[i].end_time) - Number(datatemp[i].start_time)) * 1000
        );
        let text = datatemp[i].sentences[0].text;
        this.data.push({
          name: typeItem.name + '@' + text,
          value: [index, baseTime, (baseTime += duration), duration],
          itemStyle: {
            normal: {
              color: typeItem.color
            }
          }
        });
      }
    },
    generateMockData() {
      for (let i = 0; i < 5; i++) {
        this.generateOneMockData(this.datatemp[i], i)
      }
    },
    initChart() {
      let chartDom = document.getElementById('main');
      let myChart = echarts.init(chartDom);

      let option = {
        tooltip: {
          position: 'right',
          confine: true,
          extraCssText: 'white-space: normal; word-break: break-all;',
          formatter: params => {
            return (
              params.marker +
              params.name.split('@')[0] +
              ': ' +
              params.value[3] +
              ' ms' +
              '<br/>' +
              params.name.split('@')[1]
            );
          }
        },
        title: {
          text: "会议发言记录",//主标题文本
          textStyle: {
            color: '#000000',//'red'，字体颜色
            fontStyle: 'normal',//'italic'(倾斜) | 'oblique'(倾斜体) ，字体风格
            fontWeight: 'bolder',//'bold'(粗体) | 'bolder'(粗体) | 'lighter'(正常粗细) ，字体粗细
            fontFamily: 'sans-serif',//'sans-serif' | 'serif' | 'monospace' | 'Arial' | 'Courier New' 
            // 'Microsoft YaHei'(微软雅黑) ，文字字体
            fontSize: 32,//字体大小
            lineHeight: 32,//字体行高
          },
          subtext: "对整场会议对发言进行统计",//副标题文本
          subtextStyle: {
            fontStyle: 'normal',//字体风格
            fontWeight: 'normal',//字体粗细
            fontFamily: 'sans-serif',//文字字体
            fontSize: 18,//字体大小
            lineHeight: 18,//字体行高
            align: 'center',//'left' | 'right' ，文字水平对齐方式
            verticalAlign: 'middle',//'top' | 'bottom' ，文字垂直对齐方式
          },
          left: 'auto',//'5' | '5%'，title 组件离容器左侧的距离
          right: 'auto',//'title 组件离容器右侧的距离
          top: 'auto',//title 组件离容器上侧的距离
          bottom: 'auto',//title 组件离容器下侧的距离
        },
        dataZoom: [
          {
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 500,
            labelFormatter: ''
          },
          {
            type: 'inside',
            filterMode: 'weakFilter'
          }
        ],
        grid: {
          top: 80,  // 将 top 设置为 0，使图表顶部与容器顶部对齐
          bottom: 64,  // 将 bottom 设置为 0，使图表底部与容器底部对齐
          left: 48,  // 将 left 设置为 0，使图表左侧与容器左侧对齐
          right: 150
        },
        xAxis: {
          min: this.startTime,
          scale: true,
          axisLabel: {
            formatter: val => {
              const date = new Date(val);
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();
              const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
              return formattedTime;
            }
          }
        },
        yAxis: {
          data: this.categories
        },
        series: [
          {
            type: 'custom',
            renderItem: this.renderItem,
            itemStyle: {
              opacity: 0.8
            },
            encode: {
              x: [1, 2],
              y: 0
            },
            data: this.data
          }
        ]
      };

      option && myChart.setOption(option);
    },
    renderItem(params, api) {
      let categoryIndex = api.value(0);
      let start = api.coord([api.value(1), categoryIndex]);
      let end = api.coord([api.value(2), categoryIndex]);
      let height = api.size([0, 1])[1] * 0.5;
      let rectShape = echarts.graphic.clipRectByRect(
        {
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height
        },
        {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
        }
      );
      return (
        rectShape && {
          type: 'rect',
          transition: ['shape'],
          shape: rectShape,
          style: api.style()
        }
      );
    }
  }
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
    .drawGuestConcen,
    .drawGuestConcen2 {
      display: inline-block;
      width: 50%;
      height: 300px;
      /*background: #ff9001;*/
    }
  }

}
</style>
