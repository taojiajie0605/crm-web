<template>
    <div>
        <a-modal
            title="新建回访"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="950px"
            :maskStyle="{ 'background-color': '#fff' }"
            :bodyStyle="{ height: '480px' }"
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
                        <a-form-item label="回访编号" required>
                            <a-input v-model="form.returnvisitname" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="回访时间" required>
                            <a-date-picker
                                v-model="form.returnvisittime"
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
                        <a-form-item label="回访人" required>
                            <a-tree-select
                                show-search
                                :dropdown-style="{
                                    maxHeight: '400px',
                                    overflow: 'auto',
                                }"
                                placeholder="选择员工"
                                allow-clear
                                multiple
                                tree-default-expand-all
                                v-model="form.returnvisitperson"
                                maxTagCount="2"
                            >
                                <a-tree-select-node
                                    key="0-1"
                                    value="部门1"
                                    title="部门1"
                                >
                                    <a-tree-select-node
                                        key="0-1-1"
                                        value="员工1"
                                        title="员工1"
                                    />
                                    <a-tree-select-node
                                        key="0-1-2"
                                        value="员工2"
                                        title="员工2"
                                    />
                                </a-tree-select-node>
                                <a-tree-select-node
                                    key="0-2"
                                    value="部门2"
                                    title="部门2"
                                >
                                    <a-tree-select-node
                                        key="0-2-1"
                                        value="员工3"
                                        title="员工3"
                                    />
                                    <a-tree-select-node
                                        key="0-2-2"
                                        value="员工4"
                                        title="员工4"
                                    />
                                </a-tree-select-node>
                            </a-tree-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="回访形式">
                            <a-select
                                :default-value="form.returnvisittype"
                                placeholder="请选择"
                                @change="unitSelect(value)"
                            >
                                <a-select-option value="1">
                                    见面拜访
                                </a-select-option>
                                <a-select-option value="2">
                                    电话
                                </a-select-option>
                                <a-select-option value="3">
                                    短信
                                </a-select-option>
                                <a-select-option value="4">
                                    邮寄
                                </a-select-option>
                                <a-select-option value="5">
                                    微信
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
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
                                style="margin-left: 200px;"
                                ref="CustomerPopover"
                                @Surepopover="Surepopover"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="联系人">
                            <a-input
                                :disabled="form.custname ? false : true"
                                placeholder="+ 点击添加"
                                v-model="form.contactname"
                                @click="showContactspopover"
                                allowClear="true"
                                style="cursor: pointer;"
                            />
                            <ContactsPopover
                                ref="ContactsPopover"
                                :custid="custid"
                                @Surepopover="SureContactspopover"
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
                                style="margin-left: 200px;"
                                ref="ContractPopover"
                                :custid="custid"
                                @Surepopover="SureContractpopover"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="客户满意度">
                            <a-select
                                placeholder="请选择"
                                v-model="form.custsatisfaction"
                            >
                                <a-select-option value="1">
                                    很满意
                                </a-select-option>
                                <a-select-option value="2">
                                    满意
                                </a-select-option>
                                <a-select-option value="3">
                                    一般
                                </a-select-option>
                                <a-select-option value="4">
                                    不满意
                                </a-select-option>
                                <a-select-option value="5">
                                    很不满意
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="客户反馈">
                            <a-textarea v-model="form.custreturn" :rows="4" />
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
import ContractPopover from '@/components/comps/ContractPopover'; //添加合同编号
import ContactsPopover from '@/components/comps/ContactsPopover'; //添加联系人
export default {
    props: ['form'],
    components: { CustomerPopover, ContractPopover, ContactsPopover },
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载
        };
    },
    mounted() {},
    methods: {
        //回访时间时间改变
        onDateChange(date, dateString) {
            this.form.returnvisittime = dateString;
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
                this.form.contactname = '';
                this.form.contactnameid = '';
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
            //console.log(cust[0]);
        },

        //客户联系人弹出框方法
        showContactspopover() {
            this.$refs.ContactsPopover.visible = true;
        },
        //客户联系人弹出框子调用方法
        SureContactspopover(cust) {
            this.$set(this.form, 'contactname', cust[0].name);
            this.$set(this.form, 'contactnameid', cust[0].id);
            //console.log(cust[0]);
        },

        //提交/取消表单
        handleOk() {
            if (
                this.form.returnvisitname === '' ||
                this.form.returnvisitname === undefined
            ) {
                this.$message.error('回访编号不能为空');
            } else if (
                this.form.returnvisittime === '' ||
                this.form.returnvisittime === undefined
            ) {
                this.$message.error('回访时间不能为空');
            } else if (
                this.form.returnvisitperson === '' ||
                this.form.returnvisitperson === undefined
            ) {
                this.$message.error('回访人不能为空');
            } else if (
                this.form.custname === '' ||
                this.form.custname === undefined
            ) {
                this.$message.error('客户名称不能为空');
            } else if (
                this.form.contractnumber === '' ||
                this.form.contractnumber === undefined
            ) {
                this.$message.error('合同编号不能为空');
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
