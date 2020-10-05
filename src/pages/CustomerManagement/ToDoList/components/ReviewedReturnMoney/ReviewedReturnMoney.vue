<template>
    <a-card>
        <!--搜索-->
        <div slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="money-collect"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                待审核回款
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
                    icon="edit"
                    @click="handleEdit"
                >
                    已审核
                </a-button>
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
                    <a-select-option value="1"> 待审核 </a-select-option>
                    <a-select-option value="2"> 已审核 </a-select-option>
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
            :scroll="{ x: 1800 }"
        >
            <!--回款编号-->
            <span slot="returnmoneynumber" slot-scope="record">
                <a @click="id(record)">{{ record.returnmoneynumber }} </a>
            </span>
            <!--客户名称-->
            <span slot="custname" slot-scope="record">
                <a @click="customerDrawer(record)">{{ record.custname }} </a>
            </span>
            <!--合同编号-->
            <span slot="contractnumber" slot-scope="record">
                <a @click="contractDrawer(record)"
                    >{{ record.contractnumber }}
                </a>
            </span>
            <!--审核状态-->
            <span slot="auditstatus" slot-scope="record">
                <div v-if="record.auditstatus === 1">
                    <a-icon
                        type="bulb"
                        theme="filled"
                        style="color: #999999;"
                    />
                    未提交
                </div>
                <div v-if="record.auditstatus === 2">
                    <a-icon
                        type="bulb"
                        theme="filled"
                        style="color: #ffc539;"
                    />
                    待审核
                </div>
                <div v-if="record.auditstatus === 3">
                    <a-icon
                        type="bulb"
                        theme="filled"
                        style="color: #999999;"
                    />
                    撤回
                </div>
                <div v-if="record.auditstatus === 4">
                    <a-icon
                        type="bulb"
                        theme="filled"
                        style="color: #f94e4e;"
                    />
                    拒绝
                </div>
                <div v-if="record.auditstatus === 5">
                    <a-icon
                        type="bulb"
                        theme="filled"
                        style="color: #2362fb;"
                    />
                    审核中
                </div>
                <div v-if="record.auditstatus === 6">
                    <a-icon
                        type="bulb"
                        theme="filled"
                        style="color: #20b559;"
                    />
                    通过
                </div>
            </span>
        </a-table>
        <contract-drawer ref="ContractDrawer" :record="record" />
        <customer-drawer ref="CustomerDrawer" :record="record" />
        <return-money-drawer ref="ReturnMoneyDrawer" :record="record" />
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import AdvancedScreen from './comps/AdvancedScreen'; //高级筛选
import ReturnMoneyDrawer from '@/pages/drawer/ReturnMoneyDrawer';
import CustomerDrawer from '@/pages/drawer/Customer/CustomerDrawer';
import ContractDrawer from '@/pages/drawer/ContractDrawer';

//表格标题
const columns = [
    {
        title: '回款编号',
        scopedSlots: { customRender: 'returnmoneynumber' },
        key: 'returnmoneynumber',
        width: 120,
        fixed: 'left',
    },
    {
        title: '客户名称',
        scopedSlots: { customRender: 'custname' },
        key: 'custname',
    },
    {
        title: '合同编号',
        scopedSlots: { customRender: 'contractnumber' },
        key: 'contractnumber',
    },
    {
        title: '期数',
        dataIndex: 'periodnumber',
        key: 'periodnumber',
    },
    {
        title: '汇款日期',
        dataIndex: 'returnmoneydate',
        key: 'returnmoneydate',
    },
    {
        title: '回款金额',
        dataIndex: 'returnmoneycount',
        key: 'returnmoneycount',
    },
    {
        title: '回款方式',
        dataIndex: 'returnmoneytype',
        key: 'returnmoneytype',
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
    },
    {
        title: '审核状态',
        scopedSlots: { customRender: 'auditstatus' },
        key: 'auditstatus',
    },
    {
        title: '合同金额',
        dataIndex: 'contractmoney',
        key: 'contractmoney',
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
        CustomerDrawer,
        ReturnMoneyDrawer,
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
                currenttabdata: this.currenttabdata,
                scene: this.scene,
                screencondition: this.screencondition,
                screencontent: this.screencontent,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManagereturnmoney', METHOD.POST, {
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
        //点击已跟进
        handleEdit() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定此操作吗?</div>,
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
            request('/CustomerManagereturnmoneyTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
        id(record) {
            this.$refs.ReturnMoneyDrawer.visible = true;
            this.record = record;
        },
        customerDrawer(record) {
            this.$refs.CustomerDrawer.visible = true;
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
