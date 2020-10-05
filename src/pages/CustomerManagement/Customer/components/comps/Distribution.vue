<template>
    <div>
        <a-modal
            title="批量分配"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            :bodyStyle="{ height: '125px' }"
        >
            <div
                style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    justify-content: center;
                "
            >
                <div>请选择：</div>
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
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

export default {
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            person: undefined,
        };
    },
    methods: {
        //提交/取消表单
        handleOk() {
            if (this.person === undefined || this.person == '') {
                this.$message.error('请选择负责人');
            } else {
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit('fetchDistribution', this.person);
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
