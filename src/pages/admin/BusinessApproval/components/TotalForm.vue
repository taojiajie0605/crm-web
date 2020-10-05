<template>
    <a-drawer
        :closable="false"
        :keyboard="true"
        width="500px"
        placement="right"
        :visible="totalVisible"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
    >
        <div>
            <div style="color: #000;">
                <span>{{ form.approvalName }}</span>
                <a-button type="link" @click="onDelete(form.id)"
                    ><a-icon type="delete"
                /></a-button>
            </div>
            <div class="status">
                <span style="display: inline-block;"
                    >状态：{{ form.status }}</span
                >
                <a-switch
                    :checked="form.status === 1 ? true : false"
                    @change="switchOnChange(form)"
                />
            </div>
            <div class="head">
                <a-icon type="caret-right" />
                基本信息
            </div>
            <div class="list">
                <div class="item">
                    <span class="title">审批名称</span
                    ><span class="content">{{ form.approvalName }}</span>
                </div>
                <div class="item">
                    <span class="title">适用范围</span
                    ><span class="content">{{ form.scope }}</span>
                </div>
                <div class="item">
                    <span class="title">审批说明</span
                    ><span class="content">{{ form.remarks }}</span>
                </div>
            </div>
            <div class="head">
                <a-icon type="caret-right" />
                流程
            </div>
            <div>
                <span style="color: #000;">{{ form.approvalType }}</span>
            </div>
        </div>
    </a-drawer>
</template>

<script>
export default {
    name: 'TotalForm',
    props: ['form'],
    data() {
        return {
            totalVisible: false,
        };
    },
    methods: {
        onDelete(id) {
            this.$emit('onDelete', id);
            this.totalVisible = false;
        },
        afterVisibleChange(val) {
            console.log('visible', val);
        },
        onClose() {
            this.totalVisible = false;
        },
        switchOnChange(record) {
            console.log(record);
            this.$emit('onEditStatus', record);
        },
    },
};
</script>

<style lang="less" scoped>
.status {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head {
    font-weight: bold;
    color: #000;
    margin: 20px 0 10px 0;
}
.list {
    .item {
        padding: 5px 0;
        .title {
            display: inline-block;
            width: 30%;
        }
        .content {
            color: #000;
        }
    }
}
</style>
