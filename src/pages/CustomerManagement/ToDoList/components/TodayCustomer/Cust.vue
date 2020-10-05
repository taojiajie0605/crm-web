<template>
    <a-card>
        <!--搜索-->
        <div slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="team"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                今日需联系客户
                <a-tooltip placement="top">
                    <template slot="title">
                        <span>下次跟进时间为今日的客户</span>
                    </template>
                    <a-icon
                        theme="filled"
                        type="question-circle"
                        style="
                            color: #99a9bf;
                            font-size: 15px;
                            margin-left: 6px;
                        "
                    />
                </a-tooltip>
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
                    <a-select-option value="1"> 今日需联系 </a-select-option>
                    <a-select-option value="2"> 已逾期 </a-select-option>
                    <a-select-option value="3"> 已联系 </a-select-option>
                </a-select>
                <a-select
                    :default-value="scenetwo"
                    style="width: 200px; margin-left: 10px;"
                    @change="handleSelectChangeTwo(value)"
                >
                    <a-select-option value="1"> 我的 </a-select-option>
                    <a-select-option value="2"> 我下属的 </a-select-option>
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
            <!--客户名称-->
            <span slot="custname" slot-scope="record">
                <a @click="id(record)">{{ record.custname }} </a>
            </span>
            <!--锁定-->
            <span slot="lockstate" slot-scope="record">
                <a-icon v-if="record.lockstate === 1" type="unlock" />
                <a-icon
                    v-if="record.lockstate === 2"
                    type="lock"
                    theme="filled"
                    style="color: #ff6666;"
                />
            </span>
            <!--成交-->
            <span slot="transactionstate" slot-scope="record">
                <div v-if="record.transactionstate === 1">
                    <a-icon
                        type="close-circle"
                        theme="filled"
                        style="color: #ff6666;"
                    />
                    未成交
                </div>
                <div v-if="record.transactionstate === 2">
                    <a-icon
                        type="check-circle"
                        theme="filled"
                        style="color: #66cc99;"
                    />
                    已成交
                </div>
            </span>
        </a-table>
        <customer-drawer ref="CustomerDrawer" :record="record" />
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import AdvancedScreen from './comps/AdvancedScreen'; //高级筛选
import CustomerDrawer from '@/pages/drawer/Customer/CustomerDrawer';

//表格标题
const columns = [
    {
        title: '客户名称',
        scopedSlots: { customRender: 'custname' },
        key: 'custname',
        width: 120,
        fixed: 'left',
    },
    {
        title: '创建人',
        dataIndex: 'founder',
        key: 'founder',
    },
    {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '电话',
        dataIndex: 'telephone',
        key: 'telephone',
    },
    {
        title: '网址',
        dataIndex: 'website',
        key: 'website',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '客户行业',
        dataIndex: 'custindustry',
        key: 'custindustry',
    },
    {
        title: '客户级别',
        dataIndex: 'custlevel',
        key: 'custlevel',
    },
    {
        title: '下次联系时间',
        dataIndex: 'nexttime',
        key: 'nexttime',
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
    },
    {
        title: '锁定状态',
        key: 'lockstate',
        scopedSlots: { customRender: 'lockstate' },
    },
    {
        title: '成交状态',
        key: 'transactionstate',
        scopedSlots: { customRender: 'transactionstate' },
    },
    {
        title: '最后跟进时间',
        dataIndex: 'lasttime',
        key: 'lasttime',
    },
    {
        title: '最后跟进记录',
        dataIndex: 'lastrecord',
        key: 'lastrecord',
    },
    {
        title: '详细地址',
        dataIndex: 'detailaddress',
        key: 'detailaddress',
    },
    {
        title: '地区定位',
        dataIndex: 'areaposition',
        key: 'areaposition',
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
        title: '客户来源',
        dataIndex: 'custsource',
        key: 'custsource',
    },
];
export default {
    name: 'Cust',
    components: {
        AdvancedScreen,
        CustomerDrawer,
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
            scenetwo: '1', //场景内容2
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
            currenttabdata: this.currenttabdata,
            scene: this.scene,
            scenetwo: this.scenetwo,
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
                scenetwo: this.scenetwo,
                screencondition: this.screencondition,
                screencontent: this.screencontent,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageCustomer', METHOD.POST, {
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
                    scenetwo: this.scenetwo,
                    screencondition: this.screencondition,
                    screencontent: this.screencontent,
                });
        },
        //场景二单选框改变搜索
        handleSelectChangeTwo(value) {
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
                    scenetwo: this.scenetwo,
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
                    scenetwo: this.scenetwo,
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
                scenetwo: this.scenetwo,
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
            request('/CustomerManageCustomerTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
        id(record) {
            this.$refs.CustomerDrawer.visible = true;
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
