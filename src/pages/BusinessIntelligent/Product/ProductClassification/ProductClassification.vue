<template>
    <a-card title="产品分类销量分析" class="container">
        <TopSearchBox @search="search" class="search" />
        <Chart ref="Chart" />
        <h2>产品分类销售</h2>
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
    mounted() {
        this.search({});
    },
    methods: {
        search(param) {
            // console.log(param)
            // 初始化数据
            request('/ProductClassificationChart', METHOD.POST, {
                ...param,
            }).then((data) => {
                // console.log(data)
                this.getChartData(data.data);
            });
        },
        getChartData(param) {
            this.$refs.Chart.getChartData(param);
        },
    },
};
</script>

<style lang="less" scoped>
.container {
    height: 700px;
    h2 {
        font-weight: bold;
        display: inline-block;
        width: 100%;
        padding: 0 auto;
        margin-top: 20px;
        text-align: center;
    }
}
</style>
