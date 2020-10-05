<template>
    <div class="container">
        <TopSearchBox @search="search" class="search" />
        <Chart class="chart" ref="FollowUpMethodChart" />
        <TotalTable
            class="table"
            :columns="columns"
            :data="data"
            :total="''"
            :totalColumns="''"
        />
    </div>
</template>

<script>
import TotalTable from '@/components/table/ChartTotalTable';
import Chart from './chart/RegionChart';
import TopSearchBox from '@/components/search/TopSearchBox';
import { request, METHOD } from '@/utils/request';
export default {
    components: {
        TopSearchBox,
        TotalTable,
        Chart,
    },
    data() {
        return {
            columns: [
                { title: '地区', dataIndex: 'regionName', align: 'center' },
                {
                    title: '成交周期（天）',
                    dataIndex: 'transactionCycle',
                    align: 'center',
                    sorter: (a, b) => a.transactionCycle - b.transactionCycle,
                },
                {
                    title: '成交客户数',
                    dataIndex: 'transactionCustomer',
                    align: 'center',
                    sorter: (a, b) =>
                        a.transactionCustomer - b.transactionCustomer,
                },
            ],
            data: [],
        };
    },
    methods: {
        search(searchKey) {
            console.log(searchKey);
            // this.getChartData(searchKey)
            this.getTableData(searchKey);
        },
        getTableData(param) {
            // 初始化数据
            request('/ProductCycleRegionTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data;
            });
        },
    },
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less" scoped></style>
