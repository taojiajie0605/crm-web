<template>
    <div>
        <a-popover v-model="visible" trigger="click">
            <tamplate slot="title">
                <div style="height: 50px; display: flex; align-items: center;">
                    <b style="font-size: 16px;">关联客户模块</b>
                </div>
            </tamplate>
        </a-popover>
    </div>
</template>
<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            visible: false,
        };
    },
    methods: {},
};
</script>

<style scoped></style>
