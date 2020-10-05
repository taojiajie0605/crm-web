<template>
    <a-card>
        <!--搜索-->
        <div slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="branches"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                分配给我的线索
                <a-tooltip placement="top">
                    <template slot="title">
                        <span>转移之后未跟进的线索</span>
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
                    icon="edit"
                    @click="handleEdit"
                >
                    已跟进
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
                    <a-select-option value="1"> 待跟进 </a-select-option>
                    <a-select-option value="2"> 已跟进 </a-select-option>
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
            <!--线索名称-->
            <span slot="cluename" slot-scope="record">
                <a @click="id(record)">{{ record.cluename }} </a>
            </span>
        </a-table>
        <clue-drawer ref="ClueDrawer" :record="record" />
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import AdvancedScreen from './comps/AdvancedScreen'; //高级筛选
import ClueDrawer from '@/pages/drawer/ClueDrawer';
//表格标题
const columns = [
    {
        title: '线索名称',
        scopedSlots: { customRender: 'cluename' },
        key: 'cluename',
        width: 120,
        fixed: 'left',
    },
    {
        title: '线索来源',
        dataIndex: 'cluesource',
        key: 'cluesource',
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
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
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
        ClueDrawer,
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
            currenttabdata: this.currenttabdata,
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
            request('/CustomerManageclue', METHOD.POST, {
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
            request('/CustomerManageclueTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
        id(record) {
            this.$refs.ClueDrawer.visible = true;
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
