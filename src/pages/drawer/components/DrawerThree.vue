<template>
    <div class="drawer-three">
        <a-row>
            <a-card class="drawer-three-top">
                <win-business-op />
            </a-card>
        </a-row>
        <a-row>
            <a-col :span="16">
                <a-card class="drawer-three-left">
                    <slot name="threeLeft"></slot>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card class="drawer-three-right">
                    <slot name="threeRight"></slot>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import WinBusinessOp from './function/WinBusinessOp';
export default {
    name: 'DrawerThree',
    components: {
        WinBusinessOp,
    },
};
</script>
<style scoped>
::v-deep .ant-card-body {
    height: 560px;
}
.drawer-three-top {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}
.drawer-three-left {
    height: 450px;
    margin-right: 10px;
    overflow-y: hidden;
}
.drawer-three-right {
    height: 450px;
    overflow-y: hidden;
}
</style>
