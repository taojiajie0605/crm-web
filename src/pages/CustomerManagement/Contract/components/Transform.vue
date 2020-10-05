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
            :bodyStyle="{ height: '200px' }"
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
                this.$emit('fetchTransform', this.person, this.formercondition);
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
