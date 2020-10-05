<template>
    <div>
        <a-modal
            :visible="AddModalVisible"
            @cancel="showOrCloseModal"
            @ok="handleAdd"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-model :model="form">
                <a-form-model-item label="适用范围 ">
                    <work-depart ref="limit" />
                </a-form-model-item>
                <a-form-model-item label="拥有客户上限 ">
                    <a-input-number
                        placeholder="请输入内容"
                        style="width: 100%;"
                        v-model="form.limit"
                    />
                </a-form-model-item>
                <a-form-model-item label="成交客户是否占有拥有客户数">
                    <a-radio-group name="radioGroup" v-model="form.occupy">
                        <a-radio :value="1"> 是 </a-radio>
                        <a-radio :value="2"> 否 </a-radio>
                    </a-radio-group>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <a-table bordered :data-source="dataSource" :columns="columns">
            <template slot="name" slot-scope="text, record">
                <editable-cell
                    :text="text"
                    @change="onCellChange(record.key, 'name', $event)"
                />
            </template>
            <template slot="operation" slot-scope="text, record">
                <a-popconfirm
                    v-if="dataSource.length"
                    title="确定删除?"
                    @confirm="() => onDelete(record.key)"
                >
                    <a href="javascript:;">删除</a>
                </a-popconfirm>
                <a-divider type="vertical" />
                <a @click="onEdit(record.key)">编辑</a>
            </template>
        </a-table>
    </div>
</template>
<script>
import WorkDepart from './WorkDepart';
export default {
    components: {
        WorkDepart,
    },
    data() {
        return {
            form: {
                limit: 0,
                range: '',
                occupy: 0,
            },
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            AddModalVisible: false,
            dataSource: [
                {
                    key: '0',
                    range: 'Edward King 0',
                    limit: '32',
                    occupy: 1,
                },
                {
                    key: '1',
                    range: 'Edward King 1',
                    limit: '32',
                    occupy: 2,
                },
            ],
            count: 2,
            columns: [
                {
                    title: '适用范围',
                    dataIndex: 'range',
                    width: '30%',
                },
                {
                    title: '拥有客户上限',
                    dataIndex: 'limit',
                },
                {
                    title: '成交客户是否占拥有客户数',
                    dataIndex: 'occupy',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
        };
    },
    methods: {
        onEdit(key) {
            const dataSource = [...this.dataSource];
            const target = dataSource.find((item) => item.key === key);
            this.form = target;
            this.showOrCloseModal();
        },
        onDelete(key) {
            const dataSource = [...this.dataSource];
            this.dataSource = dataSource.filter((item) => item.key !== key);
        },
        showOrCloseModal() {
            this.AddModalVisible = !this.AddModalVisible;
        },
        handleAdd() {
            const { count, dataSource, form } = this;
            this.showOrCloseAddModal();
            this.form.range = this.$refs.limit.getCurrentItem();
            console.log(form.range.join(' '));
            const newData = {
                key: count,
                range: form.range.join(' '),
                limit: form.limit,
                occupy: form.occupy,
            };
            this.dataSource = [...dataSource, newData];
            this.count = count + 1;
        },
    },
};
</script>
<style>
.editable-cell {
    position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
    padding-right: 24px;
}

.editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
}

.editable-cell-icon {
    line-height: 18px;
    display: none;
}

.editable-cell-icon-check {
    line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
    display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
    color: #108ee9;
}

.editable-add-btn {
    margin-bottom: 8px;
}
</style>
