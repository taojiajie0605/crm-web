<template>
    <div>
        <ClueManage ref="ClueManage" />
    </div>
</template>

<script>
import ClueManage from './components/ClueManage';
//tab标题
const tabdata = ['线索管理'];

export default {
    name: 'Customer',
    components: {
        ClueManage,
    },
    data() {
        return {
            currenttabdata: tabdata[0], //当前走马灯
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
