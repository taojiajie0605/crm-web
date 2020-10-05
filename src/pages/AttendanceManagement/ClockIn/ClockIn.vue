<template>
    <a-card>
        <template slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="file-done"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                考勤打卡
            </div>
        </template>
        <a-select
            :default-value="select"
            style="width: 200px;"
            @change="handleSelectChange"
        >
            <a-select-option value="1"> 今日打卡 </a-select-option>
            <a-select-option value="2"> 我的历史打卡 </a-select-option>
        </a-select>
        <div v-if="select === '1'">
            <Today ref="Today" />
        </div>
        <div v-if="select === '2'">
            <MyHistory ref="MyHistory" />
        </div>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import Today from './components/Today'; //今日打卡
import MyHistory from './components/MyHistory'; //我的历史打卡

export default {
    components: {
        MyHistory,
        Today,
    },
    data() {
        return {
            select: '1', //选择器
        };
    },
    //初始查询
    mounted() {},
    methods: {
        //选择框改变
        handleSelectChange(value) {
            //console.log(value);
            this.select = value;
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
