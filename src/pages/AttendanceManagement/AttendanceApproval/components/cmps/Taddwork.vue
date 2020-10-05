<template>
    <a-card>
        <!--表单-->
        <a-table
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >
            <!--审批状态-->
            <span slot="station" slot-scope="record">
                <div v-if="record.station === 1">
                    <a-icon
                        type="bulb"
                        theme="filled"
                        style="color: #2362fb;"
                    />
                    待审批
                </div>
                <div v-if="record.station === 2">
                    <a-icon
                        type="bulb"
                        theme="filled"
                        style="color: #20b559;"
                    />
                    已通过
                </div>
                <div v-if="record.station === 3">
                    <a-icon
                        type="bulb"
                        theme="filled"
                        style="color: #f94e4e;"
                    />
                    未通过
                </div>
            </span>
        </a-table>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';

//表格标题
const columns = [
    {
        title: '申请人',
        dataIndex: 'applicant',
        key: 'applicant',
    },
    {
        title: '加班原因',
        dataIndex: 'addreason',
        key: 'addreason',
    },
    {
        title: '开始时间',
        key: 'starttime',
        dataIndex: 'starttime',
    },
    {
        title: '结束时间',
        dataIndex: 'endtime',
        key: 'endtime',
    },
    {
        title: '申请人部门',
        dataIndex: 'department',
        key: 'department',
    },
    {
        title: '创建时间',
        dataIndex: 'createtime',
        key: 'createtime',
    },
    {
        title: '审核人',
        dataIndex: 'reviewer',
        key: 'reviewer',
    },
    {
        title: '审批状态',
        key: 'station',
        scopedSlots: { customRender: 'station' },
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
            request('/addAtt', METHOD.POST, {
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
