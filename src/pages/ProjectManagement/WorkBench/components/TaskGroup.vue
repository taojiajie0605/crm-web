<template>
    <div class="container">
        <div class="row">
            <!--收件箱-->
            <div class="col-3">
                <div class="p-2 alert alert-secondary">
                    <div class="flex">
                        <strong style="font-size: 18px;">收件箱</strong>
                        <a-icon class="add" type="plus" @click="AddTask('1')" />
                    </div>
                    <draggable
                        class="list-group ms-column body scroll"
                        :list="mail"
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
                            v-for="(element, index) in mail"
                            :key="index"
                            @click="showdrawer"
                        >
                            <div class="flex">
                                <a-checkbox
                                    :checked="element.checked"
                                    @click.stop="onChangemail(element, index)"
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
            <!--今天要做-->
            <div class="col-3">
                <div class="p-2 alert alert-primary">
                    <div class="flex">
                        <strong style="font-size: 18px;">今天要做</strong>
                        <a-icon class="add" type="plus" @click="AddTask('2')" />
                    </div>
                    <draggable
                        class="list-group ms-column body scroll"
                        :list="today"
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
                            v-for="(element, index) in today"
                            :key="index"
                            @click="showdrawer"
                        >
                            <div class="flex">
                                <a-checkbox
                                    :checked="element.checked"
                                    @click.stop="onChangetoday(element, index)"
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
                            <!--相关子任务附件-->
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
            <!--下一步要做-->
            <div class="col-3">
                <div class="p-2 alert alert-warning">
                    <div class="flex">
                        <strong style="font-size: 18px;">下一步要做</strong>
                        <a-icon class="add" type="plus" @click="AddTask('3')" />
                    </div>
                    <draggable
                        class="list-group ms-column body scroll"
                        :list="nexttodo"
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
                            v-for="(element, index) in nexttodo"
                            :key="index"
                            @click="showdrawer"
                        >
                            <div class="flex">
                                <a-checkbox
                                    :checked="element.checked"
                                    @click.stop="
                                        onChangenexttodo(element, index)
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
                            <!--相关子任务附件-->
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
            <!--以后要做-->
            <div class="col-3">
                <div class="p-2 alert alert-danger">
                    <div class="flex">
                        <strong style="font-size: 18px;">以后要做</strong>
                        <a-icon class="add" type="plus" @click="AddTask('4')" />
                    </div>
                    <draggable
                        class="list-group ms-column body scroll"
                        :list="latertodo"
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
                            v-for="(element, index) in latertodo"
                            :key="index"
                            @click="showdrawer"
                        >
                            <div class="flex">
                                <a-checkbox
                                    :checked="element.checked"
                                    @click.stop="
                                        onChangelatertodo(element, index)
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
                            <!--相关子任务附件-->
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
        </div>
        <!--添加任务-->
        <AddTask ref="AddTask" @fetchAddTask="fetchAddTask" />
    </div>
</template>

<script>
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import { request, METHOD } from '@/utils/request';
import draggable from 'vuedraggable';
import AddTask from './cmp/AddTask'; //添加任务

export default {
    name: 'Drag',
    components: {
        draggable,
        AddTask,
    },
    data() {
        return {
            mail: [],
            today: [],
            nexttodo: [],
            latertodo: [],
            currenttaskgroup: '1', //当前添加的组
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
            request('/MyTask', METHOD.POST, {}).then((data) => {
                this.mail = data.data.mail;
                this.today = data.data.today;
                this.nexttodo = data.data.nexttodo;
                this.latertodo = data.data.latertodo;
            });
        },

        //收件箱框点击
        onChangemail(element, index) {
            if (this.mail[index].checked === false) {
                this.mail[index].checked = true;
            } else {
                this.mail[index].checked = false;
            }
        },
        //今天要做框点击
        onChangetoday(element, index) {
            if (this.today[index].checked === false) {
                this.today[index].checked = true;
            } else {
                this.today[index].checked = false;
            }
        },
        //下一步要做框点击
        onChangenexttodo(element, index) {
            if (this.nexttodo[index].checked === false) {
                this.nexttodo[index].checked = true;
            } else {
                this.nexttodo[index].checked = false;
            }
        },
        //以后要做框点击
        onChangelatertodo(element, index) {
            if (this.latertodo[index].checked === false) {
                this.latertodo[index].checked = true;
            } else {
                this.latertodo[index].checked = false;
            }
        },

        //添加任务弹出框方法
        AddTask(number) {
            this.currenttaskgroup = number; //当前添加的组
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
                this.fetch();
            });
        },

        //抽屉显示方法
        showdrawer() {
            this.$message.success('弹出右侧抽屉');
        },
    },
};
</script>

<style scoped src="bootstrap/dist/css/bootstrap.css" />
<style scoped src="bootstrap-vue/dist/bootstrap-vue.css" />
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
