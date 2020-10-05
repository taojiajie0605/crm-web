<template>
    <a-card title="日志分析">
        <TopSearchBox @search="search" class="search" />
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
import { request, METHOD } from '@/utils/request';
export default {
    components: {
        TopSearchBox,
        TotalTable,
    },
    data() {
        return {
            data: [],
            columns: [
                { title: '员工', dataIndex: 'userName', align: 'center' },
                {
                    title: '填写数',
                    dataIndex: 'writeNum',
                    align: 'center',
                    sorter: (a, b) => a.writeNum - b.writeNum,
                },
                {
                    title: '未评论数',
                    dataIndex: 'noCommentNum',
                    align: 'center',
                    sorter: (a, b) => a.noCommentNum - b.noCommentNum,
                },
                {
                    title: '已评论数',
                    dataIndex: 'yesCommentNum',
                    align: 'center',
                    sorter: (a, b) => a.yesCommentNum - b.yesCommentNum,
                },
            ],
        };
    },
    mounted() {
        this.search({});
    },
    methods: {
        search(param) {
            // console.log(param)
            this.getTableData(param);
        },
        getTableData(param) {
            // 初始化数据
            request('/LogAnalysisTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data;
            });
        },
    },
};
</script>
