<template>
    <div>
        <a-button
            type="primary"
            shape="round"
            size="small"
            icon="edit"
            @click="handleEdit"
        >
            编辑
            <EditLabel
                ref="EditLabel"
                :editlabel="editlabel"
                @fetchEditLabel="fetchEditLabel"
            />
        </a-button>
        <a-button
            type="danger"
            shape="round"
            size="small"
            icon="delete"
            style="margin-left: 10px;"
            @click="handleDelete"
        >
            删除
        </a-button>
        <!--该标签相关的项目及任务-->
        <a-collapse :bordered="false" style="margin-top: 10px;">
            <template #expandIcon="props">
                <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
            </template>
            <!--该标签相关的项目-->
            <a-collapse-panel
                :key="index"
                v-for="(column, index) in currentlabelproj"
                style="
                    background: #f7f7f7;
                    border-radius: 4px;
                    margin-bottom: 24px;
                    border: 0;
                    overflow: hidden;
                "
            >
                <div slot="header">
                    <div class="flex" style="justify-content: left !important;">
                        <a-icon
                            type="pic-left"
                            :style="'margin-right: 8px; color:' + column.color"
                        />
                        {{ column.title }}
                    </div>
                </div>
                <!--该标签相关的项目的任务-->
                <div
                    class="flex"
                    v-for="(item, index1) in column.content"
                    :key="index1"
                    style="
                        justify-content: space-between;
                        padding: 12px;
                        background: #ffffff;
                        border: 1px solid #cccccc;
                        margin-top: 10px;
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
                            v-for="(label, index2) in item.labels"
                            :key="index2"
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
                                compareDate(item.endtime) ||
                                item.checked === true
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
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import EditLabel from './cmp/EditLabel'; //编辑标签

export default {
    components: { EditLabel },
    props: ['label'],
    data() {
        return {
            editlabel: {}, //切断标签vue绑定

            currentlabelproj: {}, //当前标签关联的项目及任务展示
        };
    },
    //初始查询
    mounted() {
        this.fetch({});
    },
    methods: {
        //查询该标签下的项目
        fetch() {
            //console.log('params:', params);
            request('/projlabel', METHOD.POST, {
                label: this.label,
            }).then((data) => {
                this.currentlabelproj = data.data.return;
            });
        },
        //页面刷新方法
        handleRefresh() {
            //console.log("323658556");
            this.fetch({
                lable: this.label,
            });
        },

        //编辑弹出框方法
        handleEdit() {
            this.$refs.EditLabel.visible = true;
            this.editlabel = JSON.parse(JSON.stringify(this.label));
        },
        //编辑子调用方法
        fetchEditLabel(lable) {
            request('/Editlabel', METHOD.POST, {
                lable: lable,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.$emit('onselectlables'); //刷新tabs的标签
            });
        },

        //点击删除
        handleDelete() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定删除该标签吗?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchDelete();
                },
                onCancel() {},
            });
        },
        //删除标签调用方法
        fetchDelete() {
            request('/deletelabel', METHOD.POST, {
                lable: this.lable,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.$emit('onselectlables'); //刷新tabs的标签
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
