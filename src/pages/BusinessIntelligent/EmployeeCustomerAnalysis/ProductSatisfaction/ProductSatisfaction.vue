<template>
    <a-card title="产品满意度分析">
        <TopSearchBox @search="search" class="search" />
        <div>显示个啥</div>
    </a-card>
</template>

<script>
import TopSearchBox from '@/components/search/TopSearchBox';

// import { request, METHOD } from "@/utils/request";

export default {
    name: 'CustomerTransformation',
    components: {
        TopSearchBox,
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
        };
    },
    methods: {
        search(searchKey) {
            console.log('搜索值:');
            console.log(searchKey);
            //this.getChartData(searchKey)
        },
        getChartData(data) {
            // 获取图表数据
            console.log(data);
        },
    },
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less"></style>
