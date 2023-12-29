<template>
  <div class="CreateMeeting">
    <div class="ti">
      人员管理
    </div>
    <el-card class="box-card">
      <el-card class="invi-card">
        <div class="card-ti">
          人员列表
        </div>
        <el-table :data="partiData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">

          <el-table-column prop="stuid" label="id" sortable align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" sortable align="center">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" sortable align="center" width="300px">
          </el-table-column>
          <el-table-column prop="role" label="角色" sortable align="center">
          </el-table-column>
          <el-table-column prop="remark" label="备注" sortable align="center" width="100px">
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">修改信息</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-card>

      <el-row :gutter="20">

        <el-col :span="12">
          <el-card class="invi-card">
            <!-- your content here -->
            <div class="card-ti">
              新建人员
            </div>
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="姓名*">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="密码*">
                <el-input v-model="form.pd" show-password></el-input>
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
                <el-button type="primary" @click="newpati">确认创建</el-button>
                <el-button @click="cancleCreate">清除</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>

      </el-row>



    </el-card>
    <dialog-bar v-model="sendVal" type="confirm" content="信息修改成功"></dialog-bar>
    <dialog-bar v-model="falsemeeting" type="confirm" content="信息修改失败" ></dialog-bar>

    <el-dialog title="修改用户信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="tempform" :model="tempform" label-width="100px" style="margin-right: 20px;">
        <el-form-item label="姓名*">
          <el-input v-model="tempform.name"></el-input>
        </el-form-item>
        <el-form-item label="密码*">
          <el-input v-model="tempform.pd"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="tempform.stuid"></el-input>
        </el-form-item>
        <el-form-item label="角色*">
          <el-select v-model="tempform.role" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱*">
          <el-input v-model="tempform.email"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="tempform.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePati">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      tempform: {
        id: '',
        name: '',
        stuid: '',
        role: '',
        email: '',
        remark: '',
        ispermanent: '',
        pd: '123456'
      },
      form: {
        name: '',
        role: '',
        email: '',
        remark: '',
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
      partiData: [],
      dialogVisible: false
    };
  },
  computed: {

  },
  created() {
    this.getpatistateData()
  },
  methods: {
    cancleCreate() {
      this.form.name = ''
      this.form.role = ''
      this.form.email = ''
      this.form.remark = ''
      this.form.pd = '123456'
    },
    newpati() {
      if (this.form.name == "") {
        console.log("创建人员失败")
        this.falsemeeting = true;
      } else {
        console.log("新建人员");
        // 设置对应python的接口，这里使用的是localhost:5000
        const path = '/api/newpati';
        axios.post(path, { name: this.form.name, role: this.form.role, email: this.form.email, remark: this.form.remark, pd: this.form.pd }).then(res => {

          this.sendVal = true;
        }).catch(error => {
          this.falsemeeting = true;
          console.error(error);
        });
      }
    },
    getpatistateData() {
      const path = '/api/getPatistate';
      axios.post(path, { aaa: "hhhhhhh" }).then(res => {
        this.partiData = res.data.reslist;
        console.log(this.partiData);
      }).catch(error => {
        console.error(error);
      });
    },
    handleClick(row) {
      this.tempform.name = row.name
      this.tempform.stuid = row.stuid
      this.tempform.role = row.role
      this.tempform.pd = row.pd
      this.tempform.email = row.email
      this.tempform.ispermanent = row.ispermanent
      this.tempform.remark = row.remark
      this.tempform.id = row.ID
      this.dialogVisible = true
    },
    updatePati() {
      const path = '/api/setOnePati';
      axios.post(path, { form: this.tempform }).then(res => {
        this.sendVal = true;
        this.getpatistateData()
      }).catch(error => {
        this.falsemeeting = true;
        console.error(error);
      });
    }
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