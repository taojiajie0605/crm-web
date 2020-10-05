<template>
    <div class="operation-record">
        <a-timeline>
            <a-row v-for="item in operation" :key="item">
                <a-timeline-item>
                    {{ item.time }}
                    <a-icon type="bell" theme="filled" style="color: blue;" />
                    {{ item.name }}
                    {{ item.info }}
                </a-timeline-item>
            </a-row>
        </a-timeline>
    </div>
</template>

<script>
// const operationRecords = ...
import { request, METHOD } from '@/utils/request';
export default {
    name: 'OperationRecord',
    props: ['operation'],
};
</script>

<style scoped></style>
