<template>
    <div>
        <a-modal
            title="编辑"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="350px"
            :bodyStyle="{ height: '100px' }"
        >
            <div>新名称：</div>
            <a-input v-model="currentappendix.appentitle" />
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

export default {
    name: 'AddTask',
    props: ['currentappendix'],
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载
        };
    },
    methods: {
        //提交/取消表单
        handleOk() {
            if (
                this.currentappendix.appentitle === undefined ||
                this.currentappendix.appentitle == ''
            ) {
                this.$message.error('名称不能为空');
            } else {
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit('fetchchangename', this.currentappendix);
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
