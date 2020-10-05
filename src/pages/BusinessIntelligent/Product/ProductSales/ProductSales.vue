<template>
    <a-card title="产品销售情况统计">
        <TopSearchBox @search="search" class="search" />
        <a-table :columns="columns" :dataSource="data" class="table" />
    </a-card>
</template>

<script>
import TopSearchBox from '@/components/search/TopSearchBox';
import { request, METHOD } from '@/utils/request';
export default {
    components: {
        TopSearchBox,
    },
    data() {
        return {
            data: [],
            columns: [
                {
                    title: '产品分类',
                    dataIndex: 'productType',
                    align: 'center',
                },
                {
                    title: '产品名称',
                    dataIndex: 'productName',
                    align: 'center',
                },
                { title: '合同编号', dataIndex: 'contractId', align: 'center' },
                {
                    title: '负责人',
                    dataIndex: 'personInCharge',
                    align: 'center',
                },
                {
                    title: '客户名称',
                    dataIndex: 'customerName',
                    align: 'center',
                },
                { title: '销售单价', dataIndex: 'salesPrice', align: 'center' },
                { title: '数量', dataIndex: 'count', align: 'center' },
                {
                    title: '订单产品小计',
                    dataIndex: 'subtotal',
                    align: 'center',
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
            request('/', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.table {
    margin-top: 20px;
}
</style>
