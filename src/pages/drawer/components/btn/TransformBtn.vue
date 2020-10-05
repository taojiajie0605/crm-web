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
            :bodyStyle="{ height: '125px' }"
        >
            <div style="display: flex; align-items: center;">
                <div>变更负责人为：</div>
                <a-select
                    style="width: 300px;"
                    v-model="person"
                    placeholder="点击选择"
                >
                    <a-select-option value="1"> 员工一 </a-select-option>
                    <a-select-option value="2"> 员工二 </a-select-option>
                    <a-select-option value="3"> 员工三 </a-select-option>
                </a-select>
            </div>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: 'TransformBtn',
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            person: undefined,
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
                this.$emit('fetchTransform', this.person);
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

<style scoped></style>
