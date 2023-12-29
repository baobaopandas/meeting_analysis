<template>
  <div class="visitorAnalysis-wrapper">
    <el-page-header @back="goBack" content="会议报告">
      第一次会议，3点到五点
    </el-page-header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <!--<el-menu-item index="1" @click="activeIndex = '1'">参会人员动作统计</el-menu-item>-->
      <el-menu-item index="1">会议总览</el-menu-item>
    </el-menu>
    <div class="visitorAnalysis-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>会议概况</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="meetingName" label="会议名称" width="180">
          </el-table-column>
          <el-table-column prop="meetingObjective" label="会议目标" width="180">
          </el-table-column>
          <el-table-column prop="organizer" label="会议组织者">
          </el-table-column>
          <el-table-column prop="host" label="会议主持人"> </el-table-column>
          <el-table-column prop="participants" label="会议参与者">
          </el-table-column>
          <el-table-column prop="scheduledTime" label="预定时间">
          </el-table-column>
          <el-table-column prop="onTimeStart" label="是否按时开始">
          </el-table-column>
          <el-table-column prop="onTimeEnd" label="是否按时结束">
          </el-table-column>
          <el-table-column prop="earlyDeparture" label="是否发生早退">
          </el-table-column>
          <el-table-column prop="lateArrival" label="是否发生迟到">
          </el-table-column>
          <el-table-column prop="absence" label="是否发生缺席">
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="box-card">
        <el-row>
          <el-col :span="10">
            <div slot="header" class="clearfix">
              <span>议程信息</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            <el-table :data="agendaData" border style="width: 100%">
              <el-table-column prop="schedule" label="预定议程" width="180">
              </el-table-column>
              <el-table-column
                prop="estimatedPercentage"
                label="预计占比"
                width="100"
              >
              </el-table-column>
              <el-table-column prop="actualPercentage" label="实际占比">
              </el-table-column>
              <el-table-column prop="scheduledTime" label="预计时间">
              </el-table-column>
              <el-table-column prop="actualTime" label="实际时间">
              </el-table-column>
              <el-table-column prop="bool" label="是否完成议程">
                <template slot-scope="scope">{{
                  scope.row.bool ? scope.row.bool : "√"
                }}</template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="14">
            <div
              id="drawagendapercent"
              class="drawagendapercent"
              style="width: 100%; height: 400px"
            >
              我的图在这里
            </div>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>发言参与统计(发言时长占比)</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
          <el-row>
            <el-col :span="12">
              <div
                id="participant"
                class="participant"
                style="width: 100%; height: 400px"
              ></div>
            </el-col>
            <el-col :span="12">
              <el-checkbox v-model="checked1">开场白</el-checkbox>
              <el-checkbox v-model="checked2">教师分享</el-checkbox>
              <el-checkbox v-model="checked2">欺诈检测</el-checkbox>
              <el-checkbox v-model="checked2">社区检测</el-checkbox>
              <el-checkbox v-model="checked2">施策仿真</el-checkbox>
              <el-checkbox v-model="checked2">会请分析</el-checkbox>
              <el-checkbox v-model="checked2">数字助教</el-checkbox>
              <el-checkbox v-model="checked2">结束语</el-checkbox>
              <div
                id="participantintopic"
                style="width: 100%; height: 400px"
              ></div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <!-- <span>情绪统计</span> -->
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
          <div id="sentimentAnalysis" style="width: 100%; height: 400px"></div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <!-- <span>行为统计</span> -->
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
          <!-- <el-checkbox v-model="checked1">发言行为</el-checkbox>
          <el-checkbox v-model="checked2">赞同行为</el-checkbox>
          <el-checkbox v-model="checked2">不赞同行为</el-checkbox>
          <el-checkbox v-model="checked2">中断失败</el-checkbox>
          <el-checkbox v-model="checked2">抱怨行为</el-checkbox> -->
          <div id="main" style="width: 100%; height: 550px"></div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>会议摘要</span>
          <el-button style="float: right; padding: 3px 0" type="text"
            >操作按钮</el-button
          >
        </div>
        会议讨论了腾讯会议插件及其开发难度，并强调了赋能和集成的重要性。参会人员还分享了上周的工作进展和技术指标，并讨论了技术指标的概念和算法指标的区别。在最后，参会人员就欺诈企业检测的质量问题进行了讨论和分析。
      </el-card>
    </div>
  </div>
</template>
<script>
import Echarts from "echarts";
import * as echarts from "echarts";
import dataTempA from "./data/EN2001a.A.json";
import dataTempB from "./data/EN2001a.B.json";
import dataTempC from "./data/EN2001a.C.json";
import dataTempD from "./data/EN2001a.D.json";
import dataTempE from "./data/EN2001a.E.json";
import alidata from "./data/alisegments.json";
let gstart = '0'
let gend = '100'
export default {
  components: {},
  data() {
    return {
      categories: ["A", "B", "C", "D", "E"],
      types: [
        { name: "A", color: "#7b9ce1" },
        { name: "B", color: "#bd6d6c" },
        { name: "C", color: "#75d874" },
        { name: "D", color: "#e0bc78" },
        { name: "E", color: "#dc77dc" },
      ],
      datatemp: [dataTempA, dataTempB, dataTempC, dataTempD, dataTempE],
      aliData: alidata,
      data: [],
      startTime: this.getTodayZeroTime(),
      tableData: [
        {
          date: "2023-08-23",
          meetingName: "电子商务实验室研讨班",
          meetingObjective: "研究成果分享",
          organizer: "李银胜",
          host: "包智超",
          participants: "吴斌、赵一飞、姚鑫玉、王帅宇",
          scheduledTime: "06:30 pm - 8:30 pm",
          onTimeStart: "是",
          onTimeEnd: "是",
          earlyDeparture: "否",
          lateArrival: "否",
          absence: "否",
        },
        // 添加更多的行，每行代表一个会议
      ],
      agendaData: [
        {
          schedule: "开场白",
          estimatedPercentage: "5.68%",
          actualPercentage: "6.25%",
          scheduledTime: "5",
          actualTime: "5",
        },
        {
          schedule: "外出调研分享",
          estimatedPercentage: "5.68%",
          actualPercentage: "10%",
          scheduledTime: "5",
          actualTime: "8",
        },
        {
          schedule: "供应链欺诈检测研究",
          estimatedPercentage: "18.75%",
          actualPercentage: "12%",
          scheduledTime: "15",
          actualTime: "15",
        },
        {
          schedule: "供应链施策仿真研究",
          estimatedPercentage: "12.5%",
          actualPercentage: "12%",
          scheduledTime: "15",
          actualTime: "10",
        },
        {
          schedule: "供应链社区欺诈检测研究",
          estimatedPercentage: "16.25%",
          actualPercentage: "12%",
          scheduledTime: "15",
          actualTime: "13",
        },
        {
          schedule: "会请分析",
          estimatedPercentage: "17.05%",
          actualPercentage: "16.25",
          scheduledTime: "15",
          actualTime: "13",
        },
        {
          schedule: "数字助教",
          estimatedPercentage: "17.05%",
          actualPercentage: "16.25",
          scheduledTime: "15",
          actualTime: "13",
        },
        {
          schedule: "结束语",
          estimatedPercentage: "3.41%",
          actualPercentage: "12%",
          scheduledTime: "3",
          actualTime: "3",
        },
        // 可以继续添加更多数据...
      ],
    };
  },
  mounted() {
    this.drawagendapercent();
    this.drawparticipant();
    this.drawparticipanintopic();
    this.drawsentimentAnalysis();
    this.generateMockData();
    this.initChart();
    console.log("方法调用");
  },
  methods: {
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
          height: height,
        },
        {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height,
        }
      );
      return (
        rectShape && {
          type: "rect",
          transition: ["shape"],
          shape: rectShape,
          style: api.style(),
        }
      );
    },
    //对话情况图表函数
    getTodayZeroTime() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today.getTime();
    },
    generateOneMockData(datatemp, index) {
      // ami 数据
      for (let i = 0; i < datatemp.length; i++) {
        let baseTime = this.startTime + Number(datatemp[i].start_time) * 1000;
        let typeItem = this.types[index];
        let duration = Math.round(
          (Number(datatemp[i].end_time) - Number(datatemp[i].start_time)) * 1000
        );
        let text = datatemp[i].sentences[0].text;
        this.data.push({
          name: typeItem.name + "@" + text,
          value: [index, baseTime, (baseTime += duration), duration],
          itemStyle: {
            normal: {
              color: typeItem.color,
            },
          },
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

        //  中断失败案例
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
        // console.log(baseTime,duration)
        //  同意、不同意、疑惑 案例
        this.data.push({
          name:"王帅宇@今天我想分享一下我最近在发言决策辅助管理工具方面的研究进展以及后续研究思路与计划，首先演示一下系统.....,以上就是我现在的研究内容和进展，大家有没有什么批评和建议。",
          value:[1,1694968467700, 1694968467700+300000,300000],
          type: '',
          itemStyle:this.types[alidata[i].spkr]
        })
      }
      console.log(this.data)
    },
    generateMockData() {
      // for (let i = 0; i < 5; i++) {
      //   this.generateOneMockData(this.datatemp[i], i);
      // }
      this.generateAliData(this.aliData)
    },
    drawagendapercent() {
      let myChart = Echarts.init(document.getElementById("drawagendapercent"));

      let option = {
        title: {
          text: "议程统计",
          subtext: "预定议程占比(88min)vs 实际议程占比(80min)",
          left: "400",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          data: [
            "rose1",
            "rose2",
            "rose3",
            "rose4",
            "rose5",
            "rose6",
            "rose7",
            "rose8",
          ],
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Radius Mode",
            type: "pie",
            radius: [20, 140],
            center: ["25%", "50%"],
            roseType: "angle",
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
              { value: 5, name: "开场白" },
              { value: 5, name: "外出调研分享" },
              { value: 15, name: "欺诈检测" },
              { value: 15, name: "施策仿真" },
              { value: 15, name: "欺诈社区检测" },
              { value: 15, name: "会请分析" },
              { value: 15, name: "数字助教" },
              { value: 3, name: "结束语" },
            ],
          },
          {
            name: "Area Mode",
            type: "pie",
            radius: [20, 140],
            center: ["75%", "50%"],
            roseType: "angle",
            itemStyle: {
              borderRadius: 5,
            },
            label: {
              show: false,
            },
            data: [
              { value: 5, name: "开场白" },
              { value: 8, name: "外出调研分享" },
              { value: 15, name: "欺诈检测" },
              { value: 10, name: "施策仿真" },
              { value: 13, name: "欺诈社区检测" },
              { value: 13, name: "会请分析" },
              { value: 13, name: "数字助教" },
              { value: 3, name: "结束语" },
            ],
          },
        ],
      };
      myChart.setOption(option);
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
    drawparticipanintopic() {
      console.log("ben方法调用");
      let myChart = Echarts.init(document.getElementById("participantintopic"));
      let option = {
        title: {
          text: "议程内发言占比",
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
              { value: 500, name: "李银胜" },
              { value: 300, name: "吴斌" },
              { value: 400, name: "赵一飞" },
              { value: 484, name: "姚鑫玉" },
              { value: 300, name: "王帅宇" },
              { value: 145, name: "包智超" },
              { value: 300, name: "王朔" },
              { value: 253, name: "苏永甫" },
              { value: 741, name: "谢万超" },
              { value: 300, name: "徐峥" },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    drawsentimentAnalysis() {
      let myChart = Echarts.init(document.getElementById("sentimentAnalysis"));
      let option = {
        title: {
          text: "会议情绪统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            "总体",
            "李银胜",
            "吴斌",
            "赵一飞",
            "姚鑫玉",
            "王帅宇",
            "包智超",
            "王朔",
            "苏永甫",
            "徐峥",
            "谢万超",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["0:00", "5:00", "10:00", "15:00", "20:00", "25:00", "30:00"],
        },
        yAxis: {
          type: "value",
          splitNumber: 2,
          axisLabel: {
            formatter: function (value) {
              if (value > 3) {
                return "高";
              } else if (value < 3) {
                return "低";
              } else {
                return "中";
              }
            },
          },
        },
        series: [
          {
            name: "总体",
            type: "line",
            data: [2, 3, 4, 1, 5, 3, 2],
          },
          {
            name: "李银胜",
            type: "line",
            data: [1, 2, 3, 4, 5, 2, 3],
          },
          {
            name: "吴斌",
            type: "line",
            data: [2, 4, 3, 1, 4, 6, 3],
          },
          {
            name: "姚鑫玉",
            type: "line",
            data: [2, 4, 3, 1, 4, 6, 3],
          },
          {
            name: "包智超",
            type: "line",
            data: [2, 4, 3, 1, 4, 6, 3],
          },
        ],
      };

      myChart.setOption(option);
    },
    initChart() {
      let chartDom = document.getElementById("main");
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
          position: "right",
          confine: true,
          extraCssText: "white-space: normal; word-break: break-all;",
          formatter: (params) => {
            return (
              params.marker +
              params.name.split("@")[0] +
              ": " +
              params.value[3] +
              " ms" +
              "<br/>" +
              params.name.split("@")[1]
            );
          },
        },
        title: {
          text: "", //主标题文本
          textStyle: {
            color: "#000000", //'red'，字体颜色
            fontStyle: "normal", //'italic'(倾斜) | 'oblique'(倾斜体) ，字体风格
            fontWeight: "bolder", //'bold'(粗体) | 'bolder'(粗体) | 'lighter'(正常粗细) ，字体粗细
            fontFamily: "sans-serif", //'sans-serif' | 'serif' | 'monospace' | 'Arial' | 'Courier New'
            // 'Microsoft YaHei'(微软雅黑) ，文字字体
            fontSize: 32, //字体大小
            lineHeight: 32, //字体行高
          },
          subtext: "参与者行为统计", //副标题文本
          subtextStyle: {
            fontStyle: "normal", //字体风格
            fontWeight: "normal", //字体粗细
            fontFamily: "sans-serif", //文字字体
            fontSize: 18, //字体大小
            lineHeight: 18, //字体行高
            align: "center", //'left' | 'right' ，文字水平对齐方式
            verticalAlign: "middle", //'top' | 'bottom' ，文字垂直对齐方式
          },
          left: "auto", //'5' | '5%'，title 组件离容器左侧的距离
          right: "auto", //'title 组件离容器右侧的距离
          top: "auto", //title 组件离容器上侧的距离
          bottom: "auto", //title 组件离容器下侧的距离
        },
        dataZoom: [
          {
            type: "slider",
            filterMode: "weakFilter",
            showDataShadow: false,
            top: 500,
            start:gstart,
            end: gend,
            labelFormatter: "",
          },
          {
            type: "inside",
            filterMode: "weakFilter",
          },
        ],
        grid: {
          top: 80, // 将 top 设置为 0，使图表顶部与容器顶部对齐
          bottom: 64, // 将 bottom 设置为 0，使图表底部与容器底部对齐
          left: 48, // 将 left 设置为 0，使图表左侧与容器左侧对齐
          right: 150,
        },
        xAxis: {
          min: this.startTime,
          scale: true,
          axisLabel: {
            formatter: (val) => {
              const date = new Date(val);
              const hours = date.getHours();
              const minutes = date.getMinutes();
              const seconds = date.getSeconds();
              const formattedTime = `${hours
                .toString()
                .padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
              return formattedTime;
            },
          },
        },
        yAxis: {
          data: this.categories,
        },
        legend:{
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
            data:[[1694968497700,'A']],
            symbolSize:50,
            symbol: 'image://'+require('../../assets/confuse.png')            
          },
          {
            name:'赞同',
            type: 'scatter',
            data:[[1694968598700,'D']],
            symbolSize:50,   
            symbol: 'image://'+require('../../assets/ok.png')        
          },
          {
            name:'不赞同',
            type: 'scatter',
            data:[[1694968677700,'C']],
            symbolSize:50,
            symbol: 'image://'+require('../../assets/notok.png')  
          },
        ],
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
  },
};
</script>

<style lang="scss" scoped>
.visitorAnalysis-wrapper {
  position: relative;
  .select {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
