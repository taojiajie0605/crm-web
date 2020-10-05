<template>
    <div class="dr-contract">
        <a-row>
            <a-col :span="20" />
            <a-col :span="4" align="right">
                <a-button type="primary" @click="custAddForm"
                    >+新建合同</a-button
                >
            </a-col>
        </a-row>
        <a-row>
            <a-table
                style="margin-top: 30px;"
                :columns="columns"
                :data-source="data"
                :pagination="false"
                :loading="loading"
                @change="handleTableChange"
                :scroll="{ x: 1500 }"
            >
                <!--线索名称-->
                <span slot="name" slot-scope="record">
                    <a @click="id(record)">{{ record.name }} </a>
                </span>
            </a-table>
            <CustAddForm
                ref="CustAddForm"
                :form="emprecord"
                @fetchadd="fetchadd"
            />
        </a-row>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import CustAddForm from '@/pages/CustomerManagement/Contract/components/CustAddForm';
const columns = [
    {
        title: '合同名称',
        scopedSlots: { customRender: 'name' },
        key: 'name',
    },
    {
        title: '合同编号',
        dataIndex: 'contractnumber',
        key: 'contractnumber',
    },
    {
        title: '客户名称',
        dataIndex: 'custname',
        key: 'custname',
    },
    {
        title: '合同金额',
        dataIndex: 'contractmoney',
        key: 'contractmoney',
    },
    {
        title: '开始日期',
        dataIndex: 'contractstarttime',
        key: 'contractstarttime',
    },
    {
        title: '结束日期',
        dataIndex: 'contractendtime',
        key: 'contractendtime',
    },
    {
        title: '状态',
        dataIndex: 'auditstatus',
        key: 'auditstatus',
    },
];
export default {
    name: 'DrContract',
    props: ['records'],
    components: {
        CustAddForm,
    },
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
            request('/DrawerCompContract', METHOD.POST, {
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
