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
                theme:"彩云阁五月第三次会议",
                score: 80,
                engagement: 85,
                sentiment: 'positive',
                summary: '在本次会议中，主要讨论了研究生培养、学术研究等问题。参与者包智超、Chao等在讨论中提出了很多有益的观点和建议。会议呼吁研究生教育应该更加注重实践应用，强化学生的培养，教学要注重知识点之间的关系和相互联系，加强沟通和交流，提高学生的创新意识和思维能力。在学术研究方面，大家也认为要更加注重实际问题，要有自己的想法和创造性，不能凭借他人手抄或帮助完成任务。最后，大家应该注重时间管理，珍惜每一天，不断积累提高自己的水平。',
                chapter1:"讨论了成员的工作进展，包括验收、参与比赛、部署系统等内容，同时提到了答疑知识图谱关系较少的问题，以及挖掘更多关系的方式。部分讨论涉及研究生培养，其中包括教师培训、知识点之间的关系，以及预测相似关系。会议讨论交流充分，成员们积极分享工作进展和技术调研成果，提出解决问题的方式和思路。",
                chapter2:"讨论了三种预测股权模型的方法，其中基于知识表示的方法只考虑了当前三元组的关系，而基于图神经网络的方法则考虑了邻居信息来预测关系。而基于注意力机制的神经网络方法，则能够为邻居赋予不同的权重，以更准确地预测实体关系。目前这些方法的不足在于在完成计算之后权重已经固定，而在实际情况中同一邻居在不同关系预测时的重要性是不同的。下一步工作将根据预测关系的上下文来进行股权模型设计和实验验证。在研究时应以测试指标驱动问题导向，在最短时间内取得最佳效果。",
                chapter3:"主要议题为研究生培养问题和学位论文要求。讨论了学院目前培养研究生存在的问题，提出了研究生应该注重做原型和测试指标，同时强调真正培养研究生要以解决问题为目标。会议还讨论了学位论文真实性和专硕学习年限等问题，并就提出的问题展开了激烈的讨论和辩论，通过集体讨论，一些委员的提议也被采纳。最后，我们应该注重真正的研究和解决问题，不断优化研究方法和培养大家的研究兴趣。",
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
            // this.getdata();//初始化数据
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