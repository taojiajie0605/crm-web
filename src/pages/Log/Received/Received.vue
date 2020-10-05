<template>
    <div style="width: 900px;">
        <log-header />
        <log-list />
    </div>
</template>
<script>
import LogHeader from '../components/LogHeader';
import LogList from '../components/LogList';

export default {
    created: {
        router() {
            console.log(this.$route.path);
        },
    },
    watch: {
        $route(to, from) {
            console.log(this.$route.path);
        },
    },
    components: {
        LogHeader,
        LogList,
    },
};
</script>
<style scoped></style>
