<template>
  <div class="behaviorAnalysis-wrapper">
    <div class='demo'>
      <video id="videoElement" controls autoplay muted width="50%" height="400px"></video>
      <video id="videoElement2" controls autoplay muted width="50%" height="400px"></video>
    </div>
    <!--<div class='bottom'>-->
    <!--&lt;!&ndash;<div id="drawGuestBehave" class="drawGuestBehave"></div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div id="drawGuestBehaveAnalysic" v-loading="loading" class="drawGuestBehaveAnalysic"></div>&ndash;&gt;-->
    <!--</div>-->
    <div class='mode'>
      <div class = 'button1'>
        <div class = 'buttonSpeaker'>
          <button v-if="!isspeak" @click="speaker">
            说话人检测
          </button>
          <button v-if="isspeak" class="orange" @click="speakerstop">
            Stop
          </button>
        </div>
        <div class = "buttonTalk">
        <button v-if="!isListening" @click="start">
          语音识别
        </button>
        <button v-if="isListening" class="orange" @click="stop">
          Stop
        </button>
        </div>
      </div>
      <!--<textarea rows=20 cols="193" v-model="mode" readonly ></textarea>-->
      <div class = 'texttalk'>
      <textarea style="width: 50%;height: 100%;font-size: 20px" v-model="mode" readonly ></textarea>
      <textarea style="width: 50%;height: 100%;font-size: 25px" v-model="result" readonly ></textarea>
      <!--<p>{{mode}}</p>>-->
      <!--<pre><p v-html="mode"></p></pre>-->
      </div>
    </div>
  </div>


</template>

<script>
// import Echarts from "echarts";
import Fetch from "mixins/fetch";
import axios from "axios";
// import {videoPlayer} from 'vue-video-player'
import 'vue-video-player/node_modules/video.js/dist/video-js.css'
import flvjs from 'flv.js'

import { useSpeechRecognition } from '@vueuse/core'

// const speech = useSpeechRecognition({
//     lang: 'zh-CN',
//         interimResults: true,
//         continuous: true,
// })
const {
  isSupported,
  isListening,
  isFinal,
  result,
  start,
  stop,
} = useSpeechRecognition({
  lang: 'zh-CN',
  interimResults: true,
  continuous: true,
})
var mytimer;
// var mytimer1;
// var mytimer2;
// var isspeak;

export default {
  components: {
  },
  props: {
    visitorTime: {
      type: String
    }
  },
  data() {
    return {
      mode:"",
      daydate:'',
      random: 2000,
      isspeak:0,
      ids:[],
      isSupported,
      isListening,
      isFinal,
      result,
      start,
      stop,
    };
  },
  mixins: [Fetch],
  mounted() {
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
    if (flvjs.isSupported()) {
      var videoElement2 = document.getElementById('videoElement2')
      this.flvPlayer2 = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        hasAudio: false,
        url: 'http://124.222.217.145:8090/live/158.flv',
      })
      this.flvPlayer2.attachMediaElement(videoElement2)
      this.flvPlayer2.load()
      this.flvPlayer2.play()
    }
    this.day()
    // this.moshi()
  },
  created() {

  },
  computed: {},
  methods: {
    speaker(){
      this.isspeak=!this.isspeak;
      mytimer = window.setInterval(this.moshi,5000);
      // mytimer1 = window.setInterval(this.speaker,5000);
      // mytimer2 = window.setInterval(this.nulll,this.random);
      console.log(mytimer)
      // console.log(mytimer1)
      console.log(this.isspeak);
    },
    speakerstop(){
      console.log(mytimer)
      window.clearInterval(mytimer);
      // window.clearInterval(mytimer1);
      // window.clearInterval(mytimer2);
      this.isspeak=!this.isspeak;
      console.log(this.isspeak);
    },
   day(){
      var nowDate = new Date();
      var date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        day: nowDate.getDate(),
        hour: nowDate.getHours(),
        min: nowDate.getMinutes(),
        sec: nowDate.getSeconds(),
      }
      var dayDate = date.year + '-' + (date.month >= 10 ? date.month : '0' + date.month) + '-' + (date.day >= 10 ? date.day : '0' + date.day ) + " "+ date.hour +":"  + date.min +":" + (date.sec >= 10 ? date.sec : '0' + date.sec )
      console.log(dayDate);
      this.daydate =dayDate;
    },
    async moshi(){
      const path = '/api/getonlineid';
      axios.post(path).then(res => {
        var msg = res.data.names;
        this.names = msg;
        console.log(this.names);
        console.log(res);
      }).catch(error => {
        console.error(error);
      });
      this.day();
      this.mode= this.mode+ this.daydate+" 会议人员识别：";
      for(let s of this.names) {
        this.mode= this.mode + s;
      }
      this.mode= this.mode +   " \n";
    },
    // speaker(){
    //   this.day()
    //   this.mode= this.mode+(this.daydate+" 说话人识别： 包智超\n")
    // },
    nulll(){
      this.day()
      this.mode= this.mode+(this.daydate+" 说话人识别： 未识别到说话人\n")
      this.random = Math.random()*1000;
    }
  },
};
</script>

<style lang="scss" scoped>
.behaviorAnalysis-wrapper {
  height: 900px;
  margin: 20px;
  /*background: #E04147;*/
  .demo {
    width:100%;
    height:50%;
    /*background: aqua;*/
  }
  .mode{
    /*width:50%;*/
    height: 400px;
    margin: 20px;
    /*background: pink;*/
    .button1{
      height: 8%;
      width: 100%;
      /*background: chocolate;*/
      .buttonSpeaker{
        float:left;
        /*background: pink;*/
        width: 50%;
      }
      .buttonTalk{
        float:right;
        width: 50%;
        /*background: lawngreen;*/
      }
    }
    .texttalk{
      height: 80%;
      /*background: chartreuse;*/
    }
  }
  .bottom{
    margin-top: 20px;
    width: 100%;
    .drawGuestBehave,
    .drawGuestBehaveAnalysic {
      display: inline-block;
      width: 50%;
      height: 350px;
    }
  }

}
</style>
