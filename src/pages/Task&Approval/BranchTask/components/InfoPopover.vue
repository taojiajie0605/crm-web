<template>
    <div>
        <a-popover
            trigger="click"
            destroyTooltipOnHide="true"
            :visible="popoverVisible"
        >
            <taemplate slot="title">
                <div style="height: 50px; display: flex; align-items: center;">
                    <b style="font-size: 16px;">关联相关信息</b>
                </div>
            </taemplate>
            <template slot="content">
                <div style="border: 1px #d9d9d9 solied;">
                    <a-tabs default-active-key="1" tab-position="left">
                        <a-tab-pane key="1" tab="客户">
                            <customer ref="customer" />
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="联系人">
                            <linkman ref="linkman" />
                        </a-tab-pane>
                        <a-tab-pane key="3" tab="商机">
                            <chance ref="chance" />
                        </a-tab-pane>
                        <a-tab-pane key="4" tab="合同">
                            <contract ref="contract" />
                        </a-tab-pane>
                        <div style="float: right;">
                            <a-button @click="showOrClosePopover">
                                取消
                            </a-button>
                            <a-divider type="vertical" />
                            <a-button type="primary" @click="onClick">
                                确定
                            </a-button>
                        </div>
                    </a-tabs>
                </div>
            </template>
            <a-button
                icon="plus"
                @click="showOrClosePopover"
                size="small"
                :type="type"
                shape="round"
            >
                关联业务
            </a-button>
        </a-popover>
        <div>
            <div
                style="
                    margin: 10px;
                    display: flex;
                    padding: 5px;
                    padding-left: 10px;
                    padding-right: 10px;
                    justify-content: space-between;
                    width: 99%;
                    background-color: #f8faff;
                    border-radius: 3px;
                "
                v-for="(item, index) in customerResult"
                :key="item"
            >
                <div>
                    相关客户-
                    {{ item.customer }}
                </div>
                <div><a @click="onCancelRelation(index)">取消关联</a></div>
            </div>
            <div
                style="
                    margin: 10px;
                    display: flex;
                    padding: 5px;
                    padding-left: 10px;
                    padding-right: 10px;
                    justify-content: space-between;
                    width: 100%;
                    background-color: #f8faff;
                    border-radius: 3px;
                "
                v-for="(item, index) in linkmanResult"
                :key="item"
            >
                <div>
                    相关联系人-
                    {{ item.user }}
                </div>
                <div><a @click="onCancelRelation(index)">取消关联</a></div>
            </div>
            <div
                style="
                    margin: 10px;
                    display: flex;
                    padding: 5px;
                    padding-left: 10px;
                    padding-right: 10px;
                    justify-content: space-between;
                    width: 100%;
                    background-color: #f8faff;
                    border-radius: 3px;
                "
                v-for="(item, index) in chanceResult"
                :key="item"
            >
                <div>
                    相关商机-
                    {{ item.chance }}
                </div>
                <div><a @click="onCancelRelation(index)">取消关联</a></div>
            </div>
            <div
                style="
                    margin: 10px;
                    display: flex;
                    padding: 5px;
                    padding-left: 10px;
                    padding-right: 10px;
                    justify-content: space-between;
                    width: 100%;
                    background-color: #f8faff;
                    border-radius: 3px;
                "
                v-for="(item, index) in contractResult"
                :key="item"
            >
                <div>
                    相关合同-
                    {{ item.contract }}
                </div>
                <div><a @click="onCancelRelation(index)">取消关联</a></div>
            </div>
        </div>
    </div>
</template>
<script>
import Customer from './InfoTable/Customer';
import Linkman from './InfoTable/Linkman';
import Chance from './InfoTable/Chance';
import Contract from './InfoTable/Contract';
export default {
    components: {
        Customer,
        Linkman,
        Chance,
        Contract,
    },
    props: {
        type: {
            default: '',
            type: String,
        },
    },
    data() {
        return {
            popoverVisible: false,
            customerResult: [],
            linkmanResult: [],
            chanceResult: [],
            contractResult: [],
        };
    },
    methods: {
        onClick() {
            this.customerResult = this.$refs.customer.getSelectItem();
            this.linkmanResult = this.$refs.linkman.getSelectItem();
            this.chanceResult = this.$refs.chance.getSelectItem();
            this.contractResult = this.$refs.contract.getSelectItem();
            // console.log(this.customerResult);
            //    console.log(this.popoverVisible);
            this.popoverVisible = false;
        },
        getCurrentInfo() {
            let result = new Array();
            result = [
                [...this.customerResult],
                [...this.linkmanResult],
                [...this.chanceResult],
                [...this.contractResult],
            ];
            this.customerResult.splice(0, this.customerResult.length);
            this.linkmanResult.splice(0, this.linkmanResult.length);
            this.chanceResult.splice(0, this.chanceResult.length);
            this.contractResult.splice(0, this.chanceResult.length);
            return result;
        },
        showOrClosePopover() {
            this.popoverVisible = !this.popoverVisible;
        },
        closePopover() {
            this.popoverVisible = false;
        },
        onCancelRelation(index) {
            const that = this;
            this.$confirm({
                title: '提示',
                content: (h) => <div style="color:red;">确认取消关联</div>,
                class: 'test',
                onOk() {
                    that.customerResult.splice(index, 1);
                },
                onCancel() {},
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import '@/theme/default/style.less';
</style>
