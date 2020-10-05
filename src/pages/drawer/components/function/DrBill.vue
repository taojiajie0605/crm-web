<template>
    <div class="dr-bill">
        <a-row>
            <a-col :span="20" />
            <a-col :span="4" align="right">
                <a-button type="primary"> +新建发票抬头 </a-button>
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
            >
                <!--线索名称-->
                <span slot="name" slot-scope="record">
                    <a @click="id(record)">{{ record.name }} </a>
                </span>
            </a-table>
        </a-row>
        <a-row>
            <div class="blank"></div>
        </a-row>
        <a-row>
            <a-col :span="20" />
            <a-col :span="4" align="right">
                <a-button type="primary" @click="custAddForm">
                    +新建发票
                </a-button>
            </a-col>
        </a-row>
        <a-row>
            <a-table
                style="margin-top: 30px;"
                :columns="columns2"
                :data-source="data2"
                :pagination="false"
                :loading="loading"
                @change="handleTableChange"
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
import CustAddForm from '@/pages/CustomerManagement/Bill/components/CustAddForm';
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
const columns2 = [
    {
        title: '姓名',
        scopedSlots: { customRender: 'name' },
        key: 'name',
    },
    {
        title: '手机',
        dataIndex: 'telephone2',
        key: 'telephone2',
    },
    {
        title: '职务',
        dataIndex: 'position2',
        key: 'position2',
    },
    {
        title: '操作',
        dataIndex: 'operation2',
        key: 'operation2',
    },
];
export default {
    name: 'DrBill',
    props: ['records'],
    components: {
        CustAddForm,
    },
    data() {
        return {
            record: {
                //表格一条数据
            },
            record2: {
                //表格一条数据
            },
            data: [], //表格数据
            data2: [], //表格数据
            loading: false, //表格加载
            columns, //表格标题
            emprecord: {},
        };
    },
    mounted() {
        this.fetch({
            custid: this.records.id,
        });
        this.fetch2({
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
        fetch2(params = {}) {
            this.loading = true;
            request('/DrawerCompContact', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data2 = data.data.answer;
            });
        },
        custAddForm() {
            (this.emprecord = {}), (this.$refs.CustAddForm.visible = true);
        },
    },
};
</script>

<style scoped>
.blank {
    height: 50px;
}
/* 先把a的样式弄成和普通text一致，等接口完善后删除这条a的样式即可 */
a {
    color: #565656;
    cursor: text;
}
</style>
