<template>
    <div>
        <a-modal
            :title="title"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="确定"
            @cancel="handleCancel"
            width="500px"
            :bodyStyle="{ height: '250px' }"
        >
            <a-form
                :form="form"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 17 }"
            >
                <a-form-item label="发票号码">
                    <a-input v-model="form.billnumber" />
                </a-form-item>
                <a-form-item label="实际开票日期">
                    <a-date-picker
                        v-model="form.truebilldate"
                        style="width: 100%;"
                        show-time
                        placeholder="选择日期"
                        @change="onDateChange"
                    />
                </a-form-item>
                <a-form-item label="物流单号">
                    <a-input v-model="form.logisticsnumber" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

export default {
    name: 'SignForBill',
    props: ['title', 'form'],
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载
        };
    },
    methods: {
        //实际开票日期改变
        onDateChange(date, dateString) {
            this.form.truebilldate = dateString;
        },

        //提交/取消表单
        handleOk() {
            if (
                this.screencondition === '' ||
                this.screencondition === undefined
            ) {
                this.$message.error('筛选字段名称不能为空');
            } else if (
                this.screencontent === '' ||
                this.screencontent === undefined
            ) {
                this.$message.error('筛选内容不能为空');
            } else {
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit(
                    'fetchadvanceSelect',
                    this.screencondition,
                    this.screencontent,
                );
                //console.log("1111111111111111111")
                this.visible = false;
                this.confirmLoading = false;
            }
        },
        handleCancel() {
            this.visible = false;
        },
    },
};
</script>

<style lang="less" scoped>
.status {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head {
    font-weight: bold;
    color: #000;
    margin: 20px 0 10px 0;
}
.list {
    .item {
        padding: 5px 0;
        .title {
            display: inline-block;
            width: 30%;
        }
        .content {
            color: #000;
        }
    }
}
</style>
