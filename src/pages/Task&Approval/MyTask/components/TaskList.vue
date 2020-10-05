<template>
    <div>
        <div style="overflow-y: auto; height: 450px;">
            <task-cell ref="taskList" />
        </div>
        <task-add ref="taskAdd" @save="taskListAddCell" />
    </div>
</template>

<script>
import TaskCell from './TaskCell';
import TaskAdd from './TaskAdd';
export default {
    components: {
        TaskCell,
        TaskAdd,
    },
    data() {
        return {};
    },
    methods: {
        taskListAddCell() {
            const item = this.$refs.taskAdd.getCurrentCell();
            this.$refs.taskList.addRow(item);
        },
    },
};
</script>
<style scoped></style>
