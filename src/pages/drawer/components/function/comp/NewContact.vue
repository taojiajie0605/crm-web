<template>
    <div class="new-contact">
        <a-modal
            title="新建联系人"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="950px"
            :maskStyle="{ 'background-color': '#fff' }"
            :bodyStyle="{ height: '600px' }"
        >
            <a-form
                :form="form"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 17 }"
            >
                <div class="head">
                    <a-icon type="caret-right" />
                    基本信息
                </div>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="姓名" required>
                            <a-input v-model="form.name" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="客户名称" required>
                            <a-input
                                v-model="form.custname"
                                @click="showpopover"
                                allowClear="true"
                                style="cursor: pointer;"
                                placeholder="+ 点击添加"
                                @change="handlecustchange"
                            />
                            <CustomerPopover
                                ref="CustomerPopover"
                                @Surepopover="Surepopover"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="手机">
                            <a-input v-model="form.phone" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="电话">
                            <a-input v-model="form.telephone" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="邮箱">
                            <a-input v-model="form.email" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="职务">
                            <a-input v-model="form.position" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="是否决策人">
                            <a-select
                                :default-value="form.maker"
                                placeholder="请选择"
                                @change="makerSelect(value)"
                            >
                                <a-select-option value="1">
                                    是
                                </a-select-option>
                                <a-select-option value="2">
                                    否
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="地址">
                            <a-input v-model="form.address" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="下次联系时间">
                            <a-date-picker
                                v-model="form.nexttime"
                                style="width: 312px;"
                                show-time
                                placeholder="选择时间"
                                @change="onDateChange"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="备注">
                            <a-textarea v-model="form.remarks" :rows="4" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="性别">
                            <a-select
                                :default-value="form.gender"
                                placeholder="请选择"
                                @change="genderSelect(value)"
                            >
                                <a-select-option value="1">
                                    男
                                </a-select-option>
                                <a-select-option value="2">
                                    女
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'
import CustomerPopover from '@/components/comps/CustomerPopover'; //添加客户名称
export default {
    name: 'NewContact',
    components: { CustomerPopover },
    props: ['form'],
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载
        };
    },
    methods: {
        //是否决策人单选框选择
        makerSelect(value) {
            //console.log(value);
            this.form.maker = value;
            //console.log(this.form.scope);
        },
        //客户级别单选框选择
        genderSelect(value) {
            //console.log(value);
            this.form.gender = value;
        },
        //下次联系时间改变
        onDateChange(date, dateString) {
            this.form.nexttime = dateString;
        },

        //客户名称弹出框方法
        showpopover() {
            this.$refs.CustomerPopover.visible = true;
        },
        //客户名称弹出框子调用方法
        //客户名称弹出框子调用方法
        Surepopover(cust) {
            this.$set(this.form, 'custname', cust[0].custname);
            this.$set(this.form, 'custid', cust[0].id);
            //console.log(cust[0]);
        },
        handlecustchange() {
            if (this.form.custname === '') {
                this.form.custid = '';
            }
        },

        //提交/取消表单
        handleOk() {
            const regPos = /^\d+(\.\d+)?$/; //非负浮点数
            const reg = /^[a-zA-Z0-9]+@[a-z0-9]{2,5}\.[a-z]{2,3}(\.[a-z]{2,3})?$/; //邮箱
            if (this.form.name === '' || this.form.name === undefined) {
                this.$message.error('姓名不能为空');
            } else if (
                this.form.custname === '' ||
                this.form.custname === undefined
            ) {
                this.$message.error('客户名称不能为空');
            } else if (
                this.form.phone !== '' &&
                this.form.phone !== undefined &&
                !regPos.test(this.form.phone)
            ) {
                this.$message.error('手机格式有误');
            } else if (
                this.form.telephone !== '' &&
                this.form.telephone !== undefined &&
                !regPos.test(this.form.telephone)
            ) {
                this.$message.error('电话格式有误');
            } else if (
                this.form.email !== '' &&
                this.form.email !== undefined &&
                !reg.test(this.form.email)
            ) {
                this.$message.error('邮箱格式有误');
            } else {
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit('fetchadd', this.form);
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
