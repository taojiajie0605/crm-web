<template>
    <a-card title="跟进客户数排行">
        <TopSearchBox @search="search" class="search" />
        <div style="margin-top: 10px;">
            跟进客户数排行（按创建人、跟进时间统计）
        </div>
        <Chart class="chart" ref="Chart" />
        <a-table :columns="columns" :data-source="data" :pagination="false" />
    </a-card>
</template>

<script>
import TopSearchBox from '@/components/search/TopSearchBox';
import Chart from './components/chart/Chart';
import { request, METHOD } from '@/utils/request';
export default {
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
                    title: '员工',
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
                    title: '跟进客户数（个）',
                    dataIndex: 'count',
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
            request('/getNumberOfFollowUpCustomersTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data;
                const list = JSON.parse(JSON.stringify(data.data)).reverse();
                this.getChartData(list);
            });
        },
        getChartData(data) {
            // 获取图表数据
            this.$refs.Chart.getChartData(data);
        },
    },
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less"></style>
