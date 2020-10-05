<template>
    <a-card title="客户转化率分析">
        <TopSearchBox
            @search="search"
            class="search"
            :chartTypeOptions="chartTypeOptions"
            @changeChartType="changeChartType"
        />
        <Chart class="chart" ref="CustomerTransformationChart" />
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
                    v-if="item.pro > 0"
                    @click="showDetail(item.type)"
                    >{{ item.pro }}</a-button
                >
                {{ item.pro === 0 ? item.pro : '' }}
            </div>
        </a-table>
        <!-- 详情框 -->
        <detail ref="CustomerTransformationDetail" />
    </a-card>
</template>

<script>
import TopSearchBox from '@/components/search/TopSearchBox';
import Chart from './components/chart/CustomerTransformationChart';
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
            chartTypeOptions: [
                { label: '折线图', value: '折线图' },
                { label: '饼状图', value: '饼状图' },
                { label: '柱状图', value: '柱状图' },
            ],
            currentChartType: '折线图',
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
            request('/CustomerTransformationTableList', METHOD.POST, {
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
                const item = { id: 1, date: '转化率（%）' };
                for (let i = 0; i < list.length; i++) {
                    this.columns.push({
                        width: 100,
                        title: list[i].type,
                        dataIndex: list[i].type,
                        align: 'center',
                        scopedSlots: { customRender: list[i].type },
                    });
                    item[list[i].type] = list[i].pro;
                }
                this.data = [];
                this.data.push(item);
                this.getChartData(list);
                this.array = list;
            });
        },
        getChartData(data) {
            // 获取图表数据
            this.$refs.CustomerTransformationChart.getChartData(
                data,
                this.currentChartType,
            );
        },
        showDetail(item) {
            this.$refs.CustomerTransformationDetail.type = item;
            this.$refs.CustomerTransformationDetail.isShow = true;
            this.$refs.CustomerTransformationDetail.getList(item);
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

<style lang="less"></style>
