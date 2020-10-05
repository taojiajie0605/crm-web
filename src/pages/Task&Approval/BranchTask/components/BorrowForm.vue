<template>
    <div>
        <b>基本信息</b>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                审批内容
                <a-input v-model="content" />
            </a-col>
            <a-col :span="12">
                借款金额(元)
                <a-input-number v-model="money" style="width: 100%;" />
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                备注
                <a-input type="textarea" v-model="detail"
            /></a-col>
        </a-row>
        <br />
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            content: '',
            detail: '',
            money: 0,
        };
    },
    methods: {
        getContent() {
            return {
                content: this.content,
                detail: this.detail,
                money: this.money,
            };
        },
    },
};
</script>
