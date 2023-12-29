<template>
  <div class="CreateMeeting">
    <div class="ti">
      账户设置
    </div>
    <el-card class="box-card">
      <el-row :gutter="20">

        <el-col :span="12">
          <el-card class="invi-card">
            <!-- your content here -->
            <div class="card-ti">
              修改信息
            </div>
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="姓名*">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="密码*">
                <el-input v-model="form.pd"></el-input>
              </el-form-item>
              <el-form-item label="学号">
                <el-input v-model="form.stuid"></el-input>
              </el-form-item>
              <el-form-item label="角色*">
                <el-select v-model="form.role" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱*">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updatePati">确认修改</el-button>

              </el-form-item>
            </el-form>
          </el-card>
        </el-col>

      </el-row>



    </el-card>
    <dialog-bar v-model="sendVal" type="confirm" content="用户信息修改成功"></dialog-bar>
    <dialog-bar v-model="falsemeeting" type="confirm" content="用户信息修改失败！请重新尝试"></dialog-bar>

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
      form: {
        id: '',
        name: '',
        stuid:'',
        role: '',
        email: '',
        remark: '',
        ispermanent:'',
        pd: '123456'
      },
      options: [{
        value: '研究生',
        label: '研究生'
      }, {
        value: '博士生',
        label: '博士生'
      }, {
        value: '本科生',
        label: '本科生'
      }, {
        value: '教师',
        label: '教师'
      }, {
        value: '特邀',
        label: '特邀'
      }, {
        value: '其他',
        label: '其他'
      }],
    };
  },
  computed: {

  },
  created() {
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log(userInfo)
    this.form.name = userInfo.name
    this.form.stuid = userInfo.stuid
    this.form.role = userInfo.role
    this.form.pd = userInfo.pd
    this.form.email = userInfo.email
    this.form.ispermanent = userInfo.ispermanent
    this.form.remark = userInfo.remark
    this.form.id = userInfo.ID
  },
  methods: {
    updatePati() {
      const path = '/api/setOnePati';
        axios.post(path, { form: this.form }).then(res => {
          this.sendVal = true;
          this.getUserInfo()
        }).catch(error => {
          this.falsemeeting = true;
          console.error(error);
        });
    },
    getUserInfo() {
      const path = '/api/getUserInfo';
      axios.post(path, { name: this.form.name })
        .then(res => {
          this.userInfo = res.data.reslist[0];
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify({
              admin: this.userInfo.name,
              name: this.userInfo.name,
              ID: this.userInfo.ID,
              role: this.userInfo.role,
              stuid: this.userInfo.stuid,
              ispermanent: this.userInfo.ispermanent,
              email: this.userInfo.email,
              pd: this.userInfo.pd,
              remark: this.userInfo.remark
            })
            
          );
        })
        .catch(error => {
          console.error(error);
        });
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