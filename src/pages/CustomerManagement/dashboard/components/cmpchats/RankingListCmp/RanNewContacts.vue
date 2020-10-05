<template>
    <!--表单-->
    <a-table
        style="margin-top: 10px;"
        :columns="columns"
        :data-source="data"
        :pagination="false"
    >
        <!--排名-->
        <span slot="rank" slot-scope="record">
            <a-avatar
                v-if="record.rank === 1"
                size="small"
                style="background-color: yellow;"
                :src="require('@/assets/img/rank/first.png')"
            />
            <a-avatar
                v-else-if="record.rank === 2"
                size="small"
                style="background-color: #d8d8eb;"
                :src="require('@/assets/img/rank/second.png')"
            />
            <a-avatar
                v-else-if="record.rank === 3"
                size="small"
                style="background-color: #c48888;"
                :src="require('@/assets/img/rank/third.png')"
            />
            <div v-else>
                {{ record.rank }}
            </div>
        </span>
    </a-table>
</template>

<script>
//表格标题
const columns = [
    {
        title: '排名',
        scopedSlots: { customRender: 'rank' },
        key: 'rank',
        align: 'center',
    },
    {
        title: '姓名',
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: '新增联系人（个）',
        dataIndex: 'newcontacts',
        key: 'newcontacts',
    },
];

export default {
    props: ['data'], //表格数据
    data() {
        return {
            columns, //表格标题
        };
    },
    //初始查询
    mounted() {},
    methods: {},
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
