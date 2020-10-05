<template>
    <!--表单-->
    <a-table
        style="margin-top: 10px;"
        :columns="columns"
        :data-source="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
    />
</template>

<script>
import { request, METHOD } from '@/utils/request';

//表格标题
const columns = [
    {
        title: '考勤人员',
        dataIndex: 'attperson',
        key: 'attperson',
    },
    {
        title: '所属部门',
        key: 'department',
        dataIndex: 'department',
    },
    {
        title: '考勤日期',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: '签到时间',
        dataIndex: 'signintime',
        key: 'signintime',
    },
    {
        title: '签到地点',
        dataIndex: 'signinplace',
        key: 'signinplace',
    },
    {
        title: '签到备注',
        dataIndex: 'signinremarks',
        key: 'signinremarks',
    },
    {
        title: '签退时间',
        dataIndex: 'signouttime',
        key: 'signouttime',
    },
    {
        title: '签退地点',
        dataIndex: 'signoutplace',
        key: 'signoutplace',
    },
    {
        title: '签退备注',
        dataIndex: 'signoutremarks',
        key: 'signoutremarks',
    },
];

export default {
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
            request('/Attrecords', METHOD.POST, {
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
