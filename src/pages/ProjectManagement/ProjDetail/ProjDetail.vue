<template>
    <a-card>
        <div slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="desktop"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                {{ item.title }}
                <!--设置图标-->
                <a-dropdown class="tool">
                    <a-icon
                        type="setting"
                        style="
                            color: #99a9bf;
                            font-size: 15px;
                            margin-left: 6px;
                            cursor: pointer;
                        "
                    />
                    <a-menu slot="overlay">
                        <a-menu-item
                            @click="AddProjMember"
                            v-if="item.SeeRange === '1'"
                        >
                            添加项目成员
                            <AddProjMember
                                ref="AddProjMember"
                                @fetchAddProjMember="fetchAddProjMember"
                            />
                        </a-menu-item>
                        <a-menu-item> 导入任务 </a-menu-item>
                        <a-menu-item> 导出任务 </a-menu-item>
                        <a-menu-item @click="handleFile">
                            归档项目
                        </a-menu-item>
                        <a-menu-item @click="handleDelete">
                            删除项目
                        </a-menu-item>
                        <a-menu-item
                            v-if="item.SeeRange === '1'"
                            @click="handleExit"
                        >
                            退出项目
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
            <!--右侧两个图标-->
            <div class="flex" align="right" style="float: right;">
                <a-icon
                    type="team"
                    style="font-size: 15px; margin-left: 6px; cursor: pointer;"
                    @click="handleShowMember"
                />
                <!--右侧展示项目成员抽屉-->
                <ShowMember ref="ShowMember" :proj="this.item" />
                <div
                    v-if="currenttabdata === '1'"
                    style="margin-left: 15px; cursor: pointer;"
                    @click="handleShowScreen"
                >
                    <a-icon
                        type="funnel-plot"
                        style="font-size: 15px; margin-left: 6px;"
                    />
                    任务筛选
                </div>
                <!--右侧展示任务筛选抽屉-->
                <ShowScreen
                    ref="ShowScreen"
                    :proj="this.item"
                    @triggerBrotherMethods="triggerBrotherMethods"
                />
            </div>
        </div>
        <a-tabs :default-active-key="tabdata[0]" @change="callback">
            <a-tab-pane :key="tabdata[0]" tab="看板视图">
                <TaskGroup ref="TaskGroup" :proj="this.item" />
            </a-tab-pane>
            <a-tab-pane :key="tabdata[1]" tab="附件">
                <Appendix ref="Appendix" :proj="this.item" />
            </a-tab-pane>
            <a-tab-pane :key="tabdata[2]" tab="任务统计">
                <TaskStatistics ref="TaskStatistics" :proj="this.item" />
            </a-tab-pane>
            <a-tab-pane :key="tabdata[3]" tab="归档任务">
                <ArchivedTasks ref="ArchivedTasks" :proj="this.item" />
            </a-tab-pane>
        </a-tabs>
    </a-card>
</template>

<script>
const tabdata = ['1', '2', '3', '4'];

import { request, METHOD } from '@/utils/request';
import TaskGroup from './components/TaskGroup'; //看板视图
import Appendix from './components/Appendix'; //附件
import TaskStatistics from './components/TaskStatistics'; //任务统计
import ArchivedTasks from './components/ArchivedTasks'; //任务统计
import AddProjMember from './components/AddProjMember'; //添加项目成员
import ShowMember from './components/ShowMember'; //右侧抽屉查看成员
import ShowScreen from './components/ShowScreen'; //右侧抽屉任务筛选
export default {
    components: {
        TaskGroup,
        AddProjMember,
        ShowMember,
        ShowScreen,
        Appendix,
        TaskStatistics,
        ArchivedTasks,
    },
    data() {
        return {
            item: {}, //项目详细内容

            tabdata: tabdata, //走马灯内容
            currenttabdata: tabdata[0], //当前走马灯
        };
    },
    //项目名称监听并改变
    watch: {
        $route: {
            immediate: true,
            handler(route) {
                //console.log('1111111111111111111111111111');
                //console.log(sessionStorage.item);
                this.item = JSON.parse(sessionStorage.item); //项目内容
                this.$refs.ShowScreen.Reset(); //重置任务筛选
                this.$refs.TaskGroup.fetch();
                //console.log(this.item);
            },
        },
    },
    //初始查询
    mounted() {},

    methods: {
        //添加项目成员方法
        AddProjMember(number) {
            console.log('11111111');
            this.$refs.AddProjMember.visible = true;
        },
        //添加项目成员子调用方法
        fetchAddProjMember(teammember) {
            //console.log('params:', params);
            request('/MyTaskAdd', METHOD.POST, {
                teammember: teammember,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.fetch(); //刷新页面
            });
        },

        //归档项目
        handleFile() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定归档该项目?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchFile();
                },
                onCancel() {},
            });
        },
        //归档项目调用方法
        fetchFile() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageCustomerTrans', METHOD.POST, {
                item: this.item, //哪个项目
            }).then((data) => {
                this.$message.success(data.data.msg);
            });
        },

        //删除项目
        handleDelete() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: (
                    <div style="color:black;">
                        确定要删除项目吗？删除后此项目中的所有任务将一并彻底删除，无法恢复
                    </div>
                ),
                onOk() {
                    //console.log('OK');
                    _this.fetchDelete();
                },
                onCancel() {},
            });
        },
        //删除选中调用方法
        fetchDelete() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageCustomerTrans', METHOD.POST, {
                item: this.item, //哪个项目
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.$router.push({
                    path: '/e/b',
                    query: { back: 1 },
                });
            });
        },

        //退出项目
        handleExit() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: (
                    <div style="color:black;">
                        确定退出“{_this.item.title}”吗？
                    </div>
                ),
                onOk() {
                    //console.log('OK');
                    _this.FetchhandleExit();
                },
                onCancel() {},
            });
        },
        //退出选中调用方法
        FetchhandleExit() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageCustomerTrans', METHOD.POST, {
                item: this.item, //哪个项目
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.$router.push({
                    path: '/e/b',
                    query: { back: 1 },
                });
            });
        },

        //点击当前tabs
        callback(key) {
            this.currenttabdata = key;
            //console.log(this.currenttabdata);
        },

        //展示项目成员方法
        handleShowMember() {
            this.$refs.ShowMember.visible = true;
        },
        //展示任务筛选方法
        handleShowScreen() {
            this.$refs.ShowScreen.visible = true;
        },
        triggerBrotherMethods(taskname, member, endtime) {
            // 父组件通过$ref调用子组件中的事件方法
            //console.log('1212121211');
            this.$refs.TaskGroup.fetchfather(taskname, member, endtime);
        },
    },
};
</script>

<style scoped>
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
}
</style>
