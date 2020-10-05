<template>
    <a-modal
        @ok="showOrCloseModal"
        @cancel="showOrCloseModal"
        :visible="visible"
    >
        <b slot="title">重置登录账号</b>
        新账号（手机号）
        <br />
        <a-input />
        新密码
        <br />
        <a-input />
        <br />
        <p>
            <small>
                重置登录帐号后，员工需用新账号登录。请及时告知员工，确保正常使用
            </small>
        </p>
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
