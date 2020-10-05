<template>
    <a-card>
        <div slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="pic-left"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                项目
            </div>
        </div>
        <a-tabs default-active-key="1">
            <a-tab-pane
                forceRender="true"
                key="1"
                :tab="'全部项目 (' + allprojnumber + ')'"
            >
                <CardList ref="CardList" @Changeallnumber="Changeallnumber" />
            </a-tab-pane>
            <a-tab-pane
                forceRender="true"
                key="2"
                :tab="'我关注的 (' + myconcernsnumber + ')'"
            >
                <MyConcerns ref="MyConcerns" @Changemynumber="Changemynumber" />
            </a-tab-pane>
        </a-tabs>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import CardList from './components/CardList'; //全部项目
import MyConcerns from './components/MyConcerns'; //我关注的
export default {
    components: { CardList, MyConcerns },
    data() {
        return {
            allprojnumber: 0, //全部项目个数
            myconcernsnumber: 0, //我关注的个数
        };
    },
    //初始查询
    mounted() {},
    methods: {
        Changeallnumber(number) {
            this.allprojnumber = number;
        },
        Changemynumber(number) {
            this.myconcernsnumber = number;
        },
    },
    //删除项目返回后监听
    watch: {
        $route: {
            immediate: true,
            handler(route) {
                //console.log('12545');
                if (this.$route.query.back == 1) {
                    //console.log(this.$refs.CardList.dataSource);
                    this.$refs.CardList.opppp();
                    this.$refs.MyConcerns.opppp();
                }
            },
        },
    },
};
</script>

<style scoped>
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
}
</style>
