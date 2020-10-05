<template>
    <a-card title="销售漏斗">
        <TopSearchBox
            :searchKey="1"
            @search="search"
            class="search"
            :groupOptionsIsShow="true"
            @changeGroupOption="changeGroupOption"
        />
        <Chart class="chart" ref="SalesFunnelChart" />
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
import Chart from './components/chart/SalesFunnelChart';
import { request, METHOD } from '@/utils/request';
export default {
    components: {
        TopSearchBox,
        TotalTable,
        Chart,
    },
    data() {
        return {
            data: [], // 数据
            columns: [
                {
                    title: '阶段',
                    dataIndex: 'stage',
                    align: 'center',
                    defaultSortOrder: 'scend',
                    sorter: (a, b) => a.id > b.id,
                },
                {
                    title: '金额',
                    dataIndex: 'money',
                    align: 'center',
                    sorter: (a, b) => a.money - b.money,
                },
                {
                    title: '商机数',
                    dataIndex: 'businessOpportunity',
                    align: 'center',
                    sorter: (a, b) =>
                        a.businessOpportunity - b.businessOpportunity,
                },
            ],
            currentGroup: '',
        };
    },
    methods: {
        search(searchKey) {
            console.log('搜索值:');
            console.log(searchKey);
            this.getTableData(searchKey);
        },
        getTableData(param) {
            // 初始化数据
            request('/SalesFunnelTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data;
                this.getChartData(data.data);
            });
        },
        getChartData(data) {
            // 获取图表数据
            this.$refs.SalesFunnelChart.getChartData(data);
        },
        changeGroupOption(e) {
            // 修改图表类型
            this.currentGroup = e;
        },
    },
    created() {},
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less" scoped></style>
