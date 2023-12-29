<template>
  <div class="CreateMeeting">
    <div class="ti">
      会议邀请
    </div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="invi-card" v-loading="loading" element-loading-text="邮件发送较慢，请勿关闭窗户，请稍等候一段时间">
            <div class="card-ti">
              邀请人员
            </div>
            <el-input type="text" prefix-icon="el-icon-search" v-model="kb_content" placeholder="请输入"
              style="cursor: pointer;" @keyup.enter.native="getAllKb"></el-input>
            <el-tabs :tab-position="'top'">
              
              <!-- 全部 -->
              <el-tab-pane label="全部">
                <el-table ref="allTable" :header-cell-style="{ background: '#004d8c', color: '#FFFFFF' }"
                  :data="inviteData" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                  <el-table-column prop="role" label="角色" show-overflow-tooltip></el-table-column>
                </el-table>
              </el-tab-pane>


              <!-- 教师 -->
              <el-tab-pane label="教师">
                <el-table ref="teacherTable" :header-cell-style="{ background: '#004d8c', color: '#FFFFFF' }"
                  :data="teacherData" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                  <el-table-column prop="role" label="角色" show-overflow-tooltip></el-table-column>
                </el-table>
              </el-tab-pane>

              <!-- 博士生 -->
              <el-tab-pane label="博士生">
                <el-table ref="phdStudentTable" :header-cell-style="{ background: '#004d8c', color: '#FFFFFF' }"
                  :data="phdStudentData" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                  <el-table-column prop="role" label="角色" show-overflow-tooltip></el-table-column>
                </el-table>
              </el-tab-pane>

              <!-- 研究生 -->
              <el-tab-pane label="研究生">
                <el-table ref="graduateStudentTable" :header-cell-style="{ background: '#004d8c', color: '#FFFFFF' }"
                  :data="graduateStudentData" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                  <el-table-column prop="role" label="角色" show-overflow-tooltip></el-table-column>
                </el-table>
              </el-tab-pane>

              <!-- 本科生 -->
              <el-tab-pane label="本科生">
                <el-table ref="undergraduateStudentTable" :header-cell-style="{ background: '#004d8c', color: '#FFFFFF' }"
                  :data="undergraduateStudentData" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                  <el-table-column prop="role" label="角色" show-overflow-tooltip></el-table-column>
                </el-table>
              </el-tab-pane>


              <!-- 特邀 -->
              <el-tab-pane label="特邀">
                <el-table ref="specialInvitedTable" :header-cell-style="{ background: '#004d8c', color: '#FFFFFF' }"
                  :data="specialInvitedData" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                  <el-table-column prop="role" label="角色" show-overflow-tooltip></el-table-column>
                </el-table>
              </el-tab-pane>

              <!-- 其他 -->
              <el-tab-pane label="其他">
                <el-table ref="otherTable" :header-cell-style="{ background: '#004d8c', color: '#FFFFFF' }"
                  :data="otherData" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                  <el-table-column prop="role" label="角色" show-overflow-tooltip></el-table-column>
                </el-table>
              </el-tab-pane>

            </el-tabs>


            <div style="margin-top: 20px">
              <el-button type="primary" @click="invite">邀请人员</el-button>
              <el-button @click="clickCancel">取消选择</el-button>
            </div>
          </el-card>
        </el-col>

      </el-row>



    </el-card>
    <dialog-bar v-model="sendVal" type="confirm" content="参会人员创建成功" v-on:confirm="clickConfirm()"></dialog-bar>
    <dialog-bar v-model="falsemeeting" type="confirm" content="参会人员创建失败" v-on:cancel="clickConfirm1()"></dialog-bar>
  </div>
</template>

<script>
import axios from 'axios';
import dialogBar from '@/components/common/dialog.vue'
export default {
  components: {
    'dialog-bar': dialogBar,
  },
  data() {
    return {
      falsemeeting: false,
      sendVal: false,
      inviteData: [],
      multipleSelection: [],
      kb_content: '',
      loading: false,
    };
  },
  computed: {
    graduateStudentData() {
      return this.inviteData.filter(item => item.role === '研究生');
    },
    phdStudentData() {
      return this.inviteData.filter(item => item.role === '博士生');
    },
    undergraduateStudentData() {
      return this.inviteData.filter(item => item.role === '本科生');
    },
    teacherData() {
      return this.inviteData.filter(item => item.role === '教师');
    },
    specialInvitedData() {
      return this.inviteData.filter(item => item.role === '特邀');
    },
    otherData() {
      return this.inviteData.filter(item => item.role === '其他');
    },
  },

  created() {
    this.getpatiData();
  },
  methods: {
    cancleCreate() {

    },
    // 获取人员信息
    getpatiData() {
      // const path = 'http://127.0.0.1:5000/getPati';
      const path = '/api/getPati';
      axios.post(path).then(res => {

        this.inviteData = res.data.reslist
      }).catch(error => {
        console.error(error);
      });
    },
    invite() {
      this.loading = true;
      const path = '/api/invitePati';
      console.log(this.multipleSelection)
      axios.post(path, { pati: this.multipleSelection }).then(res => {
        
        this.loading = false;
        this.$message({
          message: '邀请邮件发送成功！',
          type: 'success'
        });
      }).catch(error => {
        console.error(error);
        this.$message.error('发送失败，请刷新后重试！');
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // Assuming you have a method for this based on your template
    getAllKb() {
      // TODO: Your logic for handling the search input "kb_content"
    },
    // old
    clickCancel() {
      console.log('点击了取消');

      // 清空选中状态数组
      this.multipleSelection = [];
      // 清空表中的选中状态
      if (this.$refs.graduateStudentTable) this.$refs.graduateStudentTable.clearSelection();
      if (this.$refs.phdStudentTable) this.$refs.phdStudentTable.clearSelection();
      if (this.$refs.undergraduateStudentTable) this.$refs.undergraduateStudentTable.clearSelection();
      if (this.$refs.teacherTable) this.$refs.teacherTable.clearSelection();
      if (this.$refs.specialInvitedTable) this.$refs.specialInvitedTable.clearSelection();
      if (this.$refs.otherTable) this.$refs.otherTable.clearSelection();

    },
    clickDanger() {
      console.log('这里是danger回调')
    },
    clickConfirm() {
      console.log('点击了confirm');
      this.sendVal = false;
      // this.$router.push({
      //   path: 'newpati',
      //   // name: 'mallList',

      // })
    },
    clickConfirm1() {
      console.log('点击了confirm');
      this.falsemeeting = false;
      // this.$router.push({
      //   path: 'newpati',
      //   // name: 'mallList',
      // })
    },
  }
};
</script>

<style lang="scss" scoped>
.invi-card {
  margin-left: 2%;
  margin-top: 2%;
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 500;
  line-height: 34px;
  margin-bottom: 2%;
}

.form_input {
  margin-left: 3%;
  width: 50%;
}

.ti {
  margin-left: 1%;
  margin-top: 1%;
  color: #1a1a1a;
  font-size: 24px;
  font-weight: 500;
  line-height: 34px;
}

.invi-card {
  margin-left: 1%;
  margin-right: 3%;
  margin-top: 1%;
  border-radius: 8px;
}

.box-card {
  margin-left: 1%;
  margin-right: 3%;
  margin-top: 1%;
  border-radius: 8px;
}

.buttonnew {
  margin-top: 175px;
  clear: both;
}

.patichoose {
  float: left;
  /*background: lawngreen;*/
  width: 150px;
  height: 50px;

  .text {
    font-size: 20px;
    text-align: center;
  }
}

.slideTwo {
  width: 80px;
  height: 30px;
  background: #333;
  margin: 20px auto;
  position: relative;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  -moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
  -webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
}

.slideTwo:after {
  content: '';
  position: absolute;
  top: 14px;
  left: 14px;
  height: 2px;
  width: 52px;
  background: #111;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  -moz-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
  -webkit-box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
}

.slideTwo label {
  display: block;
  width: 22px;
  height: 22px;
  cursor: pointer;
  position: absolute;
  top: 4px;
  z-index: 1;
  left: 4px;
  background: #fcfff4;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  -moz-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  background: -moz-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
  background: -webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
  background: linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
}

.slideTwo label:after {
  content: '';
  width: 10px;
  height: 10px;
  position: absolute;
  top: 6px;
  left: 6px;
  background: #333;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  -moz-box-shadow: inset 0px 1px 1px black, 0px 1px 0px rgba(255, 255, 255, 0.9);
  -webkit-box-shadow: inset 0px 1px 1px black, 0px 1px 0px rgba(255, 255, 255, 0.9);
  box-shadow: inset 0px 1px 1px black, 0px 1px 0px rgba(255, 255, 255, 0.9);
}

.slideTwo input[type=checkbox] {
  visibility: hidden;
}

.slideTwo input[type=checkbox]:checked+label {
  left: 54px;
}

.slideTwo input[type=checkbox]:checked+label:after {
  background: #00bf00;
}

.tableTitle {
  position: relative;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;

  width: 100%;
  height: 3px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.midText {
  position: absolute;
  left: 50%;
  background-color: #ffffff;
  padding: 0 15px;
  transform: translateX(-50%) translateY(-50%);
}

.CreateMeeting {
  position: relative;

  .MeetingInfo {
    .name {
      margin-top: 20px;
      width: 600px;
    }

    .stuid {
      margin-left: 10px;
      margin-top: 5px;
      width: 600px;
    }

    .roler {
      margin-top: 5px;
      width: 600px;
    }

    .ispermanent {
      margin-left: 10px;
      margin-top: 5px;
      width: 600px;
    }
  }

  .MeetingPati {}
}

.visitorInfo-wrapper {
  .info-search {
    .search-item {
      margin-top: 5px;
      width: 300px;

      &.visitorCredit {
        margin-left: 5px;
      }
    }
  }

  .appoint-result-wrapper {
    .port-btn {
      border-top: 1px solid #ccc;
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: right;
    }

    .appoint-result {
      text-align: center;

      .pagination {
        margin-top: 20px;
      }
    }
  }

  .label {
    display: inline-block;
    width: 80px;
    height: 40px;
    line-height: 39px;
    text-align: center;
    border: 1px solid #dcdfe6;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
    background: #f5f7fa;
    color: #909399;
  }

  .info-result-wrapper {
    .port-btn {
      border-top: 1px solid #ccc;
      margin-top: 10px;
      margin-bottom: 10px;
      text-align: right;
    }

    .info-result {
      text-align: center;

      .pagination {
        margin-top: 20px;
      }
    }
  }
}
</style>