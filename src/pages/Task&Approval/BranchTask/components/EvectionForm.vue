<template>
    <div>
        <b>基本信息</b>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                审批内容
                <a-input v-model="content" />
            </a-col>
            <a-col :span="12">
                备注
                <a-input type="textarea" v-model="detail"
            /></a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="12">
                出差总天数
                <a-input-number
                    style="width: 100%;"
                    v-model="days"
                    @change="onChange"
                />
            </a-col>
            <a-col :span="12" />
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="24">
                行程明细
                <a-row :gutter="[16, 16]" v-for="item in routeItem" :key="item">
                    <a-col :span="24">
                        <route-detail
                            ref="routers"
                            @delete="removeRouteItem(item)"
                        >
                            <template slot=""
                                >行程明细（{{ item }} ）
                            </template>
                        </route-detail>
                    </a-col>
                </a-row>
                <a-button @click="addRouteItem" type="link">添加事项</a-button>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import RouteDetail from './RouteDetail';

export default {
    data() {
        return {
            routeItem: [0],
            content: '',
            detail: '',
            days: 0,
            routers: [],
        };
    },
    components: {
        RouteDetail,
    },
    methods: {
        addRouteItem() {
            this.routeItem.push(this.routeItem.length);
        },
        removeRouteItem(val) {
            this.routeItem.splice(this.routeItem.indexOf(val), 1);
        },
        getContent() {
            for (let i = 0; i < this.routeItem.length; i++) {
                this.routers.push(this.$refs.routers[i].getContent());
            }
            //            console.log(this.routers);
            return {
                content: this.content,
                detail: this.detail,
                days: this.days,
                routers: this.routers,
            };
        },
    },
};
</script>
