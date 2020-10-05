<template>
    <div>
        <a-popover v-model="visible" trigger="click" placement="left">
            <template slot="title">
                <div style="height: 50px; display: flex; align-items: center;">
                    <b style="font-size: 16px;">关联客户模块</b>
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
                    <div>
                        场景：
                        <a-select
                            :default-value="scene"
                            style="width: 150px;"
                            @change="handleSelectChange(value)"
                        >
                            <a-select-option value="1">
                                全部客户
                            </a-select-option>
                            <a-select-option value="2">
                                我负责的客户
                            </a-select-option>
                            <a-select-option value="3">
                                下属负责的客户
                            </a-select-option>
                            <a-select-option value="4">
                                我参与的客户
                            </a-select-option>
                            <a-select-option value="5">
                                我关注的客户
                            </a-select-option>
                        </a-select>
                    </div>
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
        title: '客户名称',
        dataIndex: 'custname',
        key: 'custname',
    },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '下次联系时间', dataIndex: 'nexttime', key: 'nexttime' },
    { title: '最后跟进时间', dataIndex: 'lasttime', key: 'lasttime' },
    { title: '创建时间', dataIndex: 'createtime', key: 'createtime' },
];
export default {
    components: {},
    props: {},
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

            //2个级联搜索
            nameorphone: '', //搜索框内容
            scene: '1', //场景内容
        };
    },

    //初始查询
    mounted() {
        const pager = this.pagination;
        //this.pagination = pager;
        this.fetch({
            results: pager.pageSize,
            page: pager.current,
            scene: this.scene,
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
                scene: this.scene,
                nameorphone: this.nameorphone,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageCustomer', METHOD.POST, {
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

        //场景单选框改变搜索
        handleSelectChange(value) {
            this.scene = value;
            (this.pagination = {
                //分页
                current: 1,
                pageSize: 10,
            }),
                this.fetch({
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                    scene: this.scene,
                    nameorphone: this.nameorphone,
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
                    scene: this.scene,
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
