<template>
    <!-- 这是聊天的窗口 -->
    <div class="container">
        <div
            v-if="visible"
            :class="{
                chatbox: visible,
                appear: visible,
                disappear: hide,
                chatboxhide: hide,
            }"
        >
            <!-- 顶部header -->
            <a-row v-if="!hide && animeready">
                <a-col
                    :span="20"
                    align="left"
                    style="font-size: 20px; font-weight: 600;"
                >
                    {{ boxdata.name }}{{ boxdata.groupname }}
                </a-col>
                <a-col :span="2" align="right">
                    <Setting ref="Setting" :boxdata="boxdata" />
                </a-col>
                <a-col :span="2" align="right">
                    <a-icon
                        type="close"
                        class="chboxtab"
                        style="font-size: 20px;"
                        @click="onClose"
                    />
                </a-col>
            </a-row>
            <!-- 聊天内容 -->
            <div class="dialog scroll" ref="msg-box" v-if="!hide">
                <div
                    v-for="(i, index) in list"
                    :key="index"
                    class="msg flex"
                    :style="
                        i.username === userInfo.username
                            ? 'display: flex; flex-direction:row-reverse'
                            : ''
                    "
                >
                    <a-avatar
                        size="large"
                        style="background-color: #2362fb; margin: 10px;"
                    >
                        {{ i.username }}
                    </a-avatar>
                    <div class="user-msg">
                        <span
                            style="font-size: 20px;"
                            :style="
                                i.username === userInfo.username
                                    ? ' float: right;'
                                    : ''
                            "
                            :class="
                                i.username === userInfo.username
                                    ? 'right'
                                    : 'left'
                            "
                        >
                            {{ i.msg }}
                        </span>
                    </div>
                </div>
            </div>
            <!-- 底部4个功能 -->
            <a-row v-if="!hide && animeready">
                <!-- 上传图片 -->
                <a-col :span="2">
                    <a-upload
                        name="file"
                        :multiple="true"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChange"
                    >
                        <a-icon
                            class="chboxicon"
                            type="picture"
                            style="font-size: 20px;"
                        />
                    </a-upload>
                </a-col>
                <!-- 表情 -->
                <a-col :span="2">
                    <a-tooltip>
                        <template slot="title">
                            <div style="width: 120px; height: 150px;">
                                <div
                                    style="
                                        display: flex;
                                        flex-wrap: wrap;
                                        width: 100%;
                                    "
                                >
                                    <div
                                        :key="index"
                                        v-for="(element, index) in emoji"
                                        style="
                                            width: 25%;
                                            cursor: pointer;
                                            font-size: 20px;
                                        "
                                        @click="addemoji(element.content)"
                                    >
                                        {{ element.content }}
                                    </div>
                                    <!-- <img
                                        :key="index"
                                        v-for="(element, index) in emoji"
                                        style="width: 25%; cursor: pointer;"
                                        :src="element.content"
                                        @click="addemoji(element.code)"
                                    /> -->
                                </div>
                            </div>
                        </template>
                        <a-icon
                            class="chboxicon"
                            type="smile"
                            style="font-size: 20px;"
                        />
                    </a-tooltip>
                </a-col>
                <!-- 上传文件 -->
                <a-col :span="2">
                    <a-upload
                        name="file"
                        :multiple="true"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChange"
                    >
                        <a-icon
                            class="chboxicon"
                            type="link"
                            style="font-size: 20px;"
                        />
                    </a-upload>
                </a-col>
                <a-col :span="2">
                    <a-icon
                        class="chboxicon"
                        type="video-camera"
                        style="font-size: 20px;"
                    />
                </a-col>
            </a-row>
            <!-- 底部输入框 -->
            <a-col v-if="!hide && animeready">
                <a-row :span="24">
                    <a-textarea
                        rows="4"
                        style="
                            resize: none;
                            height: 14vh;
                            border: 1px solid #96c2f1;
                            font-size: 20px;
                        "
                        ref="sendMsg"
                        v-model="contentText"
                        @keyup.enter="sendText()"
                    />
                </a-row>
                <a-row>
                    <a-button
                        type="primary"
                        style="height: 4vh; float: right; margin-top: 8px;"
                        @click="sendText()"
                    >
                        发送
                    </a-button>
                </a-row>
            </a-col>
        </div>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import Setting from './cmp/Setting';
export default {
    name: 'ChBox',
    components: {
        Setting,
    },
    data() {
        return {
            userInfo: JSON.parse(sessionStorage.userinfo),
            visible: false,
            hide: false,
            animeready: false,
            boxdata: {}, //聊天对象信息/聊天组信息

            ws: null, //websocket对象
            list: [], //聊天记录的数组
            contentText: '', //input输入的值
            //表情包
            emoji: [
                { code: '1', content: '😀' },
                { code: '2', content: '😄' },
                { code: '3', content: '😁' },
                { code: '4', content: '😆' },
                { code: '5', content: '😅' },
                { code: '6', content: '🤣' },
                { code: '7', content: '😂' },
                { code: '8', content: '🙂' },
                { code: '9', content: '🙃' },
                { code: '10', content: '😉' },
                { code: '11', content: '😊' },
                { code: '12', content: '😇' },
                { code: '13', content: '🥰' },
                { code: '14', content: '😍' },
                { code: '15', content: '😋' },
                { code: '16', content: '😛' },
                { code: '17', content: '🤐' },
                { code: '18', content: '😑' },
                { code: '19', content: '😷' },
                { code: '20', content: '🤮' },
            ],
            //     emoji: [
            //         {
            //             code: '#aini',
            //             content: require('@/assets/img/emoji/aini.png'),
            //         },
            //         {
            //             code: '#bishi',
            //             content: require('@/assets/img/emoji/bishi.png'),
            //         },
            //         {
            //             code: '#bizui',
            //             content: require('@/assets/img/emoji/bizui.png'),
            //         },
            //         {
            //             code: '#bulini',
            //             content: require('@/assets/img/emoji/bulini.png'),
            //         },
            //         {
            //             code: '#daku',
            //             content: require('@/assets/img/emoji/daku.png'),
            //         },
            //         {
            //             code: '#deyi',
            //             content: require('@/assets/img/emoji/deyi.png'),
            //         },
            //         {
            //             code: '#gaxiao',
            //             content: require('@/assets/img/emoji/gaxiao.png'),
            //         },
            //         {
            //             code: '#jiaxiao',
            //             content: require('@/assets/img/emoji/jiaxiao.png'),
            //         },
            //         {
            //             code: '#kaixin',
            //             content: require('@/assets/img/emoji/kaixin.png'),
            //         },
            //         {
            //             code: '#keai',
            //             content: require('@/assets/img/emoji/keai.png'),
            //         },
            //         {
            //             code: '#liuhan',
            //             content: require('@/assets/img/emoji/liuhan.png'),
            //         },
            //         {
            //             code: '#nanguo',
            //             content: require('@/assets/img/emoji/nanguo.png'),
            //         },
            //         {
            //             code: '#nanshou',
            //             content: require('@/assets/img/emoji/nanshou.png'),
            //         },
            //         {
            //             code: '#se',
            //             content: require('@/assets/img/emoji/se.png'),
            //         },
            //         {
            //             code: '#weixiao',
            //             content: require('@/assets/img/emoji/weixiao.png'),
            //         },
            //         {
            //             code: '#xiaoku',
            //             content: require('@/assets/img/emoji/xiaoku.png'),
            //         },
            //         {
            //             code: '#xiudaliao',
            //             content: require('@/assets/img/emoji/xiudaliao.png'),
            //         },
            //         {
            //             code: '#yukuai',
            //             content: require('@/assets/img/emoji/yukuai.png'),
            //         },
            //         {
            //             code: '#zhiqi',
            //             content: require('@/assets/img/emoji/zhiqi.png'),
            //         },
            //     ],
            //
        };
    },
    mounted() {},
    watch: {
        boxdata() {
            this.initWebSocket();
        },
    },
    methods: {
        //改变文本内容为表情文本
        // changeEmoji(msg) {
        //     for (let i = 0; i < this.emoji.length; i++) {
        //         const reg = new RegExp(this.emoji[i].code, 'g');
        //         msg = msg.replace(
        //             reg,
        //             '<img style="width: 25px; height:25px;" src="' +
        //                 this.emoji[i].content +
        //                 '"></img>',
        //         );
        //         //console.log('231', msg);
        //     }
        //     return `${msg}`;
        // },
        //输入框中加入表情
        addemoji(code) {
            this.contentText = this.contentText + code;
        },

        //获取当前时间戳
        getFormatDate() {
            const date = new Date();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            const currentDate =
                date.getFullYear() +
                '-' +
                month +
                '-' +
                strDate +
                ' ' +
                date.getHours() +
                ':' +
                date.getMinutes() +
                ':' +
                date.getSeconds();
            return currentDate;
        },
        //新增信息滚动条到底部
        scrollBottm() {
            console.log('165165');
            const el = this.$refs['msg-box'];
            el.scrollTop = el.scrollHeight;
        },
        //发送聊天信息
        sendText() {
            const _this = this;
            _this.$refs['sendMsg'].focus();
            if (!_this.contentText) {
                return;
            }
            console.log('22222', JSON.parse(sessionStorage.userinfo));
            const params = {
                userid: JSON.parse(sessionStorage.userinfo).userid, //用户id
                username: JSON.parse(sessionStorage.userinfo).username, //用户名字
                msgtime: _this.getFormatDate(), //获取时间
                msg: _this.contentText, //发送的内容
            };
            _this.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
            _this.contentText = '';
            setTimeout(() => {
                _this.scrollBottm();
            }, 500);
        },

        //进入页面创建websocket连接
        initWebSocket() {
            const _this = this;
            //判断页面有没有存在websocket连接
            if (window.WebSocket) {
                //  此处本地IP地址 此处的 :8181 端口号 要与后端配置的一致
                const ws = new WebSocket('ws://172.21.16.66:8181');
                _this.ws = ws;
                ws.onopen = function (e) {
                    console.log('服务器连接成功');
                };
                ws.onclose = function (e) {
                    console.log('服务器连接关闭');
                };
                ws.onerror = function () {
                    console.log('服务器连接出错');
                };
                ws.onmessage = function (e) {
                    //接收服务器返回的数据
                    const resData = JSON.parse(e.data);
                    //console.log(resData.userId);
                    if (resData.funName == 'userCount') {
                        //_this.count = resData.users; //多少个人在线
                        _this.list = resData.chat;
                        //console.log(resData.chat);
                    } else {
                        _this.list = [
                            ..._this.list,
                            {
                                userid: resData.userid,
                                msg: resData.msg,
                                username: resData.username,
                                msgtime: resData.msgtime,
                            },
                        ];
                    }
                    setTimeout(() => {
                        _this.scrollBottm();
                    }, 500);
                };
            }
        },

        //聊天框关闭
        onClose() {
            this.hide = true;
            setTimeout(() => {
                this.visible = false;
            }, 500);
        },

        //上传文件/图片方法
        handleChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                this.$message.success(
                    `${info.file.name} file uploaded successfully`,
                );
            } else if (info.file.status === 'error') {
                this.$message.error(`${info.file.name} file upload failed.`);
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import url('./anime.css');

.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    // justify-content: space-between;
}

/* 滚动条css */
.scroll {
    height: 45vh;
    overflow-x: hidden;
    overflow-y: auto;
}
.scroll::-webkit-scrollbar {
    width: 6px;
}
.scroll::-webkit-scrollbar-track {
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
}
.scroll::-webkit-scrollbar-thumb {
    background-color: rgba(95, 95, 95, 0.4);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;

    &:hover {
        background-color: rgba(95, 95, 95, 0.7);
    }
}

//消息样式
.user-msg {
    width: 80%;
    // position: absolute;
    word-break: break-all;
    position: relative;
    span {
        display: inline-block;
        padding: 0rem 1rem;
        border-radius: 0.5rem;
        margin-top: 0.2rem;
        font-size: 0.88rem;
        border: 1px solid #96c2f1;
        box-shadow: 5px 5px 5px #ccc;
    }
    .left {
        background: white;
        animation: toLeft 0.5s ease both 1;
    }
    .right {
        background: #53a8ff;
        color: white;
        animation: toright 0.5s ease both 1;
    }
}
</style>
