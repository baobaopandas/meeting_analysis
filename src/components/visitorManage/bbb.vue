<template>
    <div class="container">
        <div class="left-column">
            <div class="metrics-container">
                <div class="metric">
                    <div class="metric-title">Score</div>
                    <div class="metric-value">85</div>
                    <div class="metric-chart" ref="scoreChartContainer"></div>
                    <el-button @click="downloadwangluo()">
                        查看信息详细流向图
                    </el-button>
                </div>
                <div class="metric">
                    <div class="metric-title">Engagement</div>
                    <div class="metric-value">92</div>
                    <div class="metric-chart" ref="engagementChartContainer"></div>
                </div>
                <div class="metric">
                    <div class="metric-title">Sentiment</div>
                    <div class="metric-value">Positive</div>
                    <div class="metric-chart" ref="sentimentChartContainer"></div>
                </div>
            </div>
            <div class="summary-container">
                <div class="section-title">Summary</div>
                <div class="summary-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus pretium tortor, eget tristique justo aliquam sit amet. Sed malesuada consectetur ligula, eu tristique lorem.
                </div>
            </div>
            <div class="chapter-container">
                <div class="section-title">Chapter</div>
                <div class="chapter">
                    <div class="chapter-title">Chapter 1</div>
                    <div class="chapter-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus pretium tortor, eget tristique justo aliquam sit amet. Sed malesuada consectetur ligula, eu tristique lorem.
                    </div>
                </div>
                <div class="chapter">
                    <div class="chapter-title">Chapter 2</div>
                    <div class="chapter-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus luctus pretium tortor, eget tristique justo aliquam sit amet. Sed malesuada consectetur ligula, eu tristique lorem.
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
                        <!-- FLV.js player -->
                    </div>
                </div>
                <div class="highlight">
                    <div class="highlight-text">Highlight 2</div>
                    <div class="highlight-video">
                        <!-- FLV.js player -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Echarts from "echarts";
    import flvjs from 'flv.js';

    export default {
        data() {
            return {
                score: 85,
                engagement: 95,
                sentiment: 'Positive',
                summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper eleifend magna at varius. Vestibulum nec nibh eu justo rhoncus lacinia. Quisque a efficitur elit.',
                chapters: [
                    { id: 1, title: 'Chapter 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
                    { id: 2, title: 'Chapter 2', content: 'Nullam semper eleifend magna at varius.' },
                    { id: 3, title: 'Chapter 3', content: 'Vestibulum nec nibh eu justo rhoncus lacinia.' }
                ],
                videoSrc: 'http://81.68.118.43:8088/video/20230215.mp4', // flv 格式的视频链接
                highlights: [
                    { id: 1, text: 'Highlight 1', videoSrc: 'https://example.com/highlight1.flv' },
                    { id: 2, text: 'Highlight 2', videoSrc: 'https://example.com/highlight2.flv' },
                    { id: 3, text: 'Highlight 3', videoSrc: 'https://example.com/highlight3.flv' }
                ]
            };
        },
        mounted() {
            // this.initChart();
            // this.generateChartData(); // 渲染折线图
            // this.generateCharts();
            this.initVideoPlayer(); // 初始化视频播放器
        },
        methods: {
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
                if (flvjs.isSupported()) {
                    const flvPlayer = flvjs.createPlayer({
                        type: 'mp4',
                        url: this.videoSrc
                    });
                    flvPlayer.attachMediaElement(videoPlayer);
                    flvPlayer.load();
                }
            },
            downloadwangluo(){
                this.$router.push('/3d');
            }
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
    }
</style>