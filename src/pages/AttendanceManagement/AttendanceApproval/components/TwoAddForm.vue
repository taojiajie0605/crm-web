<template>
    <div>
        <a-modal
            title="新建出差审批"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="950px"
            :maskStyle="{ 'background-color': '#fff' }"
            :bodyStyle="{ height: '450px' }"
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
                        <a-form-item label="出差事由" required>
                            <a-input v-model="form.reason" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="交通工具" required>
                            <a-select
                                v-model="form.vehicle"
                                placeholder="请选择"
                                @change="typeSelect"
                            >
                                <a-select-option value="1">
                                    飞机
                                </a-select-option>
                                <a-select-option value="2">
                                    火车
                                </a-select-option>
                                <a-select-option value="3">
                                    汽车
                                </a-select-option>
                                <a-select-option value="4">
                                    其他
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="开始时间" required>
                            <a-date-picker
                                v-model="form.starttime"
                                style="width: 312px;"
                                show-time
                                placeholder="选择时间"
                                @change="onstartDateChange"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="结束时间" required>
                            <a-date-picker
                                v-model="form.endtime"
                                style="width: 312px;"
                                show-time
                                placeholder="选择时间"
                                @change="onendDateChange"
                            />
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

export default {
    name: 'CustAddForm',
    props: ['form'],
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载
        };
    },
    methods: {
        //时间改变
        onstartDateChange(date, dateString) {
            this.form.starttime = dateString;
        },
        onendDateChange(date, dateString) {
            this.form.endtime = dateString;
        },

        //提交/取消表单
        handleOk() {
            if (this.form.reason === '' || this.form.reason === undefined) {
                this.$message.error('出差事由不能为空');
            } else if (
                this.form.vehicle === '' ||
                this.form.vehicle === undefined
            ) {
                this.$message.error('交通工具不能为空');
            } else if (
                this.form.starttime === '' ||
                this.form.starttime === undefined
            ) {
                this.$message.error('开始时间不能为空');
            } else if (
                this.form.endtime === '' ||
                this.form.endtime === undefined
            ) {
                this.$message.error('结束时间不能为空');
            } else if (
                this.form.reviewer === '' ||
                this.form.reviewer === undefined
            ) {
                this.$message.error('审核人不能为空');
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
