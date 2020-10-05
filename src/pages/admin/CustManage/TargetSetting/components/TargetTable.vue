<template>
    <div class="table">
        <a-table
            :columns="columns"
            :data-source="data"
            size="default"
            :scroll="{ x: 2040 }"
        >
            <a slot=""></a>
        </a-table>
    </div>
</template>

<script>
const columns = [
    {
        title: '全年',
        key: 'fullyear',
        dataIndex: 'fullyear',
        width: 120,
    },
    {
        title: '第一季度',
        key: 'season1',
        dataIndex: 'season1',
        width: 120,
    },
    {
        title: '1月',
        key: 'jan',
        dataIndex: 'jan',
        width: 120,
    },
    {
        title: '2月',
        key: 'feb',
        dataIndex: 'feb',
        width: 120,
    },
    {
        title: '3月',
        key: 'mar',
        dataIndex: 'mar',
        width: 120,
    },
    {
        title: '第2季度',
        key: 'season2',
        dataIndex: 'season2',
        width: 120,
    },
    {
        title: '4月',
        key: 'apr',
        dataIndex: 'apr',
        width: 120,
    },
    {
        title: '5月',
        key: 'may',
        dataIndex: 'may',
        width: 120,
    },
    {
        title: '6月',
        key: 'jun',
        dataIndex: 'jun',
        width: 120,
    },
    {
        title: '第3季度',
        key: 'season3',
        dataIndex: 'season3',
        width: 120,
    },
    {
        title: '7月',
        key: 'jul',
        dataIndex: 'jul',
        width: 120,
    },
    {
        title: '8月',
        key: 'aug',
        dataIndex: 'aug',
        width: 120,
    },
    {
        title: '9月',
        key: 'sep',
        dataIndex: 'sep',
        width: 120,
    },
    {
        title: '第4季度',
        key: 'season4',
        dataIndex: 'season4',
        width: 120,
    },
    {
        title: '10月',
        key: 'oct',
        dataIndex: 'oct',
        width: 120,
    },
    {
        title: '11月',
        key: 'nov',
        dataIndex: 'nov',
        width: 120,
    },
    {
        title: '12月',
        key: 'dec',
        dataIndex: 'dec',
        width: 120,
    },
];

const data = [
    {
        fullyear: '123',
        season1: '312',
        jan: '321',
        feb: '31',
        mar: '312',
        season2: '312',
        apr: '312',
        may: '312',
        jun: '321',
        season3: '312',
        jul: '31',
        aug: '132',
        sep: '312',
        season4: '312',
        oct: '321',
        nov: '312',
        dec: '312',
    },
    {
        fullyear: '123',
        season1: '312',
        jan: '321',
        feb: '31',
        mar: '312',
        season2: '312',
        apr: '312',
        may: '312',
        jun: '321',
        season3: '312',
        jul: '31',
        aug: '132',
        sep: '312',
        season4: '312',
        oct: '321',
        nov: '312',
        dec: '312',
    },
    {
        fullyear: '123',
        season1: '312',
        jan: '321',
        feb: '31',
        mar: '312',
        season2: '312',
        apr: '312',
        may: '312',
        jun: '321',
        season3: '312',
        jul: '31',
        aug: '132',
        sep: '312',
        season4: '312',
        oct: '321',
        nov: '312',
        dec: '312',
    },
    {
        fullyear: '',
        season1: '',
        jan: '',
        feb: '',
        mar: '',
        season2: '',
        apr: '',
        may: '',
        jun: '',
        season3: '',
        jul: '',
        aug: '',
        sep: '',
        season4: '',
        oct: '',
        nov: '',
        dec: '',
    },
];
export default {
    name: 'TargetTable',
    data() {
        return {
            data,
            columns,
        };
    },
    methods: {},
};
</script>

<style scoped></style>
