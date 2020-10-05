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
                                style="font-size: 14px; color: black;"
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
            <a-card :title="currentTable">
                <template v-if="currentComponent === 0">
                    <follow-setting />
                    <a-button slot="extra">保存</a-button>
                </template>
                <template v-else-if="currentComponent === 1">
                    <chance-setting ref="chance" />
                    <a-button @click="showChanceModal" slot="extra"
                        >添加商机组</a-button
                    >
                </template>
                <template v-else-if="currentComponent === 2">
                    <product-type />
                </template>
                <template v-else-if="currentComponent === 3">
                    设置提前提醒天数之后，根据合同的”合同到期时间”计算提醒时间
                    <contract-deadline />
                    <a-button slot="extra">保存</a-button>
                </template>
                <template v-else-if="currentComponent === 4">
                    <set-customer-limit ref="limit" />
                    <a-button
                        slot="extra"
                        @click="() => this.$refs.limit.showOrCloseModal()"
                        >添加规则</a-button
                    >
                </template>
                <template v-else-if="currentComponent === 5">
                    <lock-customer-limit ref="lock" />
                    <a-button
                        slot="extra"
                        @click="() => this.$refs.lock.showOrCloseModal()"
                        >添加规则</a-button
                    >
                </template>
                <template v-else-if="currentComponent === 6">
                    设置回访提醒后，到期会自动提醒，合同生效是指到达合同开始时间
                    <contract-deadline />
                    <a-button slot="extra">保存</a-button>
                </template>
                <template v-else-if="currentComponent === 7">
                    <a-row>
                        <a-col :span="24">
                            <a-alert banner>
                                <template slot="message">
                                    1、商机编号、回款编号、发票编号、回访编号的日期类型编号都从创建时间获取，合同编号的日期编号从下单时间获取，若下单时间为空，则从创建时间获取
                                    <br />
                                    2、若自动生成的编号与系统现有编号重复时，自动跳过此编号，依次往下生成
                                    <br />

                                    3、编号规则至少设置两级
                                    <br />

                                    4、文本类型的最多支持12个字符，数字类型编号起始编号位数1-9
                                </template>
                            </a-alert>
                        </a-col>
                    </a-row>
                    <number-setting title="合同编号" />
                    <number-setting title="回款编号" />
                    <number-setting title="回访编号" />
                    <number-setting title="发票编号" />
                    <a-button slot="extra">保存</a-button>
                </template>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import FollowSetting from './components/FollowSetting';
import ProductType from './components/ProductType';
import ContractDeadline from './components/ContractDeadline';
import ChanceSetting from './components/ChanceSetting';
import NumberSetting from './components/NumberSetting';
import SetCustomerLimit from './components/SetCustomerLimit';
import LockCustomerLimit from './components/LockCustomerLimit';

const source = '跟进记录类型设置 商机组设置 产品类别设置 合同到期提醒设置 拥有客户数限制 锁定客户数限制 客户回访提醒设置 编号规则设置'.split(
    ' ',
);

export default {
    name: 'BusinessSetting',
    components: {
        FollowSetting,
        ProductType,
        ContractDeadline,
        ChanceSetting,
        NumberSetting,
        SetCustomerLimit,
        LockCustomerLimit,
    },
    data() {
        return {
            currentComponent: 0,
            currentItem: -1,
            source: source,
            newTabIndex: 0,
            selectedRows: [],
            confirmLoading: false,
            currentTable: '跟进记录类型设置',
        };
    },
    methods: {
        showChanceModal() {
            this.$refs.chance.showOrCloseModal();
        },
        AddRecord() {
            this.$refs.limit.showOrCloseAddModal();
        },
        AddChanceRecord() {
            this.$refs.chance.showOrCloseAddModal();
        },
        getCurrentComponent(item) {
            this.currentComponent = item['key'];
        },
        clearMenu() {
            this.NodeTreeItem = null;
        },
        changaeTitleOfTable(e) {
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
