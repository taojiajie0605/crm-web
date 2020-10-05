<template>
    <div>
        <task-drawer v-model="id" ref="drawer" />
        <a-row v-for="(item, index) in TaskList" :key="item">
            <a-col :span="12">
                <template v-if="item.check === true">
                    <a-checkbox
                        defaultChecked
                        @change="onCheck($event, index)"
                    />
                </template>
                <template v-else>
                    <a-checkbox @change="onCheck($event, index)" />
                </template>
                &#8195; &#8195; &#8195; &#8195;
                <a-tag
                    :style="{ backgroundColor: item.color }"
                    @click="showDrawer(index)"
                >
                    {{ level[item.level] }}</a-tag
                >
                <template v-if="item.check === false">
                    {{ item.content }}
                </template>
                <template v-else-if="item.check === true">
                    <s>{{ item.content }}</s>
                </template>
            </a-col>
            <a-col
                @click="showDrawer(index)"
                style="text-align: right;"
                :span="12"
            >
                <a-tag color="red"> 截止时间 {{ item.date }} </a-tag>
                <a-popover>
                    <template slot="content">
                        <div style="width: 150px;">
                            <div style="width: 100%; height: 50px;">
                                kjsldkf
                            </div>

                            <a-row>
                                <a-col :span="12">
                                    部门
                                </a-col>
                                <a-col :span="12">
                                    skdjfkajdkf
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="12">
                                    岗位
                                </a-col>
                                <a-col :span="12">
                                    kdjsfkdfj
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="12">
                                    手机
                                </a-col>
                                <a-col :span="12">
                                    aksd
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="12">
                                    邮箱
                                </a-col>
                                <a-col :span="12">
                                    kdfk
                                </a-col>
                            </a-row>
                        </div>
                    </template>
                    {{ item.user }}
                    <a-icon type="info-circle" />
                </a-popover>
            </a-col>
            <a-divider style="margin-top: 30px;" />
        </a-row>
    </div>
</template>
<script>
import TaskDrawer from './TaskDrawer';
export default {
    components: {
        TaskDrawer,
    },
    model: {
        prop: 'count',
        event: 'change',
    },
    props: {
        count: Number,
    },
    data() {
        return {
            TaskList: this.$store.getters['mission/getMission'],
            index: '',
            level: ['高', '中', '低', '无'],
            id: 0,
        };
    },
    methods: {
        showDrawer(index) {
            this.$refs.drawer.showOrCloseModal();
            this.id = index;
        },
        onCheck(e, index) {
            this.TaskList[index].check = e.target.checked;
            //       console.log(this.TaskList);
        },
        addRow(item) {
            const time = new Date();
            const now = (function () {
                return (
                    time.getFullYear().toString() +
                    '-' +
                    time.getMonth().toString() +
                    '-' +
                    time.getDay().toString()
                );
            })();
            this.TaskList.unshift({
                content: item.content,
                date: item.date,
                user: item.user,
                check: false,
                level: '0',
                desc: '',
                created: now,
            });
        },
    },
};
</script>
<style scoped></style>
