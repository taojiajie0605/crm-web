<template>
    <div class="dr-return-visti">
        <a-row>
            <a-col :span="20" />
            <a-col :span="4" align="right">
                <a-button type="primary" @click="custAddForm"
                    >+新建回访</a-button
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
import CustAddForm from '@/pages/CustomerManagement/ReturnVisit/components/CustAddForm';
const columns = [
    {
        title: '回访编号',
        scopedSlots: { customRender: 'name' },
        key: 'name',
    },
    {
        title: '回访时间',
        dataIndex: 'returnvisittime',
        key: 'returnvisittime',
    },
    {
        title: '回访人',
        dataIndex: 'returnvisitperson',
        key: 'returnvisitperson',
    },
    {
        title: '回访形式',
        dataIndex: 'returnvisittype',
        key: 'returnvisittype',
    },
    {
        title: '客户名称',
        dataIndex: 'custname',
        key: 'custname',
    },
    {
        title: '联系人',
        dataIndex: 'contactname',
        key: 'contactname',
    },
];
export default {
    name: 'DrReturnVisit',
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
            request('/DrawerCompReturnVisit', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.answer;
            });
        },
        fetchadd() {},
        custAddForm() {
            this.emprecord = {};
            this.$refs.CustAddForm.visible = true;
        },
        id(record) {},
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
