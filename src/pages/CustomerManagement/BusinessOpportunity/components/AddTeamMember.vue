<template>
    <div>
        <a-modal
            title="添加团队成员"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="500px"
            :bodyStyle="{ height: '200px' }"
        >
            <div style="display: flex; align-items: center;">
                <div>选择团队成员：</div>
                <a-tree-select
                    show-search
                    style="width: 293px; margin-right: 10px;"
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
            </div>
            <div style="margin-top: 20px;">权限：</div>
            <a-radio-group style="margin-left: 10px;" v-model="role">
                <a-radio :value="1"> 只读 </a-radio>
                <a-radio :value="2"> 读写 </a-radio>
            </a-radio-group>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

export default {
    name: 'AddTeamMember',
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            teammember: undefined,
            role: 1,
        };
    },
    methods: {
        //提交/取消表单
        handleOk() {
            if (this.teammember === undefined || this.teammember == '') {
                this.$message.error('请选择团队成员');
            } else {
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit('fetchAddTeamMember', this.teammember, this.role);
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
