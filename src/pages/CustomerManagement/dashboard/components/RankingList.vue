<template>
    <div style="width: 60%;">
        <a-card style="margin-right: 10px; height: 400px;">
            <!-- 排行榜标题 -->
            <div style="display: flex; justify-content: space-between;">
                <div class="titlestyle">
                    <a-icon
                        type="bar-chart"
                        style="
                            color: #4983ef;
                            font-size: 25px;
                            margin-right: 6px;
                        "
                    />
                    排行榜
                </div>
                <div>
                    <!--排行榜选择-->
                    <a-select
                        :default-value="selections[nowselect]"
                        style="width: 150px;"
                        @change="handlemoneyChange"
                    >
                        <a-select-option
                            v-for="(element, index) in selections"
                            :value="index"
                            :key="index"
                        >
                            {{ element }}
                        </a-select-option>
                    </a-select>
                </div>
            </div>
            <div style="margin-left: 10px; font-size: 12px;">
                对{{ selections[nowselect] }}进行的排行统计
            </div>
            <div style="text-align: center;" class="tabletitle">
                {{ selections[nowselect] }}排行榜
            </div>
            <RanReturnMoney
                ref="RanReturnMoney"
                v-if="nowselect === 0"
                :data="RankingList"
                style="margin-top: 10px;"
            />
            <RanContractsMoney
                ref="RanContractsMoney"
                v-else-if="nowselect === 1"
                :data="RankingList"
                style="margin-top: 10px;"
            />
            <RanContractsNum
                ref="RanContractsNum"
                v-else-if="nowselect === 2"
                :data="RankingList"
                style="margin-top: 10px;"
            />
            <RanNewCustNum
                ref="RanNewCustNum"
                v-else-if="nowselect === 3"
                :data="RankingList"
                style="margin-top: 10px;"
            />
            <RanNewContacts
                ref="RanNewContacts"
                v-else-if="nowselect === 4"
                :data="RankingList"
                style="margin-top: 10px;"
            />
            <RanNewBuop
                ref="RanNewBuop"
                v-else-if="nowselect === 5"
                :data="RankingList"
                style="margin-top: 10px;"
            />
            <RanNewBuopMoney
                ref="RanNewBuopMoney"
                v-else-if="nowselect === 6"
                :data="RankingList"
                style="margin-top: 10px;"
            />
            <RanNewFollow
                ref="RanNewFollow"
                v-else-if="nowselect === 7"
                :data="RankingList"
                style="margin-top: 10px;"
            />
        </a-card>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import RanReturnMoney from './cmpchats/RankingListCmp/RanReturnMoney'; //回款金额
import RanContractsMoney from './cmpchats/RankingListCmp/RanContractsMoney'; //回款金额
import RanContractsNum from './cmpchats/RankingListCmp/RanContractsNum'; //合同数
import RanNewCustNum from './cmpchats/RankingListCmp/RanNewCustNum'; //新增客户数
import RanNewContacts from './cmpchats/RankingListCmp/RanNewContacts'; //新增联系人
import RanNewBuop from './cmpchats/RankingListCmp/RanNewBuop'; //新增商机
import RanNewBuopMoney from './cmpchats/RankingListCmp/RanNewBuopMoney'; //新增商机金额
import RanNewFollow from './cmpchats/RankingListCmp/RanNewFollow'; //新增跟进记录数

export default {
    props: ['selectperson', 'selecttime'],
    components: {
        RanReturnMoney, //回款金额
        RanContractsMoney, //合同金额
        RanContractsNum, //合同数
        RanNewCustNum, //新增客户数
        RanNewContacts, //新增联系人
        RanNewBuop, //新增商机
        RanNewBuopMoney, //新增商机金额
        RanNewFollow, //新增跟进记录数
    },

    data() {
        return {
            nowselect: 0, //当前排行榜
            selections: [
                '回款金额',
                '合同金额',
                '合同数',
                '新增客户数',
                '新增联系人',
                '新增商机',
                '新增商机金额',
                '新增跟进记录数',
            ], //排行榜选择
            RankingList: {}, //排行请求内容(表格数据)
        };
    },

    mounted() {
        this.fetch();
    },

    methods: {
        //排行查询
        fetch() {
            this.targetmoney = {
                user: sessionStorage.userinfo, //用户信息
                selectperson: this.selectperson, //选择人员
                selecttime: this.selecttime, //选择时间
                nowselect: this.selections[this.nowselect], //排行选择
            };
            // 初始化数据
            request('/RankingList', METHOD.POST, {
                ...this.targetmoney,
            }).then((data) => {
                console.log(data.data.answer);
                this.RankingList = data.data.answer;
            });
        },

        //选择人员框改变
        handlemoneyChange(value) {
            //console.log(value);
            this.nowselect = value;
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
.tabletitle {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
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
