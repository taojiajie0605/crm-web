<template>
    <a-card>
        <!--搜索与新建联系人-->
        <div
            slot="title"
            style="display: flex; justify-content: space-between;"
        >
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="reconciliation"
                    style="
                        color: rgb(250, 84, 28);
                        font-size: 30px;
                        margin-right: 6px;
                    "
                />
                合同管理
            </div>
            <div style="text-align: center;">
                <a-input
                    style="width: 250px; margin-right: 10px;"
                    v-model="nameorphone"
                    size="default"
                    placeholder="请输入客户名称/合同编号/合同名称"
                />
                <a-button type="primary" @click="search"> 搜索 </a-button>
            </div>
            <div align="right" style="float: right;">
                <a-button type="primary" icon="plus" @click="createCust">
                    新建合同
                </a-button>
                <a-button
                    type="primary"
                    icon="export"
                    style="margin-left: 10px;"
                >
                    导出
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
                align="left"
                style="float: left;"
                class="body"
            >
                {{ `已选中 ${selectedRowKeys.length} 项` }}
                <a-button
                    type="dash"
                    shape="round"
                    size="small"
                    icon="swap"
                    @click="handleTransform"
                >
                    转移
                    <Transform
                        ref="Transform"
                        @fetchTransform="fetchTransform"
                    />
                </a-button>
                <a-button
                    type="dash"
                    shape="round"
                    size="small"
                    icon="download"
                    @click="fetchOut"
                >
                    导出选中
                </a-button>
                <a-button
                    type="dash"
                    shape="round"
                    size="small"
                    icon="delete"
                    @click="handleDelete"
                >
                    删除
                </a-button>
                <a-button
                    type="dash"
                    shape="round"
                    size="small"
                    icon="plus-circle"
                    @click="handleAddTeamMember"
                >
                    添加团队成员
                    <AddTeamMember
                        ref="AddTeamMember"
                        @fetchAddTeamMember="fetchAddTeamMember"
                    />
                </a-button>
                <a-button
                    type="dash"
                    shape="round"
                    size="small"
                    icon="minus-circle"
                    @click="handleRemoveTeamMember"
                >
                    移除团队成员
                    <RemoveTeamMember
                        ref="RemoveTeamMember"
                        @fetchRemoveTeamMember="fetchRemoveTeamMember"
                    />
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
                    <a-select-option value="1"> 全部合同 </a-select-option>
                    <a-select-option value="2"> 我负责的合同 </a-select-option>
                    <a-select-option value="3">
                        下属负责的合同
                    </a-select-option>
                    <a-select-option value="4"> 我参与的合同 </a-select-option>
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
            <div align="right" style="float: right; margin-right: 10px;">
                <div style="color: #99a9bf;">
                    合同总金额：{{ totalmoney }} / 已回款金额：{{
                        totalreturnedmoney
                    }}
                    / 未回款金额：{{ totalunreturnedmoney }}
                </div>
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
            :scroll="{ x: 2800 }"
        >
            <!--合同编号-->
            <span slot="contractnumber" slot-scope="record">
                <a @click="id(record)">{{ record.contractnumber }} </a>
            </span>
            <!--商机姓名-->
            <span slot="buopname" slot-scope="record">
                <a @click="buopDrawer(record)">{{ record.buopname }} </a>
            </span>
            <!--客户名称-->
            <span slot="custname" slot-scope="record">
                <a @click="cust(record)">{{ record.custname }} </a>
            </span>
            <!--合同金额-->
            <span slot="contractmoney" slot-scope="record">
                <div style="font-weight: bold;">{{ record.contractmoney }}</div>
            </span>
            <!--客户签约人-->
            <span slot="custsigner" slot-scope="record">
                <a @click="contactDrawer(record)">{{ record.custsigner }} </a>
            </span>
            <!--已收款金额-->
            <span slot="returnedmoney" slot-scope="record">
                <div style="color: #20b559; font-weight: bold;">
                    {{ record.returnedmoney }}
                </div>
            </span>
            <!--未收款金额-->
            <span slot="unreturnedmoney" slot-scope="record">
                <div style="color: #f94e4e; font-weight: bold;">
                    {{ record.unreturnedmoney }}
                </div>
            </span>
            <!--审核状态-->
            <span slot="auditstatus" slot-scope="record">
                <div v-if="record.auditstatus === 1">
                    <a-icon
                        type="bulb"
                        theme="filled"
                        style="color: #20b559;"
                    />
                    通过
                </div>
                <div v-if="record.auditstatus === 2">
                    <a-icon type="bulb" />
                    未提交
                </div>
            </span>
        </a-table>
        <contract-drawer ref="ContractDrawer" :record="record" />
        <business-op-drawer ref="BusinessOpDrawer" :record="record" />
        <contact-drawer ref="ContactDrawer" :record="record" />
        <customer-drawer ref="CustomerDrawer" :record="record" />
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import CustAddForm from './components/CustAddForm'; //新建合同
import AdvancedScreen from './components/AdvancedScreen'; //高级筛选
import Transform from './components/Transform'; //转移
import AddTeamMember from './components/AddTeamMember'; //添加团队成员
import RemoveTeamMember from './components/RemoveTeamMember'; //移除团队成员
import ContractDrawer from '@/pages/drawer/ContractDrawer';
import CustomerDrawer from '@/pages/drawer/Customer/CustomerDrawer';
import BusinessOpDrawer from '@/pages/drawer/BusinessOpDrawer';
import ContactDrawer from '@/pages/drawer/ContactDrawer';

//表格标题
const columns = [
    {
        title: '合同编号',
        scopedSlots: { customRender: 'contractnumber' },
        key: 'contractnumber',
        sorter: (a, b) => a.contractnumber - b.contractnumber,
        width: 120,
        fixed: 'left',
    },
    {
        title: '合同名称',
        dataIndex: 'contractname',
        key: 'contractname',
        sorter: (a, b) => a.contractname - b.contractname,
    },
    {
        title: '客户名称',
        scopedSlots: { customRender: 'custname' },
        key: 'custname',
        sorter: (a, b) => a.custname - b.custname,
    },
    {
        title: '商机名称',
        scopedSlots: { customRender: 'buopname' },
        key: 'buopname',
        sorter: (a, b) => a.buopname - b.buopname,
    },
    {
        title: '合同金额',
        scopedSlots: { customRender: 'contractmoney' },
        key: 'contractmoney',
        sorter: (a, b) => a.contractmoney - b.contractmoney,
    },
    {
        title: '下单时间',
        dataIndex: 'ordertime',
        key: 'ordertime',
        sorter: (a, b) => a.ordertime - b.ordertime,
    },
    {
        title: '合同开始时间',
        key: 'contractstarttime',
        dataIndex: 'contractstarttime',
        sorter: (a, b) => a.contractstarttime - b.contractstarttime,
    },
    {
        title: '合同结束时间',
        key: 'contractendtime',
        dataIndex: 'contractendtime',
        sorter: (a, b) => a.contractendtime - b.contractendtime,
    },
    {
        title: '客户签约人',
        scopedSlots: { customRender: 'custsigner' },
        key: 'custsigner',
        sorter: (a, b) => a.custsigner - b.custsigner,
    },
    {
        title: '公司签约人',
        dataIndex: 'compsigner',
        key: 'compsigner',
        sorter: (a, b) => a.compsigner - b.compsigner,
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        sorter: (a, b) => a.remarks - b.remarks,
    },
    {
        title: '合同类型',
        dataIndex: 'contracttype',
        key: 'contracttype',
        sorter: (a, b) => a.contracttype - b.contracttype,
    },
    {
        title: '审核状态',
        scopedSlots: { customRender: 'auditstatus' },
        key: 'auditstatus',
        sorter: (a, b) => a.auditstatus - b.auditstatus,
    },
    {
        title: '已收款金额',
        scopedSlots: { customRender: 'returnedmoney' },
        key: 'returnedmoney',
        sorter: (a, b) => a.returnedmoney - b.returnedmoney,
    },
    {
        title: '未收款金额',
        scopedSlots: { customRender: 'unreturnedmoney' },
        key: 'unreturnedmoney',
        sorter: (a, b) => a.unreturnedmoney - b.unreturnedmoney,
    },
    {
        title: '最后跟进时间',
        dataIndex: 'lastfollowuptime',
        key: 'lastfollowuptime',
        sorter: (a, b) => a.lastfollowuptime - b.lastfollowuptime,
    },
    {
        title: '负责人',
        dataIndex: 'person',
        key: 'person',
        sorter: (a, b) => a.person - b.person,
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
        Transform,
        AddTeamMember,
        RemoveTeamMember,
        ContractDrawer,
        BusinessOpDrawer,
        CustomerDrawer,
        ContactDrawer,
    },
    data() {
        return {
            totalmoney: 0, //合同总金额
            totalreturnedmoney: 0,
            totalunreturnedmoney: 0,
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
            nameorphone: '', //搜索框内容
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
            nameorphone: this.nameorphone,
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
                nameorphone: this.nameorphone,
                screencondition: this.screencondition,
                screencontent: this.screencontent,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManagecontract', METHOD.POST, {
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
                this.totalmoney = data.data.totalmoney; //合同总金额
                this.totalreturnedmoney = data.data.totalreturnedmoney; //已回款金额
                this.totalunreturnedmoney = data.data.totalunreturnedmoney; //未回款金额
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
                    nameorphone: this.nameorphone,
                    screencondition: this.screencondition,
                    screencontent: this.screencontent,
                });
        },

        //点击搜索方法
        search() {
            (this.pagination = {
                //分页
                current: 1,
                pageSize: 10,
            }),
                this.fetch({
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                    scene: this.scene,
                    nameorphone: this.nameorphone,
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
                    nameorphone: this.nameorphone,
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
            request('/CustomerManagecontractAdd', METHOD.POST, {
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
                this.totalmoney = data.data.totalmoney; //合同总金额
                this.totalreturnedmoney = data.data.totalreturnedmoney; //已回款金额
                this.totalunreturnedmoney = data.data.totalunreturnedmoney; //未回款金额
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
                nameorphone: this.nameorphone,
                screencondition: this.screencondition,
                screencontent: this.screencontent,
            });
        },
        //批量转移弹出框方法
        handleTransform() {
            this.$refs.Transform.visible = true;
        },
        //批量转移子调用方法
        fetchTransform(person, formercondition) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManagecontractTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
                //转移内容
                person: person,
                formercondition: formercondition,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },

        //导出选中调用方法
        fetchOut() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManagecontractTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
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
            request('/CustomerManagecontractTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },

        //添加团队弹出框方法
        handleAddTeamMember() {
            this.$refs.AddTeamMember.visible = true;
        },
        //添加团队子调用方法
        fetchAddTeamMember(teammember, role) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManagecontractTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
                //转移内容
                teammember: teammember,
                role: role,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },

        //移除团队弹出框方法
        handleRemoveTeamMember() {
            this.$refs.RemoveTeamMember.visible = true;
        },
        //移除团队子调用方法
        fetchRemoveTeamMember(teammember) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManagecontractTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
                //转移内容
                teammember: teammember,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
        id(record) {
            this.$refs.ContractDrawer.visible = true;
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
        buopDrawer(record) {
            this.$refs.BusinessOpDrawer.visible = true;
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
