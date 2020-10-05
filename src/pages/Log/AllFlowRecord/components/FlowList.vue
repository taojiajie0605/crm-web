<template>
    <div>
        <div v-for="item in flowRecord" :key="item">
            <flow-item
                :user="item.user"
                :id="index"
                :type="item.type"
                :message="item.message"
                :date="item.date"
                :visit="item.visited"
            />
        </div>
    </div>
</template>

<script>
import FlowItem from './FlowItem';
export default {
    data() {
        return {
            flowRecord: [],
        };
    },
    components: {
        FlowItem,
    },
    mounted() {
        this.flowRecord = this.$store.getters['flowrecord/getFlowrecord'];
    },
    methods: {},
};
</script>

<style></style>
