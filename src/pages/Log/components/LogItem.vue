<template>
    <div
        style="
            height: 320px;
            margin-bottom: 15px;
            width: 900px;
            background-color: white;
            border: 1px solid #e6e6e6;
            border-radius: 2px;
        "
    >
        <div style="padding: 10px;">
            <a-row :gutter="[16, 16]">
                <a-col :span="24">
                    <div style="display: flex; justify-content: space-between;">
                        <div>
                            <a-button size="large"> in </a-button>
                            admin 创建日志于
                        </div>
                        <div>
                            <template v-if="type === 'week'"> 周报 </template>
                            <template v-else-if="type === 'day'">
                                日报
                            </template>
                            <template v-else-if="type === 'month'">
                                月报
                            </template>
                        </div>
                    </div>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="23" :offset="1">
                    <b>本周工作内容</b>
                    <p>{{ content1 }}</p>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="23" :offset="1">
                    <b>本周工作内容</b>
                    <p>{{ content2 }}</p>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="23" :offset="1">
                    <b>本周工作内容</b>
                    <p>{{ content3 }}</p>
                </a-col>
            </a-row>
        </div>
        <div
            style="
                width: 100%;
                height: 42px;
                background-color: #f4f7ff;
                border-radius: 3px;
                border: 0px;
                display: flex;
                align-items: center;
                padding-right: 15px;
                justify-content: flex-end;
            "
        >
            <edit-form-modal ref="edit" />
            <a-button @click="showModal"> 编辑 </a-button>
            <a-divider type="vertical" />
            <a-button @click="deleteItem"> 删除 </a-button>
        </div>
    </div>
</template>
<script>
import EditFormModal from './EditFormModal';
export default {
    props: {
        type: {
            type: String,
            default: '',
        },
        content1: {
            type: String,
            default: '',
        },
        content2: {
            type: String,
            default: '',
        },
        content3: {
            type: String,
            default: '',
        },
    },
    components: {
        EditFormModal,
    },
    methods: {
        deleteItem() {
            const that = this;
            const index = this.index;
            this.$confirm({
                title: '提示',
                content: '确定要删除',
                okText: '确认',
                cancelText: '取消',
            });
        },
        showModal() {
            this.$refs.edit.showOrCloseModal();
        },
    },
};
</script>
<style lang="less" scoped>
@import '@/theme/default/style.less';
</style>
