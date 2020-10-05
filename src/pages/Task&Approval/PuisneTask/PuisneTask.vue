<template>
    <div>
        <a-tabs
            default-active-key="1"
            type="line"
            tabBarStyle="background-color:white;"
            @change="callback"
        >
            <template slot="tabBarExtraContent">
                <div style="padding-right: 10px;">
                    <a-button type="primary"> 导出 </a-button>
                </div>
            </template>
            <a-tab-pane key="1" tab="全部">
                <a-card style="margin-top: 5px;" :bordered="false">
                    <div
                        class="flex"
                        :body-style="{ padding: '24px' }"
                        align="left"
                        style="float: left; width: 400px;"
                    >
                        <a-avatar size="large" icon="user" />
                        <a-progress
                            style="margin-left: 30px; width: 350px;"
                            stroke-linecap="square"
                            :percent="precent"
                        />
                    </div>
                    <div align="right" style="float: right;">
                        <a-input
                            style="width: 250px; margin-right: 10px;"
                            v-model="name"
                            size="default"
                            placeholder="请输入任务名称"
                        />
                        <a-popover
                            :visible="popoverVisible"
                            :overlayStyle="{ width: 300 + 'px' }"
                        >
                            <b
                                style="
                                    margin-top: 5px;
                                    margin-bottom: 5px;
                                    font-size: 18px;
                                "
                                slot="title"
                            >
                                筛选
                            </b>
                            <template slot="content">
                                <a-form
                                    :form="form"
                                    :label-col="{ span: 7 }"
                                    :wrapper-col="{ span: 17 }"
                                    @submit="handleSubmit"
                                >
                                    <a-form-item label="负责人">
                                        <a-input
                                            v-decorator="[
                                                'principal',
                                                {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please input your note!',
                                                        },
                                                    ],
                                                },
                                            ]"
                                        />
                                    </a-form-item>
                                    <a-form-item label="截止时间">
                                        <a-date-picker />
                                    </a-form-item>
                                    <a-form-item label="优先级">
                                        <a-select
                                            default-value="all"
                                            v-decorator="[
                                                'priority',
                                                {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                'Please select your gender!',
                                                        },
                                                    ],
                                                },
                                            ]"
                                            placeholder="Select a option and change input text above"
                                            @change="handleSelectChange"
                                        >
                                            <a-select-option value="all">
                                                全部
                                            </a-select-option>
                                            <a-select-option value="height">
                                                高
                                            </a-select-option>
                                            <a-select-option value="middle">
                                                中
                                            </a-select-option>
                                            <a-select-option value="low">
                                                低
                                            </a-select-option>
                                            <a-select-option value="without">
                                                无
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item label="显示已完成">
                                        <a-switch />
                                    </a-form-item>
                                    <a-form-item
                                        :wrapper-col="{ span: 12, offset: 10 }"
                                    >
                                        <a-space>
                                            <a-button
                                                type="primary"
                                                html-type="submit"
                                            >
                                                保存
                                            </a-button>
                                            <a-button
                                                @click="showOrClosePopover"
                                            >
                                                取消
                                            </a-button>
                                        </a-space>
                                    </a-form-item>
                                </a-form>
                            </template>
                            <a-button @click="showOrClosePopover"
                                >筛选</a-button
                            >
                        </a-popover>
                    </div>
                </a-card>
                <a-card style="height: 600px;">
                    <task-list />
                </a-card>
            </a-tab-pane>
            <a-tab-pane key="2" tab="我负责的" force-render>
                <a-card style="margin-top: 5px;" :bordered="false">
                    <div
                        class="flex"
                        :body-style="{ padding: '24px' }"
                        align="left"
                        style="float: left; width: 400px;"
                    >
                        <a-avatar size="large" icon="user" />
                        <a-progress
                            style="margin-left: 30px; width: 350px;"
                            stroke-linecap="square"
                            :percent="precent"
                        />
                    </div>
                    <div align="right" style="float: right;">
                        <a-input
                            style="width: 250px; margin-right: 10px;"
                            v-model="name"
                            size="default"
                            placeholder="请输入任务名称"
                        />
                        <a-button>筛选</a-button>
                    </div>
                </a-card>
                <a-card style="height: 600px;">
                    <task-list />
                </a-card>
            </a-tab-pane>
            <a-tab-pane key="3" tab="我参与的">
                <a-card style="margin-top: 5px;" :bordered="false">
                    <div
                        class="flex"
                        :body-style="{ padding: '24px' }"
                        align="left"
                        style="float: left; width: 400px;"
                    >
                        <a-avatar size="large" icon="user" />
                        <a-progress
                            style="margin-left: 30px; width: 350px;"
                            stroke-linecap="square"
                            :percent="precent"
                        />
                    </div>
                    <div align="right" style="float: right;">
                        <a-input
                            style="width: 250px; margin-right: 10px;"
                            v-model="name"
                            size="default"
                            placeholder="请输入任务名称"
                        />
                        <!-- <a-popover trigger="click">
                            <b slot="title">
                                筛选
                            </b>
                            <template slot="content">
                                <p>Content</p>
                                <p>Content</p>
                            </template> -->
                        <a-button @click="test">
                            筛选
                        </a-button>
                        <!-- </a-popover> -->
                    </div>
                </a-card>
                <a-card style="height: 600px;">
                    <task-list />
                </a-card>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';

import TaskList from '../MyTask/components/TaskList';

export default {
    name: 'MyTask',
    components: { TaskList },
    data() {
        return {
            data: [], //任务数据
            name: '',
            popoverVisible: false,
        };
    },
    computed: {
        //计算任务完成比例
        precent: function () {
            const temp = this.$store.getters['mission/getMission'];
            console.log(temp);
            const count = temp.filter((value) => {
                return value.check === true;
            });
            return (count.length / temp.length) * 100;
        },
    },
    methods: {
        showOrClosePopover() {
            this.popoverVisible = !this.popoverVisible;
        },
        test() {
            console.log('dkfj');
        },
    },
};
</script>

<style>
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
}
</style>
