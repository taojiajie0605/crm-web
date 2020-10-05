<template>
    <div>
        <b>基本信息</b>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                审批内容
                <a-input v-model="content" />
            </a-col>
            <a-col :span="12">
                备注
                <a-input type="textarea" v-model="detail"
            /></a-col>
        </a-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            content: '',
            detail: '',
        };
    },
    components: {},
    methods: {
        getContent() {
            return {
                content: this.content,
                detail: this.detail,
            };
        },
    },
};
</script>
