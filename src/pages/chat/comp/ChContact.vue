<template>
    <div class="ch-contact">
        <a-card class="tab-content scroll" v-if="select === '1'">
            <!-- 公司索引 -->
            <div class="ch-item" @click="handlecomponey(companydata.id)">
                <a-row>
                    <a-col :span="6">
                        <img class="ch-img" :src="companydata.img" />
                    </a-col>
                    <div class="flex">
                        <a-col :span="16">
                            <a-row>
                                <a-col
                                    :span="24"
                                    style="
                                        font-size: 17px;
                                        font-weight: 600;
                                        margin-top: 10px;
                                    "
                                >
                                    {{ companydata.title }}
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="24" style="font-size: 14px;">
                                    组织架构 | {{ companydata.membersnum }}人
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :span="2">
                            <a-icon type="right" />
                        </a-col>
                    </div>
                </a-row>
            </div>
            <a-divider>公司成员</a-divider>
            <!-- 公司成员 -->
            <div
                class="ch-item"
                v-for="(item, index) in companydata.members"
                :key="(item, index)"
                @click="openChatBox(item)"
            >
                <a-row>
                    <a-col :span="6">
                        <img class="ch-img" :src="item.img" alt="" />
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
                                {{ item.name }}
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24" style="font-size: 14px;">
                                {{ item.department }} | {{ item.position }}
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>
        </a-card>
        <!-- 部门架构查询 -->
        <a-card class="tab-content scroll" v-else-if="select === '2'">
            <div @click="backcomp" style="cursor: pointer;">
                <a-alert :message="departmentdata.title" type="info" show-icon>
                    <template slot="icon">
                        <a-icon type="left" />
                    </template>
                </a-alert>
            </div>
            <div
                class="flex"
                v-for="(item, index) in departmentdata.content"
                :key="index"
                style="
                    justify-content: space-between;
                    padding: 12px;
                    background: #ffffff;
                    border: 1px solid #cccccc;
                    cursor: pointer;
                    border-radius: 5px 5px 5px 5px;
                "
                onMouseOut="this.style.backgroundColor
                        ='#FFFFFF';"
                onMouseOver="this.style.backgroundColor
                        ='#f5f6f9';"
                @click="handledepartment(item.id)"
            >
                <div>
                    {{ item.title }}
                </div>
                <div>
                    {{ item.membernum }}
                    <a-icon type="right" />
                </div>
            </div>
        </a-card>
        <!-- 部门中的员工 -->
        <a-card class="tab-content scroll" v-else>
            <div @click="backdepart" style="cursor: pointer;">
                <a-alert :message="memberdata.title" type="info" show-icon>
                    <template slot="icon">
                        <a-icon type="left" />
                    </template>
                </a-alert>
            </div>
            <div
                class="ch-item"
                v-for="(item, index) in memberdata.members"
                :key="(item, index)"
                @click="openChatBox(item)"
            >
                <a-row>
                    <a-col :span="6">
                        <img class="ch-img" :src="item.img" alt="" />
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
                                {{ item.name }}
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24" style="font-size: 14px;">
                                {{ item.department }} | {{ item.position }}
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>
        </a-card>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import ChatBox from './ChBox';
export default {
    name: 'ChContact',
    components: {
        ChatBox,
    },
    data() {
        return {
            companydata: [], //所有成员
            departmentdata: [], //部门架构
            memberdata: [], //该部门员工
            select: '1',
        };
    },
    mounted() {
        this.fetchCompany();
    },
    methods: {
        //公司搜索以及全部人员
        fetchCompany() {
            request('/allcontacts', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
            }).then((data) => {
                //console.log(data.data.answer);
                this.companydata = data.data.answer;
            });
        },

        //按公司索引搜索
        handlecomponey(id) {
            this.select = '2';
            request('/ChCompanyMember', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                compid: id, //公司id
            }).then((data) => {
                //console.log(data.data.answer);
                this.departmentdata = data.data.answer;
            });
        },

        //按部门搜索
        handledepartment(id) {
            this.select = '3';
            request('/members', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                departid: id, //部门id
            }).then((data) => {
                //console.log(data.data.answer);
                this.memberdata = data.data.answer;
            });
        },

        //返回联系人首页
        backcomp() {
            this.select = '1';
        },
        //返回部门
        backdepart() {
            this.select = '2';
        },

        openChatBox(item) {
            this.$emit('openChatBox', item);
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
/* //滚动条css */
.scroll {
    border: hidden;
    height: 65vh;
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

/deep/.ant-alert-icon {
    top: 7px;
}
</style>
