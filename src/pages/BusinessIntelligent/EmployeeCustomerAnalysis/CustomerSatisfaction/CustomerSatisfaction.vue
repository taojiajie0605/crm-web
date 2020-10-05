<template>
    <a-card title="员工客户满意度分析">
        <TopSearchBox :searchKey="1" @search="search" class="search" />
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
    name: 'CustomerSatisfaction',
    components: {
        TopSearchBox,
        TotalTable,
    },
    data() {
        return {
            data: [],
            columns: [
                { title: '员工姓名', dataIndex: 'realName', align: 'center' },
                {
                    title: '回访合同总数',
                    dataIndex: 'visitContractNum',
                    align: 'center',
                    sorter: (a, b) => a.visitContractNum - b.visitContractNum,
                },
                {
                    title: '很满意',
                    dataIndex: '很满意',
                    align: 'center',
                    sorter: (a, b) => a.很满意 - b.很满意,
                },
                {
                    title: '满意',
                    dataIndex: '满意',
                    align: 'center',
                    sorter: (a, b) => a.满意 - b.满意,
                },
                {
                    title: '一般',
                    dataIndex: '一般',
                    align: 'center',
                    sorter: (a, b) => a.一般 - b.一般,
                },
                {
                    title: '不满意',
                    dataIndex: '不满意',
                    align: 'center',
                    sorter: (a, b) => a.不满意 - b.不满意,
                },
                {
                    title: '很不满意',
                    dataIndex: '很不满意',
                    align: 'center',
                    sorter: (a, b) => a.很不满意 - b.很不满意,
                },
            ],
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
            request('/CustomerSatisfactionTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data;
            });
        },
    },
    mounted() {
        this.search({});
    },
};
</script>

<style lang="less" scoped></style>
