<template>
    <a-tabs>
        <a-tab-pane key="1">
            <span slot="tab">
                <a-icon type="coffee" style="color: red;" />
                请假审批
            </span>
            <SLeave ref="SLeave" />
        </a-tab-pane>
        <a-tab-pane key="2">
            <span slot="tab">
                <a-icon type="car" style="color: blue;" />
                出差审批
            </span>
            <Sbussnitravel ref="Sbussnitravel" />
        </a-tab-pane>
        <a-tab-pane key="3">
            <span slot="tab">
                <a-icon type="alert" style="color: orange;" />
                加班审批
            </span>
            <Saddwork ref="Saddwork" />
        </a-tab-pane>
    </a-tabs>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import SLeave from './cmps/SLeave'; //请假审批
import Sbussnitravel from './cmps/Sbussnitravel'; //出差审批
import Saddwork from './cmps/Saddwork'; //加班审批
export default {
    components: { SLeave, Sbussnitravel, Saddwork },
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
