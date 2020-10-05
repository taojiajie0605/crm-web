<template>
    <a-card title="系统操作日志">
        <div align="left" style="float: left;">
            <a-range-picker
                @change="onDateChange"
                style="margin-right: 10px;"
            />
            <!--时间选择-->
            <!--人员选择-->
            <a-tree-select
                show-search
                style="width: 200px; margin-right: 10px;"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="选择人员"
                allow-clear
                multiple
                tree-default-expand-all
                @change="handleTreeChange"
                maxTagCount="1"
            >
                <a-tree-select-node key="0-1" value="parent 1" title="员工">
                    <a-tree-select-node
                        key="0-1-1"
                        value="员工1"
                        title="员工1"
                    />
                    <a-tree-select-node
                        key="0-1-2"
                        value="员工2"
                        title="员工2"
                    />
                </a-tree-select-node>
                <a-tree-select-node key="0-2" value="parent 1" title="部门">
                    <a-tree-select-node
                        key="0-2-1"
                        value="全公司"
                        title="全公司"
                    />
                    <a-tree-select-node
                        key="0-2-2"
                        value="财务部"
                        title="财务部"
                    />
                </a-tree-select-node>
            </a-tree-select>
            <!--模块选择-->
            <a-select
                mode="multiple"
                :size="size"
                placeholder="请选择"
                allow-clear
                style="width: 200px; margin-right: 10px;"
                @change="handleSelectChange"
                maxTagCount="1"
            >
                <a-select-option :key="1">企业首页</a-select-option>
                <a-select-option :key="2">应用管理</a-select-option>
                <a-select-option :key="3">员工管理</a-select-option>
                <a-select-option :key="4">部门管理</a-select-option>
                <a-select-option :key="5">名片小程序管理</a-select-option>
                <a-select-option :key="6">角色管理</a-select-option>
                <a-select-option :key="7">业务审批流</a-select-option>
                <a-select-option :key="8">办公审批流</a-select-option>
                <a-select-option :key="9">项目管理</a-select-option>
                <a-select-option :key="10">客户管理</a-select-option>
                <a-select-option :key="11">系统日志管理</a-select-option>
                <a-select-option :key="12">其他设置</a-select-option>
            </a-select>
            <a-button type="primary" @click="search"> 查询 </a-button>
        </div>
        <div align="right">
            <a-button type="primary"> 导出 </a-button>
        </div>

        <!--表单-->
        <a-table
            style="margin-top: 10px;"
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        />
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';

//表格标题
const columns = [
    {
        title: '用户',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'IP地址',
        dataIndex: 'ipaddress',
        key: 'ipaddress',
    },
    {
        title: '模块',
        dataIndex: 'module',
        key: 'module',
    },
    {
        title: '行为',
        dataIndex: 'behaviour',
        key: 'behaviour',
    },
    {
        title: '对象',
        dataIndex: 'object',
        key: 'object',
    },
    {
        title: '操作详情',
        dataIndex: 'action',
        key: 'action',
    },
];

export default {
    name: 'DateOperLog',
    data() {
        return {
            data: [], //表格数据
            pagination: {
                //分页
                current: 1,
                pageSize: 10,
            },
            loading: false, //表格加载
            columns, //表格标题

            condition: {
                starttime: String,
                endtime: String,
                staff: [],
                module: [],
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
            ...this.condition,
        });
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
                ...this.condition,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/SystemOperLog', METHOD.POST, {
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

        //时间改变
        onDateChange(date, dateString) {
            this.condition.starttime = dateString[0];
            this.condition.endtime = dateString[1];
            //console.log("date",date);
            //console.log("starttime",this.condition.starttime);
            //console.log("endtime",this.condition.endtime);
        },
        //人员多选框改变
        handleTreeChange(value) {
            //console.log(`Selected: ${value}`);
            this.condition.staff = value;
            //console.log("Selected:", this.condition.staff);
        },
        //模块多选框改变
        handleSelectChange(value) {
            //console.log(`Selected: ${value}`);
            this.condition.module = value;
            //console.log("Selected:", this.condition.module);
        },
        //查询方法
        search() {
            (this.pagination = {
                //分页
                current: 1,
                pageSize: 10,
            }),
                this.fetch({
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                    ...this.condition,
                });
        },
    },
};
</script>
