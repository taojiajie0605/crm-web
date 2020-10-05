<template>
    <div style="padding: 30px;">
        <h3 v-for="item in items" :key="item">{{ item }}</h3>
        <a-button type="link" @click="showModal">添加日历类型</a-button>
        <a-modal
            :visible="visible"
            destroyOnClose
            @cancel="showModal"
            @ok="handleOk"
        >
            <template slot="title">
                <b>新建日程类型</b>
            </template>
            <a-form layout="vertical" :form="form">
                <a-form-item label="类型名称">
                    <a-input :value="title" @change="handleChange">
                        <a-icon
                            slot="prefix"
                            color="color"
                            type="smile"
                            theme="twoTone"
                        />
                    </a-input>
                    <a-icon
                        v-for="color in colors"
                        :key="color"
                        type="smile"
                        :style="{
                            marginLeft: 10 + 'px',
                            fontSize: 25 + 'px',
                            color: color,
                        }"
                    />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: 'dkfjaskd',
            visible: false,
            items: [],
            colors: ['#656fe5', '#897125', 'green', 'blue', 'black'],
        };
    },
    methods: {
        showModal() {
            this.visible = !this.visible;
        },
        handleChange(event) {
            this.title = event.target.value;
        },
        handleOk() {
            this.items.push(this.title);
            console.log(this.title);
            this.visible = false;
        },
    },
};
</script>
