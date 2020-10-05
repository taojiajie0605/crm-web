<template>
    <a-modal
        :visible="visible"
        @ok="showOrCloseModal"
        @cancel="showOrCloseModal"
    >
        <template slot="title">
            <b>审批通过</b>
        </template>
        <a-row>
            <a-col :span="24">
                <a-radio-group v-model="check" @change="onChange">
                    <a-radio :style="radioStyle" :value="1"> 审核结束 </a-radio>
                    <br />
                    <a-radio :style="radioStyle" :value="2">
                        <a-input />
                    </a-radio>
                </a-radio-group>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24">
                意见
                <a-input type="textarea" />
            </a-col>
        </a-row>
    </a-modal>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            check: '',
        };
    },
    methods: {
        showOrCloseModal() {
            this.visible = !this.visible;
        },
    },
};
</script>
<style scoped></style>
