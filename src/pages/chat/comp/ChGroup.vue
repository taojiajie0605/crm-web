<template>
    <div class="ch-group">
        <a-card class="tab-content scroll">
            <div
                class="ch-item"
                v-for="(item, index) in data"
                :key="(item, index)"
                @click="openChatBox(item)"
            >
                <a-row>
                    <a-col :span="6">
                        <img class="ch-img" :src="item.img" alt="" />
                    </a-col>
                    <a-col :span="18">
                        <a-row>
                            <a-col
                                :span="12"
                                align="left"
                                style="
                                    line-height: 20px;
                                    margin-top: 10px;
                                    font-weight: 600;
                                    font-size: 17px;
                                "
                                >{{ item.groupname }}</a-col
                            >
                            <a-col
                                :span="12"
                                align="right"
                                style="margin-top: 10px;"
                                >{{ item.state }}</a-col
                            >
                        </a-row>
                        <a-row>
                            <a-col :span="24" style="margin-top: 10px;">
                                {{ item.remarks }}
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>
        </a-card>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import ChatBox from './ChBox';
export default {
    name: 'ChMessage',
    components: {
        ChatBox,
    },
    data() {
        return {
            data: [],
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            request('/ChGroup', METHOD.POST).then((data) => {
                this.data = data.data.answer;
            });
        },
        openChatBox(item) {
            this.$emit('openChatBox', item);
        },
    },
};
</script>

<style lang="less" scoped>
.ch-item {
    height: 70px;
    width: 100%;
    cursor: pointer;
    // border-bottom: 1px solid #dedede;
}
.ch-item:hover {
    cursor: pointer;
    background-color: #f1f1f1;
    border-radius: 10px;
    border-left: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
}
// .ch-item:hover+.ch-item::before {
//     border: none;
// }
.ch-img {
    display: inline-block;
    margin: 10px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    object-fit: cover;
}
/* 很重要，卡片样式 */
.tab-content {
    overflow-y: scroll;
    border: hidden;
    // height: 600px;
}
/* //滚动条css */
.scroll {
    border: hidden;
    height: 65vh;
}
.scroll::-webkit-scrollbar {
    width: 6px;
}
.scroll::-webkit-scrollbar-track {
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
}
.scroll::-webkit-scrollbar-thumb {
    background-color: rgba(95, 95, 95, 0.4);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;

    &:hover {
        background-color: rgba(95, 95, 95, 0.7);
    }
}
</style>
