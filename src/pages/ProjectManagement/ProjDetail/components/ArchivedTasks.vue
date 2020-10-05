<template>
    <a-card>
        <div
            class="flex"
            v-for="(item, index) in archivedtask"
            :key="index"
            style="
                justify-content: space-between;
                padding: 12px;
                background: #ffffff;
                border: 1px solid #cccccc;
                margin-bottom: 10px;
                cursor: pointer;
            "
            onMouseOut="this.style.backgroundColor
                    ='#FFFFFF';"
            onMouseOver="this.style.backgroundColor
                    ='#f5f6f9';"
            @click="showdrawer()"
        >
            <a-checkbox
                :checked="item.checked"
                :style="
                    item.checked === true
                        ? 'text-decoration:line-through; color:#cccccc'
                        : ''
                "
            >
                {{ item.taskname }}
            </a-checkbox>
            <div class="flex">
                <!--该标签相关的项目的任务的标签-->
                <a-tag
                    v-for="(label, index1) in item.labels"
                    :key="index1"
                    :color="label.color"
                >
                    {{ label.title }}
                </a-tag>
                <div
                    v-if="item.relatedinfo !== ''"
                    class="flex"
                    style="margin-right: 8px;"
                >
                    <a-icon type="block" />
                    {{ item.relatedinfo }}
                </div>
                <div
                    v-if="item.subtask !== ''"
                    class="flex"
                    style="margin-right: 8px;"
                >
                    <a-icon type="fork" />
                    {{ item.subtask }}
                </div>
                <div
                    v-if="item.appendix !== ''"
                    class="flex"
                    style="margin-right: 8px;"
                >
                    <a-icon type="link" />
                    {{ item.appendix }}
                </div>
                <div
                    v-if="item.endtime !== ''"
                    :class="
                        compareDate(item.endtime) || item.checked === true
                            ? 'flex1'
                            : 'flex2'
                    "
                >
                    <a-icon type="clock-circle" />
                    <div style="margin-left: 3px;">
                        {{ item.endtime }}
                    </div>
                </div>
            </div>
        </div>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';

export default {
    data() {
        return {
            archivedtask: {}, //已归档的任务
        };
    },
    //初始查询
    mounted() {
        this.fetch({});
    },
    methods: {
        //查询已归档的任务
        fetch() {
            //console.log('params:', params);
            request('/archivedtask', METHOD.POST, {}).then((data) => {
                this.archivedtask = data.data.return;
            });
        },

        //时间比较(逾期变红)
        compareDate(d1) {
            const reg = new RegExp('-', 'g');
            //const nowtime = new Date().toLocaleString();
            //const nowtime = '2020-08-20';
            const nowtime = this.getFormatDate();
            console.log(d1, nowtime);
            return (
                new Date(d1.replace(reg, '/')) >
                new Date(nowtime.replace(reg, '/'))
            );
        },
        //获取当前时间戳
        getFormatDate() {
            const date = new Date();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            const currentDate =
                date.getFullYear() +
                '-' +
                month +
                '-' +
                strDate +
                ' ' +
                date.getHours() +
                ':' +
                date.getMinutes() +
                ':' +
                date.getSeconds();
            return currentDate;
        },

        //抽屉显示方法
        showdrawer() {
            this.$message.success('弹出右侧抽屉');
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

/*判断时间的css*/
.flex1 {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
}
.flex2 {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    color: #ff0000;
}
</style>
