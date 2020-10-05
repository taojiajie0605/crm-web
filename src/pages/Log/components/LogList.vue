<template>
    <div>
        <div
            style="
                background-color: white;
                margin-top: 15px;
                padding-left: 10px;
                border: 1px solid #e6e6e6;
                border-radius: 2px;
                width: 900px;
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            "
        >
            <div>
                <template v-if="path === '/c/a' || path === '/c/c'">
                    <a-input style="width: 200px;" />
                    <a-divider type="vertical" />
                </template>
                <a-select default-value="today" style="width: 120px;">
                    <a-select-option value="today"> 今天 </a-select-option>
                    <a-select-option value="yesterday"> 昨天 </a-select-option>
                    <a-select-option value="week"> 本周 </a-select-option>
                    <a-select-option value="lastweek"> 上周 </a-select-option>
                </a-select>
                <a-divider type="vertical" />
                <a-select
                    @change="searchInType"
                    v-model="type"
                    style="width: 80px;"
                    default-value="all"
                >
                    <a-select-option value="all"> 全部 </a-select-option>
                    <a-select-option value="week"> 周报 </a-select-option>
                    <a-select-option value="day"> 日报 </a-select-option>
                    <a-select-option value="month"> 月报 </a-select-option>
                </a-select>
                <a-divider type="vertical" />
                <a-input style="width: 200px;">
                    <a-icon slot="prefix" type="search" />
                </a-input>
            </div>
            <div style="margin-right: 10px;">
                已筛选出{{ count }}项
                <a-button> 导出 </a-button>
            </div>
        </div>
        <div style="margin-top: 15px;">
            <div v-for="item in logs" :key="item">
                <log-item
                    :type="item.type"
                    :content1="item.content1"
                    :content2="item.content2"
                    :content3="item.content3"
                />
            </div>
        </div>
    </div>
</template>
<script>
import LogItem from './LogItem';
export default {
    prpos: {
        disableUserSelect: {
            default: 'true',
            type: Boolean,
        },
    },
    data() {
        return {
            type: 'all',
            logs: [],
            path: '',
        };
    },
    mounted() {
        this.logs = this.$store.getters['logs/getLogs'];
    },
    computed: {
        count: function () {
            return this.logs.length;
        },
    },
    watch: {
        $route(to, from) {
            this.path = this.$route.path;
        },
    },
    components: {
        LogItem,
    },
    methods: {
        searchInType() {
            const type = this.type;
            if (type === 'all') this.logs = this.$store.getters['logs/getLogs'];
            else
                this.logs = this.$store.getters['logs/getLogs'].filter(
                    (value) => value.type === type,
                );
        },
    },
};
</script>
<style lang="less" scoped>
@import '@/theme/default/style.less';
</style>
