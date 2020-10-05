<template>
    <div id="taskAdd">
        <template v-if="currentComponent === 1">
            <div class="main">
                <div style="position: relative; bottom: 0px;">
                    <a-row :gutter="[5, 35]">
                        <a-col :span="22">
                            <a-input
                                type="text"
                                v-model="content"
                                placeholder="添加任务"
                                @focus="showTaskButton"
                            >
                                <a-icon slot="prefix" type="plus" />
                            </a-input>
                        </a-col>
                        <a-col :span="2">
                            <a-button type="primary">发送</a-button>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </template>
        <template v-else-if="currentComponent === 2">
            <div>
                <div id="addCell" class="addCell">
                    <a-row>
                        <a-col :span="24">
                            <!-- <div style="width:100%;" contenteditable="true"></div> -->
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                "
                            >
                                <input
                                    type="text"
                                    v-model="content"
                                    style="width: 100%; border: 0px;"
                                    placeholder="添加任务"
                                />
                                <!-- <a-button type="link" @click="showTaskButton"> -->
                                <a-icon
                                    @click="showTaskButton"
                                    style="font-size: 15px;"
                                    type="close-circle"
                                />
                                <!-- </a-button> -->
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="[5, 35]">
                        <a-col :span="22">
                            <a-popover title="日历">
                                <template slot="content">
                                    <div
                                        style="
                                            width: 300px;
                                            border: 1px solid #d9d9d9;
                                            border-radius: 4px;
                                        "
                                    >
                                        <a-calendar
                                            valueFormat="YYYY-MM-D"
                                            :fullscreen="false"
                                            @select="onSelect"
                                            v-model="date"
                                        />
                                    </div>
                                </template>
                                <a-button
                                    type="primary"
                                    shape="round"
                                    icon="calendar"
                                    size="small"
                                    ghost
                                >
                                    {{ date }}
                                </a-button>
                            </a-popover>
                            &#8195;
                            <user-popover ref="users" v-model="user">
                                <a-button
                                    type="primary"
                                    shape="round"
                                    icon="user"
                                    size="small"
                                    @click="showPopover"
                                    ghost
                                >
                                    {{ user }}
                                </a-button>
                            </user-popover>
                        </a-col>
                        <a-col :span="2">
                            <a-button type="primary" @click="addToList"
                                >发送</a-button
                            >
                        </a-col>
                    </a-row>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import UserPopover from '../../components/UserPopover';
export default {
    components: {
        UserPopover,
    },
    data() {
        return {
            currentComponent: 1,
            date: '',
            content: '',
            user: '',
        };
    },
    methods: {
        showTaskButton() {
            if (this.currentComponent === 1) this.currentComponent = 2;
            else this.currentComponent = 1;
        },
        addToList() {
            this.$emit('save');
        },
        getCurrentCell() {
            return {
                content: this.content,
                date: this.date,
                user: this.user,
            };
        },
        showPopover() {
            this.$refs.users.showOrCloseModal();
        },
        onSelect(value, mode) {
            //console.log(this.date);
            this.date = value;
            console.log(value);
        },
    },
};
</script>

<style lang="less">
.addCell {
    border: 2px #fafafa solid;
    padding: 10px;
}

.main {
    padding: 10px;
    margin-top: 10px;
    height: 50px;
    width: 100%;
    border: 2px #fafafa solid;
    border-radius: 5px;
}
#taskAdd .ant-input {
    //font-size: 25px;
    border: 0px !important;
    outline: none !important;
}
</style>
