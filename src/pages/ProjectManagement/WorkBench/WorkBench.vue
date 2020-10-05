<template>
    <a-card>
        <div slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="desktop"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                我的任务
                <a-popover>
                    <a slot="content">导出任务</a>
                    <a-icon
                        type="setting"
                        style="
                            color: #99a9bf;
                            font-size: 15px;
                            margin-left: 6px;
                        "
                    />
                </a-popover>
            </div>
        </div>
        <div style="display: flex;">
            <TaskGroup ref="TaskGroup" />
        </div>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import TaskGroup from './components/TaskGroup';
export default {
    components: { TaskGroup },
    data() {
        return {};
    },
    //初始查询
    mounted() {},
    methods: {},
};
</script>

<style scoped>
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
}
</style>
