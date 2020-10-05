<template>
    <div class="dr-contact">
        <a-row align="right">
            <a-col :span="20" />
            <a-col :span="4" align="right">
                <a-button type="primary" @click="custAddForm"
                    >+新建联系人</a-button
                >
            </a-col>
        </a-row>
        <a-row class="blank" />
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
        <contact-drawer ref="ContactRecord" />
        <CustAddForm ref="CustAddForm" :form="emprecord" @fetchadd="fetchadd" />
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import ContactDrawer from '@/pages/drawer/ContactDrawer';
import CustAddForm from '@/pages/CustomerManagement/Contacts/components/CustAddForm'; //新建联系人
//表格标题
const columns = [
    {
        title: '姓名',
        scopedSlots: { customRender: 'name' },
        key: 'name',
    },
    {
        title: '手机',
        dataIndex: 'telephone',
        key: 'telephone',
    },
    {
        title: '职务',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
    },
];
export default {
    name: 'DrContact',
    props: ['records'],
    components: {
        ContactDrawer,
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
    //初始查询
    mounted() {
        this.fetch({
            custid: this.records.id,
        });
    },
    methods: {
        fetch(params = {}) {
            console.log('params:', params);
            this.loading = true;
            request('/DrawerCompContact', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.answer;
                console.log(data.data.answer);
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
.blank {
    height: 20px;
}
/* 先把a的样式弄成和普通text一致，等接口完善后删除这条a的样式即可 */
a {
    color: #565656;
    cursor: text;
}
</style>
