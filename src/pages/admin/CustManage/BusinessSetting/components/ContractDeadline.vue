<template>
    <div id="component">
        <a-radio-group v-model="value" @change="onChange">
            <a-radio style="font-size: 14px;" :value="1">不提醒</a-radio>
            <br />
            <br />
            <a-radio style="font-size: 14px;" :value="0">提前提醒天数</a-radio>
        </a-radio-group>
        <br />
        <br />
        <div style="font-size: 14px;">
            <a-input-number
                style="font-size: 14px;"
                id="inputNumber"
                :disabled="value"
                v-model="days"
                :min="1"
                :max="10"
                @change="onChange"
            />天
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 1,
            days: 0,
        };
    },
    methods: {
        onChange(e) {
            console.log('radio checked', e.target.value);
        },
    },
};
</script>
<style lang="less" scoped></style>
