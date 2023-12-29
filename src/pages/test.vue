<template>
    <div class="hello">
        <div>
            <button  @click="jilu">
                是否记录本次会议数据
            </button>
            <button  class="orange" @click="sendemailall">
                发送数据给所有参会者
            </button>
            <button  class="orange" @click="sendemail">
                发送数据给指定参会者
            </button>
        </div>

        <div class="patichoose"  v-for="(item,index) in data_list" :key="index">
            <p class="text">{{item.name}}</p>
            <div class="slideTwo">
                <input type="checkbox" class="check_box tui-checkbox" :id="'id'+item.id" :value="item.name" v-model="checkedNames">
                <label :for="'id'+item.id" class="title"></label >
            </div>
        </div>
        <h1>success:{{ send_email }}</h1>

    </div>
</template>

<script>
    import  axios from 'axios';
    export default {
        name: 'hello',
        data () {
            return {
                data_list:[{id:1,name:"aaa"},{id:2,name:"bbb"},{id:3,title:"ccc"}],
                checkedNames: [],
                send_email:0,
                // msg: 'Welcome to Your Vue.js App',
                // theme: '',
                // hoster: '',
                // date: '',
                // pati: '',

            }
        },
        created() {
            this.getpatiData();

        },
        methods: {
            jilu(){

            },
            sendemailall(){
                const path =  '/api/sendEmailAll';
                axios.post(path).then(res => {
                    // var msg = res.data.id;
                    // this.new_time_data.push(msg);
                    this.send_email = res.data.success;
                    console.log(res);
                }).catch(error => {
                    console.error(error);
                });
            },
            sendemail(){
                const path =  '/api/sendEmailByName';
                axios.post(path,{namelist: this.checkedNames}).then(res => {
                    // var msg = res.data.id;
                    // this.new_time_data.push(msg);
                    this.send_email = res.data.success;
                    console.log(res);
                }).catch(error => {
                    console.error(error);
                });
            },
            getpatiData(){
                // const path = 'http://127.0.0.1:5000/getPati';
                const path =  '/api/getPati';
                axios.post(path,{aaa: "hhhhhhh"}).then(res => {
                    // var msg = res.data.id;
                    // this.new_time_data.push(msg);
                    this.data_list = res.data.reslist;
                    console.log(this.data_list);
                    console.log(res);
                }).catch(error => {
                    console.error(error);
                });
            },
        }
    }
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
        margin-top: 15px;
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