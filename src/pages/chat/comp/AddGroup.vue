<template>
    <div>
        <a-modal
            title="创建群聊"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="创建群聊"
            @cancel="handleCancel"
            width="900px"
            :bodyStyle="{ height: '350px' }"
        >
            <a-row>
                <!-- 所有已选成员 -->
                <a-col :span="12">
                    <a-menu
                        style="width: 100%;"
                        :defaultOpenKeys="['sub']"
                        mode="inline"
                        multiple
                        v-model="selectedKeys"
                        class="scroll"
                    >
                        <a-sub-menu key="sub">
                            <span slot="title">
                                <a-icon type="caret-right" />
                                <span>公司成员</span>
                            </span>
                            <a-menu-item
                                :key="index"
                                v-for="(element, index) in allmembers"
                            >
                                <a-avatar
                                    size="default"
                                    style="
                                        background-color: #2362fb;
                                        margin-right: 10px;
                                    "
                                >
                                    {{ element.name }}
                                </a-avatar>
                                {{ element.name }}
                            </a-menu-item>
                        </a-sub-menu>
                    </a-menu>
                </a-col>
                <!-- 已选成员 -->
                <a-col :span="12">
                    <a-alert message="已选" type="info" />
                    <a-card class="tab-content scroll">
                        <div
                            class="ch-item"
                            v-for="(item, index) in selectedKeys"
                            :key="(item, index)"
                        >
                            <a-row>
                                <a-col :span="6">
                                    <img
                                        class="ch-img"
                                        :src="allmembers[item].img"
                                        alt=""
                                    />
                                </a-col>
                                <a-col :span="18">
                                    <a-row>
                                        <a-col
                                            :span="24"
                                            style="
                                                font-size: 17px;
                                                font-weight: 600;
                                                margin-top: 10px;
                                            "
                                        >
                                            {{ allmembers[item].name }}
                                        </a-col>
                                    </a-row>
                                    <a-row>
                                        <a-col
                                            :span="24"
                                            style="font-size: 14px;"
                                        >
                                            {{ allmembers[item].department }} |
                                            {{ allmembers[item].position }}
                                        </a-col>
                                    </a-row>
                                </a-col>
                            </a-row>
                        </div>
                    </a-card>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';

export default {
    data() {
        return {
            //弹出框
            visible: false, //弹出框是否可见
            confirmLoading: false, //提交加载

            allmembers: [], //所有的公司成员
            selectedKeys: [], //选择的公司成员
        };
    },
    //初始查询
    mounted() {
        this.handleallcontacts();
    },

    methods: {
        //提交/取消
        handleOk() {
            this.confirmLoading = true;
            const groupmember = []; //添加组的成员
            for (let i = 0; i < this.selectedKeys.length; i++) {
                groupmember[i] = this.allmembers[this.selectedKeys[i]];
            }
            //console.log(groupmember);
            request('/addgroup', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                groupmember: groupmember, //添加组的成员
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.confirmLoading = false;
            });
            this.visible = false;
            this.selectedKeys = []; //已选置空
        },
        handleCancel() {
            this.selectedKeys = []; //已选置空
            this.visible = false;
        },

        //所有成员请求
        handleallcontacts() {
            request('/allmembers', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
            }).then((data) => {
                //console.log(data.data.answer);
                this.allmembers = data.data.answer;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.status {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.ch-item {
    height: 70px;
    width: 100%;
    cursor: pointer;
    // border-bottom: 1px solid #dedede;
}
.ch-item:hover {
    cursor: pointer;
    background-color: #f1f1f1;
    border-radius: 10px;
    border-left: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
}
// .ch-item:hover+.ch-item::before {
//     border: none;
// }
.ch-img {
    display: inline-block;
    margin: 10px;
    width: 50px;
    height: 50px;
    object-fit: cover;
}
/* 很重要，卡片样式 */
.tab-content {
    overflow-y: scroll;
    border: hidden;
    // height: 600px;
}

//滚动条css
.scroll {
    height: 300px;
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
</style>
