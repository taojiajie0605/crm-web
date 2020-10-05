<template>
    <a-modal
        title="新建员工"
        @ok="showOrCloseModal"
        @cancel="showOrCloseModal"
        :visible="visible"
    >
        <a-form
            :form="form"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            @submit="handleSubmit"
        >
            <a-form-item label="手机号">
                <a-input
                    placeholder="请输入手机号"
                    v-decorator="[
                        'telephone',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: '手机号码不能为空',
                                },
                            ],
                        },
                    ]"
                />
            </a-form-item>
            <a-form-item label="登录密码">
                <a-input
                    placeholder="请输入密码"
                    v-decorator="[
                        'passwd',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: '密码不能为空',
                                },
                            ],
                        },
                    ]"
                />
            </a-form-item>
            <a-form-item label="姓名">
                <a-input
                    placeholder="请输入姓名"
                    v-decorator="[
                        'name',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: '姓名不能为空',
                                },
                            ],
                        },
                    ]"
                />
            </a-form-item>
            <a-form-item label="性别">
                <a-select
                    v-decorator="[
                        'gender',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择性别',
                                },
                            ],
                        },
                    ]"
                    placeholder="请选择性别"
                    @change="handleSelectChange"
                >
                    <a-select-option value="male"> male </a-select-option>
                    <a-select-option value="female"> female </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="邮箱">
                <a-input
                    placeholder="请输入邮箱"
                    v-decorator="[
                        'telephone',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: '邮箱不能为空',
                                },
                            ],
                        },
                    ]"
                />
            </a-form-item>
            <a-form-item label="岗位">
                <a-input
                    placeholder="请输入岗位信息"
                    v-decorator="[
                        'telephone',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: '岗位不能为空',
                                },
                            ],
                        },
                    ]"
                />
            </a-form-item>
            <a-form-item label="部门">
                <a-select default-value="lucy" @change="handleChange">
                    <a-select-option value="jack"> Jack </a-select-option>
                    <a-select-option value="lucy"> Lucy </a-select-option>
                    <a-select-option value="disabled" disabled>
                        Disabled
                    </a-select-option>
                    <a-select-option value="Yiminghe">
                        yiminghe
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="角色">
                <a-select
                    placeholder="默认全公司"
                    default-value="lucy"
                    mode="tags"
                    @change="handleChange"
                >
                    <a-select-option value="jack"> Jack </a-select-option>
                    <a-select-option value="lucy"> Lucy </a-select-option>
                    <a-select-option value="disabled" disabled>
                        Disabled
                    </a-select-option>
                    <a-select-option value="Yiminghe">
                        yiminghe
                    </a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        showOrCloseModal() {
            this.visible = !this.visible;
        },
    },
};
</script>

<style></style>
