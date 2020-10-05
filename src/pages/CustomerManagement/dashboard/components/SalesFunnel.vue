<template>
    <div style="width: 60%;">
        <a-card style="margin-right: 10px; height: 400px;">
            <!-- 销售漏斗 -->
            <div style="display: flex; justify-content: space-between;">
                <div class="titlestyle">
                    <a-icon
                        type="funnel-plot"
                        style="
                            color: #50cf9e;
                            font-size: 25px;
                            margin-right: 6px;
                        "
                    />
                    销售漏斗 (商机组：{{ selections[nowselect] }})
                </div>
                <div>
                    <!--合同金额/回款金额选择-->
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
            <SalesFunnelChart
                ref="SalesFunnelChart"
                style="margin-top: 10px;"
            />
        </a-card>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import SalesFunnelChart from './cmpchats/SalesFunnelChart'; //销售漏斗图

export default {
    props: ['selectperson', 'selecttime'],
    components: {
        SalesFunnelChart, //销售漏斗图
    },

    data() {
        return {
            nowselect: '0', //当前商机组
            selections: ['销售流程商机组', '其他商机组'], //商机组选择
        };
    },

    mounted() {
        this.fetch();
    },

    methods: {
        //销售简报查询
        fetch() {
            this.targetmoney = {
                user: sessionStorage.userinfo, //用户信息
                selectperson: this.selectperson, //选择人员
                selecttime: this.selecttime, //选择时间
                nowselect: this.selections[this.nowselect], //合同and回款选择
            };
            // 初始化数据
            request('/SalesFunnel', METHOD.POST, {
                ...this.targetmoney,
            }).then((data) => {
                console.log(data.data.answer);
                this.$refs.SalesFunnelChart.getChartData(data.data.answer);
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
