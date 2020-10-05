<template>
    <div>
        <b>基本信息</b>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                请假类型
                <a-select style="width: 100%;" @change="handleChange">
                    <a-select-option
                        v-for="item in leaveType"
                        :key="item"
                        :value="item"
                    >
                        {{ item }}
                    </a-select-option>
                </a-select>
            </a-col>
            <a-col :span="12">
                审批内容
                <a-input v-model="content"
            /></a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                开始时间
                <a-date-picker
                    v-model="startValue"
                    :disabled-date="disabledStartDate"
                    style="width: 100%;"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="开始时间"
                    @openChange="handleStartOpenChange"
                />
            </a-col>
            <a-col :span="12">
                结束时间
                <a-date-picker
                    v-model="endValue"
                    :disabled-date="disabledEndDate"
                    show-time
                    style="width: 100%;"
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="结束时间"
                    :open="endOpen"
                    @openChange="handleEndOpenChange"
                />
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                时长(天)
                <a-input-number
                    v-model="duration"
                    style="width: 100%;"
                    :min="1"
                    @change="onChange"
                />
            </a-col>
            <a-col :span="12">
                备注
                <a-textarea v-model="detail" />
            </a-col>
        </a-row>
    </div>
</template>
<script>
const leaveType = '年假 事假 病假 产假 调休 婚假 丧假 其他'.split(' ');
export default {
    components: {},
    data() {
        return {
            content: '',
            detail: '',
            startValue: null,
            duration: 1,
            endValue: null,
            endOpen: false,
            leaveType,
            leaveCurrentType: '',
        };
    },
    methods: {
        handleStartOpenChange(open) {
            if (!open) {
                this.endOpen = true;
            }
        },
        handleEndOpenChange(open) {
            this.endOpen = open;
        },
        handleChange(value) {
            this.leaveCurrentType = value;
            // console.log(`selected ${value}`);
        },
        getContent() {
            return {
                content: this.content,
                detail: this.detail,
                start: this.startValue,
                end: this.endValue,
                leave: this.leaveCurrentType,
                duration: this.duration,
            };
        },
    },
};
</script>
