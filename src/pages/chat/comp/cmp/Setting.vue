<template>
    <a-dropdown placement="bottomRight">
        <a-icon
            type="setting"
            style="font-size: 20px; cursor: pointer;"
            class="chboxtab"
        />
        <a-menu slot="overlay">
            <a-menu-item @click="topchat">
                置顶聊天
            </a-menu-item>
            <a-menu-item @click="startorenddisturb">
                开启/关闭免打扰
            </a-menu-item>
            <a-menu-item @click="addgroupmember" v-if="boxdata.groupname">
                添加群成员
            </a-menu-item>
            <a-menu-item @click="seegroupmember" v-if="boxdata.groupname">
                查看群成员
            </a-menu-item>
            <a-menu-item @click="seeinfo" v-if="boxdata.groupname">
                查看关联资料
            </a-menu-item>
            <a-menu-item @click="signoutgroup" v-if="boxdata.groupname">
                退出群
            </a-menu-item>
        </a-menu>
    </a-dropdown>
</template>

<script>
import { request, METHOD } from '@/utils/request';

export default {
    props: ['boxdata'], //聊天对象信息/聊天组信息
    data() {
        return {};
    },
    //初始查询
    mounted() {},

    methods: {
        //聊天置顶
        topchat() {
            request('/topchat', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                boxdata: this.boxdata, //聊天对象信息
            }).then((data) => {
                //console.log(data.data.answer);
                this.$message.success(data.data.msg);
            });
        },

        //开启/关闭免打扰
        startorenddisturb() {
            request('/startorenddisturb', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                boxdata: this.boxdata, //聊天对象信息
            }).then((data) => {
                //console.log(data.data.answer);
                this.$message.success(data.data.msg);
            });
        },

        //添加群成员
        addgroupmember() {
            request('/addgroupmember', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                boxdata: this.boxdata, //聊天对象信息
            }).then((data) => {
                //console.log(data.data.answer);
                this.$message.success(data.data.msg);
            });
        },

        //查看群成员
        seegroupmember() {
            request('/seegroupmember', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                boxdata: this.boxdata, //聊天对象信息
            }).then((data) => {
                //console.log(data.data.answer);
                this.$message.success(data.data.msg);
            });
        },

        //查看关联资料
        seeinfo() {
            request('/seeinfo', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                boxdata: this.boxdata, //聊天对象信息
            }).then((data) => {
                //console.log(data.data.answer);
                this.$message.success(data.data.msg);
            });
        },

        //退出群
        signoutgroup() {
            request('/signoutgroup', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                boxdata: this.boxdata, //聊天对象信息
            }).then((data) => {
                //console.log(data.data.answer);
                this.$message.success(data.data.msg);
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
</style>
