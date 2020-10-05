<template>
    <div>
        <a-row :gutter="16">
            <a-col class="gutter-row" :span="24">
                <a-card class="gutter-box" bodyStyle="padding:0 !important;">
                    <div slot="title" class="flex">
                        <a-icon
                            type="caret-right"
                            style="color: #00bfff; margin-right: 6px;"
                        />
                        任务总览
                    </div>
                    <div class="flex">
                        <div class="flex" style="width: 50%;">
                            <FollowUpMethod ref="FollowUpMethodChart" />
                            <FollowUpMethodX ref="FollowUpMethodChartX" />
                        </div>
                        <div class="flex" style="width: 50%;">
                            <FollowUpMethodZhu ref="FollowUpMethodChartZhu" />
                        </div>
                    </div>
                </a-card>
            </a-col>
        </a-row>
        <a-row :gutter="16" style="margin-top: 15px;">
            <a-col class="gutter-row" :span="12">
                <a-card class="gutter-box">
                    <div slot="title" class="flex">
                        <a-icon
                            type="caret-right"
                            style="color: #00bfff; margin-right: 6px;"
                        />
                        任务列表
                    </div>
                    <FollowUpMethodTask ref="FollowUpMethodChartTask" />
                </a-card>
            </a-col>
            <a-col class="gutter-row" :span="12">
                <a-card class="gutter-box">
                    <div slot="title" class="flex">
                        <a-icon
                            type="caret-right"
                            style="color: #00bfff; margin-right: 6px;"
                        />
                        标签分析
                    </div>
                    <FollowUpMethodLabel ref="FollowUpMethodChartLabel" />
                </a-card>
            </a-col>
        </a-row>
        <a-row :gutter="16" style="margin-top: 15px;">
            <a-col class="gutter-row" :span="24">
                <a-card class="gutter-box1">
                    <div slot="title" class="flex">
                        <a-icon
                            type="caret-right"
                            style="color: #00bfff; margin-right: 6px;"
                        />
                        成员完成情况
                    </div>
                    <MemComStatus ref="MemComStatus" :proj="this.proj" />
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import FollowUpMethod from './cmp/chart/FollowUpMethod'; //任务总览
import FollowUpMethodX from './cmp/chart/FollowUpMethodX'; //任务总览
import FollowUpMethodZhu from './cmp/chart/FollowUpMethodZhu'; //任务总览
import FollowUpMethodTask from './cmp/chart/FollowUpMethodTask'; //任务列表
import FollowUpMethodLabel from './cmp/chart/FollowUpMethodLabel'; //标签分析
import MemComStatus from './cmp/MemComStatus'; //成员完成情况
export default {
    components: {
        FollowUpMethod, //任务总览
        FollowUpMethodX, //任务总览
        FollowUpMethodZhu, //任务总览
        FollowUpMethodTask, //任务列表
        FollowUpMethodLabel, //标签分析
        MemComStatus, //成员完成情况
    },
    props: ['proj'],
    data() {
        return {};
    },
    //初始查询
    mounted() {
        //this.fetch(this.proj);
        this.$refs.FollowUpMethodChart.getChartData(this.proj, '饼状图');
        this.$refs.FollowUpMethodChartX.getChartData(this.proj, '饼状图');
        this.$refs.FollowUpMethodChartZhu.getChartData(this.proj, '柱状图');
        this.$refs.FollowUpMethodChartTask.getChartData(this.proj);
        this.$refs.FollowUpMethodChartLabel.getChartData(this.proj);
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
}
.gutter-box {
    background: #f5f6f7;
    height: 240px;
    padding: 0;
    div.ant-card-body {
        padding: 0;
    }
}
.gutter-box1 {
    background: #f5f6f7;
    height: auto;
    padding: 0;
    div.ant-card-body {
        padding: 0;
    }
}
.chart {
    width: 90%;
    margin-top: 50px;
    margin-bottom: 50px;
    margin: 50px auto;
}
</style>
