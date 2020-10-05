<template>
    <div>
        <a-modal
            v-model="visible"
            :title="(methods === 'edit' ? '编辑' : '新增') + '审批流程'"
            width="900px"
            :maskStyle="{ 'background-color': '#fff' }"
            :bodyStyle="{ height: '600px' }"
        >
            <a-form
                :form="form"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
            >
                <div v-if="isVisibleLastPage">
                    <a-form-item label="审批流名称">
                        <a-input v-model="form.approvalName" />
                    </a-form-item>
                    <a-form-item label="关联对象">
                        <a-select default-value="lucy" style="width: 120px;">
                            <a-select-option value="jack">
                                合同
                            </a-select-option>
                            <a-select-option value="lucy">
                                回款
                            </a-select-option>
                            <a-select-option value="disabled">
                                发票
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="应用部门" help="（默认全公司）">
                        <a-tree-select
                            show-search
                            style="width: 100%;"
                            :value="form.scope"
                            :dropdown-style="{
                                maxHeight: '400px',
                                overflow: 'auto',
                            }"
                            placeholder="Please select"
                            allow-clear
                            multiple
                            tree-default-expand-all
                            @change="onChange"
                            @search="onSearch"
                            @select="onSelect"
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
                    <a-form-item
                        label="流程说明"
                        help="（请填写相关注意事项，方便员工在申请时查阅，限制输入300字）"
                    >
                        <a-input
                            type="textarea"
                            v-model="form.remarks"
                            row="5"
                        />
                    </a-form-item>
                </div>
                <div v-else>
                    <a-radio-group
                        v-model="form.approvalType"
                        @change="onChange"
                    >
                        <a-radio :value="1"> 固定审批流 </a-radio>
                        <br />
                        <div
                            v-for="(item, index) in roleFlow"
                            :key="index"
                            style="margin: 10px 0;"
                        >
                            <span>第{{ index + 1 }}级：</span>
                            <a-select style="width: 25%;" v-model="item.name">
                                <a-select-option value="负责人主管">
                                    负责人主管
                                </a-select-option>
                                <a-select-option value="指定用户（任意一人）">
                                    指定用户（任意一人）
                                </a-select-option>
                                <a-select-option value="指定用户（多人会签）">
                                    指定用户（多人会签）
                                </a-select-option>
                                <a-select-option
                                    value="上一级审批人主管"
                                    v-if="
                                        index === 0 ||
                                        roleFlow[index - 1].name ===
                                            '负责人主管' ||
                                        roleFlow[index - 1].name ===
                                            '上一级审批人主管'
                                    "
                                >
                                    上一级审批人主管
                                </a-select-option>
                            </a-select>
                            <a-select
                                v-model="item.person"
                                mode="tag"
                                v-if="item.name === '指定用户（任意一人）'"
                                style="width: 30%; margin-left: 10px;"
                                placeholder="选择员工"
                            >
                                <a-select-option
                                    v-for="i in 25"
                                    :key="(i + 9).toString(36) + i"
                                >
                                    {{ (i + 9).toString(36) + i }}
                                </a-select-option>
                            </a-select>
                            <a-select
                                v-model="item.person"
                                mode="tags"
                                v-if="item.name === '指定用户（多人会签）'"
                                style="width: 30%; margin-left: 10px;"
                                placeholder="选择员工"
                            >
                                <a-select-option
                                    v-for="i in 25"
                                    :key="(i + 9).toString(36) + i"
                                >
                                    {{ (i + 9).toString(36) + i }}
                                </a-select-option>
                            </a-select>
                            <a-button
                                v-if="roleFlow.length > 1"
                                type="link"
                                @click="delRoleFlow(index)"
                                >删除</a-button
                            >
                        </div>
                        <a-button type="link" @click="addRoleFlow"
                            >+添加审批层次</a-button
                        >
                        <br />
                        <div
                            style="
                                background-color: #fff7df;
                                margin: 10px 0;
                                padding: 10px;
                            "
                        >
                            <span style="color: red;">*</span
                            >当选择“负责人主管”审批时。系统仅会通知负责人主管。<br />
                            <span style="color: red;">*</span
                            >当选择多个“指定用户”审批时。如果指定用户没有权限查看对应的合同，系统会通知其审批，但是他无法查看此数据信息。<br />
                            <span style="color: red;">*</span
                            >当选择“指定用户（任意一人）”表示指定用户中任意一人审批即可。当选择“指定用户（多人会签）”表示
                            指定用户中所有人都要审批。<br />
                        </div>
                        <a-radio :value="2"> 授权审批人 </a-radio>
                    </a-radio-group>
                </div>
            </a-form>
            <template slot="footer">
                <a-button
                    v-if="isVisibleLastPage"
                    @click="isVisibleLastPage = false"
                    >下一页</a-button
                >
                <a-button
                    v-if="!isVisibleLastPage"
                    @click="isVisibleLastPage = true"
                    >上一页</a-button
                >
                <a-button
                    v-if="!isVisibleLastPage"
                    type="primary"
                    @click="submit"
                    >保存</a-button
                >
                <a-button @click="visible = false">取消</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: 'AddForm',
    props: ['form', 'methods'],
    data() {
        return {
            visible: false,
            isVisibleLastPage: true,
            selectData: [
                { label: '负责人主管', value: 1 },
                { label: '指定用户（任意一人）', value: 2 },
                { label: '指定用户（多人会签）', value: 3 },
                { label: '上一级审批人主管', value: 4 },
            ],
            roleFlow: [
                {
                    name: '负责人主管',
                    person: '留',
                },
            ], // 角色流
        };
    },
    methods: {
        submit() {
            alert('提交');
        },
        addRoleFlow() {
            this.roleFlow.push({ name: '负责人主管' });
        },
        delRoleFlow(index) {
            if (this.roleFlow.length > 1) {
                this.roleFlow.splice(index, 1);
            }
        },
        onChange(value) {
            console.log(value);
            this.form.scope = value;
        },
        onSearch() {
            console.log(...arguments);
        },
        onSelect() {
            console.log(...arguments);
        },
    },
};
</script>

<style lang="less" scoped></style>
