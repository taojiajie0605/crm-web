<template>
    <a-card title="新增商机">
        <TopSearchBox @search="search" class="search" />
        <Chart class="chart" ref="NewBusinessOpportunitiesChart" />
        <a-table
            :columns="columns"
            :data-source="data"
            bordered
            :pagination="false"
            rowKey="id"
            :scroll="{ x: 1500 }"
        >
            <div v-for="(item, index) in array" :key="index" :slot="item.type">
                <a-button
                    type="link"
                    v-if="item.businessNum > 0"
                    @click="showDetail(item.type)"
                    >{{ item.businessNum }}</a-button
                >
                {{ item.businessNum === 0 ? item.businessNum : '' }}
            </div>
        </a-table>
        <!-- 详情框 -->
        <detail ref="NewBusinessOpportunitiesDetail" />
    </a-card>
</template>

<script>
import TopSearchBox from '@/components/search/TopSearchBox';
import Chart from './components/chart/BusinessOpportunitiesChart';
import Detail from './components/Detail';
import { request, METHOD } from '@/utils/request';
export default {
    name: 'CustomerTransformation',
    components: {
        TopSearchBox,
        Chart,
        Detail,
    },
    data() {
        return {
            columns: [
                {
                    width: 100,
                    title: '日期',
                    dataIndex: 'date',
                    align: 'center',
                },
            ],
            data: [],
            array: [],
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
            request('/getAddBusinessOpportunitiesTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.columns = [
                    {
                        width: 100,
                        title: '日期',
                        dataIndex: 'date',
                        align: 'center',
                    },
                ];
                const list = data.data;
                const item = { id: 1, date: '数量' };
                for (let i = 0; i < list.length; i++) {
                    this.columns.push({
                        width: 100,
                        title: list[i].type,
                        dataIndex: list[i].type,
                        align: 'center',
                        scopedSlots: { customRender: list[i].type },
                    });
                    item[list[i].type] = list[i].businessNum;
                }
                this.data = [];
                this.data.push(item);
                this.getChartData(data.data);
                this.array = list;
            });
        },
        getChartData(data) {
            // 获取图表数据
            this.$refs.NewBusinessOpportunitiesChart.getChartData(data);
        },
        showDetail(item) {
            this.$refs.NewBusinessOpportunitiesDetail.type = item;
            this.$refs.NewBusinessOpportunitiesDetail.isShow = true;
            this.$refs.NewBusinessOpportunitiesDetail.getList(item);
        },
    },
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less"></style>
