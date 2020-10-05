<template>
    <div class="details-info">
        <details-information>
            <template v-slot:topTitle>
                <div class="details-info-staf"></div>
                <div class="details-info-text">基本信息</div>
            </template>
            <template v-slot:topContentLeft1>
                <div class="details-info-content">客户来源</div>
                <div class="details-info-content">客户级别</div>
                <div class="details-info-content">手机</div>
                <div class="details-info-content">网址</div>
                <div class="details-info-content">下次联系时间</div>
                <div class="details-info-content">负责人</div>
                <div class="details-info-content">地区定位</div>
            </template>
            <template v-slot:topContentLeft2>
                <div class="details-info-content">
                    {{ record.custsource }}
                </div>
                <div class="details-info-content">
                    {{ record.custlevel }}
                </div>
                <div class="details-info-content">
                    {{ record.telephone }}
                </div>
                <div class="details-info-content">
                    {{ record.website }}
                </div>
                <div class="details-info-content">
                    {{ record.nexttime }}
                </div>
                <div class="details-info-content">
                    {{ record.person }}
                </div>
                <div class="details-info-content">
                    {{ record.areaposition }}
                </div>
            </template>
            <template v-slot:topContentRight1>
                <div class="details-info-content">客户行业</div>
                <div class="details-info-content">客户名称</div>
                <div class="details-info-content">电话</div>
                <div class="details-info-content">邮箱</div>
                <div class="details-info-content">备注</div>
            </template>
            <template v-slot:topContentRight2>
                <div class="details-info-content">
                    {{ record.custindustry }}
                </div>
                <div class="details-info-content">
                    {{ record.custname }}
                </div>
                <div class="details-info-content">
                    {{ record.phone }}
                </div>
                <div class="details-info-content">
                    {{ record.email }}
                </div>
                <div class="details-info-content">
                    {{ record.remarks }}
                </div>
            </template>
            <template v-slot:bottomTitle>
                <div class="details-info-staf"></div>
                <div class="details-info-text">系统信息</div>
            </template>
            <template v-slot:bottomContentLeft1>
                <div class="details-info-content">负责人获取客户时间</div>
                <div class="details-info-content">创建人</div>
                <div class="details-info-content">更新时间</div>
                <div class="details-info-content">成交状态</div>
            </template>
            <template v-slot:bottomContentLeft2>
                <div class="details-info-content">
                    {{ record.createtime }}
                </div>
                <div class="details-info-content">
                    {{ record.founder }}
                </div>
                <div class="details-info-content">
                    {{ record.updatetime }}
                </div>
                <div class="details-info-content">
                    {{ record.transactionstate === 1 ? '完成' : '未完成' }}
                </div>
            </template>
            <template v-slot:bottomContentRight1>
                <div class="details-info-content">最后跟进记录</div>
                <div class="details-info-content">创建时间</div>
                <div class="details-info-content">最后跟进时间</div>
            </template>
            <template v-slot:bottomContentRight2>
                <div class="details-info-content">
                    {{ record.lastrecord }}
                </div>
                <div class="details-info-content">
                    {{ record.createtime }}
                </div>
                <div class="details-info-content">
                    {{ record.lasttime }}
                </div>
            </template>
        </details-information>
    </div>
</template>

<script>
import DetailsInformation from '../../components/function/DetailsInformation';
export default {
    name: 'DetailsInfo',
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
