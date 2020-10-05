<template>
    <div class="print-record">
        <a-row>
            <a-table
                style="margin-top: 30px;"
                :columns="columns"
                :data-source="data"
                :pagination="false"
                :loading="loading"
                @change="handleTableChange"
            >
                <!--线索名称-->
                <span slot="name" slot-scope="record">
                    <a @click="id(record)">{{ record.name }} </a>
                </span>
            </a-table>
        </a-row>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
const columns = [
    {
        title: '打印时间',
        scopedSlots: { customRender: 'name' },
        key: 'name',
    },
    {
        title: '打印模板',
        dataIndex: 'template',
        key: 'template',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
    },
];
export default {
    name: 'PrintRecord',
    props: ['records'],
    data() {
        return {
            record: {
                //表格一条数据
            },
            data: [], //表格数据
            loading: false, //表格加载
            columns, //表格标题
        };
    },
    mounted() {
        this.fetch({
            custid: this.records.id,
        });
    },
    methods: {
        fetch(params = {}) {
            this.loading = true;
            request('/DrawerCompPrintRecord', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.answer;
            });
        },
    },
};
</script>

<style scoped>
/* 先把a的样式弄成和普通text一致，等接口完善后删除这条a的样式即可 */
a {
    color: #565656;
    cursor: text;
}
</style>
