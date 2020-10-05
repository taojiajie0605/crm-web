<template>
    <div>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                审批内容
                <br />
                <span
                    ><small> {{ item.content }}</small></span
                >
            </a-col>
            <a-col :span="12">
                备注
                <br />
                <span
                    ><small> {{ item.detail }}</small></span
                >
            </a-col>
        </a-row>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    content: '',
                    detail: '',
                };
            },
        },
        id: {
            type: String,
            default: '',
        },
    },
    data() {
        return {};
    },
};
</script>
<style scoped></style>
