<template>
    <div>
        <a-modal
            title="高级筛选"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="确定"
            @cancel="handleCancel"
            width="900px"
            :bodyStyle="{ height: '150px' }"
        >
            <div class="head">
                <a-icon type="caret-right" />
                筛选条件
            </div>
            <div style="display: flex; justify-content: space-between;">
                <a-select
                    style="width: 293px;"
                    :default-value="screencondition"
                    placeholder="请选择要筛选的字段名"
                    @change="custsourceSelect"
                >
                    <a-select-option value="1"> 客户名称 </a-select-option>
                    <a-select-option value="2"> 手机 </a-select-option>
                    <a-select-option value="3"> 电话 </a-select-option>
                    <a-select-option value="4"> 网址 </a-select-option>
                    <a-select-option value="5"> 下次联系时间 </a-select-option>
                    <a-select-option value="6"> 备注 </a-select-option>
                    <a-select-option value="7"> 邮箱 </a-select-option>
                    <a-select-option value="8"> 成交状态 </a-select-option>
                    <a-select-option value="9"> 最后跟进时间 </a-select-option>
                    <a-select-option value="10"> 负责人 </a-select-option>
                    <a-select-option value="11"> 创建人 </a-select-option>
                    <a-select-option value="12"> 更新时间 </a-select-option>
                    <a-select-option value="13"> 创建时间 </a-select-option>
                    <a-select-option value="14"> 详细地址 </a-select-option>
                    <a-select-option value="15"> 地区定位 </a-select-option>
                    <a-select-option value="16"> 客户来源 </a-select-option>
                    <a-select-option value="17"> 客户行业 </a-select-option>
                    <a-select-option value="18"> 客户级别 </a-select-option>
                </a-select>
                <div>包含</div>
                <a-input
                    style="width: 293px;"
                    placeholder="请输入筛选条件"
                    v-model="screencontent"
                />
            </div>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

export default {
    name: 'CustAddForm',
    props: ['screencondition', 'screencontent'],
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载
        };
    },
    methods: {
        //筛选条件单选框选择
        custsourceSelect(value) {
            console.log(value);
            console.log(this.screencondition, '-----', this.screencontent);
            this.screencondition = value;
            //console.log(this.form.scope);
        },

        //提交/取消表单
        handleOk() {
            if (
                this.screencondition === '' ||
                this.screencondition === undefined
            ) {
                this.$message.error('筛选字段名称不能为空');
            } else if (
                this.screencontent === '' ||
                this.screencontent === undefined
            ) {
                this.$message.error('筛选内容不能为空');
            } else {
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit(
                    'fetchadvanceSelect',
                    this.screencondition,
                    this.screencontent,
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
