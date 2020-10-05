<template>
    <a-card title="客户城市分布分析">
        <TopSearchBox @search="search" class="search" />
        <div class="content">
            <div class="chart">
                <AllChart ref="AllChart" />
                <h3>全部客户</h3>
            </div>
            <div class="chart">
                <DealChart ref="DealChart" />
                <h3>成交客户</h3>
            </div>
        </div>
    </a-card>
</template>

<script>
import TopSearchBox from '@/components/search/TopSearchBox';
import AllChart from './components/chart/All';
import DealChart from './components/chart/Deal';
import { request, METHOD } from '@/utils/request';
export default {
    components: {
        TopSearchBox,
        AllChart,
        DealChart,
    },
    methods: {
        search(param) {
            console.log(param);
            this.getChartData(param);
        },
        getChartData(param) {
            // 初始化数据
            request('/UrbanDistributionChart', METHOD.POST, {
                ...param,
            }).then((data) => {
                // 获取图表数据
                this.$refs.AllChart.getChartData(data.data);
                this.$refs.DealChart.getChartData(data.data);
            });
        },
    },
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less" scoped>
.content {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .chart {
        width: 40%;
        text-align: center;
        h3 {
            display: block;
            font-weight: bold;
        }
    }
}
</style>
