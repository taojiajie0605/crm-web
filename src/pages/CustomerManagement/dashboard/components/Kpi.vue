<template>
    <div style="width: 40%;">
        <a-card style="height: 400px; margin-left: 10px;">
            <!-- 目标及完成情况标题 -->
            <div style="display: flex; justify-content: space-between;">
                <div class="titlestyle">
                    <a-icon
                        type="pie-chart"
                        style="
                            color: #4983ef;
                            font-size: 25px;
                            margin-right: 6px;
                        "
                    />
                    业绩指标完成率 (
                    <div v-if="selectmoney === '1'">
                        合同金额
                    </div>
                    <div v-else>
                        回款金额
                    </div>
                    )
                </div>
                <div>
                    <!--合同金额/回款金额选择-->
                    <a-select
                        :default-value="selectmoney"
                        style="width: 100px;"
                        @change="handlemoneyChange"
                    >
                        <a-select-option value="1"> 合同金额 </a-select-option>
                        <a-select-option value="2"> 回款金额 </a-select-option>
                    </a-select>
                </div>
            </div>
            <KpiChart ref="KpiChart" style="margin-top: 10px;" />
        </a-card>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import KpiChart from './cmpchats/KpiChart'; //业绩指标完成率图

export default {
    components: {
        KpiChart, //业绩指标完成率图
    },
    props: ['selectperson', 'selecttime'],
    data() {
        return {
            selectmoney: '1', //合同and回款选择
            targetmoney: {}, //业绩指标完成率图请求内容
        };
    },

    mounted() {
        this.fetch();
    },

    methods: {
        //业绩指标完成率查询
        fetch() {
            this.targetmoney = {
                user: sessionStorage.userinfo, //用户信息
                selectperson: this.selectperson, //选择人员
                selecttime: this.selecttime, //选择时间
                selectmoney: this.selectmoney, //合同and回款选择
            };
            this.$refs.KpiChart.getChartData(this.targetmoney);
        },

        //选择人员框改变
        handlemoneyChange(value) {
            //console.log(value);
            this.selectmoney = value;
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
