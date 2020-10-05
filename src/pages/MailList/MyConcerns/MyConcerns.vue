<template>
    <a-card>
        <template slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="container"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                    theme="filled"
                />
                通讯录
            </div>
            <div style="margin: auto; text-align: center;">
                <a-input
                    style="width: 250px; margin-right: 10px;"
                    v-model="nameorphone"
                    size="default"
                    placeholder="请输入员工姓名/手机"
                />
                <a-button type="primary" @click="search"> 搜索 </a-button>
            </div>
        </template>
        <div align="left" style="float: left;">
            <!--人员选择-->
            选择部门：
            <a-tree-select
                show-search
                style="width: 200px; margin-bottom: 10px;"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="选择部门"
                allow-clear
                multiple
                tree-default-expand-all
                @change="handleTreeChange"
                maxTagCount="1"
            >
                <a-tree-select-node key="0-1" value="parent 1" title="部门">
                    <a-tree-select-node
                        key="0-1-1"
                        value="全公司"
                        title="全公司"
                    />
                    <a-tree-select-node
                        key="0-1-2"
                        value="财务部"
                        title="财务部"
                    />
                </a-tree-select-node>
            </a-tree-select>
        </div>

        <!--表单-->
        <a-table
            style="margin-top: 30px;"
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        >
            <span slot="follow" slot-scope="record">
                <a-icon
                    v-if="record.follow === 1"
                    type="star"
                    @click="onConcerns(record)"
                />
                <a-icon
                    v-if="record.follow === 2"
                    type="star"
                    theme="filled"
                    style="color: orange;"
                    @click="onConcerns(record)"
                />
            </span>
        </a-table>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';

//表格标题
const columns = [
    {
        title: '字母',
        dataIndex: 'letter',
        key: 'letter',
    },
    {
        title: '关注',
        key: 'follow',
        scopedSlots: { customRender: 'follow' },
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
    },
    {
        title: '岗位',
        dataIndex: 'station',
        key: 'station',
    },
];

export default {
    name: 'MyConcerns',
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

            department: [], //选择的部门

            nameorphone: '', //搜索框
        };
    },
    //初始查询
    mounted() {
        const pager = this.pagination;
        //this.pagination = pager;
        this.fetch({
            results: pager.pageSize,
            page: pager.current,
            department: this.department,
            nameorphone: this.nameorphone,
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
                department: this.department,
                nameorphone: this.nameorphone,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/MailMyConcerns', METHOD.POST, {
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

        //部门多选框改变
        handleTreeChange(value) {
            this.department = value;
            (this.pagination = {
                //分页
                current: 1,
                pageSize: 10,
            }),
                this.fetch({
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                    department: this.department,
                    nameorphone: this.nameorphone,
                });
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
                    department: this.department,
                    nameorphone: this.nameorphone,
                });
        },

        //点击关注方法
        onConcerns(record) {
            this.fetchConcerns({
                results: this.pagination.pageSize,
                page: this.pagination.current,
                department: this.department,
                nameorphone: this.nameorphone,
                ...record, //点击收藏的信息
            });
        },
        fetchConcerns(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/MailMyConcernsConcerns', METHOD.POST, {
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
                this.$message.success(data.data.msg);
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
