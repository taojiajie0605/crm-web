<template>
    <div>
        <a-drawer
            placement="right"
            :closable="false"
            :visible="visible"
            @close="onClose"
        >
            <div slot="title">
                任务筛选
                <a @click="Reset">重置</a>
            </div>
            <a-input
                v-model="taskname"
                placeholder="搜索项目内任务"
                @change="inputchange"
            />
            <a-menu
                style="width: 100%;"
                :defaultOpenKeys="['sub']"
                v-model="selectedKeys"
                mode="inline"
                multiple
                @click="handleClick"
            >
                <a-sub-menu key="sub">
                    <span slot="title">
                        <a-icon type="caret-right" />
                        <span>成员</span>
                    </span>
                    <a-menu-item
                        :key="index"
                        v-for="(element, index) in proj.projmember"
                    >
                        <a-avatar
                            size="default"
                            style="
                                background-color: #2362fb;
                                margin-right: 10px;
                            "
                        >
                            {{ element }}
                        </a-avatar>
                        {{ element }}
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
            <a-menu
                style="width: 100%;"
                :defaultOpenKeys="['sub']"
                v-model="selectedKeysTime"
                mode="inline"
                @click="handleClickTime"
            >
                <a-sub-menu key="sub">
                    <span slot="title">
                        <a-icon type="caret-right" />
                        <span>截止时间</span>
                    </span>
                    <a-menu-item key="1"> 今天 </a-menu-item>
                    <a-menu-item key="2"> 明天 </a-menu-item>
                    <a-menu-item key="3"> 本周 </a-menu-item>
                    <a-menu-item key="4"> 本月 </a-menu-item>
                    <a-menu-item key="5"> 未设置截止时间 </a-menu-item>
                    <a-menu-item key="6"> 已延期 </a-menu-item>
                    <a-menu-item key="7"> 今日更新 </a-menu-item>
                </a-sub-menu>
            </a-menu>
            <a-menu
                style="width: 100%;"
                :defaultOpenKeys="['sub']"
                v-model="labels"
                multiple
                mode="inline"
                @click="handleClickLabel"
            >
                <a-sub-menu key="sub">
                    <span slot="title">
                        <a-icon type="caret-right" />
                        <span>标签</span>
                    </span>
                    <a-menu-item
                        :key="index"
                        v-for="(element, index) in proj.labels"
                    >
                        <a-tag :color="element.color">
                            {{ element.title }}
                        </a-tag>
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-drawer>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

export default {
    props: ['proj'],
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见

            selectedKeys: [], //成员
            selectedKeysTime: [], //截止时间
            labels: [], //该项目下的标签
            taskname: '', //任务名称
        };
    },
    methods: {
        //选择成员方法
        handleClick(e) {
            this.$emit(
                'triggerBrotherMethods',
                this.taskname,
                this.selectedKeys,
                this.selectedKeysTime,
                this.labels,
            );
            // console.log(
            //     'selectedKeys',
            //     this.selectedKeys,
            //     this.selectedKeysTime,
            //     this.labels,
            //     this.taskname,
            // );
        },

        //截止时间方法
        handleClickTime(e) {
            this.$emit(
                'triggerBrotherMethods',
                this.taskname,
                this.selectedKeys,
                this.selectedKeysTime,
                this.labels,
            );
            //console.log('selectedKeys', this.selectedKeysTime);
        },

        //搜任务名字改变
        inputchange() {
            this.$emit(
                'triggerBrotherMethods',
                this.taskname,
                this.selectedKeys,
                this.selectedKeysTime,
                this.labels,
            );
        },

        //标签筛选方法
        handleClickLabel(e) {
            this.$emit(
                'triggerBrotherMethods',
                this.taskname,
                this.selectedKeys,
                this.selectedKeysTime,
                this.labels,
            );
        },

        //重置方法
        Reset() {
            this.selectedKeys = [];
            this.selectedKeysTime = [];
            this.labels = [];
            this.taskname = '';
        },

        onClose() {
            this.visible = false;
        },
    },
};
</script>

<style lang="less" scoped></style>
