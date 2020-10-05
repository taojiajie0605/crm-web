<template>
    <div>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                出差事由
                <br />
                <span
                    ><small> {{ item.content }}</small></span
                >
            </a-col>
            <a-col :span="12">
                时长（天）
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
                    :data-source="item.routers"
                />
            </a-col>
        </a-row>
    </div>
</template>

<script>
const columns = [
    {
        title: '交通工具',
        dataIndex: 'traffice',
        key: 'traffice',
    },
    {
        title: '单程往返',
        dataIndex: 'times',
        key: 'times',
    },
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
        title: '时长（天）',
        dataIndex: 'days',
        key: 'days',
    },
    {
        title: '备注',
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
                    routers: [],
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
