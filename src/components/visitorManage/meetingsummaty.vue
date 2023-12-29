
<template>
    <div class="main-container">
        <div class="left-container">
            <div class="top-section">
                <div class="indicator">
                    <div class="indicator-item">
                        <span class="indicator-label">Score:</span>
                        <span class="indicator-value">{{ score }}</span>
                        <div class="chart" ref="scoreChart"></div>
                    </div>
                    <div class="indicator-item">
                        <span class="indicator-label">Engagement:</span>
                        <span class="indicator-value">{{ engagement }}</span>
                        <div class="chart" ref="engagementChart"></div>
                    </div>
                    <div class="indicator-item">
                        <span class="indicator-label">Sentiment:</span>
                        <span class="indicator-value">{{ sentiment }}</span>
                        <div class="chart" ref="sentimentChart"></div>
                    </div>
                </div>
            </div>
            <div class="summary-section">
                <h2 class="summary-title">Summary</h2>
                <p class="summary-content">{{ summary }}</p >
            </div>
            <div class="chapter-section">
                <h2 class="chapter-title">Chapters</h2>
                <div class="chapters">
                    <div v-for="chapter in chapters" :key="chapter.id" class="chapter-item">
                        <h3 class="chapter-heading">{{ chapter.title }}</h3>
                        <p class="chapter-paragraph">{{ chapter.content }}</p >
                    </div>
                </div>
            </div>
        </div>
        <div class="right-container">
            <div class="video-section">
                <!-- 使用 flv.js 播放视频 -->
                <video ref="videoPlayer" controls autoplay muted class="flv-player"></video>
            </div>
            <div class="highlight-section">
                <div v-for="highlight in highlights" :key="highlight.id" class="highlight-item">
                    <p class="highlight-text">{{ highlight.text }}</p >
                    <div class="highlight-video">
                        <!-- 相应视频片段展示组件 -->
                        <VideoPlayer :src="highlight.videoSrc" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

// 会议讨论了腾讯会议插件及其开发难度，并强调了赋能和集成的重要性。参会人员还分享了上周的工作进展和技术指标，并讨论了技术指标的概念和算法指标的区别。在最后，参会人员就欺诈企业检测的质量问题进行了讨论和分析。
// 在整体发言欲望方面，会议整体发言欲望得分为8.3较高。其中在谈到xxx话题时总体的发言欲望升高，在谈到xxx话题时总体的发言欲望降低。 在个人发言欲望方面，xxx近几次积极参与讨论，发言欲望较高。xxx连续三次次发言欲望持续低迷，建议采取干预措施

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
            getdata(){

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
                if (flvjs.isSupported()) {
                    const flvPlayer = flvjs.createPlayer({
                        type: 'mp4',
                        url: this.videoSrc
                    });
                    flvPlayer.attachMediaElement(videoPlayer);
                    flvPlayer.load();
                }
            }
        }
    };
</script>
<style scoped>
    .main-container {
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }

    .left-container {
        width: 70%;
        border-radius: 10px;
        background-color: #f5f5f5;
        padding: 20px;
    }

    .top-section {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .indicator {
        display: flex;
        align-items: center;
        margin-right: 30px;
    }

    .indicator-item {
        display: flex;
        margin-right: 10px;
    }

    .indicator-label {
        font-weight: bold;
    }

    .metrics {
        display: flex;
        /*flex-direction: column;*/
        width: 70%;
    }

    .metric {
        margin-bottom: 20px;
    }

    .title {
        font-weight: bold;
        margin-bottom: 10px;
    }

    .chart {
        width: 100%;
        height: 100%;
    }

    .summary-section {
        margin-bottom: 20px;
    }

    .summary-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .summary-content {
        line-height: 1.5;
    }

    .chapter-section {
        margin-bottom: 20px;
    }

    .chapter-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .chapter-item {
        margin-bottom: 10px;
    }

    .chapter-heading {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .video-section {
        width: 100%;
        border-radius: 10px;
        background-color: #f5f5f5;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .flv-player {
        width: 100%;
        max-width: 800px;
    }

    .highlight-section {
        margin-top: 20px;
    }

    .highlight-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .highlight-text {
        font-weight: bold;
        margin-right: 10px;
    }

    .highlight-video {
        width: 100px;
        height: 80px;
        margin-left: 20px;
    }

    .echarts-container {
        height: 100%;
    }

    /* 其他样式根据需要进行添加和修改 */
