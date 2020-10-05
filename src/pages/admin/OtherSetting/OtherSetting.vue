<template>
    <a-row :gutter="[32, 8]">
        <a-col :span="5">
            <div>
                <a-menu
                    style="width: 100%; height: 800px;"
                    default-selected-keys="0"
                    mode="inline"
                    :theme="theme"
                >
                    <a-menu-item
                        v-for="(item, index) in source"
                        :key="index"
                        @click="getCurrentComponent"
                        style="height: 55px; margin: 0px;"
                    >
                        <div
                            style="
                                float: left;
                                text-align: middle;
                                padding-top: 5px;
                            "
                        >
                            <a
                                @click="changaeTitleOfTable(item)"
                                style="font-size: 16px;"
                                type="link"
                                size="large"
                                icon="mail"
                                >{{ item }}</a
                            >
                        </div>
                    </a-menu-item>
                </a-menu>
            </div>
        </a-col>
        <a-col :span="19">
            <a-card bodyStyle="padding:0px;" :title="currentTable">
                <div>
                    <template v-if="currentComponent === 0">
                        <log-welcome />
                    </template>
                    <template v-else-if="currentComponent === 1">
                        <log-rule />
                    </template>
                    <template v-else-if="currentComponent === 2">
                        <calendar-setting />
                    </template>
                    <template v-else-if="currentComponent === 3">
                        <div style="padding: 30px;">
                            是否启用活动资讯
                            <a-switch />
                        </div>
                    </template>
                </div>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import LogRule from './components/LogRule';
import LogWelcome from './components/LogWelcome';
import CalendarSetting from './components/CalendarSetting';

const source = '日志欢迎语 日志规则设置 日志类型设置 活动资讯'.split(' ');

export default {
    name: 'OtherSetting',
    // components: {StandardTable},
    components: { LogWelcome, LogRule, CalendarSetting },
    data() {
        return {
            currentComponent: 0,
            currentItem: -1,
            source: source,
            newTabIndex: 0,
            selectedRows: [],
            confirmLoading: false,
            currentTable: '日志欢迎语',
        };
    },
    methods: {
        getCurrentComponent(item) {
            this.currentComponent = item['key'];
        },
        clearMenu() {
            this.NodeTreeItem = null;
        },
        changaeTitleOfTable(e) {
            // console.log(e.target.innerHTML);
            this.currentTable = e;
        },
    },
};
</script>

<style lang="less" scoped>
.global {
    font-size: 18px;
}
</style>
