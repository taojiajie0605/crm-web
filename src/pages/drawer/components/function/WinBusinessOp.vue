<template>
    <div class="win-business-op">
        <a-row>
            <a-popover title="验证客户">
                <template slot="content" placement="bottom">
                    <p>赢单率 20%</p>
                </template>
                <a-button
                    class="win-business-op-btn"
                    :type="isComplete >= 1 ? 'primary' : 'default'"
                    @click="showEnterStage('验证客户', 1)"
                >
                    验证客户
                </a-button>
            </a-popover>
            <a-popover title="需求分析">
                <template slot="content" placement="bottom">
                    <p>赢单率 30%</p>
                </template>
                <a-button
                    class="win-business-op-btn"
                    :type="isComplete >= 2 ? 'primary' : 'default'"
                    @click="showEnterStage('需求分析', 2)"
                >
                    需求分析
                </a-button>
            </a-popover>
            <a-popover title="方案/报价">
                <template slot="content" placement="bottom">
                    <p>赢单率 80%</p>
                </template>
                <a-button
                    class="win-business-op-btn"
                    :type="isComplete >= 3 ? 'primary' : 'default'"
                    @click="showEnterStage('方案报价', 3)"
                >
                    方案/报价
                </a-button>
            </a-popover>
            <a-popover title="结束">
                <template slot="content" placement="bottom">
                    <p>赢单率 20%</p>
                </template>
                <a-button
                    class="win-business-op-btn"
                    :type="isComplete >= 4 ? 'primary' : 'default'"
                    @click="showFinalStage"
                >
                    验证客户
                </a-button>
            </a-popover>
        </a-row>
        <a-modal
            title="提示"
            :visible="visible"
            @ok="handleOk(index)"
            @cancel="handleCancel"
        >
            确定要进入{{ modalcontent }}阶段吗？
        </a-modal>
        <a-modal
            title="结果"
            :visible="finalvisible"
            @ok="handleOkFinal"
            @cancel="handleCancel"
            okText="赢单"
            cancelText="无效"
        >
            是否赢得该订单？
        </a-modal>
    </div>
</template>

<script>
export default {
    name: 'WinBusinessOp',
    props: ['propcomplete'], //从外部传入当前商机的进度
    data() {
        return {
            stage: 1,
            isComplete: 1,
            visible: false,
            finalvisible: false,
            modalcontent: '',
            currentIndex: 1,
        };
    },
    methods: {
        showEnterStage(e, index) {
            this.visible = true;
            this.modalcontent = e;
            this.currentIndex = index;
        },
        showFinalStage() {
            this.finalvisible = true;
            this.currentIndex = 4;
        },
        handleOk(index) {
            this.visible = false;
            this.isComplete = this.currentIndex;
            this.$message.success('已完成操作');
        },
        handleOkFinal() {
            this.finalvisible = false;
            this.isComplete = this.currentIndex;
            this.$message.success('已完成操作');
        },
        handleCancel() {
            this.visible = false;
            this.finalvisible = false;
            this.$message.info('已取消操作');
        },
    },
};
</script>

<style scoped>
.win-business-op-btn {
    margin-right: 5px;
}
</style>
