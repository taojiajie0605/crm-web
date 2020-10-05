<template>
    <div
        style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            height: 35px;
        "
    >
        <template v-if="text === true">
            <div
                tabindex="0"
                style="
                    border: 1px solid #2362fb;
                    padding: 10px;
                    width: 100%;
                    border-radius: 5px;
                "
            >
                <input
                    type="text"
                    @blur="showOrCloseText"
                    v-model="content"
                    ref="input"
                    style="border: 0px;"
                />
                <div style="float: right;">
                    <a-date-picker
                        v-model="time1"
                        placeholder="选择时间"
                        @change="onChange"
                        @ok="onOk"
                    >
                        <span>{{ time1 ? time1 : '选择时间' }} </span>
                    </a-date-picker>
                </div>
            </div>
        </template>
        <template v-else>
            <div
                style="
                    margin-top: 10px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    background-color: #f8faff;
                    width: 100%;
                    padding: 5px;
                "
            >
                <a-checkbox
                    style="padding-right: 10px; margin-top: 5px; float: left;"
                />
                {{ content }}
                <div style="float: right;">
                    <a-button @click="custEvent" type="link"> 删除 </a-button>
                    <a-button type="link" @click="showOrCloseText">
                        编辑
                    </a-button>
                    <span>{{ time1 }}</span>
                    <br />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    props: {
        content: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            text: false,
            time1: undefined,
        };
    },
    watch: {
        text: function () {
            // console.log(this.text);
            if (this.text) this.$refs.input.focus();
        },
    },
    methods: {
        showOrCloseText() {
            this.text = !this.text;
        },
        setEdit() {
            this.text = true;
            console.log('task', this.text);
            this.$refs.input.focus();
        },
        custEvent() {
            this.$emit('delete');
        },
        onChange(value, dateString) {
            // console.log('Selected Time: ', value);
            // console.log('Formatted Selected Time: ', dateString);
            this.time1 = dateString;
        },
        onOk(value) {
            // console.log('onOk: ', value);
        },
        clearTime() {
            this.time1 = undefined;
        },
    },
};
</script>

<style></style>
