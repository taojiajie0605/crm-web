<template>
    <a-card>
        <template slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="code"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                归档项目统计
            </div>
        </template>

        <!--表单-->
        <a-table
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >
            <span slot="customTitle"><a-icon type="hdd" /> 项目名称</span>
            <span slot="projname" slot-scope="record">
                <a-icon type="hdd" style="color: rgb(137, 131, 243);" />
                {{ record.projname }}
            </span>
            <span slot="operation" slot-scope="record">
                <a @click="onrecovery(record)">恢复项目</a>
            </span>
        </a-table>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';

//表格标题
const columns = [
    {
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'projname' },
        key: 'projname',
    },
    {
        title: '归档时间',
        key: 'archivedtime',
        dataIndex: 'archivedtime',
    },
    {
        title: '操作',
        scopedSlots: { customRender: 'operation' },
        key: 'operation',
    },
];

export default {
    name: 'All',
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
        //点击分页,搜索
        handleTableChange(pagination) {
            //console.log(pagination);
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.fetch({
                results: pagination.pageSize,
                page: pagination.current,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/archivedproj', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.data = data.data.return;
                this.pagination = pagination;
            });
        },

        //点击恢复项目
        onrecovery(proj) {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定恢复?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchrecovery(proj);
                },
                onCancel() {},
            });
        },
        //恢复项目选中调用方法
        fetchrecovery(proj) {
            //console.log('params:', params);
            this.loading = true;
            request('/recoveryproj', METHOD.POST, {
                proj: proj,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
        //页面刷新方法
        handleRefresh() {
            //console.log("323658556");
            this.fetch({
                results: this.pagination.pageSize,
                page: this.pagination.current,
            });
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
</style>
