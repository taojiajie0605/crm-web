<template>
    <a-tabs>
        <a-tab-pane key="1">
            <span slot="tab">
                <a-icon type="coffee" style="color: red;" />
                请假审批
            </span>
            <FLeave ref="FLeave" />
        </a-tab-pane>
        <a-tab-pane key="2">
            <span slot="tab">
                <a-icon type="car" style="color: blue;" />
                出差审批
            </span>
            <Fbussnitravel ref="Fbussnitravel" />
        </a-tab-pane>
        <a-tab-pane key="3">
            <span slot="tab">
                <a-icon type="alert" style="color: orange;" />
                加班审批
            </span>
            <Faddwork ref="Faddwork" />
        </a-tab-pane>
    </a-tabs>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import FLeave from './cmps/FLeave'; //请假审批
import Fbussnitravel from './cmps/Fbussnitravel'; //出差审批
import Faddwork from './cmps/Faddwork'; //加班审批
export default {
    components: { FLeave, Fbussnitravel, Faddwork },
    data() {
        return {};
    },
    //初始查询
    mounted() {},
    methods: {
        //调用请假子组件刷新表单
        refreshone() {
            this.$refs.FLeave.handlerefresh();
        },
        //调用出差子组件刷新表单
        refreshtwo() {
            this.$refs.Fbussnitravel.handlerefresh();
        },
        //调用加班子组件刷新表单
        refreshthree() {
            this.$refs.Faddwork.handlerefresh();
        },
    },
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
