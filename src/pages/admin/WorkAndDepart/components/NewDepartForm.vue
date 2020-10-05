<template>
    <a-modal
        title="新建部门"
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
            <a-form-item label="部门">
                <a-input
                    v-decorator="[
                        'note',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your note!',
                                },
                            ],
                        },
                    ]"
                />
            </a-form-item>
            <a-form-item label="上级部门">
                <a-select
                    v-decorator="[
                        'gender',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择上级部门!',
                                },
                            ],
                        },
                    ]"
                    placeholder="选择上级部门"
                    @change="handleSelectChange"
                >
                    <a-select-option value="male"> male </a-select-option>
                    <a-select-option value="female"> female </a-select-option>
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
