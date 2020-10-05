<template>
    <a-card title="登录日志">
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
        title: '登录时间',
        dataIndex: 'logintime',
        key: 'logintime',
    },
    {
        title: 'IP地址',
        dataIndex: 'ipaddress',
        key: 'ipaddress',
    },
    {
        title: '登录地点',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '设备类型',
        dataIndex: 'devicetype',
        key: 'devicetype',
    },
    {
        title: '终端内核',
        dataIndex: 'terminalkernel',
        key: 'terminalkernel',
    },
    {
        title: '平台',
        dataIndex: 'platform',
        key: 'platform',
    },
    {
        title: '认证结果',
        dataIndex: 'identification',
        key: 'identification',
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
            console.log('params:', params);
            this.loading = true;
            request('/LoginLog', METHOD.POST, {
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
