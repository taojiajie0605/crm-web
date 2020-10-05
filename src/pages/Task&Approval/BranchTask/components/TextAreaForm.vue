<template>
    <a-modal :visible="visible" @ok="onSave" @cancel="showOrCloseModal">
        <template slot="title">
            <b>{{ title }}</b>
        </template>
        <a-input type="textarea" placeholder="请输入审批意见（必填）"
    /></a-modal>
</template>
<script>
export default {
    props: ['title'],
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        showOrCloseModal() {
            this.visible = !this.visible;
        },
        onSave() {
            this.showOrCloseModal();
        },
    },
};
</script>
