<template>
    <div>
        <div class="ti">
            本人状态
        </div>
        <el-card class="box-card" v-loading="loading" element-loading-text="数据加载中请稍等。">
            <el-card style="margin-bottom: 10px;">
                <el-descriptions title="个人信息">
                    <el-descriptions-item label="姓名">{{ userInfo.name }}</el-descriptions-item>
                    <el-descriptions-item label="角色">{{ userInfo.role }}</el-descriptions-item>
                    <el-descriptions-item label="email">{{ userInfo.email }}</el-descriptions-item>
                </el-descriptions>
                <el-button type="primary" @click="toaccountsetting">账户设置</el-button>
                <el-button type="primary" @click="helper">用户指南</el-button>
            </el-card>

            <el-card style="margin-bottom: 10px;">
                <el-descriptions title="当前会议信息">
                    <el-descriptions-item label="当前会议">{{ meeting.Theme }}</el-descriptions-item>
                    <el-descriptions-item label="会议时间">{{ meeting.Date }}</el-descriptions-item>
                    <el-descriptions-item label="会议主持人">{{ meeting.Hoster }}</el-descriptions-item>
                    <el-descriptions-item label="会议号">{{ meeting.number }}</el-descriptions-item>
                    <el-descriptions-item label="会议链接"><a :href="meeting.link">{{ meeting.link }}</a></el-descriptions-item>
                </el-descriptions>
                <el-button type="primary" @click="checkmeeting">查看议程</el-button>
                <el-tooltip v-if="!isaccept" content="接受邀请后可添加议程" placement="top">
                    <el-button type="primary" @click="addprocess" disabled>添加议程</el-button>
                </el-tooltip>

                <el-button v-else type="primary" @click="addprocess">添加议程</el-button>

            </el-card>

            <el-card style="margin-bottom: 10px;">
                <div v-if=dialogVisible>
                    <el-descriptions title="是否接受会议邀请">
                    </el-descriptions>
                    <el-button type="success" @click="accept">接受邀请</el-button>
                    <el-button type="danger" @click="refuse">拒绝邀请</el-button>
                </div>
                <div v-else>
                    <el-descriptions title="已确认过邀请">
                        <el-descriptions-item label="确认结果">{{ myprocess.participation }}</el-descriptions-item>
                    </el-descriptions>
                    <!-- <el-button type="success" @click="accept" disabled>接受邀请</el-button>
                    <el-button type="danger" @click="refuse" disabled>拒绝邀请</el-button> -->
                </div>
            </el-card>
        </el-card>

    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            userInfo: [],
            meeting: [],
            isaccept: false,
            dialogVisible: true,
            myprocess: [],
            loading: false
        };
    },
    created() {
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        this.getMeetingData();

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
        setMyProcessData(isaccept) {
            const path = '/api/setMyProcessData';
            axios.post(path, { id: this.myprocess.id, isaccept: isaccept }).then(res => {
                this.getparticipation()
            }).catch(error => {
                console.error(error);
            });
        },
        getparticipation() {
            const path = '/api/getMyProcessData';
            this.loading = true
            axios.post(path, { meetingid: this.meeting.id, people: this.userInfo.name }).then(res => {
                this.myprocess = res.data.reslist[0];
                sessionStorage.setItem(
                    "MyProcessData",
                    JSON.stringify({
                        id: this.myprocess.id,
                        participation: this.myprocess.participation
                    })
                );
                console.log(this.myprocess)
                switch (this.myprocess.participation) {
                    case "unconfirmed":
                        this.dialogVisible = true; // 或者其他逻辑
                        break;
                    case "accept":
                        this.dialogVisible = false; // 设定 accept 状态下的值
                        this.isaccept = true;
                        break;
                    case "refuse":
                        this.dialogVisible = false; // 设定 refuse 状态下的值
                        this.isaccept = false;
                        break;
                    default:
                        this.dialogVisible = true; // 默认情况下的值
                        break;
                }
                this.loading = false
            }).catch(error => {
                console.error(error);
                this.dialogVisible = true;
            });
        },
        getMeetingData() {
            const path = '/api/getCurrentmeeting';
            axios.post(path, { aaa: "hhhhhhh" }).then(res => {
                this.meeting = res.data.reslist[0];
                console.log(this.meeting)
                this.getparticipation()
            }).catch(error => {
                console.error(error);
            });
        },
        toaccountsetting() {
            this.$router.push({ name: 'accountsetting' });
        },
        checkmeeting() {
            this.$router.push({ name: 'MeetingProcess' });
        },
        addprocess() {
            this.$router.push({ name: 'newProcess' });
        },
        accept() {
            this.setMyProcessData("accept")
        },
        refuse() {
            this.setMyProcessData("refuse")
        },
        helper() {
            this.$router.push({ name: 'Userhelper' });
        }
    }
};
</script>
  
<style scoped>
.card-ti {
    color: #1a1a1a;
    font-size: 16px;
    font-weight: 500;
    line-height: 34px;
}

.thismeeting {

    margin: 1%;
    width: 280px;
}

.el-table {
    margin-bottom: 3%;
}

.ti {
    margin-left: 1%;
    margin-top: 1%;
    color: #1a1a1a;
    font-size: 24px;
    font-weight: 500;
    line-height: 34px;
}


.box-card {
    margin-left: 1%;
    margin-right: 3%;
    margin-top: 1%;
    border-radius: 8px;
}

.accessRecord-wrapper {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.accessRecord-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.accessRecord-header {
    font-size: 24px;
    font-weight: 600;
    color: #444;
    /* Adjusted the color to a deep gray */
    letter-spacing: 0.5px;
    /* Added some letter-spacing for better readability */
}

.inputs {
    display: flex;
    gap: 10px;
    /* or you can use margin-right on child elements if the browser doesn't support 'gap' */
}

.accessRecord-table {
    background-color: #fff;
}
</style>
  