<template>
    <div class="dr-business-op">
        <a-row>
            <a-col :span="20" />
            <a-col :span="4" align="right">
                <a-button type="primary" @click="custAddForm"
                    >+新建商机</a-button
                >
            </a-col>
        </a-row>
        <CustAddForm ref="CustAddForm" :form="record" @fetchadd="fetchadd" />
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
import CustAddForm from '@/pages/CustomerManagement/BusinessOpportunity/components/CustAddForm';
const columns = [
    {
        title: '商机名称',
        scopedSlots: { customRender: 'name' },
        key: 'name',
    },
    {
        title: '商机金额',
        dataIndex: 'buopmoney',
        key: 'buopmoney',
    },
    {
        title: '客户名称',
        dataIndex: 'custname',
        key: 'custname',
    },
    {
        title: '商机组',
        dataIndex: 'buopstate',
        key: 'buopstate',
    },
    {
        title: '商机阶段',
        dataIndex: 'buopstage',
        key: 'buopstage',
    },
];
export default {
    name: 'DrBusinessOp',
    components: {
        CustAddForm,
    },
    props: ['records'],
    data() {
        return {
            record: {
                //表格一条数据
            },
            data: [], //表格数据
            loading: false, //表格加载
            columns, //表格标题
            emprecord: {},
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
            request('/DrawerCompBusinessOp', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.answer;
            });
        },
        custAddForm() {
            this.emprecord = {};
            this.$refs.CustAddForm.visible = true;
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
