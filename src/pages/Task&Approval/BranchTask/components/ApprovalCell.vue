<template>
    <div
        style="
            margin-top: 20px;
            width: 100%;
            background-color: white;
            border: 1px #e6e6e6 solid;
            border-radius: 3px;
        "
    >
        <a-row>
            <a-col :span="7">
                <div>
                    <div style="float: left;">
                        <a-button
                            style="margin: 20px;"
                            type="primary"
                            shape="circle"
                            size="large"
                            >in</a-button
                        >
                    </div>
                    <div style="float: left; margin-top: 20px;">
                        <span>{{ userName }}</span>
                        <span>
                            <br />
                            <small> 创建审批于</small>
                            <small>{{ createTime }} </small></span
                        >
                    </div>
                </div>
            </a-col>
            <a-col :offset="9" :span="7">
                <div
                    style="
                        display: flex;
                        justify-content: right;
                        align-items: center;
                        height: 60px;
                        width: 100%;
                    "
                >
                    {{ approvalType }}
                    <template v-if="status === 'wait'"> -审核中 </template>
                    <template v-else-if="status === 'pass'">
                        -审核通过
                    </template>
                    <template v-else-if="status === 'refuse'">
                        -审核拒绝
                    </template>
                </div>
            </a-col>
        </a-row>
        <a-row :gutter="[20, 20]">
            <a-col
                :offset="1"
                :span="22"
                style="width: 100%; display: flex; justify-content: left;"
            >
                {{ content }}
            </a-col>
        </a-row>
        <a-row :gutter="[20, 20]">
            <a-col :offset="1" :span="22">
                <div
                    style="
                        background-color: #f4f7ff;
                        width: 100%;
                        display: flex;
                        justify-content: left;
                        align-items: center;
                    "
                >
                    <a-icon
                        :type="icon"
                        style="font-size: 30px; margin: 10px;"
                        theme="filled"
                    />
                    <basic-drawer :id="id" :data="currentTask" ref="drawer" />
                    <a-button type="link" @click="showDrawer">{{
                        approvalType
                    }}</a-button>
                </div>
            </a-col>
        </a-row>
        <a-row :gutter="[20, 20]">
            <a-col
                :offset="1"
                :span="22"
                style="width: 100%; display: flex; justify-content: left;"
            >
                {{ auditor }}
                <template v-if="status === 'wait'"> -审核中 </template>
                <template v-else-if="status === 'pass'"> -审核通过 </template>
                <template v-else-if="status === 'refuse'"> -审核拒绝 </template>
            </a-col>
        </a-row>
        <a-row>
            <a-col
                :offset="1"
                :span="22"
                style="width: 100%; display: flex; justify-content: left;"
            >
                <p v-for="item in info[0]" :key="item">
                    相关客户
                    {{ item.customer }}
                </p>
            </a-col>
        </a-row>
        <a-row>
            <a-col
                :offset="1"
                :span="22"
                style="width: 100%; display: flex; justify-content: left;"
            >
                <p v-for="item in info[1]" :key="item">
                    相关联系人
                    {{ item.user }}
                </p>
            </a-col>
        </a-row>
        <a-row>
            <a-col
                :offset="1"
                :span="22"
                style="width: 100%; display: flex; justify-content: left;"
            >
                <p v-for="item in info[2]" :key="item">
                    相关商机
                    {{ item.chance }}
                </p>
            </a-col>
        </a-row>
        <a-row>
            <a-col
                :offset="1"
                :span="22"
                style="width: 100%; display: flex; justify-content: left;"
            >
                <p v-for="item in info[3]" :key="item">
                    相关合同
                    {{ item.contract }}
                </p>
            </a-col>
        </a-row>
        <a-row :gutter="[20, 20]">
            <a-col :span="24"
                ><div
                    style="
                        display: flex;
                        justify-content: right;
                        align-items: center;
                        background-color: #f4f7ff;
                        padding-right: 10px;
                        border-radius: 3px;
                        height: 42px;
                    "
                >
                    <template v-if="status === 'wait'">
                        <a-dropdown :placement="placement">
                            <a-button>...</a-button>
                            <a-menu slot="overlay">
                                <a-menu-item>
                                    <text-area-form
                                        title="撤回审批"
                                        ref="withdraw"
                                    />
                                    <a
                                        @click="onWithdraw"
                                        rel="noopener noreferrer"
                                        >撤销</a
                                    >
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                        <a-divider type="vertical" />
                        <check-form ref="check" />
                        <a-button
                            type="primary"
                            @click="onPass"
                            icon="check-circle"
                            >通过</a-button
                        >
                        <a-divider type="vertical" />
                        <a-button
                            type="danger"
                            @click="onRefuse"
                            icon="close-circle"
                            >驳回</a-button
                        >
                        <text-area-form title="审批拒绝" ref="refuse" />
                    </template>
                    <template v-else>
                        <a-button type="danger" @click="onRefuse" icon="delete"
                            >删除</a-button
                        >
                    </template>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import CheckForm from './CheckForm';
import TextAreaForm from './TextAreaForm';
import BasicDrawer from './drawer/BasicDrawer';
export default {
    props: {
        info: {
            default: () => {
                return [];
            },
            type: Array,
        },
        userName: {
            default: '',
            type: String,
        },
        approvalType: {
            default: '',
            type: String,
        },
        createTime: {
            default: '',
            type: String,
        },
        content: {
            default: '',
            type: String,
        },
        icon: {
            default: '',
            type: String,
        },
        auditor: {
            default: '',
            type: String,
        },
        id: {
            default: '',
            type: String,
        },
        status: {
            default: 'wait',
            type: String,
        },
    },
    components: {
        CheckForm,
        TextAreaForm,
        BasicDrawer,
    },
    methods: {
        onPass() {
            this.$refs.check.showOrCloseModal();
        },
        onRefuse() {
            this.$refs.refuse.showOrCloseModal();
        },
        onWithdraw() {
            this.$refs.withdraw.showOrCloseModal();
        },
        showDrawer() {
            this.$refs.drawer.showOrCloseDrawer();
        },
    },
};
</script>
<style scoped></style>
