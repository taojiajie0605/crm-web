<template>
    <div class="dr-product">
        <a-row>
            <a-col :span="20" />
            <a-col :span="4" align="right">
                <a-button type="primary" @click="custAddForm"
                    >+新建产品</a-button
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
import CustAddForm from '@/pages/CustomerManagement/Product/components/CustAddForm'; //新建产品
const columns = [
    {
        title: '产品名称',
        scopedSlots: { customRender: 'name' },
        key: 'name',
    },
    {
        title: '产品类别',
        dataIndex: 'producttype',
        key: 'producttype',
    },
    {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
    },
    {
        title: '标准价格',
        dataIndex: 'productprice',
        key: 'productprice',
    },
    {
        title: '售价',
        dataIndex: 'sellprice',
        key: 'sellprice',
    },
    {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: '折扣%',
        dataIndex: 'discount',
        key: 'discount',
    },
    {
        title: '合计',
        dataIndex: 'total',
        key: 'total',
    },
];
export default {
    name: 'DrProduct',
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
            emprecord: [],
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
            request('/DrawerCompProduct', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.answer;
            });
        },
        custAddForm() {
            console.log('sss');
            this.emprecord = {};
            this.$refs.CustAddForm.visible = true;
        },
        fetchadd(params = {}) {
            console.log('params:', params);
            this.loading = true;
            request('/CustomerManageProductsAdd', METHOD.POST, {
                results: this.pagination.pageSize,
                page: this.pagination.current,
                scene: this.scene,
                nameorphone: this.nameorphone,
                screencondition: this.screencondition,
                screencontent: this.screencontent,
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.data = data.data.answer;
                this.pagination = pagination;
                //弹出框
                this.loading = false;
                this.$message.success(data.data.msg);
                this.selectedRowKeys = []; //选择的条
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
