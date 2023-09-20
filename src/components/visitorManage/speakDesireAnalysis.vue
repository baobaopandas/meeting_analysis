<template>
  <div class="behaviorAnalysis-wrapper">
      <div id="main" style="width: 100%; height: 450px;"></div>
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
import alidata from "./data/alisegments.json";
// import {videoPlayer} from 'vue-video-player'
import 'vue-video-player/node_modules/video.js/dist/video-js.css'
export default {
  data() {
    return {
      //会议对话情况图表
      data: [],
      categories: ['A', 'B', 'C', 'D', 'E'],
      aliData: alidata,
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
    generateAliData(alidata) {
      for (let i = 0; i < alidata.length; i++) {
        let baseTime = this.startTime + alidata[i].stime * 1000;
        let typeItem = this.types[alidata[i].spkr];
        let duration = Math.round(alidata[i].etime *1000 - alidata[i].stime * 1000);
        let text = alidata[i].text;
        let  type = '';

        // //  中断失败案例
        // if(alidata[i].text==='那，那也。') 
        //   {type = '中断失败'
        //     console.log(baseTime,duration)
        //   }
          

        this.data.push({
          name: typeItem.name + "@" + text,
          value: [alidata[i].spkr, baseTime, (baseTime += duration), duration],
          type:type,
          percentStart: alidata[i].stime/2067.7,
          percentEnd: alidata[i].etime/2067.7,
          itemStyle: {
            normal: {
              color: typeItem.color,
            },
          },
        });
        console.log(baseTime,duration)
        //  同意、不同意、疑惑 案例
      }
    },
    generateMockData() {
      // for (let i = 0; i < 5; i++) {
      //   this.generateOneMockData(this.datatemp[i], i)
      // }
      this.generateAliData(this.aliData)
    },
    initChart() {
      let chartDom = document.getElementById('main');
      let myChart = echarts.init(chartDom);

      const labelOption = {
        show: true,
        rotate: 0,
        formatter: function(params) {
          // 根据数据中的 type 字段来设置标签值
          let type = params.data.type;
          return type;
        },
        fontSize: 16,
        color: '#FF0000',
        rich: {
          name: {}
        }
      };

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
        dataZoom: [
          {
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            start: 17.09,
            end: 17.60,
            top: 400,
            labelFormatter: '',
            zoomLock: true,
          },
          {
            type: 'inside',
            filterMode: 'weakFilter'
          }
        ],
        grid: {
          top: 100,  // 将 top 设置为 0，使图表顶部与容器顶部对齐
          bottom: 64,  // 将 bottom 设置为 0，使图表底部与容器底部对齐
          left: 17,  // 将 left 设置为 0，使图表左侧与容器左侧对齐
          right: 15
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
        legend:{
          show:true,
          top:60,
          data:['会议转录','疑惑','赞同','不赞同','中断失败']
        },
        series: [
          {
            name:'会议转录',
            type: "custom",
            renderItem: this.renderItem,
            label: labelOption,
            itemStyle: {
              opacity: 0.8,
            },
            encode: {
              x: [1, 2],
              y: 0,
            },
            data: this.data,
          },
          {
            name:'中断失败',
            type: 'scatter',
            data:[[1695139566100,'C']],
            symbolSize:50,
            symbol: 'image://'+require('../../assets/举手发言.png')            
          },
          {
            name:'疑惑',
            type: 'scatter',
            data:[[1695141310700,'A'],[1695141310000,'B']],
            symbolSize:50,
            symbol: 'image://'+require('../../assets/confuse.png')            
          },
          {
            name:'赞同',
            type: 'scatter',
            data:[[1695141300000,'D']],
            symbolSize:50,   
            symbol: 'image://'+require('../../assets/ok.png')        
          },
          {
            name:'不赞同',
            type: 'scatter',
            data:[[1695141305000,'C']],
            symbolSize:50,
            symbol: 'image://'+require('../../assets/no.png')  
          },
        ]
      };

      option && myChart.setOption(option);
      myChart.on('click', function (params) {
          console.log(params);
          if(params.componentSubType === 'scatter')
          {
            myChart.setOption({
              dataZoom: [
          {
            type: "slider",
            filterMode: "weakFilter",
            showDataShadow: false,
            top: 500,
            start:'15.42',
            end: '15.6',
            labelFormatter: "",
          },
          {
            type: "inside",
            filterMode: "weakFilter",
          },
        ],
            })
          }
      });
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
