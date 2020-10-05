<template>
    <div>
        <div v-for="(item, index) in tasks" :key="item">
            <sub-task-item
                ref="subtask"
                :content="item"
                @delete="removeSubTask(index)"
            />
        </div>

        <a-button @click="addSubTask" type="link" icon="plus">子任务</a-button>
    </div>
</template>

<script>
import SubTaskItem from './SubTaskItem';

export default {
    components: {
        SubTaskItem,
    },
    data() {
        return {
            text: 'sdkfj',
            tasks: ['sdkfj', 'sdkfj'],
        };
    },
    methods: {
        addSubTask() {
            this.tasks.push('点击编辑输入文本');
        },
        removeSubTask(index) {
            this.tasks.splice(index, 1);
        },
    },
};
</script>

<style></style>
