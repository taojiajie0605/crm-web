<template>
    <div>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                加班原因

                <br />
                <span
                    ><small> {{ item.content }}</small></span
                >
            </a-col>
            <a-col :span="12">
                开始时间
                <br />
                <span
                    ><small> {{ item.start }}</small></span
                >
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                结束时间
                <br />
                <span
                    ><small> {{ item.end }}</small></span
                >
            </a-col>
            <a-col :span="12">
                加班总天数
                <br />
                <span
                    ><small> {{ item.days }}</small></span
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
                    days: 0,
                    start: '',
                    end: '',
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
