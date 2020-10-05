<template>
    <div>
        <a-modal
            title="新建发票"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="1050px"
            :maskStyle="{ 'background-color': '#fff' }"
        >
            <a-form
                :form="form"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 17 }"
            >
                <div class="scroll">
                    <div class="head">
                        <a-icon type="caret-right" />
                        基本信息
                    </div>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="发票申请编号" required>
                                <a-input v-model="form.billapplynumber" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="客户名称" required>
                                <a-input
                                    placeholder="+ 点击添加"
                                    v-model="form.custname"
                                    @click="showpopover"
                                    allowClear="true"
                                    style="cursor: pointer;"
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
                            <a-form-item label="合同编号" required>
                                <a-input
                                    :disabled="form.custname ? false : true"
                                    placeholder="+ 点击添加"
                                    v-model="form.contractnumber"
                                    @click="showContractpopover"
                                    allowClear="true"
                                    style="cursor: pointer;"
                                />
                                <ContractPopover
                                    ref="ContractPopover"
                                    :custid="custid"
                                    @Surepopover="SureContractpopover"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="合同金额">
                                <a-input
                                    style="width: 100%;"
                                    disabled="true"
                                    v-model="form.contractmoney"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="开票金额" required>
                                <a-input-number
                                    style="width: 100%;"
                                    v-model="form.billmoney"
                                />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="开票日期">
                                <a-date-picker
                                    v-model="form.billdate"
                                    style="width: 312px;"
                                    show-time
                                    placeholder="选择时间"
                                    @change="onDateChange"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="开票类型" required>
                                <a-select
                                    v-model="form.billtype"
                                    placeholder="请选择"
                                >
                                    <a-select-option value="1">
                                        增值税专用发票
                                    </a-select-option>
                                    <a-select-option value="2">
                                        增值税专用发票
                                    </a-select-option>
                                    <a-select-option value="3">
                                        国税通用机打发票
                                    </a-select-option>
                                    <a-select-option value="4">
                                        地税通用机打发票
                                    </a-select-option>
                                    <a-select-option value="5">
                                        收据
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="备注">
                                <a-textarea v-model="form.remarks" :rows="4" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <div class="head">
                        <a-icon type="caret-right" />
                        发票信息
                    </div>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="抬头类型">
                                <a-select
                                    v-model="form.headtype"
                                    placeholder="请选择"
                                >
                                    <a-select-option value="1">
                                        单位
                                    </a-select-option>
                                    <a-select-option value="2">
                                        个人
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="开票抬头">
                                <a-input v-model="form.billhead" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="纳税人识别号">
                                <a-input v-model="form.taxpayeridnumber" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="开户行">
                                <a-input v-model="form.bank" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="开户账号">
                                <a-input v-model="form.bankaccount" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="开票地址">
                                <a-input v-model="form.billaddress" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="电话">
                                <a-input v-model="form.phone" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <div class="head">
                        <a-icon type="caret-right" />
                        邮寄信息
                    </div>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="联系人">
                                <a-input v-model="form.contacts" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item label="联系方式">
                                <a-input v-model="form.cintactinfo" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="12">
                            <a-form-item label="邮寄地址">
                                <a-input v-model="form.mailingaddress" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <div class="head">
                        <a-icon type="caret-right" />
                        审核信息
                        <a-tag color="#f50" style="font-size: 10px;">
                            固定审批流
                        </a-tag>
                    </div>
                    <a-avatar style="background: #87d068;" icon="user" />
                    <a-avatar
                        style="background: #87d068; margin-left: 10px;"
                        icon="user"
                    />
                </div>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'
import CustomerPopover from '@/components/comps/CustomerPopover'; //添加客户名称
import ContractPopover from '@/components/comps/ContractPopover'; //添加合同编号
export default {
    props: ['form'],
    components: { CustomerPopover, ContractPopover },
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载
        };
    },
    mounted() {},
    methods: {
        //开票日期改变
        onDateChange(date, dateString) {
            this.form.billdate = dateString;
        },

        //客户名称弹出框方法
        showpopover() {
            this.$refs.CustomerPopover.visible = true;
        },
        //客户名称弹出框子调用方法
        Surepopover(cust) {
            this.$set(this.form, 'custname', cust[0].custname);
            this.$set(this.form, 'custid', cust[0].id);
            //console.log(cust[0]);
        },
        handlecustchange() {
            if (this.form.custname === '') {
                this.form.custid = '';
                this.form.contractnumber = '';
                this.form.contractnumberid = '';
            }
        },

        //合同编号弹出框方法
        showContractpopover() {
            this.$refs.ContractPopover.visible = true;
        },
        //合同编号弹出框子调用方法
        SureContractpopover(contract) {
            this.$set(this.form, 'contractnumber', contract[0].contractnumber);
            this.$set(this.form, 'contractnumberid', contract[0].id);
            this.$set(this.form, 'contractmoney', contract[0].contractmoney);
            this.$set(this.form, 'billmoney', contract[0].contractmoney);
            //console.log(cust[0]);
        },

        //提交/取消表单
        handleOk() {
            if (
                this.form.billapplynumber === '' ||
                this.form.billapplynumber === undefined
            ) {
                this.$message.error('发票申请编号不能为空');
            } else if (
                this.form.custname === '' ||
                this.form.custname === undefined
            ) {
                this.$message.error('客户名称不能为空');
            } else if (
                this.form.contractnumber === '' ||
                this.form.contractnumber === undefined
            ) {
                this.$message.error('合同编码不能为空');
            } else if (
                this.form.billmoney === '' ||
                this.form.billmoney === undefined
            ) {
                this.$message.error('开票金额不能为空');
            } else if (
                this.form.billtype === '' ||
                this.form.billtype === undefined
            ) {
                this.$message.error('开票类型不能为空');
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
//滚动条css
.scroll {
    height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
}
.scroll::-webkit-scrollbar {
    width: 8px;
}
.scroll::-webkit-scrollbar-track {
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
}
.scroll::-webkit-scrollbar-thumb {
    background-color: rgba(95, 95, 95, 0.4);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;

    &:hover {
        background-color: rgba(95, 95, 95, 0.7);
    }
}
</style>
