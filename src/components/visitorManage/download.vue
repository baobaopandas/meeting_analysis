<template>
  <div class="CreateMeeting">
    <div class="tableTitle"><span class="midText">选择下载的会议pdf</span></div>
    <div class ="meetingbutton" v-for="(item,index) in appointInfo" :key="index">
      <el-button @click="downloadpdf">
        {{item.theme}}
      </el-button>
    </div>
    <div class="tableTitle2"><span class="midText">选择观看的会议录像</span></div>
    <div class ="meetingbutton" v-for="(item,index) in appointInfo" :key="index">
      <el-button @click="downloadvideo(item.url)">
        {{item.theme}}
      </el-button>
    </div>
    <div class="tableTitle3"><span class="midText">选择会议分析详情</span></div>
    <div class ="meetingbutton" v-for="(item,index) in appointInfo" :key="index">
      <el-button @click="downloadwangluo(item.theme)">
        {{item.theme}}
      </el-button>
    </div>

    <dialog-bar v-model="sendVal" type="confirm" :title=host content="会议创建成功" v-on:cancel="clickCancel()" ></dialog-bar>
    <dialog-bar v-model="falsemeeting" type="confirm" :title=host content="主持人未上传pdf" v-on:cancel="clickCancel()" ></dialog-bar>
    <dialog-bar v-model="falsemeeting2" type="confirm" :title=host content="未连接到数据库，会议创建失败" v-on:cancel="clickCancel()" ></dialog-bar>
  </div>
</template>

<script>
import axios from 'axios';
// import pdf from 'vue-pdf';
import dialogBar from '@/components/common/dialog.vue'
export default {
  components: {
    'dialog-bar': dialogBar,
    // pdf,
  },
  data() {
    return {
      falsemeeting: false,
      falsemeeting2: false,
      sendVal: false,
      addForm:{
        file:null,
        fileName:'',
        fileData:null
      },
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      pdfUrl: '', // pdf文件地址
      appointInfo:[],
    };
  },
  mounted() {
    this.initPdf();
  },
  created() {
    this.pageSize = 8; // 分页数据条数
    this.pageCount = 5; // 显示分页数

    // 页面初始数据
    // this.$_fetch_visitorInfo().then(res => {
    //   this.visiInfo = res.pageBean.dataList;
    //   this.recordNum = res.pageBean.recordNum;
    // });
    this.getlimeetingData();

  },
  methods: {
    downloadvideo(url){
      if(url==""){
        this.falsemeeting = true;
      } else {
        window.location.href = url;
      }

    },
    downloadwangluo(theme){
      this.$router.push({
        path: '/color',
        query: {
          meeting: theme
        }
    });
    },
    downloadpdf(){
      this.falsemeeting = true;
    },
    getlimeetingData(){
      const path = '/api/getListorymeeting';
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
    changePdfPage (val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
        // console.log(this.currentPage)
      }
    },
    // pdf加载时
    // loadPdfHandler (e) {
    //   this.currentPage = 1 // 加载的时候先加载第一页
    // },
    //初始化pdf路径
    initPdf(){
      //这里的PDF路径就是上传到后台的路径
      this.downloadFileUrl = 'http://xxx.xxx.xxx.xxx/file.pdf';
      this.pdfUrl = 'http://xxx.xxx.xxx.xxx/file.pdf';
    },
    //上传之前调用方法
    beforeUpload(file){
      this.addForm.file = file;
      this.addForm.fileName = file.name;
      // this.fileSize = file.size;
      const extension = file.name.split('.').slice(-1) == 'pdf'
      if (!extension) {
        this.$message.warning('上传模板只能是pdf格式!')
        return
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      reader.onload = function() {
        that.addForm.fileData = reader.result;
      };
      return false; // 返回false不会自动上传
    },
    //预览pdf 文件，这里用的是打开新窗口用浏览器查看PDF
    viewFile(){
      if(this.addForm.fileData == null){
        this.$message.warning('请先上传PDF文件');
        return false;
      }
      var win = window.open();
      win.document.write(
              '<body style="margin:0px;"><object data="' +
              this.addForm.fileData +
              '" type="application/pdf" width="100%" height="100%"><iframe src="' +
              this.addForm.fileData +
              '" scrolling="no" width="100%" height="100%" frameborder="0" ></iframe></object></body>'
      );
    },
    //点击确定按钮上传到后台
    // submitAddForm(){
    //   var formData = new FormData();
    //   formData.append('uploadPdf', this.addForm.file);
    //   this.$commonAjax.postFile('/xxx/xxx', formData,
    //           (json)=> {
    //             if (json.code == 0) {
    //               this.$message.success("文件上传成功");
    //             } else {
    //               this.$message.error("文件上传失败");
    //             }
    //           },
    //           (error)=> {
    //             this.$message.error("系统繁忙请稍后再试!");
    //           }
    //   );
    // },
    downloadFile(){
      window.location.href = "http://xxx.xxx.xxx.xxx/downloadFile?token=xxx&path=" + this.downloadFileUrl;
      this.$message.success('下载成功！');
    },
    clickCancel(){
      console.log('点击了取消');
    },
    clickDanger(){
      console.log('这里是danger回调')
    },
    clickConfirm(){
      console.log('点击了confirm');
    },



    // //导出excel
    // exportExcel() {
    //   this.$_fetch_visitorInfo({
    //     pageNum: -1,
    //     guestName: this.visitorName,
    //     guestCredit: this.visitorCredit
    //   }).then(res => {
    //     let excelData = res.pageBean.dataList;
    //     let fileName = "visitInfo";
    //     let headers = "姓名,身份证,联系方式,邮箱,单位,信誉分,";
    //     let json = [];
    //     for (let i in excelData) {
    //       let temp = {};
    //       temp["姓名"] = excelData[i].guestName;
    //       temp["身份证"] = excelData[i].guestId;
    //       temp["联系方式"] = excelData[i].guestTelephone;
    //       temp["邮箱"] = excelData[i].guestEmail;
    //       temp["单位"] = excelData[i].guestCompany;
    //       temp["信誉分"] = excelData[i].guestCredit.toString();
    //       json.push(temp);
    //     }
    //     json = JSON.stringify(json);
    //     // Excelpost({ fileName, headers, json });
    //   });
    // },
    // //分页
    // currentChange(num) {
    //   this.$_fetch_visitorInfo({
    //     pageNum: num,
    //     guestName: this.visitorName,
    //     guestCredit: this.visitorCredit
    //   }).then(res => {
    //     this.visiInfo = res.pageBean.dataList;
    //     this.recordNum = res.pageBean.recordNum;
    //   });
    // },
    // //查询访客信息
    // visitorInfoSearch() {
    //   this.$_fetch_visitorInfo({
    //     guestName: this.visitorName,
    //     guestCredit: this.visitorCredit
    //   }).then(res => {
    //     this.visiInfo = res.pageBean.dataList;
    //     this.recordNum = res.pageBean.recordNum;
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
  .newpati{
    margin-top: 35px;
    color:blue;
  }
  .buttonnew{
    margin-top: 175px;
    clear:both;
  }
  .patichoose{
    float: left;
    /*background: lawngreen;*/
    width: 150px;
    height: 50px;
    .text{
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
  .slideTwo input[type=checkbox]:checked + label {
    left: 54px;
  }
  .slideTwo input[type=checkbox]:checked + label:after {
    background: #00bf00;
  }
  .tableTitle {
    position: relative;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 15px;

    width: 100%;
    height: 3px;
    background-color: #d4d4d4;
    text-align: center;
    font-size: 16px;
    color: rgba(101, 101, 101, 1);
  }
  .tableTitle3 {
    position: relative;
    margin: 0 auto;
    margin-top: 80px;
    margin-bottom: 15px;

    width: 100%;
    height: 3px;
    background-color: #d4d4d4;
    text-align: center;
    font-size: 16px;
    color: rgba(101, 101, 101, 1);
  }
  .tableTitle2 {
    position: relative;
    margin: 0 auto;
    margin-top: 80px;
    margin-bottom: 15px;

    width: 100%;
    height: 3px;
    background-color: #d4d4d4;
    text-align: center;
    font-size: 16px;
    color: rgba(101, 101, 101, 1);
  }
  .tableTitle1 {
    position: relative;
    margin: 0 auto;
    margin-top: 95px;
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

.CreateMeeting{
  position: relative;
  .meetingbutton{
    float:left
  }
  .MeetingInfo{
    .theme{
      margin-top: 20px;
      width: 600px;
    }
    .host{
      margin-left: 10px;
      margin-top: 5px;
      width: 600px;
    }
    .date{
      margin-top: 5px;
      width: 600px;
    }
  }
  .MeetingPati{

  }
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