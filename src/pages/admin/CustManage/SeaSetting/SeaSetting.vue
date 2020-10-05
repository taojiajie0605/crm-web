<template>
    <a-card title="客户公海规则设置">
        <!--提示与新建-->
        <div>
            <div align="left" style="float: left;">
                <a-alert style="width: 800px;" message="提示：" banner>
                    <p slot="description">
                        1、系统在每天的24:00~6:00统一将符合规则的客户退回到公海池<br />
                        2、当一个客户满足多个公海客户规则时会同时掉入多个公海<br />
                        3、若修改了“自动收回规则”，新的规则将于“次日生效”，在此之前客户公海成员的数据还是会遵循原规则进行划入
                    </p>
                </a-alert>
            </div>
            <div align="right">
                <a-button type="primary" icon="plus" @click="newshowModal">
                    新建公海
                </a-button>
            </div>
        </div>
        <!--表单-->
        <a-table
            style="margin-top: 10px;"
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >
            <span slot="seaname" slot-scope="text, record">
                <a type="primary" @click="showDrawer(record)">{{ text }}</a>
            </span>
            <span slot="action" slot-scope="text, record">
                <a v-if="record.state === '启用'" @click="showStop(record)"
                    >停用</a
                >
                <a v-if="record.state === '停用'" @click="showStop(record)"
                    >启用</a
                >
                <a-divider type="vertical" />
                <a @click="showTransferModal(record)">转移</a>
                <a-divider type="vertical" />
                <a type="primary" @click="showModal(record)">编辑</a>
                <a-divider type="vertical" />
                <a @click="showDelete(record)">删除</a>
            </span>
        </a-table>
        <!--转移弹出框-->
        <a-modal
            title="转移"
            :visible="transfervisible"
            :confirm-loading="transferconfirmLoading"
            @ok="handletransferOk"
            @cancel="handletransferCancel"
        >
            <label>转移到：</label>
            <a-select
                default-value="1"
                style="width: 400px;"
                @change="handleSelectChange"
            >
                <a-select-option value="1"> Jack </a-select-option>
            </a-select>
        </a-modal>
        <!--编辑与新建弹出框-->
        <AddForm ref="AddForm" :form="record" @fetchadd="fetchadd" />
        <!--抽屉-->
        <a-drawer
            width="500"
            placement="right"
            :closable="false"
            :visible="visibleDrawer"
            @close="onCloseDrawer"
        >
            <div>
                <div class="status" style="color: #000;">
                    <div>
                        <span>公海名称：</span>
                        <span>{{ record.seaname }}</span>
                    </div>
                    <span>客户数量：{{ record.custnumber }}个</span>
                </div>
                <a-row>
                    <a-col :span="12">
                        公海管理员：{{ record.seaadmin }}
                    </a-col>
                    <a-col :span="12"> 公海成员：{{ record.seamember }} </a-col>
                </a-row>
                <div class="head">
                    <a-icon type="caret-right" />
                    规则设置
                </div>
                <div class="list">
                    <div class="item">
                        <span class="title">前负责人领取规则</span
                        ><span class="content">{{ record.seamember }}</span>
                    </div>
                    <div class="item">
                        <span class="title">领取频率规则</span
                        ><span class="content">{{ record.seamember }}</span>
                    </div>
                    <div class="item">
                        <span class="title">提醒规则</span
                        ><span class="content">{{ record.seamember }}</span>
                    </div>
                    <div class="item">
                        <span class="title">收回规则</span
                        ><span class="content">{{ record.seamember }}</span>
                    </div>
                    <div class="item">
                        <span class="title">公海字段</span
                        ><span class="content">{{ record.seamember }}</span>
                    </div>
                </div>
            </div>
        </a-drawer>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import AddForm from './../components/AddForm';

const plainOptions = ['Apple', 'Pear', 'Orange']; //多选框
//表格标题
const columns = [
    {
        title: '公海名称',
        dataIndex: 'seaname',
        key: 'seaname',
        scopedSlots: { customRender: 'seaname' },
    },
    {
        title: '公海管理员',
        dataIndex: 'seaadmin',
        key: 'seaadmin',
    },
    {
        title: '公海成员',
        dataIndex: 'seamember',
        key: 'seamember',
    },
    {
        title: '客户数量',
        dataIndex: 'custnumber',
        key: 'custnumber',
    },
    {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    name: 'SeaSetting',
    components: {
        AddForm,
    },
    data() {
        return {
            maskStyle: { backgroundColor: 'white' }, //弹出框背景
            data: [], //表格数据
            record: {
                //表格一条数据
            },
            pagination: {
                //分页
                current: 1,
                pageSize: 10,
            },
            loading: false, //表格加载
            columns, //表格标题

            //转移弹出框
            transfervisible: false, //点转移是否可见
            transferconfirmLoading: false, //转移页提交加载

            visibleDrawer: false, //抽屉显示框

            plainOptions, //一共多少选项
        };
    },
    //初始查询
    mounted() {
        const pager = this.pagination;
        //this.pagination = pager;
        this.fetch({
            results: pager.pageSize,
            page: pager.current,
        });
    },
    methods: {
        //点击分页
        handleTableChange(pagination, filters) {
            console.log(pagination);
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.fetch({
                results: pagination.pageSize,
                page: pagination.current,
                ...filters,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/seasetting', METHOD.POST, {
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
            });
        },

        //停启用方法
        showStop(record) {
            const _this = this;
            if (record.state == '停用') {
                this.$confirm({
                    title: '提示',
                    content: (
                        <div style="color:black;"> 您确定要启用该审批流?</div>
                    ),
                    onOk() {
                        //console.log('OK');
                        record.state == '启用';
                        _this.record = record;
                        _this.fetchStop({
                            ...record,
                            results: _this.pagination.pageSize,
                            page: _this.pagination.current,
                        });
                    },
                    onCancel() {},
                });
            } else {
                this.$confirm({
                    title: '提示',
                    content: (
                        <div style="color:black;">您确定要停用该审批流?</div>
                    ),
                    onOk() {
                        //console.log('OK');
                        record.state == '停用';
                        _this.record = record;
                        _this.fetchStop({
                            ...record,
                            results: _this.pagination.pageSize,
                            page: _this.pagination.current,
                        });
                    },
                    onCancel() {},
                });
            }
        },
        fetchStop(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/seasettingstop', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                this.loading = false;
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.data = data.data.answer;
                this.pagination = pagination;
                this.success(data.data.msg);
            });
        },

        //删除方法
        showDelete(record) {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">您确定要删除吗?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchdelete({
                        ...record,
                        results: _this.pagination.pageSize,
                        page: _this.pagination.current,
                    });
                },
                onCancel() {},
            });
        },
        fetchdelete(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/seasettingdelete', METHOD.POST, {
                ...params,
            }).then((data) => {
                console.log('data:', data);
                const pagination = { ...this.pagination };
                this.loading = false;
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.data = data.data.answer;
                this.pagination = pagination;
                this.success(data.data.msg);
            });
        },
        success(msg) {
            //提示框
            this.$message.success(msg, 3);
        },

        //转移弹出方法
        showTransferModal(record) {
            this.record = record; //默认
            this.transfervisible = true;
        },
        handletransferOk() {
            this.transfervisible = false;
        },
        handletransferCancel() {
            this.transfervisible = false;
        },
        handleSelectChange(value) {
            //转移内的单选框
            console.log(`selected ${value}`);
        },

        //抽屉方法
        showDrawer(record) {
            this.record = record; //默认
            this.visibleDrawer = true;
        },
        onCloseDrawer() {
            this.visibleDrawer = false;
        },

        //编辑弹出方法
        showModal(record) {
            this.record = JSON.parse(JSON.stringify(record));
            this.$refs.AddForm.checkedList = record.configure; //配置
            this.$refs.AddForm.indeterminate =
                !!this.$refs.AddForm.checkedList.length &&
                this.$refs.AddForm.checkedList.length < plainOptions.length; //是否半选
            this.$refs.AddForm.checkAll =
                this.$refs.AddForm.checkedList.length === plainOptions.length; //是否全选
            //console.log('this.record',this.record);
            this.$refs.AddForm.visible = true;
        },
        //点击新建弹出方法
        newshowModal() {
            this.record = {};
            this.$refs.AddForm.checkedList = []; //配置
            this.$refs.AddForm.indeterminate = false; //是否半选
            this.$refs.AddForm.checkAll = false; //是否全选
            //console.log('11111111111');
            this.$refs.AddForm.visible = true;
        },
        fetchadd(params = {}) {
            console.log('params:', params);
            this.loading = true;
            request('/seasettingadd', METHOD.POST, {
                results: this.pagination.pageSize,
                page: this.pagination.current,
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
            });
        },
    },
};
</script>

<style lang="less" scoped>
.status {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head {
    font-weight: bold;
    color: #000;
    margin: 20px 0 10px 0;
}
.list {
    .item {
        padding: 5px 0;
        .title {
            display: inline-block;
            width: 30%;
        }
        .content {
            color: #000;
        }
    }
}
</style>
