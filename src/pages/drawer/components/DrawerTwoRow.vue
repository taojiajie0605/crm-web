<template>
    <div class="drawer-two-row">
        <a-row>
            <a-card class="drawer-two-row-top">
                <slot name="twoRowTop"></slot>
            </a-card>
        </a-row>
        <a-row>
            <a-card class="drawer-two-row-bottom">
                <slot name="twoRowBottom"></slot>
            </a-card>
        </a-row>
    </div>
</template>

<script>
export default {
    name: 'DrawerTwoRow',
};
</script>

<style>
.drawer-two-row-top {
    height: 100px;
    width: 100%;
    margin-bottom: 10px;
    overflow-y: hidden;
}
.drawer-two-row-bottom {
    height: 440px;
    width: 100%;
    overflow-y: hidden;
}
</style>
