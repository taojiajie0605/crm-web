<template>
    <a-modal
        @ok="showOrCloseModal"
        @cancel="showOrCloseModal"
        :visible="visible"
    >
        <b slot="title">重置密码</b>
        密码
        <br />
        <a-input />
    </a-modal>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        showOrCloseModal() {
            this.visible = !this.visible;
        },
    },
};
</script>

<style></style>
