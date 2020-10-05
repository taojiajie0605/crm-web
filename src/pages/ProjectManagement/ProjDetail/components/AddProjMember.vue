<template>
    <div>
        <a-modal
            title="添加项目成员"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="350px"
            :bodyStyle="{ height: '100px' }"
        >
            <div style="margin-top: 10px;">选择成员：</div>
            <a-tree-select
                show-search
                style="width: 100%; margin-right: 10px;"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="点击选择（多选）"
                allow-clear
                multiple
                tree-default-expand-all
                v-model="teammember"
                maxTagCount="2"
            >
                <a-tree-select-node key="0-1" value="部门1" title="部门1">
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
                <a-tree-select-node key="0-2" value="部门2" title="部门2">
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
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

export default {
    name: 'AddTask',
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            teammember: undefined, //项目成员
        };
    },
    methods: {
        //提交/取消表单
        handleOk() {
            if (this.teammember === undefined || this.teammember == '') {
                this.$message.error('请选择项目成员');
            } else {
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit('fetchAddProjMember', this.teammember);
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
