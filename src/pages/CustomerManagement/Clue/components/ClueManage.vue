<template>
    <a-card>
        <!--搜索与新建线索-->
        <div
            slot="title"
            style="display: flex; justify-content: space-between;"
        >
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="branches"
                    style="color: #9f35ff; font-size: 30px; margin-right: 6px;"
                />
                线索管理
            </div>
            <div style="text-align: center;">
                <a-input
                    style="width: 250px; margin-right: 10px;"
                    v-model="nameorphone"
                    size="default"
                    placeholder="请输入线索名称/手机/电话"
                />
                <a-button type="primary" @click="search"> 搜索 </a-button>
            </div>
            <div align="right" style="float: right;">
                <a-button type="primary" icon="plus" @click="createCust">
                    新建线索
                </a-button>
                <a-button
                    type="primary"
                    style="margin-left: 10px;"
                    @click="handleDuplicateCheck"
                >
                    查重
                    <DuplicateCheck ref="DuplicateCheck" />
                </a-button>
                <a-button
                    type="primary"
                    icon="import"
                    style="margin-left: 10px;"
                >
                    导入
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
                class="body"
                align="left"
                style="float: left;"
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
                    icon="user-add"
                    @click="handleChangeCust"
                >
                    转化为客户
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
            </div>
            <!--场景选择与筛选-->
            <div v-show="!hasSelected" align="left" style="float: left;">
                场景：
                <a-select
                    :default-value="scene"
                    style="width: 200px;"
                    @change="handleSelectChange(value)"
                >
                    <a-select-option value="1"> 全部线索 </a-select-option>
                    <a-select-option value="2"> 我负责的线索 </a-select-option>
                    <a-select-option value="3">
                        下属负责的线索
                    </a-select-option>
                    <a-select-option value="4"> 已转化的线索 </a-select-option>
                    <a-select-option value="5"> 我关注的线索 </a-select-option>
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
            <!--关注-->
            <span slot="follow" slot-scope="record">
                <a-icon
                    v-if="record.follow === 1"
                    type="star"
                    @click="onConcerns(record)"
                />
                <a-icon
                    v-if="record.follow === 2"
                    type="star"
                    theme="filled"
                    style="color: orange;"
                    @click="onConcerns(record)"
                />
            </span>
        </a-table>
        <clue-drawer ref="ClueDrawer" :record="record" />
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import CustAddForm from './comps/ClueAddForm'; //新建线索
import AdvancedScreen from './comps/AdvancedScreen'; //高级筛选
import Transform from './comps/Transform'; //转移
import DuplicateCheck from './comps/DuplicateCheck'; //查重
import ClueDrawer from '@/pages/drawer/ClueDrawer';

//表格标题
const columns = [
    {
        title: '线索名称',
        scopedSlots: { customRender: 'cluename' },
        key: 'cluename',
        sorter: (a, b) => a.cluename - b.cluename,
        width: 120,
        fixed: 'left',
    },
    {
        title: '线索来源',
        dataIndex: 'cluesource',
        key: 'cluesource',
        sorter: (a, b) => a.cluesource - b.cluesource,
    },
    {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
        sorter: (a, b) => a.phone - b.phone,
    },
    {
        title: '电话',
        dataIndex: 'telephone',
        key: 'telephone',
        sorter: (a, b) => a.telephone - b.telephone,
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email - b.email,
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        sorter: (a, b) => a.address - b.address,
    },
    {
        title: '客户行业',
        dataIndex: 'custindustry',
        key: 'custindustry',
        sorter: (a, b) => a.custindustry - b.custindustry,
    },
    {
        title: '客户级别',
        dataIndex: 'custlevel',
        key: 'custlevel',
        sorter: (a, b) => a.custlevel - b.custlevel,
    },
    {
        title: '下次联系时间',
        dataIndex: 'nexttime',
        key: 'nexttime',
        sorter: (a, b) => a.nexttime - b.nexttime,
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        sorter: (a, b) => a.remarks - b.remarks,
    },
    {
        title: '最后跟进时间',
        dataIndex: 'lasttime',
        key: 'lasttime',
        sorter: (a, b) => a.lasttime - b.lasttime,
    },
    {
        title: '最后跟进记录',
        dataIndex: 'lastrecord',
        key: 'lastrecord',
        sorter: (a, b) => a.lastrecord - b.lastrecord,
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
    {
        title: '关注',
        key: 'follow',
        width: 100,
        fixed: 'right',
        scopedSlots: { customRender: 'follow' },
    },
];
export default {
    name: 'Cust',
    components: {
        CustAddForm,
        AdvancedScreen,
        Transform,
        DuplicateCheck,
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

        //点击关注方法
        onConcerns(record) {
            this.fetchConcerns({
                results: this.pagination.pageSize,
                page: this.pagination.current,
                scene: this.scene,
                nameorphone: this.nameorphone,
                screencondition: this.screencondition,
                screencontent: this.screencontent,
                ...record, //点击收藏的信息
            });
        },
        fetchConcerns(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageclueConcerns', METHOD.POST, {
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
                this.$message.success(data.data.msg);
                this.selectedRowKeys = []; //选择的条
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
            request('/CustomerManageclueAdd', METHOD.POST, {
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
        fetchTransform(person) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageclueTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
                //转移内容
                person: person,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },

        //导出选中调用方法
        fetchOut() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageclueTrans', METHOD.POST, {
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
            request('/CustomerManageclueTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },

        //点击转化为客户
        handleChangeCust() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: (
                    <div style="color:black;">确定将这些线索转换为客户吗?</div>
                ),
                onOk() {
                    //console.log('OK');
                    _this.fetchChangeCust();
                },
                onCancel() {},
            });
        },
        //转化为客户调用方法
        fetchChangeCust() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageclueTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },

        //查重弹出方法
        handleDuplicateCheck() {
            this.$refs.DuplicateCheck.visible = true;
        },
        id(record) {
            this.$refs.ClueDrawer.visible = true;
            this.record = record;
        },
    },
};
</script>

<style lang="less" scoped>
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
