<template>
    <div>
        <a-select
            v-model="currentTime"
            style="width: 180px;"
            class="right"
            @change="timeChange"
        >
            <a-select-option
                v-for="item in timeOptions"
                :value="item.value"
                :key="item.value"
            >
                {{ item.label }}
            </a-select-option>
        </a-select>
        <a-select
            v-model="currentRole"
            style="width: 120px;"
            @change="roleChange"
            class="right"
        >
            <a-select-option
                v-for="item in roleOptions"
                :value="item.value"
                :key="item.value"
            >
                {{ item.label }}
            </a-select-option>
        </a-select>
        <a-select
            v-model="currentItem"
            style="width: 290px;"
            :placeholder="tips"
            class="right"
        >
            <a-select-option v-for="item in currentItems" :key="item">
                {{ item }}
            </a-select-option>
        </a-select>
        <a-select
            v-if="chartTypeOptions"
            v-model="currentChartType"
            style="width: 120px;"
            @change="chartTypeChange"
            class="right"
        >
            <a-select-option
                v-for="item in chartTypeOptions"
                :value="item.value"
                :key="item.value"
            >
                {{ item.label }}
            </a-select-option>
        </a-select>
        <a-select
            v-if="groupOptionsIsShow"
            v-model="currentGroup"
            style="width: 120px;"
            @change="groupChange"
            class="right"
        >
            <a-select-option
                v-for="item in groupOptions"
                :value="item.value"
                :key="item.value"
            >
                {{ item.label }}
            </a-select-option>
        </a-select>
        <a-button type="primary" @click="checkSearch">搜索</a-button>
        <div v-if="isShowTime" style="margin-top: 10px; width: 250px;">
            <a-range-picker
                :default-value="[
                    moment(new Date(), 'YYYY/MM/DD'),
                    moment(new Date(), 'YYYY/MM/DD'),
                ]"
                @change="selectTimes"
            />
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { request, METHOD } from '@/utils/request';

export default {
    name: 'TopSearchBox',
    props: ['chartTypeOptions', 'groupOptionsIsShow'],
    data() {
        return {
            timeOptions: [
                // 下拉选项
                { label: '今天', value: 'today' },
                { label: '昨天', value: 'yesterday' },
                { label: '本周', value: 'week' },
                { label: '上周', value: 'lastWeek' },
                { label: '本月', value: 'month' },
                { label: '上月', value: 'lastMonth' },
                { label: '本季度', value: 'quarter' },
                { label: '上季度', value: 'lastQuarter' },
                { label: '本年', value: 'year' },
                { label: '去年', value: 'listYear' },
                { label: '自定义', value: '自定义' },
            ],
            roleOptions: [
                // 角色下拉选项
                { label: '员工', value: '员工' },
                { label: '部门', value: '部门' },
            ],
            itemOptions: {
                // 级联内容下拉选项
                员工: ['员工1', '员工2', '员工3'],
                部门: ['全公司', '财务部', '销售部'],
            },
            currentItems: [], // 当前选中的itemOptions的内容,
            currentRole: '员工', // 当前选择的分类
            currentItem: undefined, // 当前选中项
            currentTime: 'year', // 当前选择时间
            currentChartType: '', // 当前图表类型
            groupOptions: [], // 分组组
            currentGroup: '', // 当前分组
            tips: '选择员工（默认为本人及下属）', // 提示信息
            isShowTime: false, // 控制自定义时间选择器是否显示
            startTime: '',
            endTime: '',
        };
    },
    created() {
        this.currentItems = this.itemOptions[this.roleOptions[0].value];
        this.startTime = new Date();
        this.endTime = new Date();
        if (this.chartTypeOptions) {
            // 给图表类型附上初值
            this.currentChartType = this.chartTypeOptions[0].value;
        }
        this.getGroupOptions();
    },
    methods: {
        moment,
        roleChange(e) {
            // 角色改变时
            this.currentItems = this.itemOptions[e];
            this.currentItem = undefined;
            if (e === '员工') this.tips = '选择员工（默认为本人及下属）';
            else this.tips = '选择部门（默认为本部门及下属部门）';
        },
        chartTypeChange(e) {
            // 图表类型改变时
            this.currentChartType = e;
            // 调用父组件传递方法修改图表
            this.$emit('changeChartType', e);
        },
        groupChange(e) {
            // 分组改变时
            this.currentGroup = e;
            // 调用父组件传递方法修改图表
            this.$emit('changeGroupOption', e);
        },
        timeChange(e) {
            // 时间改变时
            if (e === '自定义') this.isShowTime = true;
            else this.isShowTime = false;
            console.log(this.isShowTime);
        },
        selectTimes(e, string) {
            // 日期选择框内容改变时
            this.startTime = string[0];
            this.endTime = string[1];
        },
        checkSearch() {
            // 检查搜索
            console.log(this.startTime);
            let f = 1;
            if (this.startTime === '') f = 0;
            if (f === 0) {
                this.$message.warning('查询参数未设置');
            } else {
                this.search();
            }
        },
        search() {
            // 执行搜索
            const data = {
                searchTime: this.currentTime,
                searchKey: this.currentItem,
            };
            if (this.currentRole === '员工') {
                data.searchRole = 'user';
            } else {
                data.searchRole = 'department';
            }
            if (this.currentItem === undefined) data.searchKey = '';
            if (this.currentTime === '自定义')
                data.searchTime = {
                    startTime: this.startTime,
                    endTime: this.endTime,
                };
            // 调用父组件传递的搜索方法
            if (this.currentGroup !== '') data.searchGroup = this.currentGroup;
            this.$emit('search', data);
        },
        getGroupOptions() {
            if (this.groupOptionsIsShow) {
                // 给分组类型附上初值
                // 初始化数据
                request('/getGroupOptions', METHOD.POST, {
                    ...{},
                }).then((data) => {
                    this.groupOptions = data.data;
                    this.currentGroup = this.groupOptions[0].value;
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.right {
    margin-right: 10px;
}
</style>
