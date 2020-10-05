<template>
    <div>
        <a-card title="自定义字段配置" v-if="editvisible === false">
            <!--表单-->
            <a-table
                :columns="columns"
                :data-source="data"
                :pagination="pagination"
                :loading="loading"
                @change="handleTableChange"
            >
                <span slot="action" slot-scope="text, record">
                    <a @click="routeto(record)">
                        编辑
                    </a>
                    <a-divider type="vertical" />
                    <a type="primary" @click="showModal(record)">预览</a>
                </span>
            </a-table>
            <!--预览弹出框-->
            <a-modal
                title="预览"
                v-model="visible"
                width="900px"
                :maskStyle="{ 'background-color': '#fff' }"
                :bodyStyle="{ height: '600px' }"
                :footer="null"
            >
                <div class="head">
                    <a-icon type="caret-right" />
                    基本信息
                </div>
                <div class="info">
                    <a-form
                        class="ant-advanced-search-form"
                        :form="form"
                        @submit="handleSearch"
                    >
                        <a-row :gutter="24">
                            <a-col :span="12">
                                <a-form-item label="加班原因"
                                    ><a-input disabled
                                /></a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="开始时间"
                                    ><a-input disabled
                                /></a-form-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="24">
                            <a-col :span="12">
                                <a-form-item label="结束时间"
                                    ><a-input disabled
                                /></a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="加班总天数"
                                    ><a-input disabled
                                /></a-form-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="24">
                            <a-col :span="12">
                                <a-form-item label="备注"
                                    ><a-input type="text" disabled
                                /></a-form-item>
                            </a-col>
                            <a-col :span="12" />
                        </a-row>
                    </a-form>
                </div>
            </a-modal>

            <a-modal
                title="预览"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
                :maskStyle="maskStyle"
                :footer="null"
                width="900px"
                :bodyStyle="{ height: '600px' }"
            >
                <k-form-build :value="jsonData" />
            </a-modal>
        </a-card>
        <CustomForm ref="CustomForm" :record="record" @close="close" v-else />
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import CustomForm from './CustomForm/CustomForm'; //自定义编辑组件
//表格标题
const columns = [
    {
        title: '模块',
        dataIndex: 'mode',
        key: 'mode',
    },
    {
        title: '更新时间',
        dataIndex: 'updatetime',
        key: 'updatetime',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    components: {
        CustomForm, //自定义编辑组件
    },
    name: 'FieldSetting',
    data() {
        return {
            jsonData: {
                list: [
                    {
                        type: 'input',
                        label: '单行文本',
                        options: {
                            width: '100%',
                            defaultValue: '',
                            placeholder: '请输入',
                            disabled: false,
                        },
                        model: 'input_1577875678405',
                        key: 'input_1577875678405',
                        rules: [{ required: true, message: '必填项' }],
                    },
                    {
                        type: 'date',
                        label: '日期选择器',
                        options: {
                            width: '100%',
                            defaultValue: '',
                            range: false,
                            showTime: false,
                            disabled: false,
                            clearable: false,
                            placeholder: '请选择',
                            rangePlaceholder: ['开始时间', '结束时间'],
                            format: 'YYYY-MM-DD',
                        },
                        model: 'date_1577877450971',
                        key: 'date_1577877450971',
                        rules: [{ required: true, message: '必填项' }],
                    },
                    {
                        type: 'textarea',
                        label: '多行文本',
                        options: {
                            width: '100%',
                            minRows: 4,
                            maxRows: 6,
                            defaultValue: '',
                            disabled: false,
                            placeholder: '请输入',
                        },
                        model: 'textarea_1577877446659',
                        key: 'textarea_1577877446659',
                        rules: [{ required: true, message: '必填项' }],
                    },
                    {
                        type: 'rate',
                        label: '评分',
                        options: {
                            defaultValue: 0,
                            max: 5,
                            disabled: false,
                            allowHalf: false,
                        },
                        model: 'rate_1577877468717',
                        key: 'rate_1577877468717',
                        rules: [{ required: true, message: '必填项' }],
                    },
                ],
                config: {
                    layout: 'horizontal',
                    labelCol: { span: 4 },
                    wrapperCol: { span: 18 },
                    hideRequiredMark: false,
                    customStyle: '',
                },
            },

            maskStyle: { backgroundColor: 'white' }, //弹出框背景
            data: [], //表格数据
            record: {
                //表格一条数据
            },
            pagination: {
                //分页
                current: 1,
                pageSize: 10,
            },
            loading: false, //表格加载
            columns, //表格标题

            //编辑框
            visible: false, //点预览是否可见
            confirmLoading: false, //编辑页提交加载

            editvisible: false, //点编辑是否可见
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
        //点击分页
        handleTableChange(pagination, filters) {
            console.log(pagination);
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.fetch({
                results: pagination.pageSize,
                page: pagination.current,
                ...filters,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/fieldsetting', METHOD.POST, {
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

        //预览弹出方法
        showModal(record) {
            this.record = record; //默认
            this.visible = true;
        },
        handleCancel() {
            this.visible = false;
        },

        //显示编辑组件
        routeto(record) {
            this.record = record;
            this.editvisible = true;
        },
        //关闭编辑组件
        close() {
            this.editvisible = false;
        },
    },
};
</script>

<style lang="less" scoped>
.status {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head {
    font-weight: bold;
    color: #000;
    margin: 20px 0 10px 0;
}
.list {
    .item {
        padding: 5px 0;
        .title {
            display: inline-block;
            width: 30%;
        }
        .content {
            color: #000;
        }
    }
}
</style>
