<template>
    <a-card>
        <template slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="bar-chart"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                统计分析
            </div>
        </template>
        <div>
            <a-row :gutter="16">
                <a-col class="gutter-row" :span="24">
                    <a-card
                        class="gutter-box"
                        bodyStyle="padding:0 !important;"
                    >
                        <div
                            slot="title"
                            class="flex"
                            style="justify-content: space-between;"
                        >
                            <div align="left" style="float: left;">
                                <a-icon
                                    type="caret-right"
                                    style="color: #00bfff; margin-right: 6px;"
                                />
                                任务总览
                            </div>
                            <div align="right" style="float: right;">
                                <a-select
                                    style="width: 200px;"
                                    v-model="currentproj"
                                    @change="changeProj"
                                >
                                    <a-select-option value="99" key="99">
                                        全部
                                    </a-select-option>
                                    <a-select-option
                                        v-for="(element, index) in proj"
                                        :key="index"
                                        :value="element.id"
                                    >
                                        {{ element.name }}
                                    </a-select-option>
                                </a-select>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="flex" style="width: 50%;">
                                <FollowUpMethod ref="FollowUpMethodChart" />
                                <FollowUpMethodX ref="FollowUpMethodChartX" />
                            </div>
                            <div class="flex" style="width: 50%;">
                                <FollowUpMethodZhu
                                    ref="FollowUpMethodChartZhu"
                                />
                            </div>
                        </div>
                    </a-card>
                </a-col>
            </a-row>
            <a-row
                :gutter="16"
                style="margin-top: 15px;"
                v-show="this.currentproj !== '99'"
            >
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
                        <MemComStatus
                            ref="MemComStatus"
                            :proj="this.currentproj"
                        />
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import FollowUpMethod from './components/chart/FollowUpMethod'; //任务总览
import FollowUpMethodX from './components/chart/FollowUpMethodX'; //任务总览
import FollowUpMethodZhu from './components/chart/FollowUpMethodZhu'; //任务总览
import FollowUpMethodTask from './components/chart/FollowUpMethodTask'; //任务列表
import FollowUpMethodLabel from './components/chart/FollowUpMethodLabel'; //标签分析
import MemComStatus from './components/MemComStatus'; //成员完成情况
export default {
    components: {
        FollowUpMethod, //任务总览
        FollowUpMethodX, //任务总览
        FollowUpMethodZhu, //任务总览
        FollowUpMethodTask, //任务列表
        FollowUpMethodLabel, //标签分析
        MemComStatus, //成员完成情况
    },
    data() {
        return {
            proj: [], //所有项目
            currentproj: '99', //当前项目
        };
    },
    //初始查询
    mounted() {
        this.fetch();
        this.$refs.FollowUpMethodChart.getChartData(this.proj, '饼状图');
        this.$refs.FollowUpMethodChartX.getChartData(this.proj, '饼状图');
        this.$refs.FollowUpMethodChartZhu.getChartData(this.proj, '柱状图');
        this.$refs.FollowUpMethodChartTask.getChartData(this.proj);
        this.$refs.FollowUpMethodChartLabel.getChartData(this.proj);
    },
    methods: {
        fetch(params = {}) {
            request('/allproj', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.proj = data.data.return;
            });
        },

        //切换项目
        changeProj() {
            //console.log(this.currentproj);
            this.$refs.FollowUpMethodChart.getChartData(
                this.currentproj,
                '饼状图',
            );
            this.$refs.FollowUpMethodChartX.getChartData(
                this.currentproj,
                '饼状图',
            );
            this.$refs.FollowUpMethodChartZhu.getChartData(
                this.currentproj,
                '柱状图',
            );
            this.$refs.FollowUpMethodChartTask.getChartData(this.currentproj);
            this.$refs.FollowUpMethodChartLabel.getChartData(this.currentproj);
            this.$refs.MemComStatus.changeprojtable(); //切换表格内容
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
