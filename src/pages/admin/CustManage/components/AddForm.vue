<template>
    <div>
        <a-modal
            title="编辑公海"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            width="900px"
            :maskStyle="{ 'background-color': '#fff' }"
            :bodyStyle="{ height: '600px' }"
        >
            <a-alert
                type="error"
                v-if="this.error"
                message="请填写完整"
                showIcon
                style="margin-bottom: 24px;"
            />
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
                        <a-form-item label="公海名称" required>
                            <a-input v-model="form.seaname" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="公海管理员" required>
                            <!--人员选择-->
                            <a-tree-select
                                show-search
                                style="width: 100%;"
                                v-model="form.seaadmin"
                                placeholder="选择员工"
                                allow-clear
                                multiple
                                tree-default-expand-all
                                @change="handleAdminChange"
                                maxTagCount="1"
                            >
                                <a-tree-select-node
                                    key="0-1"
                                    value="parent 1"
                                    title="员工"
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
                                    value="parent 1"
                                    title="部门"
                                >
                                    <a-tree-select-node
                                        key="0-2-1"
                                        value="全公司"
                                        title="全公司"
                                    />
                                    <a-tree-select-node
                                        key="0-2-2"
                                        value="财务部"
                                        title="财务部"
                                    />
                                </a-tree-select-node>
                            </a-tree-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="公海成员" required>
                            <!--人员选择-->
                            <a-tree-select
                                show-search
                                style="width: 100%;"
                                v-model="form.seamember"
                                placeholder="请选择"
                                allow-clear
                                multiple
                                tree-default-expand-all
                                @change="handleAdminChange"
                                maxTagCount="1"
                            >
                                <a-tree-select-node
                                    key="0-1"
                                    value="parent 1"
                                    title="员工"
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
                                    value="parent 1"
                                    title="部门"
                                >
                                    <a-tree-select-node
                                        key="0-2-1"
                                        value="全公司"
                                        title="全公司"
                                    />
                                    <a-tree-select-node
                                        key="0-2-2"
                                        value="财务部"
                                        title="财务部"
                                    />
                                </a-tree-select-node>
                            </a-tree-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <div class="head">
                    <a-icon type="caret-right" />
                    规则设置
                </div>
                <div class="list">
                    <div class="item">
                        <span class="title">前负责人领取规则</span>
                        <a-radio-group
                            v-model="form.personrule"
                            @change="onChangePersonrule"
                        >
                            <a-radio :value="1"> 不限制 </a-radio>
                            <a-radio :value="2"> 限制 </a-radio>
                        </a-radio-group>
                    </div>
                    <div class="item">
                        <span class="title">领取频率规则</span>
                        <a-radio-group
                            v-model="form.frequencyrule"
                            @change="onChangeFrequencyrule"
                        >
                            <a-radio :value="1"> 不限制 </a-radio>
                            <a-radio :value="2"> 限制 </a-radio>
                        </a-radio-group>
                    </div>
                    <div class="item">
                        <span class="title">提醒规则</span>
                        <a-radio-group
                            v-model="form.remindrule"
                            @change="onChangeRemindrule"
                        >
                            <a-radio :value="1"> 不提醒 </a-radio>
                            <a-radio :value="2"> 提醒 </a-radio>
                        </a-radio-group>
                    </div>
                    <div class="item">
                        <span class="title">收回规则</span>
                        <a-radio-group
                            v-model="form.recoverrule"
                            @change="onChangeRecoverrule"
                        >
                            <a-radio :value="1"> 自动回收 </a-radio>
                            <a-radio :value="2"> 不自动回收 </a-radio>
                        </a-radio-group>
                    </div>
                    <div class="item">
                        <span class="title">公海字段设置</span>
                        <div style="margin-top: 10px;">
                            <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                                <a-checkbox
                                    :indeterminate="indeterminate"
                                    :checked="checkAll"
                                    @change="onCheckAllChange"
                                >
                                    选择公海字段
                                </a-checkbox>
                            </div>
                            <a-checkbox-group
                                v-model="checkedList"
                                :options="plainOptions"
                                @change="onChange"
                            />
                        </div>
                    </div>
                </div>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

//多选框数据
const plainOptions = ['Apple', 'Pear', 'Orange'];

export default {
    name: 'AddForm',
    props: ['form'],
    data() {
        return {
            error: false,
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            //多选框
            checkedList: [],
            indeterminate: false, //框半选
            checkAll: false, //框全选
            plainOptions, //一共多少选项
        };
    },
    methods: {
        //公海多选框选择
        handleAdminChange(value) {
            //console.log(value);
            this.form.seaadmin = value;
            //console.log(this.form.scope);
        },
        handleMemberChange(value) {
            //console.log(value);
            this.form.seamember = value;
            //console.log(this.form.scope);
        },
        //单选框
        onChangePersonrule(e) {
            this.form.personrule = e.target.value;
            console.log(this.form.personrule);
        },
        onChangeFrequencyrule(e) {
            this.form.frequencyrule = e.target.value;
            console.log(this.form.frequencyrule);
        },
        onChangeRemindrule(e) {
            this.form.remindrule = e.target.value;
            console.log(this.form.remindrule);
        },
        onChangeRecoverrule(e) {
            this.form.recoverrule = e.target.value;
            console.log(this.form.recoverrule);
        },
        //公海多选框方法
        onChange(checkedList) {
            this.form.configure = checkedList;
            this.indeterminate =
                !!checkedList.length &&
                checkedList.length < plainOptions.length;
            this.checkAll = checkedList.length === plainOptions.length;
        },
        onCheckAllChange(e) {
            Object.assign(this, {
                checkedList: e.target.checked ? plainOptions : [],
                indeterminate: false,
                checkAll: e.target.checked,
            });
        },

        //提交/取消表单
        handleOk() {
            if (
                this.form.seaname === '' ||
                this.form.seaadmin === '' ||
                this.form.seamember === '' ||
                this.form.seaname === null ||
                this.form.seaadmin == null ||
                this.form.seamember == null
            ) {
                this.error = true;
            } else {
                this.error = false;
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit('fetchadd', this.form);
                console.log('1111111111111111111');
                this.visible = false;
                this.confirmLoading = false;
            }
        },
        handleCancel() {
            this.error = false;
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
