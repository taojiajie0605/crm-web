<template>
    <div>
        <a-popover v-model="visible" trigger="click" placement="left">
            <template slot="title">
                <div style="height: 50px; display: flex; align-items: center;">
                    <b style="font-size: 16px;">关联商机模块</b>
                </div>
            </template>
            <template slot="content">
                <!--表格内容-->
                <div
                    style="
                        margin-bottom: 15px;
                        display: flex;
                        justify-content: space-between;
                    "
                >
                    <a-input-search
                        style="width: 200px;"
                        v-model="nameorphone"
                        @search="search"
                    />
                    <a-button icon="plus" type="primary"> 新建 </a-button>
                </div>
                <a-table
                    checkable
                    style="width: 800px;"
                    :rowSelection="{
                        selectedRowKeys: selectedRowKeys,
                        onChange: onSelectbarChange,
                        type: 'radio',
                    }"
                    :columns="columns"
                    :data-source="data"
                    :pagination="pagination"
                    :loading="loading"
                    @change="handleTableChange"
                    :scroll="{ x: 1200, y: 300 }"
                />
                <hr />

                <div align="right">
                    <a-button @click="showOrClosePopover"> 取消 </a-button>
                    <a-divider type="vertical" />
                    <a-button @click="handleSure" type="primary">
                        确定
                    </a-button>
                </div>
            </template>
        </a-popover>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
const columns = [
    {
        title: '商机名称',
        dataIndex: 'buopname',
        key: 'buopname',
    },
    { title: '商机金额', dataIndex: 'buopmoney', key: 'buopmoney' },
    { title: '客户名称', dataIndex: 'custname', key: 'custname' },
    {
        title: '商机状态组',
        dataIndex: 'buopstate',
        key: 'buopstate',
    },
    { title: '状态', dataIndex: 'state', key: 'state' },
];
export default {
    components: {},
    props: ['custid'],
    data() {
        return {
            visible: false, //关联框

            selectedRowKeys: [], //选择的条
            Rowcontent: [], //选择条的内容
            data: [], //表格数据
            pagination: {
                //分页
                current: 1,
                pageSize: 10,
            },
            loading: false, //表格加载
            columns, //表格标题

            //1个级联搜索
            nameorphone: '', //搜索框内容
        };
    },

    //初始查询
    mounted() {
        const pager = this.pagination;
        //this.pagination = pager;
        this.fetch({
            results: pager.pageSize,
            page: pager.current,
            custid: this.custid, //按客户id查询商机
            nameorphone: this.nameorphone,
        });
    },

    //是否点了左侧选择行
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
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
                custid: this.custid, //按客户id查询商机
                nameorphone: this.nameorphone,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManagebuop', METHOD.POST, {
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
                this.selectedRowKeys = []; //选择的条
            });
        },

        //点击搜索方法
        search() {
            (this.pagination = {
                //分页
                current: 1,
                pageSize: 10,
            }),
                this.fetch({
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                    custid: this.custid, //按客户id查询商机
                    nameorphone: this.nameorphone,
                });
        },

        //左侧行点击事件
        onSelectbarChange(selectedRowKeys, Rowcontent) {
            //console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.Rowcontent = Rowcontent;
            this.selectedRowKeys = selectedRowKeys;
        },

        //点击取消
        showOrClosePopover() {
            this.visible = false;
        },
        //点击确认
        handleSure() {
            this.$emit('Surepopover', this.Rowcontent);
            //console.log(this.Rowcontent);
            this.visible = false;
        },
    },
};
</script>

<style lang="less" scoped>
@import '@/theme/default/style.less';
</style>
