<template>
    <div class="analysis">
        <!-- 两个筛选 -->
        <div style="display: flex; align-items: center;">
            <!--人员选择-->
            <a-select
                :default-value="selectperson"
                style="width: 200px;"
                @change="handlepersonChange"
            >
                <a-select-option value="1"> 本部门及下属部门 </a-select-option>
                <a-select-option value="2"> 本部门 </a-select-option>
                <a-select-option value="3"> 本人及下属 </a-select-option>
                <a-select-option value="4"> 本人 </a-select-option>
            </a-select>
            <!--时间选择-->
            <a-select
                :default-value="selecttime"
                style="width: 200px; margin-left: 10px;"
                @change="handletimeChange"
            >
                <a-select-option value="1"> 今天 </a-select-option>
                <a-select-option value="2"> 昨天 </a-select-option>
                <a-select-option value="3"> 本周 </a-select-option>
                <a-select-option value="4"> 上周 </a-select-option>
                <a-select-option value="5"> 本月 </a-select-option>
                <a-select-option value="6"> 上月 </a-select-option>
                <a-select-option value="7"> 本季度 </a-select-option>
            </a-select>
        </div>
        <!-- 销售简报 -->
        <a-card style="margin-top: 10px;">
            <SalesKit
                ref="SalesKit"
                :selectperson="selectperson"
                :selecttime="selecttime"
            />
        </a-card>
        <!-- 合同金额 and 数据汇总 -->
        <a-row style="margin-top: 20px;" class="flexspace">
            <ContractsMoney
                ref="ContractsMoney"
                :selectperson="selectperson"
                :selecttime="selecttime"
            />
            <DataSummery
                ref="DataSummery"
                :selectperson="selectperson"
                :selecttime="selecttime"
            />
        </a-row>
        <!-- 销售漏斗 and 业绩指标 -->
        <a-row style="margin-top: 20px;" class="flexspace">
            <SalesFunnel
                ref="SalesFunnel"
                :selectperson="selectperson"
                :selecttime="selecttime"
            />
            <Kpi
                ref="Kpi"
                :selectperson="selectperson"
                :selecttime="selecttime"
            />
        </a-row>
        <!-- 排行榜 and 遗忘提醒 -->
        <a-row style="margin-top: 20px;" class="flexspace">
            <RankingList
                ref="RankingList"
                :selectperson="selectperson"
                :selecttime="selecttime"
            />
            <ForgettingReminder
                ref="ForgettingReminder"
                :selectperson="selectperson"
                :selecttime="selecttime"
            />
        </a-row>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import SalesKit from './components/SalesKit'; //销售简报
import ContractsMoney from './components/ContractsMoney'; //合同金额
import DataSummery from './components/DataSummery'; //数据汇总
import ForgettingReminder from './components/ForgettingReminder'; //遗忘提醒
import Kpi from './components/Kpi'; //业绩指标
import RankingList from './components/RankingList'; //排行榜
import SalesFunnel from './components/SalesFunnel'; //销售漏斗

export default {
    name: 'Analysis',
    components: {
        ContractsMoney,
        DataSummery,
        ForgettingReminder,
        Kpi,
        RankingList,
        SalesFunnel,
        SalesKit,
    },
    data() {
        return {
            selectperson: '1', //选择人员
            selecttime: '5', //选择时间
        };
    },

    mounted() {
        this.fetch();
    },

    methods: {
        //选择人员框改变
        handlepersonChange(value) {
            //console.log(value);
            this.selectperson = value;
            this.fetch();
        },
        //选择时间框改变
        handletimeChange(value) {
            //console.log(value);
            this.selecttime = value;
            this.fetch();
        },
    },
};
</script>

<style lang="less" scoped>
.titlestyle {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    float: left;
    margin-left: 10px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
}
.flexspace {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
}
.font {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
}
.fontnum {
    font-size: 22px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 700;
}
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    margin: 10px;
}
// 框样式
.style1 {
    border: 1px solid #96c2f1;
    border-radius: 10px 10px 10px 10px;
    box-shadow: 5px 5px 5px #ccc;
}
</style>
