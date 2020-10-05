<template>
    <!--表单-->
    <div>
        <div style="margin-top: 10px;">
            <a-alert
                :message="
                    '考勤人员：' +
                    todayclockin.attperson +
                    ' —— ' +
                    '所属部门：' +
                    todayclockin.department
                "
                type="info"
            />
        </div>
        <a-row style="margin-top: 10px;">
            <a-col :span="12">
                <a-tag color="#2db7f5" class="flex">
                    上班打卡
                </a-tag>
                <a-result
                    v-if="todayclockin.signintime"
                    title="打卡成功"
                    :sub-title="
                        '签到时间：' +
                        todayclockin.signintime +
                        ' —— ' +
                        '签到地点：' +
                        todayclockin.signinplace
                    "
                >
                    <template #icon>
                        <a-icon type="smile" theme="twoTone" />
                    </template>
                    <template #extra> </template>
                </a-result>
                <a-result v-else title="未打卡" sub-title="点击下方按钮打卡">
                    <template #icon>
                        <a-icon type="frown" theme="twoTone" />
                    </template>
                    <template #extra>
                        <a-button
                            type="primary"
                            shape="round"
                            size="small"
                            icon="check"
                            @click="handlecheck('1')"
                        >
                            上班打卡
                        </a-button>
                    </template>
                </a-result>
            </a-col>
            <a-col :span="12">
                <a-tag color="#f50" class="flex">
                    下班打卡
                </a-tag>
                <a-result
                    v-if="todayclockin.signouttime"
                    title="打卡成功"
                    :sub-title="
                        '签到时间：' +
                        todayclockin.signouttime +
                        ' —— ' +
                        '签到地点：' +
                        todayclockin.signoutplace
                    "
                >
                    <template #icon>
                        <a-icon type="smile" theme="twoTone" />
                    </template>
                    <template #extra> </template>
                </a-result>
                <a-result v-else title="未打卡" sub-title="点击下方按钮打卡">
                    <template #icon>
                        <a-icon type="frown" theme="twoTone" />
                    </template>
                    <template #extra>
                        <a-button
                            type="danger"
                            shape="round"
                            size="small"
                            icon="check"
                            style="margin-left: 10px;"
                            @click="handlecheck('2')"
                        >
                            下班打卡
                        </a-button>
                    </template>
                </a-result>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';

//表格标题
export default {
    data() {
        return {
            todayclockin: undefined,
        };
    },
    //初始查询
    mounted() {
        this.fetch({});
    },
    methods: {
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/todaycheck', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.todayclockin = data.data.todayclockin;
            });
        },

        //通过与拒绝
        handlecheck(type) {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">您确定打卡吗?</div>,
                onOk() {
                    request('/todaycheck', METHOD.POST, {
                        type: type,
                    }).then((data) => {
                        _this.$message.success(data.data.msg);
                        _this.todayclockin = data.data.todayclockin;
                    });
                },
                onCancel() {},
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
</style>
