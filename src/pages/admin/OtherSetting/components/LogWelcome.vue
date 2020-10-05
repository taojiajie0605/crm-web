<template>
    <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
            <a-alert
                message="以下内容为系统默认欢迎语，在日志随机展示，可自定义更改欢迎语"
                banner
            />
        </a-form-item>
        <a-form-item
            v-for="(k, index) in form.getFieldValue('keys')"
            :key="k"
            v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
            :label="index === 0 ? '欢迎语' : ''"
            :required="false"
        >
            <a-input
                v-decorator="[
                    `names[${k}]`,
                    {
                        validateTrigger: ['change', 'blur'],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: '请输入欢迎语',
                            },
                        ],
                    },
                ]"
                placeholder="欢迎语"
                style="width: 60%; margin-right: 8px;"
            />
            <a-icon
                v-if="form.getFieldValue('keys').length > 1"
                class="dynamic-delete-button"
                type="minus-circle-o"
                :disabled="form.getFieldValue('keys').length === 1"
                @click="() => remove(k)"
            />
        </a-form-item>
        <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="dashed" style="width: 60%;" @click="add">
                <a-icon type="plus" />添加欢迎语
            </a-button>
        </a-form-item>
        <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
    </a-form>
</template>

<script>
let id = 0;
export default {
    data() {
        return {
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 4 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 20 },
                },
            },
            formItemLayoutWithOutLabel: {
                wrapperCol: {
                    xs: { span: 24, offset: 0 },
                    sm: { span: 20, offset: 4 },
                },
            },
        };
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'dynamic_form_item' });
        this.form.getFieldDecorator('keys', {
            initialValue: [],
            preserve: true,
        });
    },
    methods: {
        remove(k) {
            const { form } = this;
            // can use data-binding to get
            const keys = form.getFieldValue('keys');
            // We need at least one passenger
            if (keys.length === 1) {
                return;
            }

            // can use data-binding to set
            form.setFieldsValue({
                keys: keys.filter((key) => key !== k),
            });
        },

        add() {
            const { form } = this;
            // can use data-binding to get
            const keys = form.getFieldValue('keys');
            const nextKeys = keys.concat(id++);
            // can use data-binding to set
            // important! notify form to detect changes
            form.setFieldsValue({
                keys: nextKeys,
            });
        },

        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    const { keys, names } = values;
                    console.log('Received values of form: ', values);
                    console.log(
                        'Merged values:',
                        keys.map((key) => names[key]),
                    );
                }
            });
        },
    },
};
</script>
<style>
.dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
}
.dynamic-delete-button:hover {
    color: #777;
}
.dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>
