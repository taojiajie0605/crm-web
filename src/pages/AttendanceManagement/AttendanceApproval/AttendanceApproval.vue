<template>
    <a-card>
        <div slot="title" class="flex1">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="deployment-unit"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                考勤审批
            </div>
            <div>
                <a-dropdown>
                    <a-menu slot="overlay">
                        <a-menu-item @click="handleaddone">
                            请假审批
                            <!--新建请假审批弹出框-->
                            <OneAddForm
                                ref="OneAddForm"
                                :form="record"
                                @fetchadd="fetchaddone"
                            />
                        </a-menu-item>
                        <a-menu-item @click="handleaddtwo">
                            出差审批
                            <!--新建出差审批弹出框-->
                            <TwoAddForm
                                ref="TwoAddForm"
                                :form="record"
                                @fetchadd="fetchaddtwo"
                            />
                        </a-menu-item>
                        <a-menu-item @click="handleaddthree">
                            加班审批
                            <!--新建加班审批弹出框-->
                            <ThreeAddForm
                                ref="ThreeAddForm"
                                :form="record"
                                @fetchadd="fetchaddthree"
                            />
                        </a-menu-item>
                    </a-menu>
                    <a-button type="primary">
                        新建审批
                        <a-icon type="down" />
                    </a-button>
                </a-dropdown>
            </div>
        </div>
        <a-select
            v-model="select"
            style="width: 200px; margin-bottom: 10px;"
            @change="handleSelectChange"
        >
            <a-select-option value="1"> 我提交的 </a-select-option>
            <a-select-option value="2"> 待我审批 </a-select-option>
            <a-select-option value="3"> 全部 </a-select-option>
        </a-select>
        <div v-if="select === '1'">
            <MyAtt ref="MyAtt" />
        </div>
        <div v-if="select === '2'">
            <MyAppro ref="MyAppro" />
        </div>
        <div v-if="select === '3'">
            <AllAtt ref="AllAtt" />
        </div>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import MyAtt from './components/MyAtt'; //我提交的
import MyAppro from './components/MyAppro'; //待我审批
import AllAtt from './components/AllAtt'; //全部
import OneAddForm from './components/OneAddForm'; //新建请假审批
import TwoAddForm from './components/TwoAddForm'; //新建出差审批
import ThreeAddForm from './components/ThreeAddForm'; //新建加班审批
export default {
    components: {
        MyAtt,
        MyAppro,
        AllAtt,
        OneAddForm,
        TwoAddForm,
        ThreeAddForm,
    },
    data() {
        return {
            select: '1', //选择器
            record: undefined, //以备编辑用
        };
    },
    //初始查询
    mounted() {},
    methods: {
        //选择框改变
        handleSelectChange(value) {
            //console.log(value);
            this.select = value;
            //console.log(this.select);
        },

        //点击新建请假审批
        handleaddone() {
            this.record = {};
            //console.log('11111111111');
            this.$refs.OneAddForm.visible = true;
            //console.log('this.$refs.CustAddForm.visible',this.$refs.CustAddForm[0].visible);
        },
        fetchaddone(params = {}) {
            //console.log('params:', params);
            request('/newatt', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.$message.success(data.data.msg);
                if (this.select === '1') {
                    this.$refs.MyAtt.refreshone();
                } else {
                    //console.log('11111111111111111');
                    this.select = '1';
                }
            });
        },

        //点击新建出差审批
        handleaddtwo() {
            this.record = {};
            //console.log('11111111111');
            this.$refs.TwoAddForm.visible = true;
            //console.log('this.$refs.CustAddForm.visible',this.$refs.CustAddForm[0].visible);
        },
        fetchaddtwo(params = {}) {
            //console.log('params:', params);
            request('/newatt', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.$message.success(data.data.msg);
                if (this.select === '1') {
                    this.$refs.MyAtt.refreshtwo();
                } else {
                    //console.log('11111111111111111');
                    this.select = '1';
                }
            });
        },

        //点击新建加班审批
        handleaddthree() {
            this.record = {};
            //console.log('11111111111');
            this.$refs.ThreeAddForm.visible = true;
            //console.log('this.$refs.CustAddForm.visible',this.$refs.CustAddForm[0].visible);
        },
        fetchaddthree(params = {}) {
            //console.log('params:', params);
            request('/newatt', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.$message.success(data.data.msg);
                if (this.select === '1') {
                    this.$refs.MyAtt.refreshthree();
                } else {
                    //console.log('11111111111111111');
                    this.select = '1';
                }
            });
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
.flex1 {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: space-between;
}
</style>
