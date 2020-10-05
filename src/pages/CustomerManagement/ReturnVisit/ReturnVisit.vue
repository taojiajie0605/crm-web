<template>
    <a-card>
        <!--搜索与新建回访-->
        <div
            slot="title"
            style="display: flex; justify-content: space-between;"
        >
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="home"
                    style="
                        color: rgb(250, 173, 20);
                        font-size: 30px;
                        margin-right: 6px;
                    "
                />
                回访管理
            </div>
            <div align="right" style="float: right;">
                <a-button type="primary" icon="plus" @click="createCust">
                    新建回访
                </a-button>
                <!--编辑与新建弹出框-->
                <CustAddForm
                    ref="CustAddForm"
                    :form="record"
                    @fetchadd="fetchadd"
                />
            </div>
        </div>
        <!--点击行选项变化-->
        <div style="height: 12px;">
            <div
                v-show="hasSelected"
                class="body"
                align="left"
                style="float: left;"
            >
                {{ `已选中 ${selectedRowKeys.length} 项` }}
                <a-button
                    type="dash"
                    shape="round"
                    size="small"
                    icon="delete"
                    @click="handleDelete"
                >
                    删除
                </a-button>
            </div>
            <!--场景选择与筛选-->
            <div v-show="!hasSelected" align="left" style="float: left;">
                场景：
                <a-select
                    :default-value="scene"
                    style="width: 200px;"
                    @change="handleSelectChange(value)"
                >
                    <a-select-option value="1"> 全部回访 </a-select-option>
                    <a-select-option value="2"> 我负责的回访 </a-select-option>
                    <a-select-option value="3">
                        下属负责的回访
                    </a-select-option>
                </a-select>
                <a-button
                    type="primary"
                    icon="funnel-plot"
                    style="margin-left: 10px;"
                    @click="advanceSelect"
                >
                    高级筛选
                </a-button>
                <AdvancedScreen
                    ref="AdvancedScreen"
                    :screencondition="screencondition"
                    :screencontent="screencontent"
                    @fetchadvanceSelect="fetchadvanceSelect"
                />
            </div>
        </div>
        <!--表单-->
        <a-table
            class="beauty-scroll"
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectbarChange,
            }"
            style="margin-top: 30px;"
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
            :scroll="{ x: 1800 }"
        >
            <!--回访编号-->
            <span slot="returnvisitname" slot-scope="record">
                <a @click="id(record)">{{ record.returnvisitname }} </a>
            </span>
            <!--客户名称-->
            <span slot="custname" slot-scope="record">
                <a @click="cust(record)">{{ record.custname }} </a>
            </span>
            <!--联系人-->
            <span slot="contactname" slot-scope="record">
                <a @click="contactDrawer(record)">{{ record.contactname }} </a>
            </span>
            <!--合同编号-->
            <span slot="contractnumber" slot-scope="record">
                <a @click="contractDrawer(record)"
                    >{{ record.contractnumber }}
                </a>
            </span>
            <!--是否上下架-->
        </a-table>
        <return-visit-drawer ref="ReturnVisitDrawer" :record="record" />
        <customer-drawer ref="CustomerDrawer" :record="record" />
        <contact-drawer ref="ContactDrawer" :record="record" />
        <contract-drawer ref="ContractDrawer" :record="record" />
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import CustAddForm from './components/CustAddForm'; //新建产品
import AdvancedScreen from './components/AdvancedScreen'; //高级筛选
import ReturnVisitDrawer from '@/pages/drawer/ReturnVisitDrawer';
import CustomerDrawer from '@/pages/drawer/Customer/CustomerDrawer';
import ContactDrawer from '@/pages/drawer/ContactDrawer';
import ContractDrawer from '@/pages/drawer/ContractDrawer';

//表格标题
const columns = [
    {
        title: '回访编号',
        scopedSlots: { customRender: 'returnvisitname' },
        key: 'returnvisitname',
        sorter: (a, b) => a.returnvisitname - b.returnvisitname,
        width: 120,
        fixed: 'left',
    },
    {
        title: '回访时间',
        dataIndex: 'returnvisittime',
        key: 'returnvisittime',
        sorter: (a, b) => a.returnvisittime - b.returnvisittime,
    },
    {
        title: '回访人',
        dataIndex: 'returnvisitperson',
        key: 'returnvisitperson',
        sorter: (a, b) => a.returnvisitperson - b.returnvisitperson,
    },
    {
        title: '回访形式',
        dataIndex: 'returnvisittype',
        key: 'returnvisittype',
        sorter: (a, b) => a.returnvisittype - b.returnvisittype,
    },
    {
        title: '客户名称',
        scopedSlots: { customRender: 'custname' },
        key: 'custname',
        sorter: (a, b) => a.custname - b.custname,
    },
    {
        title: '联系人',
        scopedSlots: { customRender: 'contactname' },
        key: 'contactname',
        sorter: (a, b) => a.contactname - b.contactname,
    },
    {
        title: '合同编号',
        scopedSlots: { customRender: 'contractnumber' },
        key: 'contractnumber',
        sorter: (a, b) => a.contractnumber - b.contractnumber,
    },
    {
        title: '客户满意度',
        dataIndex: 'custsatisfaction',
        key: 'custsatisfaction',
        sorter: (a, b) => a.custsatisfaction - b.custsatisfaction,
    },
    {
        title: '客户反馈',
        dataIndex: 'custreturn',
        key: 'custreturn',
        sorter: (a, b) => a.custreturn - b.custreturn,
    },
    {
        title: '更新时间',
        dataIndex: 'updatetime',
        key: 'updatetime',
        sorter: (a, b) => a.updatetime - b.updatetime,
    },
    {
        title: '创建时间',
        dataIndex: 'createtime',
        key: 'createtime',
        sorter: (a, b) => a.createtime - b.createtime,
    },
    {
        title: '创建人',
        dataIndex: 'founder',
        key: 'founder',
        sorter: (a, b) => a.founder - b.founder,
    },
];
export default {
    components: {
        CustAddForm,
        AdvancedScreen,
        ReturnVisitDrawer,
        CustomerDrawer,
        ContactDrawer,
        ContractDrawer,
    },
    data() {
        return {
            selectedRowKeys: [], //选择的条
            Rowcontent: [], //选择条的内容
            record: {
                //表格一条数据
            },
            data: [], //表格数据
            pagination: {
                //分页
                current: 1,
                pageSize: 10,
            },
            loading: false, //表格加载
            columns, //表格标题

            //3个级联搜索
            scene: '1', //场景内容
            screencondition: undefined, //筛选条件
            screencontent: '', //筛选内容
        };
    },
    //初始查询
    mounted() {
        const pager = this.pagination;
        //this.pagination = pager;
        this.fetch({
            results: pager.pageSize,
            page: pager.current,
            scene: this.scene,
            screencondition: this.screencondition,
            screencontent: this.screencontent,
        });
    },

    //是否点了左侧选择行
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
    },

    methods: {
        //点击分页,搜索
        handleTableChange(pagination) {
            //console.log(pagination);
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.fetch({
                results: pagination.pageSize,
                page: pagination.current,
                scene: this.scene,
                screencondition: this.screencondition,
                screencontent: this.screencontent,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManagereturn', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.data = data.data.answer;
                this.pagination = pagination;
                this.selectedRowKeys = []; //选择的条
            });
        },

        //场景单选框改变搜索
        handleSelectChange(value) {
            this.scene = value;
            (this.pagination = {
                //分页
                current: 1,
                pageSize: 10,
            }),
                this.fetch({
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                    scene: this.scene,
                    screencondition: this.screencondition,
                    screencontent: this.screencontent,
                });
        },

        //弹出筛选搜索方法
        advanceSelect() {
            //console.log('11111111111');
            this.$refs.AdvancedScreen.visible = true;
        },
        //高级筛选搜索方法
        fetchadvanceSelect(screencondition, screencontent) {
            (this.pagination = {
                //分页
                current: 1,
                pageSize: 10,
            }),
                (this.screencondition = screencondition),
                (this.screencontent = screencontent),
                this.fetch({
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                    scene: this.scene,
                    screencondition: this.screencondition,
                    screencontent: this.screencontent,
                });
        },

        //点击新建弹出方法
        createCust() {
            this.record = {};
            //console.log('11111111111');
            this.$refs.CustAddForm.visible = true;
            //console.log('this.$refs.CustAddForm.visible',this.$refs.CustAddForm[0].visible);
        },
        fetchadd(params = {}) {
            console.log('params:', params);
            this.loading = true;
            request('/CustomerManagereturnAdd', METHOD.POST, {
                results: this.pagination.pageSize,
                page: this.pagination.current,
                scene: this.scene,
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

        //左侧行点击事件
        onSelectbarChange(selectedRowKeys, Rowcontent) {
            //console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.Rowcontent = Rowcontent;
            this.selectedRowKeys = selectedRowKeys;
        },

        //页面刷新方法
        handleRefresh() {
            //console.log("323658556");
            this.fetch({
                results: this.pagination.pageSize,
                page: this.pagination.current,
                scene: this.scene,
                screencondition: this.screencondition,
                screencontent: this.screencontent,
            });
        },

        //点击删除
        handleDelete() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定删除?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchDelete();
                },
                onCancel() {},
            });
        },
        //删除选中调用方法
        fetchDelete() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManagereturnTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
        id(record) {
            this.$refs.ReturnVisitDrawer.visible = true;
            this.record = record;
        },
        cust(record) {
            this.$refs.CustomerDrawer.visible = true;
            this.record = record;
        },
        contactDrawer(record) {
            this.$refs.ContactDrawer.visible = true;
            this.record = record;
        },
        contractDrawer(record) {
            this.$refs.ContractDrawer.visible = true;
            this.record = record;
        },
    },
};
</script>

<style scoped>
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
}
.body button {
    margin-left: 10px;
}
</style>
