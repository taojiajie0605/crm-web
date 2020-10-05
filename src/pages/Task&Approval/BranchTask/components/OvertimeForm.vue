<template>
    <div>
        <b>基本信息</b>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                加班原因
                <a-input v-model="content" />
            </a-col>
            <a-col :span="12">
                开始时间
                <a-date-picker
                    style="width: 100%;"
                    v-model="startValue"
                    :disabled-date="disabledStartDate"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="开始时间"
                    @openChange="handleStartOpenChange"
                />
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                结束时间
                <a-date-picker
                    style="width: 100%;"
                    v-model="endValue"
                    :disabled-date="disabledEndDate"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="结束时间"
                    :open="endOpen"
                    @openChange="handleEndOpenChange"
                />
            </a-col>
            <a-col :span="12">
                加班总天数
                <a-input-number v-model="days" style="width: 100%;"
            /></a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                备注 <a-input v-model="detail" type="textarea" />
            </a-col>
        </a-row>
        <br />
    </div>
</template>
<script>
export default {
    data() {
        return {
            startValue: null,
            endValue: null,
            endOpen: false,
            content: '',
            detail: '',
            days: '',
        };
    },
    watch: {
        startValue(val) {
            console.log('startValue', val);
        },
        endValue(val) {
            console.log('endValue', val);
        },
    },
    methods: {
        disabledStartDate(startValue) {
            const endValue = this.endValue;
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.valueOf() > endValue.valueOf();
        },
        disabledEndDate(endValue) {
            const startValue = this.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return startValue.valueOf() >= endValue.valueOf();
        },
        handleStartOpenChange(open) {
            if (!open) {
                this.endOpen = true;
            }
        },
        handleEndOpenChange(open) {
            this.endOpen = open;
        },
        getContent() {
            return {
                content: this.content,
                detail: this.detail,
                start: this.startValue,
                end: this.endValue,
                days: this.days,
            };
        },
    },
};
</script>
