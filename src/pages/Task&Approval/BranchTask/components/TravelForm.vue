<template>
    <div>
        <b>基本信息</b>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                差旅事由
                <a-input v-model="content" />
            </a-col>
            <a-col :span="12">
                报销总金额
                <a-input-number style="width: 100%;" />
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                备注
                <a-input type="textarea" v-model="detail"
            /></a-col>
        </a-row>
        <br />

        <a-row :gutter="[16, 16]" v-for="item in costDetails" :key="item">
            <a-col :span="24">
                <cost-detail
                    ref="travels"
                    @delete="removeCostDetailItem(item)"
                />
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="24">
                <a-button type="link" @click="addCostDetailItem">
                    添加事项
                </a-button>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import CostDetail from './CostDetail';

export default {
    data() {
        return {
            costDetails: [0],
            costInfo: [],
        };
    },
    components: { CostDetail },
    methods: {
        addCostDetailItem() {
            this.costDetails.push(this.costDetails.length);
        },
        removeCostDetailItem(index) {
            this.costDetails.splice(this.costDetails.indexOf(index), 1);
        },
        getContent() {
            //console.log(this.$refs.travels[0].getContent());

            for (let i = 0; i < this.costDetails.length; i++) {
                this.costInfo.push(this.$refs.travels[i].getContent());
            }

            return {
                content: this.content,
                detail: this.detail,
                cost: this.costInfo,
            };
        },
    },
};
</script>
