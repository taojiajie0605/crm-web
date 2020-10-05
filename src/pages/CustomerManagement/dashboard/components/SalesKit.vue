<template>
    <div>
        <!-- 销售简报标题 -->
        <div class="titlestyle">
            <a-icon
                type="area-chart"
                style="color: #27ba4a; font-size: 25px; margin-right: 6px;"
            />
            销售简报
        </div>
        <!-- 销售简报循序 -->
        <div style="display: flex; flex-wrap: wrap; width: 100%;">
            <div
                :key="index"
                v-for="(element, index) in saleskit"
                style="width: 25%;"
            >
                <div class="style1" style="margin: 10px; height: 80px;">
                    <div class="flex">
                        <a-avatar
                            size="large"
                            :src="
                                require('@/assets/img/iconcust/' +
                                    element.imgname +
                                    '.png')
                            "
                        />
                        <a-col style="margin-left: 10px;">
                            <div class="font">
                                {{ element.salename }}
                            </div>
                            <div class="fontnum">
                                {{ element.salenum }}
                            </div>
                        </a-col>
                        <div class="flex" style="margin-right: 10px;">
                            <a-divider type="vertical" style="height: 30px;" />
                            <a-col>
                                <div class="font">
                                    {{ element.comparetime }}
                                </div>
                                <div class="font" style="color: #2bbf24;">
                                    {{ element.comparenum }}%
                                </div>
                            </a-col>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';

export default {
    props: ['selectperson', 'selecttime'],
    data() {
        return {
            saleskit: [], //销售简报数据
        };
    },

    mounted() {
        this.fetch();
    },

    methods: {
        //销售简报查询
        fetch() {
            //console.log('params:', params);
            request('/saleskit', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                selectperson: this.selectperson, //选择人员
                selecttime: this.selecttime, //选择时间
            }).then((data) => {
                //console.log('data:', data);
                this.saleskit = data.data.answer;
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
