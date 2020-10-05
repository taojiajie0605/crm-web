<template>
    <a-card title="客户跟进方式分析">
        <TopSearchBox
            :searchKey="1"
            @search="search"
            class="search"
            :chartTypeOptions="chartTypeOptions"
            @changeChartType="changeChartType"
        />
        <Chart class="chart" ref="FollowUpMethodChart" />
        <TotalTable
            class="table"
            :columns="columns"
            :data="data"
            :total="''"
            :totalColumns="''"
        />
    </a-card>
</template>

<script>
import TopSearchBox from '@/components/search/TopSearchBox';
import TotalTable from '@/components/table/ChartTotalTable';
import Chart from './components/chart/FollowUpMethod';
import { request, METHOD } from '@/utils/request';
export default {
    name: 'CustomerFollowUpMethod',
    components: {
        TopSearchBox,
        Chart,
        TotalTable,
    },
    data() {
        return {
            data: [], // 数据
            columns: [
                {
                    width: '34%',
                    title: '跟进方式',
                    dataIndex: 'method',
                    align: 'center',
                },
                {
                    width: '33%',
                    title: '个数',
                    dataIndex: 'count',
                    align: 'center',
                    sorter: (a, b) => a.count - b.count,
                },
                {
                    width: '33%',
                    title: '占比（%）',
                    dataIndex: 'rate',
                    align: 'center',
                    sorter: (a, b) => a.rate - b.rate,
                },
            ],
            chartTypeOptions: [
                { label: '饼状图', value: '饼状图' },
                { label: '柱状图', value: '柱状图' },
            ],
            currentChartType: '饼状图',
        };
    },
    methods: {
        search(searchKey) {
            console.log('搜索值:');
            console.log(searchKey);
            this.getChartData(searchKey, this.currentChartType);
            this.getTableData(searchKey);
        },
        getTableData(param) {
            // 初始化数据
            request('/CustomerFollowUpMethodTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data;
            });
        },
        getChartData(data, type) {
            // 获取图表数据
            this.$refs.FollowUpMethodChart.getChartData(data, type);
        },
        changeChartType(type) {
            // 修改图表类型
            this.currentChartType = type;
        },
    },
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less" scoped></style>
