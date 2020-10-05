<template>
    <div class="drawer-one">
        <a-row>
            <a-card class="drawer-one-main">
                <slot name="oneMain"></slot>
            </a-card>
        </a-row>
        <a-row>
            <div class="blank"></div>
        </a-row>
    </div>
</template>

<script>
export default {
    name: 'DrawerOne',
};
</script>

<style scoped>
.drawer-one-main {
    width: 100%;
    height: 560px;
    overflow-y: hidden;
}
.blank {
    height: 20px;
}
</style>
