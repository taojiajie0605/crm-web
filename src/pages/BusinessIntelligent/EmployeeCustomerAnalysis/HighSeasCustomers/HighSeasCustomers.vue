<template>
    <a-card title="公海客户分析">
        <TopSearchBox @search="search" class="search" />
        <Chart class="chart" ref="HighSeasCustomersChart" />
        <TotalTable
            class="table"
            :columns="columns"
            :data="data"
            :total="total"
            :totalColumns="totalColumns"
        />
    </a-card>
</template>

<script>
import TopSearchBox from '@/components/search/TopSearchBox';
import TotalTable from '@/components/table/ChartTotalTable';
import Chart from './components/chart/HighSeasCustomers';
import { request, METHOD } from '@/utils/request';
export default {
    name: 'HighSeasCustomers',
    components: {
        TopSearchBox,
        TotalTable,
        Chart,
    },
    data() {
        return {
            data: [],
            columns: [
                {
                    width: '25%',
                    title: '姓名',
                    dataIndex: 'realName',
                    align: 'center',
                    defaultSortOrder: 'scend',
                    sorter: (a, b) => a.id > b.id,
                },
                {
                    width: '25%',
                    title: '部门',
                    dataIndex: 'deptName',
                    align: 'center',
                    sorter: (a, b) => a.id > b.id,
                },
                {
                    width: '25%',
                    title: '公海池领取客户数',
                    dataIndex: 'putInNum',
                    align: 'center',
                    sorter: (a, b) => a.putInNum > b.putInNum,
                },
                {
                    width: '25%',
                    title: '进入公海客户数',
                    dataIndex: 'receiveNum',
                    align: 'center',
                    sorter: (a, b) => a.receiveNum > b.receiveNum,
                },
            ],
            total: [],
            totalColumns: [
                {
                    width: '25%',
                    title: '总计',
                    dataIndex: 'realName',
                    align: 'center',
                    sorter: (a, b) => a.id > b.id,
                },
                {
                    width: '25%',
                    title: '部门',
                    dataIndex: 'deptName',
                    align: 'center',
                    sorter: (a, b) => a.id > b.id,
                },
                {
                    width: '25%',
                    title: '公海池领取客户数',
                    dataIndex: 'putInNumTotal',
                    align: 'center',
                    sorter: (a, b) => a.putInNum > b.putInNum,
                },
                {
                    width: '25%',
                    title: '进入公海客户数',
                    dataIndex: 'receiveNumTotal',
                    align: 'center',
                    sorter: (a, b) => a.receiveNum > b.receiveNum,
                },
            ],
        };
    },
    methods: {
        search(searchKey) {
            console.log('搜索值:');
            console.log(searchKey);
            this.getChartData(searchKey);
            this.getTableData(searchKey);
        },
        getTableData(param) {
            // 初始化数据
            request('/HighSeasCustomersTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                console.log('----------');
                console.log(data.data);
                this.data = data.data.list;
                this.total = data.data.total;
            });
        },
        getChartData(data) {
            // 获取图表数据
            this.$refs.HighSeasCustomersChart.getChartData(data);
        },
    },
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less" scoped></style>
