<template>
    <a-card title="客户跟进次数分析">
        <TopSearchBox :searchKey="1" @search="search" class="search" />
        <Chart class="chart" ref="FollowUpTimesChart" />
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
import Chart from './components/chart/FollowUpTimes';
import { request, METHOD } from '@/utils/request';
export default {
    name: 'CustomerFollowUpTimes',
    components: {
        TopSearchBox,
        TotalTable,
        Chart,
    },
    data() {
        return {
            data: [], // 数据
            total: [], // 统计数据
            columns: [
                {
                    width: '34%',
                    title: '员工姓名',
                    dataIndex: 'userName',
                    align: 'center',
                    defaultSortOrder: 'scend',
                    sorter: (a, b) => a.id > b.id,
                },
                {
                    width: '33%',
                    title: '跟进次数',
                    dataIndex: 'addCustomer',
                    align: 'center',
                    sorter: (a, b) => a.addCustomer - b.addCustomer,
                },
                {
                    width: '33%',
                    title: '跟进客户数',
                    dataIndex: 'dealCustomer',
                    align: 'center',
                    sorter: (a, b) => a.dealCustomer - b.dealCustomer,
                },
            ],
            totalColumns: [
                {
                    width: '34%',
                    title: '总计',
                    dataIndex: 'totalUserName',
                    align: 'center',
                },
                {
                    width: '33%',
                    title: '跟进次数',
                    dataIndex: 'totalAddCustomer',
                    align: 'center',
                },
                {
                    width: '33%',
                    title: '跟进客户数',
                    dataIndex: 'totalDealCustomer',
                    align: 'center',
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
        getList() {
            // 初始化数据
            for (let i = 0; i < 3; i++) {
                this.data.push({
                    id: i,
                    userName: '员工' + Math.ceil(Math.random() * 100),
                    addCustomer: Math.ceil(Math.random() * 10),
                    dealCustomer: Math.ceil(Math.random() * 10),
                    turnoverRate: (Math.random() * 10).toFixed(2),
                    contractMoney: (Math.random() * 10000).toFixed(2),
                    amountReceived: (Math.random() * 1000).toFixed(2),
                });
            }
        },
        getTableData(param) {
            // 初始化数据
            request('/CustomerFollowUpTimesTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data.list;
                this.total = data.data.total;
            });
        },
        getChartData(data) {
            // 获取图表数据
            this.$refs.FollowUpTimesChart.getChartData(data);
        },
    },
    created() {
        this.getList();
        this.calculation();
    },
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less" scoped></style>
