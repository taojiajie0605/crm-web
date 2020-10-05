<template>
    <a-card title="合同金额排行">
        <TopSearchBox @search="search" class="search" />
        <div style="margin-top: 10px;">合同金额排行（按实际下单时间）</div>
        <Chart class="chart" ref="NewBusinessOpportunitiesChart" />
        <a-table :columns="columns" :data-source="data" :pagination="false" />
    </a-card>
</template>

<script>
import TopSearchBox from '@/components/search/TopSearchBox';
import Chart from './components/chart/ContarctAmountChart';
import { request, METHOD } from '@/utils/request';
export default {
    name: 'CustomerTransformation',
    components: {
        TopSearchBox,
        Chart,
    },
    data() {
        return {
            columns: [
                {
                    width: 100,
                    title: '公司总排名',
                    dataIndex: 'ranking',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '签订人',
                    dataIndex: 'signer',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '部门',
                    dataIndex: 'department',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '合同金额（元）',
                    dataIndex: 'contractAmount',
                    align: 'center',
                },
            ],
            data: [],
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
            request('/getContractAmountRankingTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data;
                const list = JSON.parse(JSON.stringify(data.data)).reverse();
                this.getChartData(list);
            });
        },
        getChartData(data) {
            // 获取图表数据
            this.$refs.NewBusinessOpportunitiesChart.getChartData(data);
        },
    },
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less"></style>
