<template>
    <a-card title="客户总量分析">
        <TopSearchBox :searchKey="1" @search="search" class="search" />
        <TotalCustomerChart class="chart" ref="TotalCustomerChart" />
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
import TotalCustomerChart from './components/chart/TotalCustomer';
import { request, METHOD } from '@/utils/request';
export default {
    name: 'TotalCustomerAnalysis',
    components: {
        TopSearchBox,
        TotalTable,
        TotalCustomerChart,
    },
    data() {
        return {
            data: [], // 数据
            total: [], // 统计数据
            columns: [
                {
                    width: '17%',
                    title: '员工姓名',
                    dataIndex: 'userName',
                    align: 'center',
                    defaultSortOrder: 'scend',
                    sorter: (a, b) => a.id > b.id,
                },
                {
                    width: '16%',
                    title: '新增客户数',
                    dataIndex: 'addCustomer',
                    align: 'center',
                    sorter: (a, b) => a.addCustomer - b.addCustomer,
                },
                {
                    width: '16%',
                    title: '成交客户数',
                    dataIndex: 'dealCustomer',
                    align: 'center',
                    sorter: (a, b) => a.dealCustomer - b.dealCustomer,
                },
                {
                    width: '16%',
                    title: '客户成交率（%）',
                    dataIndex: 'turnoverRate',
                    align: 'center',
                    sorter: (a, b) => a.turnoverRate - b.turnoverRate,
                    scopedSlots: { customRender: 'turnoverRate' },
                },
                {
                    width: '16%',
                    title: '合同总金额',
                    dataIndex: 'contractMoney',
                    align: 'center',
                    sorter: (a, b) => a.contractMoney - b.contractMoney,
                },
                {
                    width: '16%',
                    title: '回款金额',
                    dataIndex: 'amountReceived',
                    align: 'center',
                    sorter: (a, b) => a.amountReceived - b.amountReceived,
                },
            ],
            totalColumns: [
                {
                    width: '17%',
                    title: '总计',
                    dataIndex: 'totalUserName',
                    align: 'center',
                },
                {
                    width: '16%',
                    title: '新增客户数',
                    dataIndex: 'totalAddCustomer',
                    align: 'center',
                },
                {
                    width: '16%',
                    title: '成交客户数',
                    dataIndex: 'totalDealCustomer',
                    align: 'center',
                },
                {
                    width: '16%',
                    title: '客户成交率（%）',
                    dataIndex: 'totalTurnoverRate',
                    align: 'center',
                },
                {
                    width: '16%',
                    title: '合同总金额',
                    dataIndex: 'totalContractMoney',
                    align: 'center',
                },
                {
                    width: '16%',
                    title: '回款金额',
                    dataIndex: 'totalAmountReceived',
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
        getTableData(param) {
            // 初始化数据
            request('/TotalCustomerTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data.list;
                this.total = data.data.total;
                console.log(this.total);
            });
        },
        getChartData(data) {
            // 获取图表数据
            this.$refs.TotalCustomerChart.getChartData(data);
        },
    },
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less" scoped></style>
