<template>
    <div>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                借款事由
                <br />
                <span
                    ><small> {{ item.content }}</small></span
                >
            </a-col>
            <a-col :span="12">
                借款金额
                <br />
                <span
                    ><small> {{ item.money }}</small></span
                >
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
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
                    money: 0,
                };
            },
        },
        id: {
            type: String,
            default: '',
        },
    },
};
</script>

<style></style>
