<template>
    <div>
        <a-modal
            title="新建线索"
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
                        <a-form-item label="线索名称" required>
                            <a-input v-model="form.custname" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="线索来源">
                            <a-select
                                :default-value="form.custsource"
                                placeholder="请选择"
                                @change="custsourceSelect(value)"
                            >
                                <a-select-option value="1">
                                    促销
                                </a-select-option>
                                <a-select-option value="2">
                                    搜索引擎
                                </a-select-option>
                                <a-select-option value="3">
                                    广告
                                </a-select-option>
                                <a-select-option value="4">
                                    转介绍
                                </a-select-option>
                                <a-select-option value="5">
                                    线上注册
                                </a-select-option>
                                <a-select-option value="6">
                                    线上询价
                                </a-select-option>
                                <a-select-option value="7">
                                    预约上门
                                </a-select-option>
                                <a-select-option value="8">
                                    陌拜
                                </a-select-option>
                                <a-select-option value="9">
                                    电话咨询
                                </a-select-option>
                                <a-select-option value="10">
                                    邮件咨询
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="手机">
                            <a-input v-model.number="form.phone" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="电话">
                            <a-input v-model.number="form.telephone" />
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
                        <a-form-item label="地址">
                            <a-input v-model="form.address" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="客户行业">
                            <a-select
                                :default-value="form.custindustry"
                                placeholder="请选择"
                                @change="custindustrySelect(value)"
                            >
                                <a-select-option value="1">
                                    IT
                                </a-select-option>
                                <a-select-option value="2">
                                    金融业
                                </a-select-option>
                                <a-select-option value="3">
                                    房地产
                                </a-select-option>
                                <a-select-option value="4">
                                    商业服务
                                </a-select-option>
                                <a-select-option value="5">
                                    运输/物流
                                </a-select-option>
                                <a-select-option value="6">
                                    生产
                                </a-select-option>
                                <a-select-option value="7">
                                    政府
                                </a-select-option>
                                <a-select-option value="8">
                                    文化传媒
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="客户级别">
                            <a-select
                                :default-value="form.custlevel"
                                placeholder="请选择"
                                @change="custlevelSelect(value)"
                            >
                                <a-select-option value="1">
                                    A(重点客户)
                                </a-select-option>
                                <a-select-option value="2">
                                    B(普通客户)
                                </a-select-option>
                                <a-select-option value="3">
                                    C(非优先客户)
                                </a-select-option>
                            </a-select>
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
            </a-form>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

export default {
    name: 'CustAddForm',
    props: ['form'],
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载
        };
    },
    methods: {
        //客户来源单选框选择
        custsourceSelect(value) {
            //console.log(value);
            this.form.custsource = value;
            //console.log(this.form.scope);
        },
        //客户行业单选框选择
        custindustrySelect(value) {
            //console.log(value);
            this.form.custindustry = value;
            //console.log(this.form.scope);
        },
        //客户级别单选框选择
        custlevelSelect(value) {
            //console.log(value);
            this.form.custsource = value;
        },
        //下次联系时间改变
        onDateChange(date, dateString) {
            this.form.nexttime = dateString;
        },

        //提交/取消表单
        handleOk() {
            const regPos = /^\d+(\.\d+)?$/; //非负浮点数
            const reg = /^[a-zA-Z0-9]+@[a-z0-9]{2,5}\.[a-z]{2,3}(\.[a-z]{2,3})?$/; //邮箱
            if (this.form.custname === '' || this.form.custname === undefined) {
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
