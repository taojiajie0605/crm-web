<template>
    <div style="width: 900px;">
        <log-header />
        <log-add-bar />
        <log-list />
    </div>
</template>
<script>
import LogHeader from '../components/LogHeader';
import LogAddBar from '../components/LogAddBar';
import LogList from '../components/LogList';

export default {
    components: {
        LogHeader,
        LogAddBar,
        LogList,
    },
};
</script>
<style lang="less" scoped>
@import '@/theme/default/style.less';
</style>
