<template>
    <div>
    <el-form ref="addForm" :model="addForm" label-width="130px" label-position="left">
        <el-form-item label="上传文件">
            <el-input v-model="addForm.fileName" placeholder="请上传文件" style="width: 220px;" :disabled="true">
            </el-input>

            <el-upload
                    style="width: 200px;display: inline;margin-left: 25px;"
                    class="upload-demo"
                    ref="upload"
                    action=""
                    :show-file-list="true"
                    :before-upload="beforeUpload">
                <el-button slot="trigger" type="danger" icon="el-icon-upload2">选取文件</el-button>
                <el-button type="danger" @click="viewFile" icon="el-icon-view">预览</el-button>
            </el-upload>
        </el-form-item>
    </el-form>
    <pdf
            :src="pdfUrl"
            :page="currentPage"
            @num-pages="pageCount=$event"
            @page-loaded="currentPage=$event"
            @loaded="loadPdfHandler">
    </pdf>


    <el-button type="primary" @click="changePdfPage(0)" icon="el-icon-back">上一页</el-button>
    <el-button type="primary">{{currentPage}} / {{pageCount}}</el-button>
    <el-button type="primary" @click="changePdfPage(1)" icon="el-icon-right">下一页</el-button>
    <el-button type="primary" @click="downloadFile()" icon="el-icon-download">下载</el-button>
    </div>

</template>

<script>
    import pdf from 'vue-pdf';
    export default {
        components: {pdf},
        data() {
            return {
                addForm:{
                    file:null,
                    fileName:'',
                    fileData:null
                },
                currentPage: 0, // pdf文件页码
                pageCount: 0, // pdf文件总页数
                fileType: 'pdf', // 文件类型
                pdfUrl: '', // pdf文件地址
            }
        },
        methods:{
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
            loadPdfHandler () {
                this.currentPage = 1 // 加载的时候先加载第一页
            },
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
            submitAddForm(){
                var formData = new FormData();
                formData.append('uploadPdf', this.addForm.file);
                this.$commonAjax.postFile('/xxx/xxx', formData,
                    (json)=> {
                        if (json.code == 0) {
                            this.$message.success("文件上传成功");
                        } else {
                            this.$message.error("文件上传失败");
                        }
                    },
                    ()=> {
                        this.$message.error("系统繁忙请稍后再试!");
                    }
                );
            },
            downloadFile(){
                window.location.href = "http://xxx.xxx.xxx.xxx/downloadFile?token=xxx&path=" + this.downloadFileUrl;
                this.$message.success('下载成功！');
            }
        },
        mounted() {
            this.initPdf();
        },
        created(){
        }
    }
</script>

<style scoped>
</style>