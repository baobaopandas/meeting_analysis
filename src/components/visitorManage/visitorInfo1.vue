<template>
  <div class="visitorInfo-wrapper">
    <!-- 搜索 -->
    <InfoSearch @InfoSearch="depress_analyze" class="info-search">
      <el-input
        placeholder="请输入查询会议组号"
        v-model="groupIp"
        id="groupIp"
        class="search-item visitorName"
      >
        <template slot="prepend">会议组号</template>
      </el-input>
      <el-input
        placeholder="请输入查询学生账号"
        v-model="stuId"
        id="stuId"
        class="search-item visitorCredit"
      >
        <template slot="prepend">学生账号</template>
      </el-input>
      <el-input
         placeholder="请输入查询学生微博账号"
         v-model="weiboId"
         id="weiboId"
         class="search-item weiboId"
      >
        <template slot="prepend">学生微博账号</template>
      </el-input>
    </InfoSearch>
    <div class="appoint-result-wrapper">
      <div class="port-btn">
        <el-button type="primary" size="small" class="port-btn" @click="export2Excel">导出</el-button>
      </div>
      <div class="appoint-result">
        <el-table :data="appointInfo" stripe>
          <el-table-column prop="name" label="姓名" header-align="center" align="center"></el-table-column>
          <el-table-column prop="stuid" label="学号" header-align="center" align="center"></el-table-column>
          <el-table-column prop="role" label="角色" header-align="center" align="center"></el-table-column>
          <el-table-column prop="ispermanent" label="是否常驻人员" header-align="center" align="center"></el-table-column>
          <el-table-column prop="nearlessforce" label="最近一次会议专注度" header-align="center" align="center"></el-table-column>
          <el-table-column
                  prop="nearless7force"
                  label="最近七次会议专注度"
                  width="300"
                  header-align="center"
                  align="center"
          ></el-table-column>
          <el-table-column
                  prop="isdanger"
                  label="心理隐患"
                  header-align="center"
                  width="150"
                  align="center"
          ></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="pageSize"
                  :pager-count="pageCount"
                  @current-change="currentChange"
                  :total="recordNum"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoSearch from "comm/InfoSearch.vue";
import axios from 'axios';
// import { Excelpost } from "@/utils";
import Fetch from "mixins/fetch";


export default {
  components: {
    InfoSearch
  },
  data() {
    return {
      appointInfo:[
        {
          name:'吴斌',
          stuid:'20021120012',
          role:'博士生',
          ispermanent:'是',
          nearlessforce:'0.741',
          nearless7force:'0.698',
          isdanger:'无',
        },
        {
          name:'姚鑫玉',
          stuid:'20021120014',
          role:'硕士生',
          ispermanent:'是',
          nearlessforce:'0',
          nearless7force:'0',
          isdanger:'无',
        }
        ,
        {
          name:'顾珍桢',
          stuid:'20021120022',
          role:'硕士生',
          ispermanent:'是',
          nearlessforce:'0.417',
          nearless7force:'0.532',
          isdanger:'无',
        },
        {
          name:'郭茹萍',
          stuid:'1021110110070',
          role:'硕士生',
          ispermanent:'是',
          nearlessforce:'0',
          nearless7force:'0.671',
          isdanger:'无',
        },
        {
          name:'包智超',
          stuid:'20021120011',
          role:'硕士生',
          ispermanent:'是',
          nearlessforce:'0.557',
          nearless7force:'0.613',
          isdanger:'无',
        },
        {
          name:'颜家勉',
          stuid:'20220406',
          role:'本科生',
          ispermanent:'是',
          nearlessforce:'0',
          nearless7force:'0.668',
          isdanger:'无',
        },{
          name:'张伯言',
          stuid:'2022040211747',
          role:'本科生',
          ispermanent:'是',
          nearlessforce:'0.623',
          nearless7force:'0.587',
          isdanger:'无',
        },
        {
          name:'王帅宇',
          stuid:'20220412210',
          role:'硕士生',
          ispermanent:'是',
          nearlessforce:'0',
          nearless7force:'0.217',
          isdanger:'无',
        },{
          name:'王朔',
          stuid:'20220412211',
          role:'硕士生',
          ispermanent:'是',
          nearlessforce:'0',
          nearless7force:'0.815',
          isdanger:'无',
        }
      ],
      coundHostList:[
        {
          number:'0001',
          name:'商品1',
          htnumber:'001',
          htname:'合同1',
          version:'1.0.0.1',
          qyperson:'张三',
          extime:'2020-03-13'
        },
        {
          number:'0002',
          name:'商品2',
          htnumber:'002',
          htname:'合同2',
          version:'1.0.0.2',
          qyperson:'赵四',
          extime:'2020-03-15'
        },
      ],
      groupIp:"129",
      stuId:"60",
      weiboId:"weiboId",
      data:"",
      // appointInfo: [],
    };
  },
  mixins: [Fetch],
  created() {
    this.pageSize = 8; // 分页数据条数
    this.pageCount = 5; // 显示分页数

    // // 页面初始数据
    // this.$_fetch_visitorInfo().then(res => {
    //   this.visiInfo = res.pageBean.dataList;
    //   this.recordNum = res.pageBean.recordNum;
    // });
    // this.getpatistateData();
  },
  methods: {
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['编号','姓名','学号','角色','是否是常驻成员'];
        const filterVal = ['id', 'name', 'stuid', 'role','ispermanent' ];
        const list = this.appointInfo;
        const data = this.formatJson(filterVal,list);
        export_json_to_excel(tHeader, data, '参会人员状态表');
      })
    },

    getpatistateData(){
      const path = '/api/getPatistate';
      axios.post(path,{aaa: "hhhhhhh"}).then(res => {
        // var msg = res.data.id;
        // this.new_time_data.push(msg);
        this.appointInfo = res.data.reslist;
        console.log(this.appointInfo);
        console.log(res);
      }).catch(error => {
        console.error(error);
      });
    },
    //查询沮丧分析
    depress_analyze(){
      this.$_fetch_depress_analyze({
        groupIp: this.groupIp,
        stuId: this.stuId,
        weiboId: this.weiboId,
      }).then(res => {
        this.data = res.data();
        console.log(this.data);
      })
    },

  }
};
</script>

<style lang="scss" scoped>
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