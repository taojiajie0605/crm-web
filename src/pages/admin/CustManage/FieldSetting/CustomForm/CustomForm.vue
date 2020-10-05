<template>
    <div style="background-color: white;">
        <k-form-design
            @save="handleSvae"
            showToolbarsText
            toolbarsTop
            :toolbars="['save', 'preview']"
            :fields="[
                'input',
                'textarea',
                'select',
                'checkbox',
                'number',
                'radio',
                'date',
                'time',
                'uploadFile',
                'uploadImg',
            ]"
            :title="'编辑' + record.mode + '字段'"
        >
            <template slot="right-action">
                <a-button type="primary" @click="close">返回 </a-button>
            </template>
        </k-form-design>
    </div>
</template>
<script>
export default {
    props: ['record'],
    data() {
        return {};
    },
    methods: {
        handleSvae(values) {
            console.log(values);
        },

        //关闭编辑
        close() {
            console.log('55555');
            this.$emit('close');
        },
    },
};
</script>
