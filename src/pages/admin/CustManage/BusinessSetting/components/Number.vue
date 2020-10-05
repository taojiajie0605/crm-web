<template>
    <div>
        <a-form-model ref="number" :model="InputFormItem">
            编号示例
            {{ text.join('-') }} , {{ text }}
            <a-form-model-item
                v-for="(item, index) in InputFormItem"
                :key="item.key"
            >
                {{ chineseNumber[index] }}级编号
                <a-select
                    default-value="text"
                    :id="index"
                    style="width: 120px;"
                    v-model="item.type"
                >
                    <a-select-option value="text">文本</a-select-option>
                    <a-select-option value="date">日期</a-select-option>
                    <a-select-option value="number">数字</a-select-option>
                </a-select>
                <a-divider type="vertical" />
                <template v-if="item.type === 'number'">
                    起始编号
                    <a-input-number
                        v-model="text[index]"
                        id="inputNumber"
                        :min="1"
                        :max="10"
                    />递增数
                    <a-input-number
                        id="inputNumber"
                        :min="1"
                        :max="10"
                    />重新开始编号
                    <a-select style="width: 220px;">
                        <a-select-option value="never">从不</a-select-option>
                        <a-select-option value="year">每年</a-select-option>
                        <a-select-option value="month">每月</a-select-option>
                        <a-select-option value="day">每天</a-select-option>
                    </a-select>
                </template>
                <template v-else-if="item.type === 'text'">
                    <a-input
                        @change="printText"
                        v-model="text[index]"
                        style="margint-left: 10px; width: 150px;"
                    />
                </template>
                <template v-else-if="item.type === 'date'">
                    <a-select style="width: 220px;" v-model="text[index]">
                        <a-select-option :value="year"
                            >yyyy(年)</a-select-option
                        >
                        <a-select-option value="month"
                            >yyyyMM(年月)</a-select-option
                        >
                        <a-select-option value="day"
                            >yyyyMMdd(年月日)</a-select-option
                        >
                    </a-select>
                </template>
                <a-icon type="minus-circle-o" @click="removeFormItem(item)" />
            </a-form-model-item>
        </a-form-model>
        <a @click="addFormItem">添加一级</a>
    </div>
</template>

<script>
const chineseNumber = '一 二 三 四 五 六'.split(' ');
export default {
    data() {
        return {
            InputFormItem: [],
            chineseNumber,
            text: [],
            year: Date.year,
            month: this.year + Date.month,
            day: this.month + Date.day,
        };
    },
    methods: {
        printText() {
            console.log(this.text);
        },
        removeFormItem(item) {
            const index = this.InputFormItem.indexOf(item);
            console.log(item);
            this.InputFormItem.splice(index, 1);
        },
        addFormItem() {
            if (this.InputFormItem.length < 6) {
                this.InputFormItem.push({
                    value: '',
                    key: Date.now(),
                    type: 'text',
                });
            }
        },
    },
};
</script>
