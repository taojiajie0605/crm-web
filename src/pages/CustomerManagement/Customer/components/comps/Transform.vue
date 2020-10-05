<template>
    <div>
        <a-modal
            title="批量转移"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="500px"
            :bodyStyle="{ height: '290px' }"
        >
            <div style="display: flex; align-items: center;">
                <div>变更负责人为：</div>
                <a-select
                    style="width: 293px;"
                    v-model="person"
                    placeholder="点击选择"
                >
                    <a-select-option value="1"> 员工一 </a-select-option>
                    <a-select-option value="2"> 员工二 </a-select-option>
                    <a-select-option value="3"> 员工三 </a-select-option>
                </a-select>
            </div>
            <div style="margin-top: 20px;">将原负责人：</div>
            <a-radio-group style="margin-left: 10px;" v-model="formercondition">
                <a-radio :value="1"> 移出 </a-radio>
                <a-radio :value="2"> 转为团队成员（只读） </a-radio>
                <a-radio :value="3"> 转为团队成员（读写） </a-radio>
            </a-radio-group>
            <div style="margin-top: 20px;">同时变更负责人至：</div>
            <a-checkbox-group
                style="margin-left: 10px;"
                v-model="transcondition"
            >
                <a-row>
                    <a-col :span="20">
                        <a-checkbox value="1"> 联系人 </a-checkbox>
                    </a-col>
                    <a-col :span="20">
                        <a-checkbox value="2"> 商机 </a-checkbox>
                    </a-col>
                    <a-col :span="20">
                        <a-checkbox value="3"> 合同 </a-checkbox>
                    </a-col>
                </a-row>
            </a-checkbox-group>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

export default {
    name: 'Transform',
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            person: undefined,
            formercondition: 1,
            transcondition: [],
        };
    },
    methods: {
        //负责人单选框选择
        personSelect(value) {
            //console.log(value);
            //console.log(this.screencondition,'-----',this.screencontent)
            this.person = value;
            //console.log(this.form.scope);
        },

        //提交/取消表单
        handleOk() {
            if (this.person === '' || this.person === undefined) {
                this.$message.error('请选择变更负责人');
            } else {
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit(
                    'fetchTransform',
                    this.person,
                    this.formercondition,
                    this.transcondition,
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

<style lang="less" scoped></style>
