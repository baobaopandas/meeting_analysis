<template>
    <div class="container">
        <div class="left-column">
            <div class="metrics-container">
                <div class="metric">
                    <div class="metric-title">Score</div>
                    <div class="metric-value">{{this.score}}</div>
                    <div class="metric-chart" ref="scoreChartContainer"></div>
                    <el-button @click="explainscore()">
                        查看得分原因及建议
                    </el-button>

                </div>
                <div class="metric">
                    <div class="metric-title">Engagement</div>
                    <div class="metric-value">{{this.engagement}}</div>
                    <div class="metric-chart" ref="engagementChartContainer"></div>
                    <el-button @click="wangluo()">
                        查看信息详细流向图
                    </el-button>
                </div>
                <div class="metric">
                    <div class="metric-title">Sentiment</div>
                    <div class="metric-value">{{this.sentiment}}</div>
                    <div class="metric-chart" ref="sentimentChartContainer"></div>
                </div>
            </div>
            <div class="summary-container">
                <div class="section-title">Summary</div>
                <div class="summary-text">
                    {{this.summary}} 
                 </div>
            </div>
            <div class="chapter-container">
                <div class="section-title">Chapter</div>
                <div class="chapter">
                    <div class="chapter-title">Chapter 1</div>
                    <div class="chapter-text">
                        {{ this.chapter1 }}
                    </div>
                </div>
                <div class="chapter">
                    <div class="chapter-title">Chapter 2</div>
                    <div class="chapter-text">
                        {{ this.chapter2 }}
                    </div>
                </div>
                <div class="chapter">
                    <div class="chapter-title">Chapter 3</div>
                    <div class="chapter-text">
                        {{ this.chapter3 }}
                    </div>
                </div>
                <!-- <div class="chapter">
                    <div class="chapter-title">Chapter 4</div>
                    <div class="chapter-text">
                        {{ this.chapter4 }}
                    </div>
                </div>
                <div class="chapter">
                    <div class="chapter-title">Chapter 5</div>
                    <div class="chapter-text">
                        {{ this.chapter5 }}
                    </div>
                </div>
                <div class="chapter">
                    <div class="chapter-title">Chapter 6</div>
                    <div class="chapter-text">
                        {{ this.chapter6 }}
                    </div>
                </div> -->
            </div>

            
            <div class="chapter-container" style="margin-top:20px">
                <div class="section-title">Speak Willing Summary</div>
                <div class="chapter">
                    <div class="chapter-title"></div>
                    <div class="chapter-text">
在会议方面，会议整体发言欲望得分为8.3较高。其中在谈到健康话题时总体的发言欲望升高，在谈到学校工作话题时总体的发言欲望降低。 在参与个人方面，王朔近几次会议积极参与讨论，发言欲望较高。徐峥连续三次会议发言欲望持续低迷，建议采取干预措施

                    </div>
                </div>
            </div>

        </div>

        <div class="right-column">
            <div class="video-container">
                <video ref="videoPlayer" controls autoplay muted class="flv-player"></video>
                <!-- FLV.js player -->
            </div>
            <div class="highlights-container">
                <div class="highlight">
                    <div class="highlight-text">Highlight 1</div>
                    <div class="highlight-video">
                        <div class = "highlight-keyword">{{ this.highlight1  }}
                        </div>
                        <div class = "highlight-video-small">
                            <video ref="highlight1Player" controls autoplay muted class="flv-player-small"></video>
                        </div>
                        <!-- FLV.js player -->
                    </div>
                </div>
                <div class="highlight">
                    <div class="highlight-text">Highlight 2</div>
                    <div class="highlight-video">
                        <div class = "highlight-keyword">{{ this.highlight2  }}
                        </div>
                        <div class = "highlight-video-small">
                            <video ref="highlight2Player" controls autoplay muted class="flv-player-small"></video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <el-dialog :visible.sync="dialogVisible" title="Some Title" width="50%">
      <div class="content">
        <p>{{ reason1 }}</p>
        <p>{{ reason2 }}</p>
        <p>{{ reason3 }}</p>
        <p>{{ tips }}</p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    </div>

</template>

<script>
    import Echarts from "echarts";
    import flvjs from 'flv.js';
    import axios from 'axios';
    export default {
        data() {
            return {
                theme:"",
                score: 0,
                engagement: 0,
                sentiment: 'unknown',
                summary: '',
                chapter2:"",
                chapter3:"",
                chapter4:"",
                chapter5:"",
                chapter6:"",
                reason1:"",
                reason2:"",
                reason3:"",
                tips:"",
                highlight1:"",
                highlight2:"",
                highlight3:"",
                highlight1url:"",
                highlight2url:"",
                highlight3url:"", 
                videoSrc: '', 
                dialogVisible: false,

            };
        },
        mounted() {
            // this.initChart();
            // this.generateChartData(); // 渲染折线图
            // this.generateCharts();
            const theme = this.$route.query.meeting;
            this.theme = theme;
            console.log(theme);
            this.getdata();//初始化数据
            // this.initVideoPlayer(); // 初始化视频播放器
        },
        methods: {
            //大半夜产物，后君莫学我
            getdata(){
                const path = '/api/getmeetinginfobytheme';
                axios.post(path,{theme: this.theme}).then(res => {
                    this.score = res.data.reslist[0].score;
                    this.engagement = res.data.reslist[0].engagement;
                    this.sentiment = res.data.reslist[0].sentiment;
                    this.summary = res.data.reslist[0].summary;
                    this.chapter1 = res.data.reslist[0].chapter1;
                    this.chapter2 = res.data.reslist[0].chapter2;
                    this.chapter3 = res.data.reslist[0].chapter3;
                    this.chapter4 = res.data.reslist[0].chapter4;
                    this.chapter5 = res.data.reslist[0].chapter5;
                    this.chapter6 = res.data.reslist[0].chapter6;
                    this.reason1 = res.data.reslist[0].reason1;
                    this.reason2 = res.data.reslist[0].reason2;
                    this.reason3 = res.data.reslist[0].reason3;
                    this.tips = res.data.reslist[0].tips;
                    this.highlight1 = res.data.reslist[0].highlight1;
                    this.highlight2 = res.data.reslist[0].highlight2;
                    this.highlight3 = res.data.reslist[0].highlight3;
                    this.highlight1url = res.data.reslist[0].highlight1url;
                    this.highlight2url = res.data.reslist[0].highlight2url;
                    this.highlight3url = res.data.reslist[0].highlight3url;
                    this.videoSrc = res.data.reslist[0].url;
                    this.initVideoPlayer(); // 初始化视频播放器
                }).catch(error => {
                    console.error(error);
                });

            },
            generateCharts() {
                const scoreChartContainer = this.$refs.scoreChart;
                const engagementChartContainer = this.$refs.engagementChart;
                const sentimentChartContainer = this.$refs.sentimentChart;

                this.generateChart(scoreChartContainer);
                this.generateChart(engagementChartContainer);
                this.generateChart(sentimentChartContainer);
            },
            generateChart(container) {
                const chart = Echarts.init(container);
                const data = [];
                for (let i = 0; i < 10; i++) {
                    data.push(Math.random() * 0.2 + 0.4);
                }
                const option = {
                    grid:{
                        top:'10%',
                        bottom:'10%',
                        left:'10%',
                        right:'10%'
                    },
                    xAxis: {
                        show: false
                    },
                    yAxis: {
                        show: false
                    },
                    series: [
                        {
                            type: 'line',
                            data: data,
                            smooth: 0.5,
                            lineStyle: {
                                color: 'rgba(200, 160, 220, 0.7)'
                            },

                            areaStyle: {
                                color: 'rgba(200, 160, 220, 0.3)'
                            }
                        }
                    ]
                };
                chart.setOption(option);
            },
            initVideoPlayer() {
                // 使用 flv.js 播放视频
                const videoPlayer = this.$refs.videoPlayer;
                const  highlight1Player = this.$refs.highlight1Player;
                const  highlight2Player = this.$refs.highlight2Player;
                if (flvjs.isSupported()) {
                    console.log(this.videoSrc);
                    const flvPlayer = flvjs.createPlayer({
                        type: 'mp4',
                        url: this.videoSrc
                    });
                    const flvPlayer1 = flvjs.createPlayer({
                        type: 'mp4',
                        url: this.highlight1url
                    });
                    const flvPlayer2 = flvjs.createPlayer({
                        type: 'mp4',
                        url: this.highlight2url
                    });
                    flvPlayer.attachMediaElement(videoPlayer);
                    flvPlayer1.attachMediaElement(highlight1Player);
                    flvPlayer2.attachMediaElement(highlight2Player);
                    flvPlayer.load();
                    flvPlayer1.load();
                    flvPlayer2.load();
                }
            },
            wangluo(){
                this.$router.push('/3d');
            },
            explainscore(){
                this.dialogVisible = true;
            },
        }
    };
</script>

<style scoped>
    .container {
        display: flex;
    }

    .left-column {
        flex: 7;
        padding: 20px;
    }

    .right-column {
        flex: 3;
        padding: 20px;
    }

    .metrics-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .metric {
        flex-basis: 30%;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        text-align: center;
    }

    .metric-title {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .metric-value {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .metric-chart {
        height: 100px;
    }

    .summary-container {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
    }

    .section-title {
        font-weight: bold;
        margin-bottom: 10px;
    }

    .summary-text {
        color: #555;
    }

    .chapter-container {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px;
    }

    .chapter {
        margin-bottom: 15px;
    }

    .chapter-title {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .chapter-text {
        color: #555;
    }

    .video-container {
        border: 1px solid #ccc;
        border-radius: 8px;
        height: 300px;
        margin-bottom: 20px;
    }
    .flv-player {
        width: 100%;
        max-width: 800px;
    }
    .flv-player-small {
        width: 100%;
        max-width: 150px;
    }

    .highlights-container {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px;
    }

    .highlight {
        margin-bottom: 15px;
    }

    .highlight-text {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .highlight-video {
        border: 1px solid #ccc;
        border-radius: 8px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .highlight-keyword {
        border-radius: 8px 0 0 8px;
        flex: 6;

    }

    .highlight-video-small {    
        flex: 4;
        /* background-color: #bbb; */
        /* overflow: hidden; */

    }


</style>