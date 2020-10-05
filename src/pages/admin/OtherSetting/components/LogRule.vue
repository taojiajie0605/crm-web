<template>
    <a-form-model
        :model="dayForm"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
        <a-form-model-item label="日报规则">
            <a-switch v-model="dayForm.delivery" />
        </a-form-model-item>
        <a-form-model-item label="谁需要提交">
            <a-tree-select
                v-model="dayForm.name"
                style="width: 100%;"
                :tree-data="treeData"
                tree-checkable
                :show-checked-strategy="SHOW_PARENT"
                search-placeholder="Please select"
            />
        </a-form-model-item>
        <a-form-model-item label="需要统计的日志">
            <a-checkbox-group v-model="dayForm.week">
                <a-checkbox value="1" name="type">周一</a-checkbox>
                <a-checkbox value="2" name="type">周二</a-checkbox>
                <a-checkbox value="3" name="type">周三</a-checkbox>
                <a-checkbox value="4" name="type">周四</a-checkbox>
                <a-checkbox value="5" name="type">周五</a-checkbox>
                <a-checkbox value="6" name="type">周六</a-checkbox>
                <a-checkbox value="7" name="type">周日</a-checkbox>
            </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="开始提交时间">
            <a-select v-model="dayForm.dateBegin" placeholder="请选择开始时间">
                <a-select-option v-for="i in (7, 23)" :key="i + ':00'">{{
                    i + ':00'
                }}</a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item label="结束提交时间">
            <a-select v-model="dayForm.dateEnd" placeholder="请选择结束时间">
                <a-select-option v-for="i in (7, 23)" :key="i + ':00'">{{
                    i + ':00'
                }}</a-select-option>
            </a-select>
        </a-form-model-item>
        <br />
        <a-form-model-item label="周报规则">
            <a-switch v-model="dayForm.weekDelivery" />
        </a-form-model-item>
        <a-form-model-item label="谁需要提交">
            <a-tree-select
                v-model="dayForm.weekName"
                style="width: 100%;"
                :tree-data="treeData"
                tree-checkable
                :show-checked-strategy="SHOW_PARENT"
                search-placeholder="Please select"
            />
        </a-form-model-item>
        <a-form-model-item label="开始提交时间">
            <a-select v-model="dayForm.weekBegin" placeholder="请选择开始时间">
                <a-select-option v-for="(item, index) in weeks" :key="index">{{
                    item
                }}</a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item label="结束提交时间">
            <a-select v-model="dayForm.weekEnd" placeholder="请选择开始时间">
                <a-select-option v-for="(item, index) in weeks" :key="index">{{
                    item
                }}</a-select-option>
            </a-select>
        </a-form-model-item>
        <br />
        <a-form-model-item label="月报规则">
            <a-switch v-model="dayForm.monthDelivery" />
        </a-form-model-item>
        <a-form-model-item label="谁需要提交">
            <a-tree-select
                v-model="dayForm.monthName"
                style="width: 100%;"
                :tree-data="treeData"
                tree-checkable
                :show-checked-strategy="SHOW_PARENT"
                search-placeholder="Please select"
            />
        </a-form-model-item>
        <a-form-model-item label="开始提交时间">
            <a-select v-model="dayForm.monthBegin" placeholder="请选择开始时间">
                <a-select-option v-for="i in 31" :key="'每月' + i + '号'">{{
                    '每月' + i + '号'
                }}</a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item label="结束提交时间">
            <a-select v-model="dayForm.monthEnd" placeholder="请选择结束时间">
                <a-select-option v-for="i in (7, 23)" :key="i + ':00'">{{
                    i + ':00'
                }}</a-select-option>
            </a-select>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
const weeks = '周一 周二 周三 周四 周五 周六 周日'.split(' ');
const treeData = [
    {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
            },
        ],
    },
    {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
                disabled: true,
            },
            {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
            },
            {
                title: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
            },
        ],
    },
];
export default {
    data() {
        return {
            treeData,
            weeks: weeks,
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            dayForm: {
                name: '',
                delivery: false,
                week: [],
                region: undefined,
                date1: undefined,
                resource: '',
                desc: '',
            },
        };
    },
    methods: {
        onSubmit() {
            console.log('submit!', this.dayForm);
        },
    },
};
</script>
