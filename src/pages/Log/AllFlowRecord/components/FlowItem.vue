<template>
    <div>
        <div
            style="
                margin-top: 15px;
                width: 800px;
                height: 300px;
                background-color: white;
                border: 1px solid #e6e6e6;
                border-radius: 2px;
            "
        >
            <div style="height: 253px;">
                <a-row>
                    <a-col :span="24">
                        <div
                            style="
                                width: 100%;
                                display: flex;
                                justify-content: space-between;
                                padding: 15px;
                            "
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                "
                            >
                                <a-button type="primary" shape="circle">
                                    in
                                </a-button>
                                <div style="margin-left: 10px;">
                                    {{ user }}<br />
                                    {{ date }}
                                    <a-tag>
                                        <template v-if="visit === 'telephone'">
                                            打电话
                                        </template>
                                        <template v-else-if="visit === 'email'">
                                            发邮件
                                        </template>
                                    </a-tag>
                                </div>
                            </div>
                            <div>
                                <a-icon type="container" />
                                {{ type }}-跟进记录
                                <a-dropdown>
                                    <a class="ant-dropdown-link"> ... </a>
                                    <a-menu slot="overlay">
                                        <a-menu-item>
                                            <a
                                                href="javascript:;"
                                                @click="deleteContract"
                                                >删除</a
                                            >
                                        </a-menu-item>
                                        <a-menu-item>
                                            <edit-form ref="edit" />
                                            <a
                                                href="javascript:;"
                                                @click="showEditModal"
                                                >编辑</a
                                            >
                                        </a-menu-item>
                                    </a-menu>
                                </a-dropdown>
                            </div>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <div style="padding-left: 50px;">
                            {{ message }}
                        </div>
                    </a-col>
                </a-row>
            </div>
            <div
                style="
                    width: 100%;
                    background-color: #f5f7fa;
                    height: 45px;
                    border-radius: 2px;
                    display: flex;
                    align-items: center;
                    padding-left: 15px;
                "
            >
                {{ type }}
                -ksdfsd
            </div>
        </div>
    </div>
</template>

<script>
import EditForm from './EditForm';
export default {
    props: {
        text: {
            default: '',
            type: String,
        },
        index: {
            default: -1,
            type: Number,
        },
        user: {
            type: String,
            default: '',
        },
        type: {
            default: 'contract',
            type: String,
        },
        message: {
            default: 'message',
            type: String,
        },
        date: {
            default: '',
            type: String,
        },
        visit: {
            default: '',
            type: String,
        },
    },
    components: {
        EditForm,
    },
    methods: {
        showEditModal() {
            this.$refs.edit.showOrCloseModal();
        },
        deleteContract() {
            const [index] = this.index;
            const that = this;
            this.$confirm({
                title: '提示',
                content: '确认删除',
                okText: '确认',
                cancelText: '取消',
                // onOk() {
                //     if (index != -1) {
                //         const temp =
                //             that.$store.getters['flowrecord/getFlowrecord'];
                //         console.log(temp);

                //         temp.splice(index, 1);
                //     }
                // },
            });
        },
    },
};
</script>

<style></style>
