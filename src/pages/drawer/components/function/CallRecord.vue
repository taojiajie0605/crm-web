<template>
    <div class="call-record">
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
        title: '姓名',
        scopedSlots: { customRender: 'name' },
        key: 'name',
    },
    {
        title: '通话时间',
        dataIndex: 'calltime',
        key: 'calltime',
    },
    {
        title: '通话时长',
        dataIndex: 'callperiod',
        key: 'callperiod',
    },
    {
        title: '呼叫号码',
        dataIndex: 'callphone',
        key: 'callphone',
    },
];
export default {
    name: 'CallRecord',
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
            request('/DrawerCompCallRecord', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.answer;
            });
        },
    },
};
</script>

<style scoped></style>
