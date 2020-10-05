<template>
    <div>
        <a-modal
            title="新建回款"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="950px"
            :maskStyle="{ 'background-color': '#fff' }"
            :bodyStyle="{ height: '550px' }"
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
                        <a-form-item label="回款编号" required>
                            <a-input v-model="form.returnmoneynumber" />
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
                        <a-form-item label="合同编号">
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
                        <a-form-item label="期数">
                            <a-select
                                placeholder="请选择"
                                v-model="form.periodnumber"
                            >
                                <a-select-option value="1">
                                    一期
                                </a-select-option>
                                <a-select-option value="2">
                                    二期
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="回款日期" required>
                            <a-date-picker
                                v-model="form.returnmoneydate"
                                style="width: 312px;"
                                show-time
                                placeholder="选择时间"
                                @change="onDateChange"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="回款金额" required>
                            <a-input-number
                                style="width: 100%;"
                                v-model="form.returnmoneycount"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="回款方式">
                            <a-select
                                :default-value="form.returnmoneytype"
                                placeholder="请选择"
                                @change="unitSelect(value)"
                            >
                                <a-select-option value="1">
                                    支票
                                </a-select-option>
                                <a-select-option value="2">
                                    现金
                                </a-select-option>
                                <a-select-option value="3">
                                    邮政汇款
                                </a-select-option>
                                <a-select-option value="4">
                                    电汇
                                </a-select-option>
                                <a-select-option value="5">
                                    网上转账
                                </a-select-option>
                                <a-select-option value="6">
                                    支付宝
                                </a-select-option>
                                <a-select-option value="7">
                                    微信支付
                                </a-select-option>
                                <a-select-option value="8">
                                    其他
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
                    审核信息
                    <a-tag color="#f50" style="font-size: 10px;">
                        授权审核人
                    </a-tag>
                </div>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="审核人" required>
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
                                v-model="form.reviewer"
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
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'
import CustomerPopover from '@/components/comps/CustomerPopover'; //添加客户名称
import ContractPopover from '@/components/comps/ContractPopover'; //添加合同编号
export default {
    name: 'NewReturnMoney',
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
        //下次联系时间改变
        onDateChange(date, dateString) {
            this.form.returnmoneydate = dateString;
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
            //console.log(cust[0]);
        },

        //提交/取消表单
        handleOk() {
            if (
                this.form.returnmoneynumber === '' ||
                this.form.returnmoneynumber === undefined
            ) {
                this.$message.error('回款编号不能为空');
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
                this.form.returnmoneydate === '' ||
                this.form.returnmoneydate === undefined
            ) {
                this.$message.error('回款日期不能为空');
            } else if (
                this.form.returnmoneycount === '' ||
                this.form.returnmoneycount === undefined
            ) {
                this.$message.error('回款金额不能为空');
            } else {
                this.confirmLoading = true;
                this.$emit('fetchadd', this.form);
                this.$store.commit('returnmoney/setReturnItem', this.form);

                //console.log(this.$store);

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
