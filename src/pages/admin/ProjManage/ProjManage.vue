<template>
    <a-card title="项目管理">
        <div align="left" style="float: left;">
            <a-alert
                style="width: 600px;"
                message="为不同场景下的项目成员所需的权限设置匹配的项目、任务列表、任务的操作权限"
                banner
            />
        </div>
        <div align="right">
            <a-button type="primary" icon="plus" @click="newshowModal">
                新建权限
            </a-button>
        </div>

        <a-table
            style="margin-top: 10px;"
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >
            <span slot="action" slot-scope="text, record">
                <a type="primary" @click="showModal(record)">编辑</a>
                <a-divider type="vertical" />
                <a @click="showDelete(record)">删除</a>
            </span>
        </a-table>

        <a-modal
            title="编辑"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <a-alert
                type="error"
                v-if="this.error"
                message="请填写权限名称"
                showIcon
                style="margin-bottom: 24px;"
            />
            <a-form>
                <a-form-item label="权限名称">
                    <a-input
                        v-model="record.role"
                        size="large"
                        placeholder="请输入权限名称"
                    />
                </a-form-item>
                <a-form-item label="权限描述">
                    <a-input
                        v-model="record.description"
                        size="large"
                        placeholder="请输入权限描述"
                    />
                </a-form-item>
                <a-form-item label="权限配置">
                    <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                        <a-checkbox
                            :indeterminate="indeterminate"
                            :checked="checkAll"
                            @change="onCheckAllChange"
                        >
                            项目
                        </a-checkbox>
                    </div>
                    <a-checkbox-group
                        v-model="checkedList"
                        :options="plainOptions"
                        @change="onChange"
                    />
                </a-form-item>
            </a-form>
        </a-modal>

        <a-modal
            title="编辑"
            :visible="newvisible"
            :confirm-loading="newconfirmLoading"
            @ok="newhandleOk"
            @cancel="newhandleCancel"
        >
            <a-alert
                type="error"
                v-if="this.error"
                message="请填写权限名称"
                showIcon
                style="margin-bottom: 24px;"
            />
            <a-form>
                <a-form-item label="权限名称">
                    <a-input
                        v-model="newrecord.newrole"
                        size="large"
                        placeholder="请输入权限名称"
                    />
                </a-form-item>
                <a-form-item label="权限描述">
                    <a-input
                        v-model="newrecord.newdescription"
                        size="large"
                        placeholder="请输入权限描述"
                    />
                </a-form-item>
                <a-form-item label="权限配置">
                    <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                        <a-checkbox
                            :indeterminate="newindeterminate"
                            :checked="newcheckAll"
                            @change="newonCheckAllChange"
                        >
                            项目
                        </a-checkbox>
                    </div>
                    <a-checkbox-group
                        v-model="newcheckedList"
                        :options="plainOptions"
                        @change="newonChange"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
    </a-card>
</template>

<script>
// import PageLayout from '../../layouts/PageLayout'
//import reqwest from 'reqwest';
import { request, METHOD } from '@/utils/request';

//多选框数据
const plainOptions = ['Apple', 'Pear', 'Orange'];
//表格标题
const columns = [
    {
        title: '项目权限',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: '项目描述',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    name: 'ProjManage',
    // components: {PageLayout},
    data() {
        return {
            error: false, //权限名称是否为空提示语
            data: [], //表格数据
            record: {
                //表格一条数据
                role: String,
                description: String,
                configure: [], //多选框
            },
            pagination: {
                //分页
                current: 1,
                pageSize: 10,
            },
            loading: false, //表格加载
            columns, //表格标题

            //编辑框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载
            //多选框
            checkedList: [],
            indeterminate: false, //框半选
            checkAll: false, //框全选
            plainOptions, //一共多少选项

            //新建框
            newvisible: false, //点编辑是否可见
            newconfirmLoading: false, //编辑页提交加载
            //新建多选框
            newcheckedList: [],
            newindeterminate: false, //框半选
            newcheckAll: false, //框全选
            newrecord: {
                //表格一条数据
                newrole: '',
                newdescription: '',
                newconfigure: [], //多选框
            },
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
            request('/projmanage', METHOD.POST, {
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
                content: <div style="color:black;">您确定要删除吗?</div>,
                onOk() {
                    console.log('OK');
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
            request('/projmanagedelete', METHOD.POST, {
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

        //编辑弹出方法
        showModal(record) {
            this.record = JSON.parse(JSON.stringify(record)); //默认
            this.checkedList = record.configure; //配置
            this.indeterminate =
                !!this.checkedList.length &&
                this.checkedList.length < plainOptions.length; //是否半选
            this.checkAll = this.checkedList.length === plainOptions.length; //是否全选
            //console.log('this.record',this.record);
            this.visible = true;
        },
        handleOk() {
            if (this.record.role === '') {
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
            request('/projmanagemodify', METHOD.POST, {
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
            });
        },

        //点击编辑多选框方法
        onChange(checkedList) {
            this.record.configure = checkedList;
            this.indeterminate =
                !!checkedList.length &&
                checkedList.length < plainOptions.length;
            this.checkAll = checkedList.length === plainOptions.length;
        },
        onCheckAllChange(e) {
            Object.assign(this, {
                checkedList: e.target.checked ? plainOptions : [],
                indeterminate: false,
                checkAll: e.target.checked,
            });
        },

        //点击新建弹出方法
        newshowModal() {
            this.newindeterminate =
                !!this.newcheckedList.length &&
                this.newcheckedList.length < plainOptions.length; //是否半选
            this.newcheckAll =
                this.newcheckedList.length === plainOptions.length; //是否全选
            //console.log('11111111111');
            this.newvisible = true;
        },
        newhandleOk() {
            if (this.newrecord.newrole === '') {
                this.error = true;
            } else {
                this.error = false;
                this.newconfirmLoading = true;
                this.fetchadd({
                    ...this.newrecord,
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                });
            }
            this.newcheckedList = [];
            this.newindeterminate = false; //框半选
            this.newcheckAll = false; //框全选
            this.newrecord = {
                //表格一条数据
                newrole: '',
                newdescription: '',
                newconfigure: [], //多选框
            };
        },
        newhandleCancel() {
            this.error = false;
            this.newcheckedList = [];
            this.newindeterminate = false; //框半选
            this.newcheckAll = false; //框全选
            this.newrecord = {
                //表格一条数据
                newrole: '',
                newdescription: '',
                newconfigure: [], //多选框
            };
            this.newvisible = false;
        },
        fetchadd(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/projmanageadd', METHOD.POST, {
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
                this.newvisible = false;
                this.newconfirmLoading = false;
                this.loading = false;
            });
        },

        //点击新建多选框方法
        newonChange(newcheckedList) {
            this.newrecord.newconfigure = newcheckedList;
            this.newindeterminate =
                !!newcheckedList.length &&
                newcheckedList.length < plainOptions.length;
            this.newcheckAll = newcheckedList.length === plainOptions.length;
        },
        newonCheckAllChange(e) {
            Object.assign(this, {
                newcheckedList: e.target.checked ? plainOptions : [],
                newindeterminate: false,
                newcheckAll: e.target.checked,
            });
        },
    },
};
</script>
