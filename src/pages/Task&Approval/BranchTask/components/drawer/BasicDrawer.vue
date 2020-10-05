<template>
    <div>
        <a-drawer
            width="1000"
            placement="right"
            :closable="false"
            :visible="visible"
            :after-visible-change="afterVisibleChange"
            @close="onClose"
        >
            <div style="margin-bottom: 20px;">
                <a-icon :type="currentTask.icon" style="font-size: 30px;" />
                <b style="font-size: 20px;">{{ currentTask.type }}</b>
            </div>

            <template v-if="currentTask.icon === 'folder'">
                <div>
                    <approval-detail :item="currentTask.matter" />
                </div>
            </template>
            <template v-else-if="currentTask.icon === 'skin'">
                <div>
                    <leave-request :item="currentTask.matter" />
                </div>
            </template>
            <template v-else-if="currentTask.icon === 'shop'">
                <div>
                    <borrow :item="currentTask.matter" />
                </div>
            </template>
            <template v-else-if="currentTask.icon === 'tablet'">
                <div>
                    <overtime :item="currentTask.matter" />
                </div>
            </template>
            <template v-else-if="currentTask.icon === 'switcher'">
                <div>
                    <evection :item="currentTask.matter" />
                </div>
            </template>
            <template v-else-if="currentTask.icon === 'wallet'">
                <div>
                    <travel :item="currentTask.matter" />
                </div>
            </template>

            <template
                v-if="
                    currentTask.info[0].length !== 0 ||
                    currentTask.info[1].length !== 0 ||
                    currentTask.info[2].length !== 0 ||
                    currentTask.info[3].length !== 0
                "
            >
                <a-row :gutter="[16, 16]">
                    <a-col :span="24">
                        <span style="font-size: 18px;"><b>相关信息</b></span>
                        <br />
                        <div
                            class="detail-info"
                            v-for="item in currentTask.info[0]"
                            :key="item"
                        >
                            {{ item.customer }}
                        </div>
                        <div
                            class="detail-info"
                            v-for="item in currentTask.info[1]"
                            :key="item"
                        >
                            {{ item.user }}
                        </div>
                        <div
                            class="detail-info"
                            v-for="item in currentTask.info[2]"
                            :key="item"
                        >
                            {{ item.chance }}
                        </div>
                        <!-- {{ currentTask.info }} -->
                        <!-- {{ currentTask.info[0].length }} -->
                        <!-- {{ currentTask.info[1].length }}
                    {{ currentTask.info[2].length }}
                    {{ currentTask.info[3].length }} -->
                    </a-col>
                </a-row>
            </template>
            <div class="bottom-cell">
                <a-row>
                    <a-col :span="24">
                        <div
                            style="
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                padding: 10px;
                            "
                        >
                            <div>
                                <a-icon
                                    style="font-size: 25px;"
                                    :type="currentTask.icon"
                                />
                                <b>审批流信息</b>
                            </div>

                            <div>
                                <a-button
                                    type="primary"
                                    icon="close-circle"
                                    @click="onPass"
                                    >通过</a-button
                                >
                                <check-form ref="pass" />
                                <a-divider type="vertical" />
                                <a-button
                                    type="danger"
                                    icon="check-circle"
                                    @click="onRefuse"
                                    >拒绝</a-button
                                >
                                <text-area-form title="审批拒绝" ref="refuse" />
                                <a-divider type="vertical" />
                                <a-button @click="onWithdraw" icon="undo"
                                    >撤回</a-button
                                >
                                <text-area-form
                                    title="撤回审批"
                                    ref="withdraw"
                                />
                            </div>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="24">
                        <div style="padding: 10px;">
                            <a-icon type="plus-circle" />
                            {{ currentTask.name }} 创建 >
                            <a-icon type="up-circle" />
                            {{ currentTask.auditor }} 通过 拒绝 待审批
                        </div>
                    </a-col>
                </a-row>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import TextAreaForm from '../TextAreaForm';
import CheckForm from '../CheckForm';
import ApprovalDetail from './ApprovalDetail';
import LeaveRequest from './LeaveRequest';
import Borrow from './Borrow';
import Evection from './Evection';
import Overtime from './Overtime';
import Travel from './Travel';

export default {
    components: {
        LeaveRequest,
        TextAreaForm,
        CheckForm,
        ApprovalDetail,
        Borrow,
        Overtime,
        Evection,
        Travel,
    },
    props: {
        id: {
            default: '',
            type: String,
        },
        data: {
            type: Object,
            default() {
                return {
                    content: '',
                    detail: '',
                };
            },
        },
    },
    data() {
        return {
            visible: false,
            currentTask: {},
            taskDetail: this.$store.getters['task/getTaskById'](this.id)[0],
        };
    },
    methods: {
        onWithdraw() {
            this.$refs.withdraw.showOrCloseModal();
        },
        onRefuse() {
            this.$refs.refuse.showOrCloseModal();
        },
        onPass() {
            this.$refs.pass.showOrCloseModal();
            console.log(this.currentTask.info);
        },
        afterVisibleChange(val) {},
        showOrCloseDrawer() {
            this.visible = !this.visible;
            [this.currentTask] = this.$store.getters['task/getTaskById'](
                this.id,
            );
        },
        onClose() {
            this.visible = false;
        },
    },
};
</script>
<style scoped>
.detail-info {
    width: 100%;
    padding: 5px;
    background-color: #f8faff;
    border-radius: 2px;
    margin-bottom: 10px;
}
.ant-drawer-mask {
    background-color: transparent;
}
.bottom-cell {
    border-radius: 3px;
    margin-top: 20px;
    border: 1px #d9d9d9 solid;
    height: 100px;
    width: 100%;
}
</style>
