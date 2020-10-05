<template>
    <div class="ct-details">
        <details-information>
            <template v-slot:topTitle>
                <div class="details-info-staf"></div>
                <div class="details-info-text">基本信息</div>
            </template>
            <template v-slot:topContentLeft1>
                <div class="details-info-content">合同编号</div>
                <div class="details-info-content">合同金额</div>
                <div class="details-info-content">合同开始时间</div>
                <div class="details-info-content">备注</div>
                <div class="details-info-content">审核状态</div>
                <div class="details-info-content">客户签约人</div>
                <div class="details-info-content">客户名称</div>
            </template>
            <template v-slot:topContentLeft2>
                <div class="details-info-content">
                    {{ record.contractnumber }}
                </div>
                <div class="details-info-content">
                    {{ record.contractmoney }}
                </div>
                <div class="details-info-content">
                    {{ record.contractstarttime }}
                </div>
                <div class="details-info-content">
                    {{ record.remarks }}
                </div>
                <div class="details-info-content">
                    {{ record.auditstatus }}
                </div>
                <div class="details-info-content">
                    {{ record.custsigner }}
                </div>
                <div class="details-info-content">
                    {{ record.custname }}
                </div>
            </template>
            <template v-slot:topContentRight1>
                <div class="details-info-content">合同名称</div>
                <div class="details-info-content">下单时间</div>
                <div class="details-info-content">合同结束时间</div>
                <div class="details-info-content">负责人</div>
                <div class="details-info-content">商机名称</div>
                <div class="details-info-content">公司签约人</div>
                <div class="details-info-content">合同类型</div>
            </template>
            <template v-slot:topContentRight2>
                <div class="details-info-content">
                    {{ record.contractname }}
                </div>
                <div class="details-info-content">
                    {{ record.ordertime }}
                </div>
                <div class="details-info-content">
                    {{ record.contractendtime }}
                </div>
                <div class="details-info-content">
                    {{ record.person }}
                </div>
                <div class="details-info-content">
                    {{ record.buopname }}
                </div>
                <div class="details-info-content">
                    {{ record.compsigner }}
                </div>
                <div class="details-info-content">
                    {{ record.contracttype }}
                </div>
            </template>
            <template v-slot:bottomTitle>
                <div class="details-info-staf"></div>
                <div class="details-info-text">系统信息</div>
            </template>
            <template v-slot:bottomContentLeft1>
                <div class="details-info-content">创建人</div>
                <div class="details-info-content">更新时间</div>
                <div class="details-info-content">已收款金额</div>
            </template>
            <template v-slot:bottomContentLeft2>
                <div class="details-info-content">
                    {{ record.founder }}
                </div>
                <div class="details-info-content">
                    {{ record.updatetime }}
                </div>
                <div class="details-info-content">
                    {{ record.returnedmoney }}
                </div>
            </template>
            <template v-slot:bottomContentRight1>
                <div class="details-info-content">创建时间</div>
                <div class="details-info-content">最后跟进时间</div>
                <div class="details-info-content">未收款金额</div>
            </template>
            <template v-slot:bottomContentRight2>
                <div class="details-info-content">
                    {{ record.createtime }}
                </div>
                <div class="details-info-content">
                    {{ record.lastfollowuptime }}
                </div>
                <div class="details-info-content">
                    {{ record.unreturnedmoney }}
                </div>
            </template>
        </details-information>
    </div>
</template>

<script>
import DetailsInformation from '../components/function/DetailsInformation';
export default {
    name: 'CtDetails',
    props: ['record'],
    components: {
        DetailsInformation,
    },
};
</script>

<style>
.details-info-staf {
    height: 20px;
    width: 5px;
    border-radius: 3px;
    background-color: blue;
    display: inline-block;
}
.details-info-text {
    display: inline-block;
    padding-left: 20px;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    top: -3px;
}
.details-info-content {
    padding-top: 30px;
}
</style>
