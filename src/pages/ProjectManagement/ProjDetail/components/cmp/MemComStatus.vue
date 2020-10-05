<template>
    <!--表单-->
    <a-table
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
    >
        <span slot="completionrete" slot-scope="record">
            <div style="color: #f94e4e; font-weight: bold;">
                {{ record.completionrete }}
            </div>
        </span>
    </a-table>
</template>

<script>
import { request, METHOD } from '@/utils/request';

//表格标题
const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '任务总数',
        dataIndex: 'totaltask',
        key: 'totaltask',
    },
    {
        title: '已完成数',
        dataIndex: 'finishtask',
        key: 'finishtask',
    },
    {
        title: '未完成数',
        dataIndex: 'unfinishtask',
        key: 'unfinishtask',
    },
    {
        title: '逾期数',
        dataIndex: 'overdue',
        key: 'overdue',
    },
    {
        title: '完成率 %',
        scopedSlots: { customRender: 'completionrete' },
        key: 'completionrete',
    },
];

export default {
    props: ['proj'],
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
            proj: this.proj,
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
                proj: this.proj,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/completestatus', METHOD.POST, {
                ...params,
            }).then((data) => {
                console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.data = data.data.return;
                this.pagination = pagination;
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
.ant-table-wrapper {
    margin-top: 0px;
}
</style>
