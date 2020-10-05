<template>
    <div>
        <div class="btn"><a-button @click="exportTable">导出</a-button></div>
        <a-table
            :columns="columns"
            :data-source="data"
            bordered
            :pagination="false"
            rowKey="id"
        >
            <template slot="footer" v-if="totalColumns !== ''">
                <a-table
                    :columns="totalColumns"
                    :data-source="total"
                    :showHeader="false"
                    :pagination="false"
                    rowKey="id"
                />
            </template>
        </a-table>
    </div>
</template>

<script>
export default {
    name: 'ChartTotalTable',
    props: ['columns', 'totalColumns', 'data', 'total'],
    methods: {
        exportTable() {
            // 导出表格
            console.log('导出');
        },
    },
};
</script>

<style lang="less" scoped>
/deep/.ant-table.ant-table-bordered .ant-table-footer {
    border: none;
}
/deep/.ant-table-footer {
    margin: 0;
    padding: 0;
    border: none;
}
/deep/.ant-table-placeholder {
    border-top: none;
    border-bottom: none;
}
.btn {
    text-align: right;
    margin-bottom: 10px;
}
</style>
