<template>
    <a-spin :spinning="spinning">
        <div class="container">
            <div class="row">
                <!--看板列-->
                <div
                    class="col-3"
                    :key="index1"
                    v-for="(column, index1) in item"
                >
                    <div class="p-2 alert alert-primary">
                        <div class="flex">
                            <strong style="font-size: 18px;">{{
                                column.title
                            }}</strong>
                            <a-dropdown class="tool">
                                <a-icon
                                    type="ellipsis"
                                    style="font-size: 25px; cursor: pointer;"
                                />
                                <a-menu slot="overlay">
                                    <a-menu-item @click="ModifyRow(column)">
                                        重命名
                                    </a-menu-item>
                                    <a-menu-item @click="AddTask(column)">
                                        新建任务
                                    </a-menu-item>
                                    <a-menu-item @click="FileTask(column)">
                                        归档已完成任务
                                    </a-menu-item>
                                    <a-menu-item @click="handleDelete(column)">
                                        删除列表
                                    </a-menu-item>
                                </a-menu>
                            </a-dropdown>
                        </div>
                        <draggable
                            class="list-group ms-column body scroll"
                            :list="column.content"
                            group="tasks"
                        >
                            <!--任务内容-->
                            <card
                                :class="
                                    element.checked
                                        ? 'list-group-item checked'
                                        : 'list-group-item'
                                "
                                style="cursor: pointer;"
                                v-for="(element, index) in column.content"
                                :key="index"
                                @click="showdrawer"
                            >
                                <div class="flex">
                                    <a-checkbox
                                        :checked="element.checked"
                                        @click.stop="
                                            onChangemail(element, index1, index)
                                        "
                                    >
                                        {{ element.taskname }}
                                    </a-checkbox>
                                    <a-avatar
                                        size="small"
                                        style="background-color: #2362fb;"
                                        >{{ element.username }}</a-avatar
                                    >
                                </div>
                                <div
                                    v-if="element.endtime !== ''"
                                    :class="
                                        compareDate(element.endtime) ||
                                        element.checked === true
                                            ? 'flex1'
                                            : 'flex2'
                                    "
                                >
                                    <a-icon type="clock-circle" />
                                    <div style="margin-left: 6px;">
                                        {{ element.endtime }}
                                    </div>
                                </div>
                                <!--相关/子任务/附件-->
                                <div class="flex1">
                                    <div
                                        v-if="element.relatedinfo !== ''"
                                        class="flex1"
                                        style="margin-right: 8px;"
                                    >
                                        <a-icon type="block" />
                                        {{ element.relatedinfo }}
                                    </div>
                                    <div
                                        v-if="element.subtask !== ''"
                                        class="flex1"
                                        style="margin-right: 8px;"
                                    >
                                        <a-icon type="fork" />
                                        {{ element.subtask }}
                                    </div>
                                    <div
                                        v-if="element.appendix !== ''"
                                        class="flex1"
                                        style="margin-right: 8px;"
                                    >
                                        <a-icon type="link" />
                                        {{ element.appendix }}
                                    </div>
                                </div>
                                <!--标签-->
                                <a-tag
                                    v-for="(label, index1) in element.labels"
                                    :key="index1"
                                    :color="label.color"
                                >
                                    {{ label.title }}
                                </a-tag>
                            </card>
                        </draggable>
                    </div>
                </div>
                <div class="col-3" key="999">
                    <div
                        @click="AddRow"
                        style="cursor: pointer;"
                        class="p-2 alert alert-primary"
                    >
                        <div class="flexadd">
                            <a-icon class="add" type="plus" />
                            <strong style="font-size: 18px; margin-left: 10px;"
                                >新建列表</strong
                            >
                        </div>
                    </div>
                </div>
            </div>
            <!--添加列表-->
            <AddRow
                ref="AddRow"
                @fetchAddRow="fetchAddRow"
                :currentRow="currenttaskgroup"
            />
            <!--添加任务-->
            <AddTask ref="AddTask" @fetchAddTask="fetchAddTask" />
        </div>
    </a-spin>
</template>

<script>
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import { request, METHOD } from '@/utils/request';
import draggable from 'vuedraggable';
import AddTask from './cmp/AddTask'; //添加任务
import AddRow from './cmp/AddRow'; //添加列表

export default {
    name: 'Drag',
    components: {
        draggable,
        AddTask,
        AddRow,
    },
    props: ['proj'],
    data() {
        return {
            item: [], //项目内容
            currenttaskgroup: undefined, //操作的是哪一组
            spinning: false, //加载圈
        };
    },
    //初始请求
    mounted() {
        this.fetch({});
    },
    methods: {
        //时间比较(逾期变红)
        compareDate(d1) {
            const reg = new RegExp('-', 'g');
            //const nowtime = new Date().toLocaleString();
            //const nowtime = '2020-08-20';
            const nowtime = this.getFormatDate();
            console.log(d1, nowtime);
            return (
                new Date(d1.replace(reg, '/')) >
                new Date(nowtime.replace(reg, '/'))
            );
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

        //任务栏请求
        fetch() {
            this.spinning = true;
            request('/projdetail', METHOD.POST, { proj: this.proj }).then(
                (data) => {
                    this.item = data.data.item;
                    this.spinning = false;
                },
            );
        },
        //任务栏请求父调用
        fetchfather(taskname, member, endtime) {
            //console.log('11113333111111');
            this.spinning = true;
            request('/projdetail', METHOD.POST, {
                proj: this.proj,
                taskname: taskname,
                member: member,
                endtime: endtime,
            }).then((data) => {
                this.item = data.data.item;
                this.spinning = false;
            });
        },

        //打钩点击
        onChangemail(element, index1, index) {
            if (this.item[index1].content[index].checked === false) {
                this.item[index1].content[index].checked = true;
            } else {
                this.item[index1].content[index].checked = false;
            }
        },

        //添加任务弹出框方法
        AddTask(row) {
            this.currenttaskgroup = row; //当前添加的组
            this.$refs.AddTask.visible = true;
        },
        //添加任务子调用方法
        fetchAddTask(teammember, title, endtime) {
            //console.log('params:', params);
            request('/MyTaskAdd', METHOD.POST, {
                currenttaskgroup: this.currenttaskgroup, //当前添加的组
                teammember: teammember,
                title: title,
                endtime: endtime,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.fetch(); //刷新页面
            });
        },

        //修改列表弹出框方法
        ModifyRow(row) {
            this.currenttaskgroup = JSON.parse(JSON.stringify(row)); //当前修改的组
            this.$refs.AddRow.visible = true;
        },
        //添加列表弹出框方法
        AddRow() {
            this.currenttaskgroup = []; //当前修改的组
            this.$refs.AddRow.visible = true;
        },
        //添加列表子调用方法
        fetchAddRow(title) {
            //console.log('params:', params);
            request('/MyTaskAdd', METHOD.POST, {
                title: title,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.fetch(); //刷新页面
            });
        },

        //归档任务方法
        FileTask(row) {
            //console.log('params:', params);
            request('/projdetailfile', METHOD.POST, {
                row: row,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.fetch(); //刷新页面
            });
        },

        //删除列表
        handleDelete(row) {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">您确定要删除?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchDelete(row);
                },
                onCancel() {},
            });
        },
        //删除列表调用方法
        fetchDelete(row) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageCustomerTrans', METHOD.POST, {
                row: row, //哪一列
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.fetch(); //刷新页面
            });
        },

        //抽屉显示方法
        showdrawer() {
            this.$message.success('弹出右侧抽屉');
        },
    },
};
</script>

<style scoped src="bootstrap-vue/dist/bootstrap-vue.css" />
<style scoped src="bootstrap/dist/css/bootstrap.css" />

<style lang="less" scoped>
.ms-column {
    min-height: 300px;
}
.body card {
    margin-top: 10px;
    margin-left: 6px;
}
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: space-between;
}
//新建列表的css
.flexadd {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
}
//判断时间的css
.flex1 {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    margin-left: 25px;
}
.flex2 {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    margin-left: 25px;
    color: #ff0000;
}
//判断打钩和未打的css
.checked {
    text-decoration: line-through;
    background-color: #f3f3f3;
    color: #8f8f8f;
}
//滚动条css
.scroll {
    height: 450px;
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
