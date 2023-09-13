<template>
  <div class="aside-wrapper">
    <div class="aside-menu">
      <el-menu
        class="el-menu-vertical"
        background-color="#393D49"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      :collapse="sideVisible"

        active-text-color="#ffd04b"
        unique-opened
        router
        collapse-transition
      >
        <!--:collapse="sideVisible"   -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>新建会议管理</span>
          </template>
          <el-menu-item index="ParticipantInvite">新建会议信息</el-menu-item>
          <el-menu-item index="newpati">参会人员邀请</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>当前会议管理</span>
          </template>
          <el-menu-item index="MeetingInfo">当前会议简介</el-menu-item>
          <el-menu-item index="MeetingProcess"> 当前会议议程</el-menu-item>
          <el-menu-item index="ParticipantState">参会人员状态</el-menu-item>
          <!--<el-menu-item index="AccessRecord">访问记录</el-menu-item>-->
        </el-submenu>
        <!--<el-submenu index="3">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-location"></i>-->
            <!--<span>会议室管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="councilRoomInfo">详细信息</el-menu-item>-->
          <!--<el-menu-item index="councilRoomAppointmentInfo">预订信息</el-menu-item>-->
          <!--<el-menu-item index="usedRecord">使用记录</el-menu-item>-->
        <!--</el-submenu>-->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-picture"></i>
            <span>当前会情分析</span>
          </template>
          <el-menu-item index="currenttv">会议实时视频</el-menu-item>
          <el-menu-item index="councilRoomAnalysis">整体会情分析</el-menu-item>
          <el-menu-item index="visitorActionAnalysis">参会人员聚焦</el-menu-item>
          <el-menu-item index="blockchaincertificate">上链存证设置</el-menu-item>

        </el-submenu>
        <!--<el-submenu index="5">-->
          <!--<template slot="title">-->
            <!--<i class="el-icon-view"></i>-->
            <!--<span>用户管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="userInfo">详细信息</el-menu-item>-->
        <!--</el-submenu>-->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>历史会议数据</span>
          </template>
          <el-menu-item index="VisitorAppointmentInfo">会议列表</el-menu-item>
          <el-menu-item index="listoryMeeting">会情回顾</el-menu-item>
          <el-menu-item index="aftermeeting">会议纪要</el-menu-item>
        </el-submenu>
        <el-menu-item index="Userhelper">
          <i class="el-icon-document"></i>
          <span slot="title">使用指南</span>
        </el-menu-item>
        <el-menu-item index="accountsetting">
          <i class="el-icon-document"></i>
          <span slot="title">账户设置</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sideVisible: true
    };
  },
  mounted() {
    this.$bus.$on("sideVisible", () => {
      this.sideVisible = !this.sideVisible;
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.aside-wrapper {
  position: fixed;
  top: 60px;
  bottom: 0;
  height: 100%;
  background: #393d49;
  box-sizing: border-box;
  .aside-menu {
    height: 100%;
  }
  .el-menu-vertical {
    border: none;
  }
}
</style>