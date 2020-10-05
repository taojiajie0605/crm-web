<template>
    <div>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                请假类型
                <br />
                <span
                    ><small> {{ item.leave }}</small></span
                >
            </a-col>
            <a-col :span="12">
                审批内容
                <br />
                <span
                    ><small> {{ item.content }}</small></span
                >
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                开始时间
                <br />
                <span
                    ><small> {{ item.start }}</small></span
                >
            </a-col>
            <a-col :span="12">
                结束时间
                <br />
                <span
                    ><small> {{ item.end }}</small></span
                >
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                时长
                <br />
                <span
                    ><small> {{ item.duration }}</small></span
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
                    start: '',
                    end: '',
                    leave: '',
                    duration: '',
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
