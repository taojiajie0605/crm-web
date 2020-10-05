<template>
    <div style="width: 40%;">
        <a-card style="margin-left: 10px; height: 400px;">
            <!-- 遗忘提醒 -->
            <div>
                <div class="titlestyle" style="width: 100%;">
                    <a-icon
                        type="bell"
                        style="
                            color: #ff8400;
                            font-size: 25px;
                            margin-right: 6px;
                        "
                    />
                    遗忘提醒
                </div>
                <div style="font-size: 12px;">
                    对一段时间内未联系的客户进行分类汇总
                </div>
                <!-- 遗忘提醒 -->
                <div
                    style="
                        display: flex;
                        flex-wrap: wrap;
                        width: 100%;
                        margin-top: 10px;
                    "
                >
                    <div
                        :key="index"
                        v-for="(element, index) in forgettingreminder"
                        style="width: 50%;"
                    >
                        <div
                            class="style1 font"
                            style="margin: 10px; height: 80px;"
                        >
                            <div style="margin: 10px;">
                                <div style="width: 100%;">
                                    {{ element.time }}未联系的客户
                                </div>
                                <div style="width: 100%;">
                                    <span class="fontnum">{{
                                        element.num
                                    }}</span>
                                    <span
                                        style="
                                            font-size: 15px;
                                            font-weight: 600;
                                        "
                                    >
                                        个</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
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
            forgettingreminder: [], //遗忘提醒内容
        };
    },
    components: {},

    mounted() {
        this.fetch();
    },

    methods: {
        //遗忘提醒查询
        fetch() {
            //console.log('params:', params);
            request('/forgettingreminder', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                selectperson: this.selectperson, //选择人员
                selecttime: this.selecttime, //选择时间
            }).then((data) => {
                //console.log('data:', data);
                this.forgettingreminder = data.data.answer;
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
    color: #2362fb;
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
