<template>
    <div class="activities">
        <!-- 第一行是插槽，动态决定每个页面按钮数量 -->
        <a-row align="left">
            <slot name="acBtnRow"></slot>
        </a-row>
        <a-row class="blank" />
        <a-row>
            <a-col :span="8" />
            <a-col :span="6" align="right">
                <a-input-search placeholder="关键字搜索" />
            </a-col>
            <a-col :span="4" align="right">
                <a-select
                    default-value="all"
                    @change="handleChange"
                    style="width: 100px;"
                >
                    <a-select-option value="all">全部</a-select-option>
                    <a-select-option value="last7">最近7天</a-select-option>
                    <a-select-option value="last30">最近30天</a-select-option>
                    <a-select-option value="last60">最近60天</a-select-option>
                </a-select>
            </a-col>
            <a-col :span="6" align="right">
                <slot name="changecata"></slot>
            </a-col>
        </a-row>
        <div class="blank"></div>
        <div>
            <slot name="acDate"></slot>
        </div>
    </div>
</template>

<script>
import AcDate from './AcDate';
export default {
    name: 'Activities',
    components: {
        AcDate,
    },
    props: ['records'],
    data() {
        return {
            isCustomer: false,
        };
    },
    methods: {
        handleChange() {},
    },
};
</script>

<style scoped>
.blank {
    height: 20px;
}
</style>
