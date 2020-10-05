<template>
    <div>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                差旅事由
                <br />
                <span
                    ><small> {{ item.content }}</small></span
                >
            </a-col>
            <a-col :span="12">
                报销总金额
                <br />
                <span
                    ><small> {{ item.days }}</small></span
                >
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                备注
                <br />
                <span
                    ><small> {{ item.detail }}</small></span
                >
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                <b>行程</b>
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="24">
                <a-table
                    size="small"
                    style="font-size: 14px;"
                    :columns="columns"
                    :data-source="item.cost"
                />
            </a-col>
        </a-row>
    </div>
</template>

<script>
const columns = [
    {
        title: '出发城市',
        dateIndex: 'from',
        key: 'from',
    },
    {
        title: '目的城市',
        dataIndex: 'to',
        key: 'to',
    },
    {
        title: '开始时间',
        dataIndex: 'start',
        key: 'start',
    },
    {
        title: '结束时间',
        dataIndex: 'end',
        key: 'end',
    },
    {
        title: '交通费（元）',
        dataIndex: 'cost1',
        key: 'cost1',
    },
    {
        title: '住宿费（元）',
        dataIndex: 'cost2',
        key: 'cost2',
    },
    {
        title: '餐饮费（元）',
        dataIndex: 'cost3',
        key: 'cost3',
    },
    {
        title: '其他费用（元）',
        dataIndex: 'cost4',
        key: 'cost4',
    },
    {
        title: '费用明细描述',
        dataIndex: 'detail',
        key: 'detail',
    },
];
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    content: '',
                    detail: '',
                    days: 0,
                    cost: [],
                };
            },
        },
        id: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            columns,
        };
    },
};
</script>

<style></style>
