<template>
    <div class="drawer-head">
        <a-card style="height: 150px;">
            <a-row :gutter="[16, 32]">
                <a-col :span="1">
                    <slot name="icon"></slot>
                </a-col>
                <a-col :span="3">
                    <a-row>
                        <slot name="title"></slot>
                    </a-row>
                    <a-row style="font-weight: 900;">
                        <slot name="record"></slot>
                    </a-row>
                </a-col>
                <a-col :span="1">
                    <slot name="star"></slot>
                </a-col>
                <a-col :span="14" />
                <a-col align="right" :span="2">
                    <slot name="firstBtn"></slot>
                </a-col>
                <a-col align="right" :span="2">
                    <slot name="secondBtn"></slot>
                </a-col>
                <a-col :span="1" align="right" width="100%">
                    <slot name="more"></slot>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="3">
                    <slot name="info1"></slot>
                </a-col>
                <a-col :span="3">
                    <slot name="info2"></slot>
                </a-col>
                <a-col :span="3">
                    <slot name="info3"></slot>
                </a-col>
                <a-col :span="3">
                    <slot name="info4"></slot>
                </a-col>
                <a-col :span="3">
                    <slot name="info5"></slot>
                </a-col>
                <a-col :span="3">
                    <slot name="info6"></slot>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script>
export default {
    name: 'DrawerHead',
    props: ['icontype'],
    data() {
        return {
            thisrecord: this.record,
        };
    },
};
</script>

<style scoped>
.drawer-head {
    margin-bottom: 10px;
}
::v-deep .clue-drawer-shift {
    background-color: #2362fb;
    color: white;
}
::v-deep .clue-drawer-edit {
    background-color: #389e0b;
    color: white;
}
</style>
