<template>
    <div class="item">
        <div
            style="
                height: 50px;
                padding-left: 10px;
                background-color: #f5f5f5;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 10px;
            "
        >
            <slot> 行程明细 </slot>
            <div style="padding-right: 15px;">
                <a-icon type="delete" @click="deleteEvent" />
            </div>
        </div>
        <a-row :gutter="[16, 16]">
            <a-col :offset="1" :span="3"> 交通工具 </a-col>
            <a-col :span="8">
                <a-select style="width: 150px;" @change="handleChange">
                    <a-select-option value="飞机">飞机</a-select-option>
                    <a-select-option value="火车">火车</a-select-option>
                    <a-select-option value="汽车">汽车</a-select-option>
                    <a-select-option value="其他">其他</a-select-option>
                </a-select>
            </a-col>
            <a-col :offset="1" :span="3"> 单程往反 </a-col>
            <a-col :span="8">
                <a-select @change="handleTimes" style="width: 150px;">
                    <a-select-option value="单程"> 单程 </a-select-option>
                    <a-select-option value="往返"> 往返 </a-select-option>
                </a-select>
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :offset="1" :span="3"> 出发城市 </a-col>
            <a-col :span="8">
                <a-input v-model="from" style="width: 90%;" />
            </a-col>
            <a-col :offset="1" :span="3"> 目的城市 </a-col>
            <a-col :span="8">
                <a-input v-model="to" style="width: 90%;" />
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :offset="1" :span="3"> 开始时间 </a-col>
            <a-col :span="8">
                <a-date-picker
                    v-model="startValue"
                    :disabled-date="disabledStartDate"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="选择开始时间"
                    @openChange="handleStartOpenChange"
                />
            </a-col>
            <a-col :offset="1" :span="3"> 结束时间 </a-col>
            <a-col :span="8">
                <a-date-picker
                    v-model="endValue"
                    :disabled-date="disabledEndDate"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="选择结束时间"
                    :open="endOpen"
                    @openChange="handleEndOpenChange"
                />
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :offset="1" :span="3"> 时长（天） </a-col>
            <a-col :span="8">
                <a-input-number
                    disabled
                    v-model="dayCount"
                    @change="onChange"
                />
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :offset="1" :span="22">
                备注
                <a-input
                    v-model="detail"
                    type="textarea"
                    style="margin-bottom: 15px;"
            /></a-col>
        </a-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dayCount: 0,
            startVlaue: null,
            endOpen: false,
            endValue: null,
            traffice: '',
            from: '',
            to: '',
            detail: '',
            times: '',
        };
    },
    watch: {
        startValue(val) {
            //console.log('startValue', val);
        },
        endValue(val) {
            //console.log('endValue', val);
            this.dayCount = this.endValue - this.startVlaue;
        },
    },
    methods: {
        handleChange(value) {
            //console.log(`selected ${value}`);
            this.traffice = value;
        },
        handleTimes(value) {
            this.times = value;
            //console.log(value);
        },
        deleteEvent() {
            //console.log('delete');
            this.$emit('delete');
        },
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
                from: this.from,
                to: this.to,
                start: this.startVlaue,
                end: this.endValue,
                detail: this.detail,
                traffice: this.traffice,
                days: this.dayCount,
                times: this.times,
            };
        },
    },
};
</script>
<style scoped>
.item {
    border-radius: 4px;
    border: 1px #d9d9d9 solid;
}
</style>
