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
            <slot> 费用明细 </slot>
            <div style="padding-right: 15px;">
                <a-icon type="delete" @click="deleteEvent" />
            </div>
        </div>
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
                    placeholder="请选择"
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
                    placeholder="请选择"
                    :open="endOpen"
                    @openChange="handleEndOpenChange"
                />
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :offset="1" :span="3"> 交通费(元) </a-col>
            <a-col :span="8">
                <a-input-number v-model="cost[0]" style="width: 90%;" />
            </a-col>
            <a-col :offset="1" :span="3"> 住宿费(元) </a-col>
            <a-col :span="8">
                <a-input-number v-model="cost[1]" style="width: 90%;" />
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :offset="1" :span="3"> 餐饮费(元) </a-col>
            <a-col :span="8">
                <a-input-number v-model="cost[2]" style="width: 90%;" />
            </a-col>
            <a-col :offset="1" :span="3"> 其他费用(元) </a-col>
            <a-col :span="8">
                <a-input-number v-model="cost[3]" style="width: 90%;" />
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :offset="1" :span="3"> 合计(元): </a-col>
            <a-col :span="8">
                {{ count }}
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :offset="1" :span="22">
                费用明细描述
                <a-input
                    v-model="detail"
                    type="textarea"
                    style="margin-bottom: 15px;"
            /></a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :offset="1" :span="22">
                <div>
                    <a-upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                        :default-file-list="fileList"
                    >
                        <a-button>
                            <a-icon type="upload" /> 上传发票图片
                        </a-button>
                    </a-upload>
                    <br />
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dayCount: 0,
            startValue: null,
            endOpen: false,
            endValue: null,
            detail: '',
            from: '',
            to: '',
            cost: [0, 0, 0, 0],
            count: 0,
            fileList: [
                {
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url:
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl:
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-2',
                    name: 'yyy.png',
                    status: 'done',
                    url:
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    thumbUrl:
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
            ],
        };
    },
    watch: {
        startValue(val) {
            console.log('startValue', val);
        },
        endValue(val) {
            console.log('endValue', val);
            this.dayCount = this.endValue - this.startVlaue;
        },
        cost: {
            handler(newValue, oldValue) {
                let sum = 0;
                newValue.forEach((element) => {
                    sum += element;
                });
                this.count = sum;
            },
            deep: true,
        },
    },
    methods: {
        deleteEvent() {
            console.log('delete');
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
            let sum = 0;
            this.cost.forEach(function (value) {
                return (sum += value);
            });
            return {
                from: this.from,
                to: this.to,
                start: this.startValue,
                end: this.endValue,
                cost1: this.cost[0],
                cost2: this.cost[1],
                cost3: this.cost[2],
                cost4: this.cost[3],
                total: sum,
                detail: this.detail,
            };
        },
    },
};
</script>
<style scoped>
.item {
    border-radius: 4px;
    border: 1px #d9d9d9 solid;
    padding-bottom: 15px;
}

/* tile uploaded pictures */
.upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
}
</style>
