<template>
    <div>
        <a-drawer
            :title="'成员 (' + proj.projmember.length + ')'"
            placement="right"
            :closable="false"
            :visible="visible"
            @close="onClose"
        >
            <p :key="index" v-for="(element, index) in proj.projmember">
                <a-avatar
                    size="default"
                    style="background-color: #2362fb; margin-right: 10px;"
                >
                    {{ element }}
                </a-avatar>
                {{ element }}
            </p>
        </a-drawer>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'

export default {
    props: ['proj'],
    data() {
        return {
            visible: false, //点抽屉是否可见
        };
    },
    methods: {
        onClose() {
            this.visible = false;
        },
    },
};
</script>

<style lang="less" scoped></style>
