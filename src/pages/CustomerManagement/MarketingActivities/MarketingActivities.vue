<template>
    <a-card>
        <!--搜索与新建联系人-->
        <div
            slot="title"
            style="display: flex; justify-content: space-between;"
        >
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="car"
                    style="
                        color: rgb(114, 46, 209);
                        font-size: 30px;
                        margin-right: 6px;
                    "
                />
                市场活动
            </div>
            <div style="text-align: center;">
                <a-input
                    style="width: 250px; margin-right: 10px;"
                    v-model="nameorphone"
                    size="default"
                    placeholder="请输入活动名称"
                />
                <a-button type="primary" @click="search"> 搜索 </a-button>
            </div>
            <div align="right" style="float: right;">
                <a-button type="primary" icon="plus" @click="createCust">
                    新建活动
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
                    icon="check-circle"
                    @click="handleStart"
                >
                    启用
                </a-button>
                <a-button
                    type="dash"
                    shape="round"
                    size="small"
                    icon="minus-circle"
                    @click="handleStop"
                >
                    停用
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
            </div>
            <!--场景选择与筛选-->
            <div v-show="!hasSelected" align="left" style="float: left;">
                关联对象：
                <a-select
                    :default-value="assobject"
                    style="width: 200px;"
                    @change="handleSelectChange(value)"
                >
                    <a-select-option value="1"> 全部 </a-select-option>
                    <a-select-option value="2"> 客户 </a-select-option>
                    <a-select-option value="3"> 线索 </a-select-option>
                </a-select>
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
            <!--活动名称-->
            <span slot="activityname" slot-scope="record">
                <a @click="id(record)">{{ record.activityname }} </a>
            </span>
            <!--状态-->
            <span slot="state" slot-scope="record">
                <div v-if="record.state === 1">启用</div>
                <div v-if="record.state === 2">停用</div>
            </span>
        </a-table>
        <marketing-ac-drawer ref="MarketingAcDrawer" :record="record" />
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import CustAddForm from './components/CustAddForm'; //新建活动
import MarketingAcDrawer from '@/pages/drawer/MarketingAcDrawer';

//表格标题
const columns = [
    {
        title: '活动名称',
        scopedSlots: { customRender: 'activityname' },
        key: 'activityname',
        width: 120,
        fixed: 'left',
    },
    {
        title: '关联对象',
        dataIndex: 'assobject',
        key: 'assobject',
    },
    {
        title: '创建人',
        dataIndex: 'founder',
        key: 'founder',
    },
    {
        title: '活动类型',
        dataIndex: 'activitytype',
        key: 'activitytype',
    },
    {
        title: '开始时间',
        dataIndex: 'starttime',
        key: 'starttime',
    },
    {
        title: '截止时间',
        dataIndex: 'endtime',
        key: 'endtime',
    },
    {
        title: '活动预算',
        dataIndex: 'activitybudget',
        key: 'activitybudget',
    },
    {
        title: '活动地址',
        dataIndex: 'activityaddress',
        key: 'activityaddress',
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
        title: '状态',
        scopedSlots: { customRender: 'state' },
        key: 'state',
    },
];
export default {
    components: {
        CustAddForm,
        MarketingAcDrawer,
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
            nameorphone: '', //搜索框内容
            assobject: '1', //关联对象
        };
    },
    //初始查询
    mounted() {
        const pager = this.pagination;
        //this.pagination = pager;
        this.fetch({
            results: pager.pageSize,
            page: pager.current,
            assobject: this.assobject,
            nameorphone: this.nameorphone,
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
                assobject: this.assobject,
                nameorphone: this.nameorphone,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageMarketing', METHOD.POST, {
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
                    assobject: this.assobject,
                    nameorphone: this.nameorphone,
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
                    assobject: this.assobject,
                    nameorphone: this.nameorphone,
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
            request('/CustomerManageMarketingAdd', METHOD.POST, {
                results: this.pagination.pageSize,
                page: this.pagination.current,
                assobject: this.assobject,
                nameorphone: this.nameorphone,
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
                assobject: this.assobject,
                nameorphone: this.nameorphone,
            });
        },

        //点击启用
        handleStart() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定要启用这些活动吗?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchStart();
                },
                onCancel() {},
            });
        },
        //启用选中调用方法
        fetchStart() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageMarketingTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },

        //点击停用
        handleStop() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定要停用这些活动吗?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchStop();
                },
                onCancel() {},
            });
        },
        //停用选中调用方法
        fetchStop() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageMarketingTrans', METHOD.POST, {
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
            request('/CustomerManageMarketingTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
        id(record) {
            this.$refs.MarketingAcDrawer.visible = true;
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
