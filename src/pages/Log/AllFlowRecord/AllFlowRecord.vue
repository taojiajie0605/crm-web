<template>
    <div
        id="tabs"
        style="width: 800px; display: flex; justify-content: space-between;"
    >
        <a-tabs
            default-active-key="1"
            type="line"
            @change="callback"
            tabBarStyle="background-color:white;"
        >
            <a-tab-pane key="1" tab="全部">
                <div style="background-color: white;">
                    <div
                        style="
                            background-color: white;
                            padding-left: 10px;
                            border: 1px solid #e6e6e6;
                            border-radius: 2px;
                            width: 900px;
                            height: 50px;
                            display: flex;
                            align-items: center;
                        "
                    >
                        <a-input placeholder="关键字搜索" style="width: 200px;">
                            <a-icon slot="prefix" type="search" />
                        </a-input>
                        <a-divider type="vertical" />
                        <a-input style="width: 200px;" />
                        <a-divider type="vertical" />
                        <a-select default-value="lucy" style="width: 120px;">
                            <a-select-option value="jack">
                                今天
                            </a-select-option>
                            <a-select-option value="lucy">
                                昨天
                            </a-select-option>
                            <a-select-option value="disabled">
                                本周
                            </a-select-option>
                            <a-select-option value="Yiminghe">
                                上周
                            </a-select-option>
                        </a-select>
                        <a-divider type="vertical" />
                        <a-select default-value="all" style="width: 80px;">
                            <a-select-option value="all">
                                全部
                            </a-select-option>
                            <a-select-option value="thread">
                                线索
                            </a-select-option>
                            <a-select-option value="customer">
                                客户
                            </a-select-option>
                            <a-select-option value="linkman">
                                联系人
                            </a-select-option>
                            <a-select-option value="chance">
                                商机
                            </a-select-option>
                            <a-select-option value="contract">
                                合同
                            </a-select-option>
                        </a-select>
                        <a-divider type="vertical" />
                        <a-select style="width: 80px;" default-value="all">
                            <a-select-option value="all">
                                全部
                            </a-select-option>
                            <a-select-option value="flow">
                                跟进记录
                            </a-select-option>
                            <a-select-option value="sign">
                                外勤签到
                            </a-select-option>
                        </a-select>
                    </div>
                </div>
                <div>
                    <flow-list />
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="我创建的" force-render>
                <div style="background-color: white;">
                    <div
                        style="
                            background-color: white;
                            padding-left: 10px;
                            border: 1px solid #e6e6e6;
                            border-radius: 2px;
                            width: 900px;
                            height: 50px;
                            display: flex;
                            align-items: center;
                        "
                    >
                        <a-input placeholder="" style="width: 200px;">
                            <a-icon slot="prefix" type="search" />
                        </a-input>
                        <a-divider type="vertical" />
                        <a-select default-value="lucy" style="width: 120px;">
                            <a-select-option value="jack">
                                今天
                            </a-select-option>
                            <a-select-option value="lucy">
                                昨天
                            </a-select-option>
                            <a-select-option value="disabled">
                                本周
                            </a-select-option>
                            <a-select-option value="Yiminghe">
                                上周
                            </a-select-option>
                        </a-select>
                        <a-divider type="vertical" />
                        <a-select default-value="all" style="width: 80px;">
                            <a-select-option value="all">
                                全部
                            </a-select-option>
                            <a-select-option value="thread">
                                线索
                            </a-select-option>
                            <a-select-option value="customer">
                                客户
                            </a-select-option>
                            <a-select-option value="linkman">
                                联系人
                            </a-select-option>
                            <a-select-option value="chance">
                                商机
                            </a-select-option>
                            <a-select-option value="contract">
                                合同
                            </a-select-option>
                        </a-select>
                        <a-divider type="vertical" />
                        <a-select style="width: 80px;" default-value="all">
                            <a-select-option value="all">
                                全部
                            </a-select-option>
                            <a-select-option value="flow">
                                跟进记录
                            </a-select-option>
                            <a-select-option value="sign">
                                外勤签到
                            </a-select-option>
                        </a-select>
                    </div>
                </div>
                <div>
                    <flow-list />
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="我属下创建的">
                <div style="background-color: white;">
                    <div
                        style="
                            background-color: white;
                            padding-left: 10px;
                            border: 1px solid #e6e6e6;
                            border-radius: 2px;
                            width: 900px;
                            height: 50px;
                            display: flex;
                            align-items: center;
                        "
                    >
                        <a-input placeholder="关键字搜索" style="width: 200px;">
                            <a-icon slot="prefix" type="search" />
                        </a-input>
                        <a-divider type="vertical" />
                        <a-input style="width: 200px;" />
                        <a-divider type="vertical" />
                        <a-select default-value="lucy" style="width: 120px;">
                            <a-select-option value="jack">
                                今天
                            </a-select-option>
                            <a-select-option value="lucy">
                                昨天
                            </a-select-option>
                            <a-select-option value="disabled">
                                本周
                            </a-select-option>
                            <a-select-option value="Yiminghe">
                                上周
                            </a-select-option>
                        </a-select>
                        <a-divider type="vertical" />
                        <a-select default-value="all" style="width: 80px;">
                            <a-select-option value="all">
                                全部
                            </a-select-option>
                            <a-select-option value="thread">
                                线索
                            </a-select-option>
                            <a-select-option value="customer">
                                客户
                            </a-select-option>
                            <a-select-option value="linkman">
                                联系人
                            </a-select-option>
                            <a-select-option value="chance">
                                商机
                            </a-select-option>
                            <a-select-option value="contract">
                                合同
                            </a-select-option>
                        </a-select>
                        <a-divider type="vertical" />
                        <a-select style="width: 80px;" default-value="all">
                            <a-select-option value="all">
                                全部
                            </a-select-option>
                            <a-select-option value="flow">
                                跟进记录
                            </a-select-option>
                            <a-select-option value="sign">
                                外勤签到
                            </a-select-option>
                        </a-select>
                    </div>
                </div>
                <div>
                    <flow-list />
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import FlowList from './components/FlowList';
export default {
    components: {
        FlowList,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
<style></style>
