<template>
    <div class="drawer-two-col">
        <a-row>
            <a-col :span="16" class="left-col">
                <a-card width="100%" class="left-card">
                    <slot name="twoColLeft"></slot>
                </a-card>
            </a-col>
            <a-col :span="8" class="right-col">
                <a-card width="100%" class="right-card">
                    <slot name="twoColRight"></slot>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    name: 'DrawerTwoCol',
    data() {
        return {};
    },
};
</script>

<style scoped>
::v-deep .ant-card-body {
    height: 560px;
}
.drawer-two-col {
    margin-top: 12px;
}
.left-col {
    padding-right: 6px;
}
.right-col {
    padding-left: 6px;
}
.right-card {
    overflow-y: hidden;
}
.left-card {
    overflow-y: hidden;
}
</style>
