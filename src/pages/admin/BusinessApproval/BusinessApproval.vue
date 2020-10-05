<template>
    <a-card title="审批流（合同/回款）">
        <a-button
            type="primary"
            icon="plus"
            slot="extra"
            @click="showModelVisibleSwitch({}, 'add')"
            >新增审批流程</a-button
        >
        <a-table
            align="center"
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >
            <template slot="approvalName" slot-scope="text, record">
                <a-button @click="showTotalVisibleSwitch(record)" type="link">{{
                    text
                }}</a-button>
            </template>
            <template slot="operation" slot-scope="text, record">
                <div class="operation-btn">
                    <a-button
                        @click="showModelVisibleSwitch(record, 'edit')"
                        type="link"
                        >编辑</a-button
                    >
                    <a-button @click="delItem(record.id)" type="link"
                        >删除</a-button
                    >
                    <a-button
                        v-if="record.status === 0"
                        @click="EditStatusItem(record)"
                        type="link"
                        >停用</a-button
                    >
                    <a-button
                        v-if="record.status === 1"
                        @click="EditStatusItem(record)"
                        type="link"
                        >启用</a-button
                    >
                    <a-button
                        @click="showModelVisibleSwitch(record, 'copyAndAdd')"
                        type="link"
                        >复制并新建</a-button
                    >
                </div>
            </template>
            <template slot="name" slot-scope="name">
                {{ name.first }} {{ name.last }}
            </template>
        </a-table>
        <TotalForm
            ref="TotalForm"
            :form="currentItem"
            @onDelete="delItem"
            @onEditStatus="EditStatusItem"
        />
        <AddForm ref="AddForm" :form="currentItem" :methods="methods" />
    </a-card>
</template>
<script>
import TotalForm from './components/TotalForm';
import AddForm from './components/AddForm';
const data = [];
for (let i = 0; i < 10; i++) {
    data.push({
        id: i,
        approvalName: '回款审批流',
        approvalType: '授权审批人',
        relation: '回款',
        scope: '全公司',
        lastPerson: '名字',
        lastUpdateTime: '2020-07-25',
        status: 1,
        remarks: '台柳勒',
    });
}
const columns = [
    {
        title: '审批流名称',
        dataIndex: 'approvalName',
        align: 'center',
        scopedSlots: { customRender: 'approvalName' },
    },
    {
        title: '流程类型',
        dataIndex: 'approvalType',
        align: 'center',
    },
    {
        title: '关联对象',
        dataIndex: 'relation',
        align: 'center',
    },
    {
        title: '适用范围',
        dataIndex: 'scope',
        align: 'center',
    },
    {
        title: '最后修改人',
        dataIndex: 'lastPerson',
        align: 'center',
    },
    {
        title: '最后修改时间',
        dataIndex: 'lastUpdateTime',
        align: 'center',
    },
    {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
        align: 'center',
    },
];

export default {
    name: 'BusinessApproval',
    components: {
        TotalForm,
        AddForm,
    },
    data() {
        return {
            data,
            currentItem: {}, // 当前选中项
            methods: '', // 当前选中的操作
            pagination: {}, // 分页
            loading: false,
            columns,
        };
    },
    mounted() {
        // this.fetch();
    },
    methods: {
        showTotalVisibleSwitch(item) {
            // totalform
            this.currentItem = item;
            this.$refs.TotalForm.totalVisible = true;
        },
        showModelVisibleSwitch(item, methods) {
            this.currentItem = JSON.parse(JSON.stringify(item));
            this.methods = methods;
            this.$refs.AddForm.isVisibleLastPage = true;
            this.$refs.AddForm.visible = true;
        },
        delItem(key) {
            const that = this;
            this.$confirm({
                title: '确定要删除吗？',
                okText: '确认',
                cancelText: '取消',
                okType: 'danger',
                onOk() {
                    // 停用
                    const dataSource = [...that.data];
                    that.data = dataSource.filter((item) => item.id !== key);
                },
                onCancel() {},
            });
        },
        EditStatusItem(record) {
            const that = this;
            if (record.status === 0) {
                this.$confirm({
                    title: '确认用停用吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        // 停用
                        that.data.forEach((item) => {
                            if (item.id === record.id) item.status = 1;
                        });
                        that.$message.success('停用成功');
                    },
                    onCancel() {},
                });
            } else {
                this.$confirm({
                    title: '确认用启用吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk() {
                        // 启用
                        that.data.forEach((item) => {
                            if (item.id === record.id) item.status = 0;
                        });
                        that.$message.success('启用成功');
                    },
                    onCancel() {},
                });
            }
        },
        handleTableChange(pagination, filters, sorter) {
            console.log(pagination);
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.fetch({
                results: pagination.pageSize,
                page: pagination.current,
                sortField: sorter.field,
                sortOrder: sorter.order,
                ...filters,
            });
        },
        showDrawer() {
            this.totalVisible = false;
        },
        fetch(params = {}) {
            console.log('params:', params);
            // this.loading = true;
            //   reqwest({
            //     url: 'https://randomuser.me/api',
            //     method: 'get',
            //     data: {
            //       results: 10,
            //       ...params,
            //     },
            //     type: 'json',
            //   }).then(data => {
            //     const pagination = { ...this.pagination };
            //     // Read total count from server
            //     // pagination.total = data.totalCount;
            //     pagination.total = 200;
            //     this.loading = false;
            //     this.data = data.results;
            //     this.pagination = pagination;
            //   });
        },
    },
};
</script>

<style lang="less" scoped>
.operation-btn {
    button {
        padding: 0 5px;
    }
}
.table {
    text-align: center;
    a {
        // margin-left: 5px;
    }
}
</style>
