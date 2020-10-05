<template>
    <div>
        <!--表单-->
        <a-table
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >
            <span slot="operation" slot-scope="record">
                <a @click="preview(record)">预览</a>
                <a-divider type="vertical" />
                <a @click="changename(record)">重命名</a>
                <a-divider type="vertical" />
                <a @click="showDelete(record)">删除</a>
            </span>
        </a-table>
        <ChangeAppendixName
            ref="ChangeAppendixName"
            :currentappendix="this.currentappendix"
            @fetchchangename="fetchchangename"
        />
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import ChangeAppendixName from './cmp/ChangeAppendixName'; //修改附件名字
//表格标题
const columns = [
    {
        title: '附件名称',
        dataIndex: 'appentitle',
        key: 'appentitle',
    },
    {
        title: '附件大小',
        dataIndex: 'appensize',
        key: 'appensize',
    },
    {
        title: '上传人',
        dataIndex: 'upperson',
        key: 'upperson',
    },
    {
        title: '上传时间',
        dataIndex: 'uptime',
        key: 'uptime',
    },
    {
        title: '操作',
        scopedSlots: { customRender: 'operation' },
        key: 'operation',
    },
];

export default {
    props: ['proj'],
    components: {
        ChangeAppendixName, //修改附件名字
    },
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

            currentappendix: undefined,
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
            request('/appendix', METHOD.POST, {
                ...params,
            }).then((data) => {
                console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.data = data.data.appendix;
                this.pagination = pagination;
            });
        },

        //点击删除附件
        showDelete(record) {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">您确定要删除该文件吗?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchdelete(record);
                },
                onCancel() {},
            });
        },
        //点击删除附件选中调用方法
        fetchdelete(record) {
            //console.log('params:', params);
            this.loading = true;
            request('/deleteappendix', METHOD.POST, {
                record: record,
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
                proj: this.proj,
            });
        },

        //重命名弹出框方法
        changename(record) {
            this.currentappendix = JSON.parse(JSON.stringify(record)); //当前附件
            this.$refs.ChangeAppendixName.visible = true;
        },
        //重命名子调用方法
        fetchchangename(title) {
            //console.log('params:', params);
            request('/changeappendixname', METHOD.POST, {
                title: title,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh(); //刷新页面
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
