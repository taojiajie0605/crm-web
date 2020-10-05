<template>
    <div class="ChatList">
        <div
            class="chatlist"
            :class="{
                charlist: visible,
                appear: visible,
                disappear: hide,
                chatlisthide: hide,
            }"
            v-if="visible"
        >
            <a-row>
                <a-col :span="5">
                    <h3 style="font-weight: 600;">{{ ChTitle }}</h3>
                </a-col>
                <a-col
                    :span="2"
                    align="left"
                    style="cursor: pointer;"
                    @click="bell"
                >
                    <a-icon
                        type="bell"
                        :theme="bellstyle ? 'filled' : 'outlined'"
                        :style="bellstyle ? 'color: #2362fb' : 'color: red'"
                    />
                </a-col>
                <a-col :span="9" />
                <!-- 添加联系人 -->
                <a-col :span="4" align="right" class="chatplus" @click="onPlus">
                    +
                </a-col>
                <AddGroup ref="AddGroup" />
                <!-- 关闭聊天 -->
                <a-col
                    :span="4"
                    align="right"
                    class="chatclose"
                    @click="onClose"
                >
                    +
                </a-col>
            </a-row>
            <!-- 搜索行 -->
            <a-row class="flex">
                <a-input
                    @change="onSearch"
                    allowClear
                    placeholder="搜索同事、群聊"
                >
                    <div slot="addonBefore">
                        <a-icon type="search" />
                    </div>
                </a-input>
                <a
                    style="width: 60px; font-size: 18px;"
                    v-if="selectedtab === 4"
                    @click="searchcancle"
                >
                    取消
                </a>
            </a-row>
            <!-- 三个消息选择 -->
            <a-row v-if="selectedtab !== 4">
                <a-col :span="8" align="center">
                    <a-icon
                        type="message"
                        theme="filled"
                        :style="
                            selectedtab === 1
                                ? 'color: #2362fb'
                                : 'color: #aaaaaa'
                        "
                        style="font-size: 24px; cursor: pointer;"
                        @click="messageClick"
                    />
                </a-col>
                <a-col :span="8" align="center">
                    <a-icon
                        type="aliwangwang"
                        theme="filled"
                        :style="
                            selectedtab === 2
                                ? 'color: #2362fb'
                                : 'color: #aaaaaa'
                        "
                        style="font-size: 24px; cursor: pointer;"
                        @click="contactClick"
                    />
                </a-col>
                <a-col :span="8" align="center">
                    <a-icon
                        type="wechat"
                        theme="filled"
                        :style="
                            selectedtab === 3
                                ? 'color: #2362fb'
                                : 'color: #aaaaaa'
                        "
                        style="font-size: 24px; cursor: pointer;"
                        @click="groupClick"
                    />
                </a-col>
            </a-row>
            <div class="showbox">
                <ch-message
                    ref="ChMessage"
                    @openChatBox="openChatBox"
                    v-if="selectedtab === 1"
                />
                <ch-contact
                    ref="ChContact"
                    @openChatBox="openChatBox"
                    v-if="selectedtab === 2"
                />
                <ch-group
                    ref="ChGroup"
                    @openChatBox="openChatBox"
                    v-if="selectedtab === 3"
                />
                <search-Content
                    ref="SearchContent"
                    @openChatBox="openChatBox"
                    v-if="selectedtab === 4"
                    :chartsearch="chartsearch"
                />
            </div>
        </div>
        <ch-box ref="ChBox" />
    </div>
</template>

<script>
import ChMessage from './comp/ChMessage'; //聊天列表
import ChContact from './comp/ChContact'; //联系人列表
import ChGroup from './comp/ChGroup'; //聊天群
import ChBox from './comp/ChBox'; //聊天窗口
import SearchContent from './comp/SearchContent'; //搜索内容
import AddGroup from './comp/AddGroup'; //创建群聊
import { request, METHOD } from '@/utils/request';
export default {
    name: 'ChatList',
    props: ['currentWidth'],
    components: {
        ChMessage,
        ChBox,
        ChContact,
        ChGroup,
        AddGroup,
        SearchContent,
    },
    data() {
        return {
            visible: false,
            hide: false,
            bellstyle: true,
            selectedtab: 1, // 1是消息，2是联系人，3是群组，4是搜索
            ChTitle: '消息',
            chartsearch: {}, //搜索后的内容
        };
    },
    methods: {
        //搜索
        onSearch(value) {
            this.selectedtab = 4;
            request('/chartsearch', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                searchvalue: value, //搜索内容
            }).then((data) => {
                console.log(data.data.answer);
                this.chartsearch = data.data.answer;
            });
        },

        //取消搜索
        searchcancle() {
            this.selectedtab = 1;
        },

        //新建群聊
        onPlus() {
            //console.log('1111111111111');
            this.$refs.AddGroup.visible = true;
        },
        onClose() {
            this.hide = true;
            setTimeout(() => {
                this.visible = false;
            }, 500);
        },
        bell() {
            this.bellstyle = !this.bellstyle;
            if (this.bellstyle == true) {
                this.$message.success('已经开启消息通知!');
            } else {
                this.$message.error('已经关闭消息通知!');
            }
        },
        messageClick() {
            this.selectedtab = 1;
            this.ChTitle = '消息';
        },
        contactClick() {
            this.selectedtab = 2;
            this.ChTitle = '联系人';
        },
        groupClick() {
            this.selectedtab = 3;
            this.ChTitle = '群组';
        },
        openChatBox(item) {
            this.$refs.ChBox.visible = false;
            this.$refs.ChBox.hide = false;
            this.$refs.ChBox.animeready = false;
            setTimeout(() => {
                this.$refs.ChBox.boxdata = item;
                this.$refs.ChBox.visible = true;
            }, 100);
            setTimeout(() => {
                this.$refs.ChBox.animeready = true;
            }, 500);
        },
    },
};
</script>

<style lang="less" scoped>
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: space-between;
}
/* 定义打开关闭好友列表的动画 */
@keyframes aniappear {
    from {
        right: -200px;
    }
    to {
        right: 1px;
    }
}
@keyframes anidisappear {
    from {
        right: 1px;
    }
    to {
        right: -500px;
    }
}
.chatlist {
    position: absolute;
    top: 50px;
    right: 1px;
    height: 90vh;
    width: 20vw;
    padding: 10px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: #d8dadd -3px 1px 10px 2px;
}
.chatlisthide {
    position: absolute;
    top: 50px;
    right: -500px;
    height: 90vh;
    width: 20vw;
    padding: 10px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: #d8dadd -3px 1px 10px 2px;
}
.appear {
    animation: aniappear 0.5s;
}
.disappear {
    animation: anidisappear 1s;
}
/* 加号的样式 */
.chatplus {
    font-size: 36px;
    line-height: 40px;
    cursor: pointer;
}
.chatplus:hover {
    color: blue;
}
/* 关闭按钮的样式 */
.chatclose {
    font-size: 40px;
    line-height: 30px;
    cursor: pointer;
    transform: rotate(45deg);
}
.chatclose:hover {
    color: red;
}
/* tabpane自定义样式 */
.showbox {
    width: 100%;
    height: calc(100% - 152px);
    border: hidden;
}
// 改变ui库中card的样式
::v-deep .ant-card-body {
    padding: 0px;
}
</style>
