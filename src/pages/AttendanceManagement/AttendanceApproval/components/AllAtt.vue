<template>
    <a-tabs>
        <a-tab-pane key="1">
            <span slot="tab">
                <a-icon type="coffee" style="color: red;" />
                请假审批
            </span>
            <TLeave ref="TLeave" />
        </a-tab-pane>
        <a-tab-pane key="2">
            <span slot="tab">
                <a-icon type="car" style="color: blue;" />
                出差审批
            </span>
            <Tbussnitravel ref="Tbussnitravel" />
        </a-tab-pane>
        <a-tab-pane key="3">
            <span slot="tab">
                <a-icon type="alert" style="color: orange;" />
                加班审批
            </span>
            <Taddwork ref="Taddwork" />
        </a-tab-pane>
    </a-tabs>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import TLeave from './cmps/TLeave'; //请假审批
import Tbussnitravel from './cmps/Tbussnitravel'; //出差审批
import Taddwork from './cmps/Taddwork'; //加班审批
export default {
    components: { TLeave, Tbussnitravel, Taddwork },
    data() {
        return {};
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
