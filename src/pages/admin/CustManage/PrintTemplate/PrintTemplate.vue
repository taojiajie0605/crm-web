<template>
    <a-card title="自定义打印模板">
        <div align="right">
            <a-button type="primary" icon="plus" @click="showNewModal">
                新建打印模板
            </a-button>
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
            <span slot="modename" slot-scope="text">
                <router-link to="/admin/systemsetting/a3/c2455/printtemplate">
                    {{ text }}
                </router-link>
            </span>
            <span slot="action" slot-scope="text, record">
                <a @click="showModal(record)">编辑名称</a>
                <a-divider type="vertical" />
                <a type="primary" @click="Copied(record)">复制</a>
                <a-divider type="vertical" />
                <a @click="showDelete(record)">删除</a>
            </span>
        </a-table>

        <!--编辑名称弹出框-->
        <a-modal
            title="编辑打印模板"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <a-alert
                type="error"
                v-if="this.error"
                message="请填写模板名称"
                showIcon
                style="margin-bottom: 24px;"
            />
            <label>模板名称：</label>
            <a-input style="width: 400px;" v-model="record.modename" />
        </a-modal>

        <!--新建打印弹出框-->
        <a-modal
            title="新建打印模板"
            :visible="Newvisible"
            :confirm-loading="NewconfirmLoading"
            @ok="handleNewOk"
            okText="下一步"
            @cancel="handleNewCancel"
        >
            <a-alert
                type="error"
                v-if="this.error"
                message="请填写模板名称"
                showIcon
                style="margin-bottom: 24px;"
            />
            <div>
                <label>模板名称：</label>
                <a-input style="width: 400px;" v-model="Newrecord.modename" />
            </div>
            <div style="margin-top: 10px;">
                <label>关联对象：</label>
                <a-select
                    default-value="1"
                    style="width: 400px;"
                    @change="handleSelectChange"
                >
                    <a-select-option value="1"> 商机 </a-select-option>
                    <a-select-option value="2"> 合同 </a-select-option>
                    <a-select-option value="3"> 回款 </a-select-option>
                </a-select>
            </div>
        </a-modal>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';

//表格标题
const columns = [
    {
        title: '模板名称',
        dataIndex: 'modename',
        key: 'modename',
        scopedSlots: { customRender: 'modename' },
    },
    {
        title: '关联对象',
        dataIndex: 'associobject',
        key: 'associobject',
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
    {
        title: '更新时间',
        dataIndex: 'updatetime',
        key: 'updatetime',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    name: 'PrintTemplate',
    data() {
        return {
            error: false, //模板名称是否为空提示语
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

            //编辑名称弹出框框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            Newrecord: {
                //表格一条数据
                modename: '',
                associobject: '',
                createtime: '',
                founder: '',
                updatetime: '',
            },
            //新建弹出框框
            Newvisible: false, //点编辑是否可见
            NewconfirmLoading: false, //编辑页提交加载
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
            request('/PrintTemplate', METHOD.POST, {
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

        //删除方法
        showDelete(record) {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定删除?</div>,
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
            request('/PrintTemplatedelete', METHOD.POST, {
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

        //编辑名称弹出方法
        showModal(record) {
            this.record = JSON.parse(JSON.stringify(record)); //默认
            this.visible = true;
        },
        handleOk() {
            if (this.record.modename === '') {
                this.error = true;
            } else {
                this.error = false;
                this.confirmLoading = true;
                this.fetchmodify({
                    ...this.record,
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                });
            }
        },
        handleCancel() {
            this.error = false;
            this.visible = false;
        },
        fetchmodify(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/PrintTemplatemodify', METHOD.POST, {
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
                this.visible = false;
                this.confirmLoading = false;
                this.loading = false;
                this.success(data.data.msg);
            });
        },

        //新建弹出方法
        showNewModal() {
            this.Newvisible = true;
        },
        handleNewOk() {
            if (this.Newrecord.modename === '') {
                this.error = true;
            } else {
                this.error = false;
                this.NewconfirmLoading = false;
                this.Newvisible = false;
                // ==》跳转到新建打印模板页（做一些事情）
                this.Newrecord = {
                    //表格一条数据
                    modename: '',
                    associobject: '',
                    createtime: '',
                    founder: '',
                    updatetime: '',
                };
                //console.log(`Newrecord ${this.Newrecord}`);
            }
        },
        handleNewCancel() {
            this.error = false;
            this.Newrecord = {
                //表格一条数据
                modename: '',
                associobject: '',
                createtime: '',
                founder: '',
                updatetime: '',
            };
            this.Newvisible = false;
        },
        handleSelectChange(value) {
            //新建内的单选框
            this.Newrecord.associobject = value;
            //console.log(`selected ${value}`);
        },

        //点击复制方法
        Copied(record) {
            this.fetchadd({
                ...record,
                results: this.pagination.pageSize,
                page: this.pagination.current,
            });
        },
        fetchadd(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/PrintTemplateadd', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.data = data.data.answer;
                this.pagination = pagination;
                this.loading = false;
                //操作成功弹出框
                this.success(data.data.msg);
            });
        },
    },
};
</script>
