<template>
    <div style="width: 40%;">
        <a-card style="margin-left: 10px; height: 400px;">
            <!-- 数据汇总 -->
            <div>
                <div class="titlestyle" style="width: 100%;">
                    <a-icon
                        type="stock"
                        style="
                            color: #bf80ff;
                            font-size: 25px;
                            margin-right: 6px;
                        "
                    />
                    数据汇总
                </div>
                <div style="font-size: 12px;">
                    对于数据收集统计的汇总
                </div>
            </div>
            <div
                style="
                    height: 300px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                "
            >
                <div class="contentfont" style="margin: 10px 0 0 10px;">
                    <div>
                        客户汇总
                    </div>
                    <span>
                        新增
                        <span class="titlefont">{{
                            dataSummery.cust.newadd
                        }}</span>
                        个客户，转成交客户
                        <span class="titlefont">{{
                            dataSummery.cust.turndeal
                        }}</span>
                        个
                    </span>
                    <a-divider dashed />
                </div>
                <div class="contentfont" style="margin-left: 10px;">
                    <div>
                        跟进汇总
                    </div>
                    <span>
                        跟进客户
                        <span class="titlefont">{{
                            dataSummery.follow.custfollow
                        }}</span>
                        个，新增客户中未跟进
                        <span class="titlefont">{{
                            dataSummery.follow.uncustfollow
                        }}</span>
                        个
                    </span>
                    <a-divider dashed />
                </div>
                <div class="contentfont" style="margin-left: 10px;">
                    <div>
                        商机汇总
                    </div>
                    <span>
                        新增
                        <span class="titlefont">{{
                            dataSummery.buop.newadd
                        }}</span>
                        个商机，商机总金额
                        <span class="titlefont">{{
                            dataSummery.buop.totalmoney
                        }}</span>
                        元，赢单商机
                        <span class="titlefont">{{
                            dataSummery.buop.winbuop
                        }}</span>
                        个
                    </span>
                    <a-divider dashed />
                </div>
                <div class="contentfont" style="margin-left: 10px;">
                    <div>
                        跟进汇总
                    </div>
                    <span>
                        跟进客户
                        <span class="titlefont">{{
                            dataSummery.follow.custfollow
                        }}</span>
                        个，新增客户中未跟进
                        <span class="titlefont">{{
                            dataSummery.follow.uncustfollow
                        }}</span>
                        个
                    </span>
                    <a-divider dashed />
                </div>
                <div class="contentfont" style="margin-left: 10px;">
                    <div>
                        跟进汇总
                    </div>
                    <span>
                        跟进客户
                        <span class="titlefont">{{
                            dataSummery.follow.custfollow
                        }}</span>
                        个，新增客户中未跟进
                        <span class="titlefont">{{
                            dataSummery.follow.uncustfollow
                        }}</span>
                        个
                    </span>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';

export default {
    props: ['selectperson', 'selecttime'],
    data() {
        return {
            dataSummery: {},
        };
    },
    components: {},

    mounted() {
        this.fetch();
    },

    methods: {
        //数据汇总查询
        fetch() {
            //console.log('params:', params);
            request('/dataSummery', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                selectperson: this.selectperson, //选择人员
                selecttime: this.selecttime, //选择时间
            }).then((data) => {
                //console.log('data:', data);
                this.dataSummery = data.data.answer;
            });
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
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
}
.titlefont {
    font-size: 20px;
    font-weight: 700;
}
.contentfont {
    color: rgba(0, 0, 0, 0.85);
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

//重写分割线样式
.ant-divider-horizontal {
    margin: 5px;
}
</style>
