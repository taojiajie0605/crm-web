<template>
    <div class="edit-btn">
        <a-modal
            :visible="visible"
            title="编辑"
            width="800px"
            @ok="handleOk"
            @cancel="handleCancel"
            style="overflow-y: scroll;"
        >
            <a-row>
                <slot name="title"></slot>
            </a-row>
            <a-row>
                <a-col :span="12" class="left">
                    <slot name="editLeft"></slot>
                </a-col>
                <a-col :span="12" class="right">
                    <slot name="editRight"></slot>
                </a-col>
            </a-row>
            <div class="blank"></div>
            <a-row>
                <slot name="title2"></slot>
            </a-row>
            <a-row>
                <a-col :span="12" class="left">
                    <slot name="editLeft2"></slot>
                </a-col>
                <a-col :span="12" class="right">
                    <slot name="editRight2"></slot>
                </a-col>
            </a-row>
            <div class="blank"></div>
            <a-row>
                <slot name="title3"></slot>
            </a-row>
            <a-row>
                <a-col :span="24">
                    <slot name="main"></slot>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: 'EditBtn',
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        handleOk() {
            this.visible = false;
        },
        handleCancel() {
            this.visible = false;
        },
    },
};
</script>

<style scoped>
.blank {
    height: 20px;
}
::v-deep .ant-modal-body {
    overflow-y: auto;
}
</style>
