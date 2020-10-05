<template>
    <a-card>
        <!--搜索-->
        <div slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="bell"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                待回款提醒
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
                    <a-select-option value="1"> 待回款 </a-select-option>
                    <a-select-option value="2"> 已回款 </a-select-option>
                    <a-select-option value="3"> 已逾期 </a-select-option>
                </a-select>
                <a-button
                    type="default"
                    icon="flag"
                    style="margin-left: 10px;"
                    @click="handleDealAll"
                >
                    全部标记已处理
                </a-button>
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
            :scroll="{ x: 1200 }"
        >
            <!--客户名称-->
            <span slot="custname" slot-scope="record">
                <a @click="id(record)">{{ record.custname }} </a>
            </span>
            <!--合同编号-->
            <span slot="contractnumber" slot-scope="record">
                <a @click="drawer(record)">{{ record.contractnumber }} </a>
            </span>
        </a-table>
        <customer-drawer ref="CustomerDrawer" :record="record" />
        <contract-drawer ref="ContractDrawer" :record="record" />
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import CustomerDrawer from '@/pages/drawer/Customer/CustomerDrawer';
import ContractDrawer from '@/pages/drawer/ContractDrawer';

//表格标题
const columns = [
    {
        title: '期数',
        dataIndex: 'periodnumber',
        key: 'periodnumber',
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
        title: '计划回款金额',
        dataIndex: 'returnmoneycount',
        key: 'returnmoneycount',
    },
    {
        title: '计划回款日期',
        dataIndex: 'returnmoneydate',
        key: 'returnmoneydate',
    },
    {
        title: '计划回款方式',
        dataIndex: 'returnmoneytype',
        key: 'returnmoneytype',
    },
    {
        title: '提前几日提醒',
        dataIndex: 'remained',
        key: 'remained',
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
    },
];
export default {
    components: {
        ContractDrawer,
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

            //1个级联搜索
            scene: '1', //场景内容
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
            this.$refs.CustomerDrawer.visible = true;
            this.record = record;
        },
        drawer(record) {
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
