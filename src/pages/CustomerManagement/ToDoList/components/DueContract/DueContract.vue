<template>
    <a-card>
        <!--搜索-->
        <div slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="reconciliation"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                即将到的期合同
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
                    icon="flag"
                    @click="handleDeal"
                >
                    标记已处理
                </a-button>
            </div>
            <!--筛选-->
            <div v-show="!hasSelected" align="left" style="float: left;">
                <a-select
                    :default-value="scene"
                    style="width: 200px;"
                    @change="handleSelectChange(value)"
                >
                    <a-select-option value="1"> 即将到期 </a-select-option>
                    <a-select-option value="2"> 已到期 </a-select-option>
                </a-select>
                <a-button
                    type="primary"
                    icon="funnel-plot"
                    style="margin-left: 10px;"
                    @click="advanceSelect"
                >
                    高级筛选
                </a-button>
                <a-button
                    type="default"
                    icon="flag"
                    style="margin-left: 10px;"
                    @click="handleDealAll"
                >
                    全部标记已处理
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
            :scroll="{ x: 2800 }"
        >
            <!--合同编号-->
            <span slot="contractnumber" slot-scope="record">
                <a @click="id(record)">{{ record.contractnumber }} </a>
            </span>
            <!--商机姓名-->
            <span slot="buopname" slot-scope="record">
                <a @click="id(record)">{{ record.buopname }} </a>
            </span>
            <!--客户名称-->
            <span slot="custname" slot-scope="record">
                <a @click="id(record)">{{ record.custname }} </a>
            </span>
            <!--合同金额-->
            <span slot="contractmoney" slot-scope="record">
                <div style="font-weight: bold;">{{ record.contractmoney }}</div>
            </span>
            <!--客户签约人-->
            <span slot="custsigner" slot-scope="record">
                <a @click="id(record)">{{ record.custsigner }} </a>
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
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import AdvancedScreen from './comps/AdvancedScreen'; //高级筛选
import ContractDrawer from '@/pages/drawer/ContractDrawer';

//表格标题
const columns = [
    {
        title: '合同编号',
        scopedSlots: { customRender: 'contractnumber' },
        key: 'contractnumber',
        width: 120,
        fixed: 'left',
    },
    {
        title: '合同名称',
        dataIndex: 'contractname',
        key: 'contractname',
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
    },
    {
        title: '合同金额',
        scopedSlots: { customRender: 'contractmoney' },
        key: 'contractmoney',
    },
    {
        title: '下单时间',
        dataIndex: 'ordertime',
        key: 'ordertime',
    },
    {
        title: '合同开始时间',
        key: 'contractstarttime',
        dataIndex: 'contractstarttime',
    },
    {
        title: '合同结束时间',
        key: 'contractendtime',
        dataIndex: 'contractendtime',
    },
    {
        title: '客户签约人',
        scopedSlots: { customRender: 'custsigner' },
        key: 'custsigner',
    },
    {
        title: '公司签约人',
        dataIndex: 'compsigner',
        key: 'compsigner',
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
    },
    {
        title: '合同类型',
        dataIndex: 'contracttype',
        key: 'contracttype',
    },
    {
        title: '审核状态',
        scopedSlots: { customRender: 'auditstatus' },
        key: 'auditstatus',
    },
    {
        title: '已收款金额',
        scopedSlots: { customRender: 'returnedmoney' },
        key: 'returnedmoney',
    },
    {
        title: '未收款金额',
        scopedSlots: { customRender: 'unreturnedmoney' },
        key: 'unreturnedmoney',
    },
    {
        title: '最后跟进时间',
        dataIndex: 'lastfollowuptime',
        key: 'lastfollowuptime',
    },
    {
        title: '负责人',
        dataIndex: 'person',
        key: 'person',
    },
    {
        title: '更新时间',
        dataIndex: 'updatetime',
        key: 'updatetime',
    },
    {
        title: '创建时间',
        dataIndex: 'createtime',
        key: 'createtime',
    },
    {
        title: '创建人',
        dataIndex: 'founder',
        key: 'founder',
    },
];
export default {
    name: 'Cust',
    components: {
        AdvancedScreen,
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

            //2个级联搜索
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

        //点击标记已处理
        handleDeal() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定已处理选中项?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchDeal();
                },
                onCancel() {},
            });
        },
        //点击所有标记已处理
        handleDealAll() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定已全部处理?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchDeal();
                },
                onCancel() {},
            });
        },
        //标记已处理选中调用方法
        fetchDeal() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManagecontractTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
        id(record) {
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
