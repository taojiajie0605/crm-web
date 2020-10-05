<template>
    <a-row :gutter="[32, 3]">
        <a-col :span="4">
            <!--左侧menu-->
            <a-card
                headStyle="font-weight:bold;font-size:16px;margin-left:0px;"
                bodyStyle="padding:0px;height:653px;"
            >
                <div slot="title">
                    <div class="flex" align="left" style="float: left;">
                        <a-icon
                            type="message"
                            style="
                                color: #00bfff;
                                font-size: 30px;
                                margin-right: 6px;
                            "
                        />
                        代办事项
                    </div>
                </div>
                <div>
                    <!--左侧menu内容-->
                    <a-menu
                        :style="{ height: '100%', borderRight: 0 }"
                        v-model="currentitem"
                        mode="inline"
                    >
                        <a-menu-item key="1">
                            <a-icon type="team" />
                            今日需联系客户
                        </a-menu-item>
                        <a-menu-item key="2">
                            <a-icon type="branches" />
                            分配给我的线索
                        </a-menu-item>
                        <a-menu-item key="3">
                            <a-icon type="user" />
                            分配给我的客户
                        </a-menu-item>
                        <a-menu-item key="4">
                            <a-icon type="reconciliation" />
                            待审核合同
                        </a-menu-item>
                        <a-menu-item key="5">
                            <a-icon type="money-collect" />
                            待审核回款
                        </a-menu-item>
                        <a-menu-item key="6">
                            <a-icon type="bell" />
                            待回款提醒
                        </a-menu-item>
                        <a-menu-item key="7">
                            <a-icon type="reconciliation" />
                            即将到期的合同
                        </a-menu-item>
                        <a-menu-item key="8">
                            <a-icon type="snippets" />
                            待审核发票
                        </a-menu-item>
                    </a-menu>
                </div>
            </a-card>
        </a-col>
        <a-col :span="20">
            <!--右侧table-->
            <Cust v-if="currentitem[0] === '1'" ref="Cust" />
            <Clue v-if="currentitem[0] === '2'" ref="Clue" />
            <MyCustomer v-if="currentitem[0] === '3'" ref="MyCustomer" />
            <ReviewedContract
                v-if="currentitem[0] === '4'"
                ref="ReviewedContract"
            />
            <ReviewedReturnMoney
                v-if="currentitem[0] === '5'"
                ref="ReviewedReturnMoney"
            />
            <ReturnMoneyRemained
                v-if="currentitem[0] === '6'"
                ref="ReturnMoneyRemained"
            />
            <DueContract v-if="currentitem[0] === '7'" ref="DueContract" />
            <ReviewedBill v-if="currentitem[0] === '8'" ref="ReviewedBill" />
        </a-col>
    </a-row>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import Cust from './components/TodayCustomer/Cust'; //今日需联系客户
import Clue from './components/Clue/Clue'; //分配给我的线索
import MyCustomer from './components/MyCustomer/MyCustomer'; //分配给我的客户
import ReviewedContract from './components/ReviewedContract/ReviewedContract'; //待审核合同
import ReviewedReturnMoney from './components/ReviewedReturnMoney/ReviewedReturnMoney'; //待审核回款
import ReturnMoneyRemained from './components/ReturnMoneyRemained/ReturnMoneyRemained'; //待回款提醒
import DueContract from './components/DueContract/DueContract'; //即将到期的合同
import ReviewedBill from './components/ReviewedBill/ReviewedBill'; //待审核发票

export default {
    components: {
        Cust,
        Clue,
        MyCustomer,
        ReviewedContract,
        ReviewedReturnMoney,
        ReturnMoneyRemained,
        DueContract,
        ReviewedBill,
    },

    data() {
        return {
            currentitem: ['1'], //当前的menuitem
        };
    },

    //初始查询
    mounted() {},

    methods: {},
};
</script>

<style>
.card-container {
    background: #f5f5f5;
    overflow: hidden;
    padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
    height: 120px;
    margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
    padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
    border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    border-color: transparent;
    background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
    border-color: #fff;
    background: #fff;
}

.ant-tabs-nav-scroll {
    margin-left: 20px;
}

.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
}
</style>
