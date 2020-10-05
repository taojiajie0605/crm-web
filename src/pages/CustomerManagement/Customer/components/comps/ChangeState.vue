<template>
    <div>
        <a-modal
            title="客户成交状态"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="500px"
            :bodyStyle="{ height: '100px' }"
        >
            <div
                style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    justify-content: center;
                "
            >
                <div>成交状态：</div>
                <a-select style="width: 293px;" v-model="changestate">
                    <a-select-option value="1"> 已成交 </a-select-option>
                    <a-select-option value="2"> 未成交 </a-select-option>
                </a-select>
            </div>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

export default {
    name: 'ChangeState',
    data() {
        return {
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            changestate: '1', //放入公海
        };
    },
    methods: {
        //提交/取消表单
        handleOk() {
            this.confirmLoading = true;
            //console.log("1111111111111111111",this.form)
            this.$emit('fetchChangeState', this.changestate);
            //console.log("1111111111111111111")
            this.visible = false;
            this.confirmLoading = false;
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
