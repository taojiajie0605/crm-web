<template>
    <a-tabs
        :tabBarGutter="0"
        :default-active-key="tabdata[0]"
        @change="callback"
    >
        <a-tab-pane :key="tabdata[0]">
            <span slot="tab">
                <div class="flex" align="left" style="float: left;">
                    <a-icon
                        type="team"
                        style="font-size: 30px; color: rgb(0, 0, 256);"
                    />
                    {{ tabdata[0] }}
                </div>
            </span>
            <Cust ref="Cust" :currenttabdata="currenttabdata" />
        </a-tab-pane>
        <a-tab-pane :key="tabdata[1]">
            <span slot="tab">
                <div class="flex" align="left" style="float: left;">
                    <a-icon
                        type="cloud"
                        style="font-size: 30px; color: rgb(24, 144, 255);"
                    />
                    {{ tabdata[1] }}
                </div>
            </span>
            <Sea ref="Sea" :currenttabdata="currenttabdata" />
        </a-tab-pane>
        <a-tab-pane :key="tabdata[2]">
            <span slot="tab">
                <div class="flex" align="left" style="float: left;">
                    <a-icon
                        type="compass"
                        style="font-size: 30px; color: rgb(250, 173, 20);"
                    />
                    {{ tabdata[2] }}
                </div>
            </span>
            <Map ref="Map" :currenttabdata="currenttabdata" />
        </a-tab-pane>
    </a-tabs>
</template>

<script>
import Cust from './components/Cust';
import Sea from './components/Sea';
import Map from './components/Map';
//tab标题
const tabdata = ['客户', '公海', '客户搜索'];

export default {
    name: 'Customer',
    components: {
        Cust,
        Sea,
        Map,
    },
    data() {
        return {
            tabdata: tabdata, //走马灯内容
            currenttabdata: tabdata[0], //当前走马灯
        };
    },
    //初始查询
    mounted() {},
    methods: {
        //点击当前tabs
        callback(key) {
            this.currenttabdata = key;
            //console.log(this.currenttabdata);
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
