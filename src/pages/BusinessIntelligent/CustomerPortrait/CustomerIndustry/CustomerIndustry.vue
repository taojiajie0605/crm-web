<template>
    <a-card title="客户行业分析">
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
        <a-table :columns="columns" :dataSource="data" :pagination="false" />
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
    data() {
        return {
            data: [],
            columns: [],
        };
    },
    mounted() {
        this.search({});
    },
    methods: {
        search(param) {
            console.log(param);
            this.getChartData(param);
            this.getTableData(param);
        },
        getChartData(param) {
            this.$refs.AllChart.getChartData(param);
            this.$refs.DealChart.getChartData(param);
        },
        getTableData(param) {
            // 初始化数据
            request('/CustomerIndustryChart', METHOD.POST, {
                ...param,
            }).then((data) => {
                // 组装表格
                this.columns = [
                    { title: '客户行业', dataIndex: 'type', align: 'center' },
                ];
                const totalCustomer = { type: '所有客户（个）' };
                const dealCustomer = { type: '成交客户（个）' };
                for (let i = 0; i < data.data.length; i++) {
                    const item = data.data[i];
                    this.columns.push({
                        title: item.industry,
                        dataIndex: item.industry,
                        align: 'center',
                    });
                    totalCustomer[item.industry] = item.totalCustomer;
                    dealCustomer[item.industry] = item.dealCustomer;
                }
                this.data = [];
                this.data.push(totalCustomer);
                this.data.push(dealCustomer);
                // 获取图表数据
                this.getChartData(data.data);
            });
        },
    },
};
</script>

<style lang="less" scoped>
.content {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 50px 0;
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
