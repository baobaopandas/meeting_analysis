<template>
  <div class="visitorAnalysis-wrapper">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <!--<el-menu-item index="1" @click="activeIndex = '1'">参会人员动作统计</el-menu-item>-->
      <el-menu-item index="1" @click="activeIndex = '1'">参会人员心理抑郁度统计</el-menu-item>
      <el-menu-item index="2" @click="activeIndex = '2'">参会人员情绪统计</el-menu-item>
      <el-menu-item index="3" @click="activeIndex = '3'">参会人员专注度统计</el-menu-item>
      <el-menu-item index="4" @click="activeIndex = '4'">会情实时分析</el-menu-item>
      <el-menu-item index="4" class="select">
        <el-select v-model="pati" placeholder="选择查看人物">
          <el-option label="王帅宇" value="王帅宇"></el-option>
          <el-option label="包智超" value="包智超"></el-option>
          <el-option label="郭茹萍" value="郭茹萍"></el-option>
          <el-option label="王朔" value="王朔"></el-option>
          <el-option label="姚鑫玉" value="姚鑫玉"></el-option>
          <el-option label="吴斌" value="w"></el-option>
          <el-option label="李老师" value="李银胜"></el-option>

        </el-select>
      </el-menu-item>
    </el-menu>
    <div class="visitorAnalysis-content">
      <depress v-if="activeIndex === '1'" :pati="pati"></depress>
      <attendance-analysis v-else-if="activeIndex === '2'" :pati="pati"></attendance-analysis>
      <con-analysis v-else-if="activeIndex === '3'" :pati="pati"></con-analysis>
      <speak-desire v-else-if="activeIndex==='4'" :pati = "pati"> </speak-desire>
    </div>
  </div>
</template>

<script>
// import behaviorAnalysis from "./behaviorAnalysis.vue";
import emotion from "./emotion.vue";
import concentration from "./concentration.vue";
import depress from "./depress.vue"
import speakDesireAnalysis from './speakDesireAnalysis.vue';

export default {
  components: {
    // "behavior-analysis": behaviorAnalysis,
    "attendance-analysis": emotion,
    "con-analysis":concentration,
    "depress": depress,
    "speak-desire":speakDesireAnalysis,

  },
  data() {
    return {
      activeIndex: "1",
      pati:"王帅宇",
    };
  }
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