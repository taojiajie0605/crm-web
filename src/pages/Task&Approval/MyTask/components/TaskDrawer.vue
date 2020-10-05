<template>
    <a-drawer
        placement="right"
        :visible="visible"
        width="1100px"
        @close="showOrCloseModal"
        bodyStyle="padding:0px;"
        destroyOnClose
    >
        <div style="height: 900px; background-color: #f5f6f9;">
            <div
                style="
                    background-color: white;
                    padding: 20px;
                    border-bottom: 1px solid #e6e6e6;
                "
            >
                <a-row :gutter="distance">
                    <a-col :span="23">
                        {{ taskDetail.user }}
                        <div style="float: right;">
                            <a-button @click="onDelete">删除</a-button>
                        </div>
                        <small>创建于 {{ taskDetail.created }} </small>
                        <template v-if="taskInput === true">
                            <div>
                                <a-input
                                    style="margin-bottom: 20px;"
                                    v-model="taskDetail.content"
                                />
                                <a-button size="small" type="primary"
                                    >保存</a-button
                                >
                                <a-divider type="vertical" />
                                <a-button
                                    size="small"
                                    @click="showOrCloseTaskInput"
                                    type="link"
                                    >取消</a-button
                                >
                            </div>
                        </template>
                        <template v-else>
                            <h2 @click="showOrCloseTaskInput">
                                <template v-if="taskDetail.check === true">
                                    <s>{{ taskDetail.content }} </s>
                                </template>
                                <template v-else>
                                    {{ taskDetail.content }}
                                </template>
                            </h2>
                        </template>
                    </a-col>
                </a-row>
                <a-row :gutter="distance">
                    <a-col :span="6">
                        <a-popover>
                            <template slot="content">
                                <a-space size="large">
                                    <a-button
                                        style="background-color: #f95a5a;"
                                        shape="circle"
                                        @click="selectLevel(0)"
                                        >高</a-button
                                    >
                                    <a-button
                                        @click="selectLevel(1)"
                                        style="background-color: #f7ad3d;"
                                        shape="circle"
                                        >中</a-button
                                    >
                                    <a-button
                                        style="background-color: #67c23a;"
                                        @click="selectLevel(2)"
                                        shape="circle"
                                        >低</a-button
                                    >
                                    <a-button
                                        style="background-color: #d8d8d8;"
                                        @click="selectLevel(3)"
                                        shape="circle"
                                        >无</a-button
                                    >
                                </a-space>
                            </template>
                            <a-button
                                :style="{ backgroundColor: levelStyle.color }"
                                shape="circle"
                                >{{ levelType[levelStyle.text] }}</a-button
                            >
                        </a-popover>
                        优先级
                    </a-col>

                    <a-col :span="6">
                        <a-divider type="vertical" />
                        <a-space>
                            <a-button type="circle"> in </a-button>
                            <a-select
                                default-value="lucy"
                                style="width: 160px;"
                                @change="handleChange"
                            >
                                <a-icon slot="suffixIcon" type="smile" />
                                <a-select-option value="jack">
                                    Jack
                                </a-select-option>
                                <a-select-option value="lucy">
                                    Lucy
                                </a-select-option>
                                <a-select-option value="disabled" disabled>
                                    Disabled
                                </a-select-option>
                                <a-select-option value="Yiminghe">
                                    yiminghe
                                </a-select-option>
                            </a-select>
                        </a-space>
                    </a-col>
                    <a-col :span="6">
                        <a-divider type="vertical" />
                        <a-button
                            style="margin-right: 10px;"
                            icon="up-circle"
                            type="circle"
                        />
                        <a-date-picker
                            placeholder="选择开始日期"
                            @change="onChange"
                        />
                    </a-col>
                    <a-col :span="6">
                        <a-divider type="vertical" />
                        <a-button
                            style="margin-right: 10px;"
                            icon="down-circle"
                            type="circle"
                        />
                        <a-date-picker
                            placeholder="选择结束日期"
                            @change="onChange"
                        />
                    </a-col>
                </a-row>
            </div>

            <div
                style="
                    float: left;
                    overflow-x: auto;
                    height: 710px;
                    background-color: white;
                    width: 100%;
                    border-top: 1px solid #e6e6e6;
                    border-right: 1px solid #e6e6e6;
                    border-bottom: 1px solid #e6e6e6;
                    margin-top: 20px;
                    padding: 10px;
                "
            >
                <a-row :gutter="[16, 16]">
                    <a-col :span="24">
                        <div style="padding-left: 10px; width: 100%;">
                            <div style="width: 50%; float: left;">
                                参与人
                                <br />
                                <a-select
                                    v-model="value"
                                    mode="multiple"
                                    style="width: 250px;"
                                    placeholder="点击新增参与人"
                                    option-label-prop="label"
                                >
                                    <a-select-option
                                        value="china"
                                        label="China"
                                    >
                                        <span role="img" aria-label="China">
                                            🇨🇳
                                        </span>
                                        China (中国)
                                    </a-select-option>
                                    <a-select-option value="usa" label="USA">
                                        <span role="img" aria-label="USA">
                                            🇺🇸
                                        </span>
                                        USA (美国)
                                    </a-select-option>
                                    <a-select-option
                                        value="japan"
                                        label="Japan"
                                    >
                                        <span role="img" aria-label="Japan">
                                            🇯🇵
                                        </span>
                                        Japan (日本)
                                    </a-select-option>
                                    <a-select-option
                                        value="korea"
                                        label="Korea"
                                    >
                                        <span role="img" aria-label="Korea">
                                            🇰🇷
                                        </span>
                                        Korea (韩国)
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div style="width: 50%; float: left;">
                                标签
                                <br />
                                <a-select
                                    v-model="label"
                                    style="width: 250px;"
                                    mode="multiple"
                                    placeholder="点击新增标签"
                                >
                                    <a-select-option
                                        v-for="(item, index) in labels"
                                        :key="index"
                                    >
                                        {{ item }}
                                    </a-select-option>
                                </a-select>

                                <label-list />
                            </div>
                        </div>
                        <br />
                    </a-col>
                </a-row>
                <a-row :gutter="[16, 16]">
                    <a-col :span="24">
                        <span style="font-size: 18px;">
                            <b> <a-icon type="edit" /> 描述</b>
                        </span>
                        <br />
                        <div style="margin-top: 10px; margin-left: 24px;">
                            <template v-if="desc === true">
                                <a-input
                                    type="textarea"
                                    v-model="taskDetail.desc"
                                    style="margin-bottom: 10px;"
                                />
                                <a-button
                                    size="small"
                                    @click="showOrCloseDesc"
                                    type="primary"
                                    >保存</a-button
                                >
                                <a-divider type="vertical" />
                                <a-button
                                    size="small"
                                    @click="showOrCloseDesc"
                                    type="link"
                                    >取消</a-button
                                >
                            </template>
                            <template v-else-if="desc === false">
                                <template v-if="taskDetail.desc === ''">
                                    暂无描述
                                    <a-button
                                        type="link"
                                        icon="plus"
                                        @click="showOrCloseDesc"
                                    >
                                        新增描述
                                    </a-button>
                                </template>
                                <template v-else>
                                    <span @click="showOrCloseDesc">{{
                                        taskDetail.desc
                                    }}</span>
                                </template>
                            </template>
                        </div>
                    </a-col>
                </a-row>
                <a-row :gutter="distance">
                    <a-col :span="24">
                        <span style="font-size: 18px;">
                            <a-icon type="block" />
                            <b>相关信息</b>
                        </span>
                        <div style="margin-top: 10px; margin-left: 24px;">
                            <info-popover type="link" />
                        </div>
                    </a-col>
                </a-row>
                <a-row :gutter="distance">
                    <a-col :span="24">
                        <span style="font-size: 18px;">
                            <a-icon type="apartment" />
                            <b>子任务</b>
                            <div style="margin-top: 10px; margin-left: 24px;">
                                <sub-task-list />
                            </div>
                        </span>
                    </a-col>
                </a-row>
                <a-row :gutter="distance">
                    <a-col>
                        <span style="font-size: 18px;">
                            <a-icon type="paper-clip" />
                            <b>附件</b>
                        </span>
                        <div style="margin-top: 10px; margin-left: 24px;">
                            <a-upload
                                name="file"
                                :multiple="true"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                :headers="headers"
                            >
                                <a-button type="link">
                                    <a-icon type="upload" /> 文件上传
                                </a-button>
                            </a-upload>
                        </div>
                    </a-col>
                </a-row>
            </div>
            <!-- <div
                style="
                    float: left;
                    height: 710px;
                    margin-left: 20px;
                    background-color: white;
                    border-top: 1px solid #e6e6e6;
                    border-left: 1px solid #e6e6e6;
                    border-bottom: 1px solid #e6e6e6;
                    width: 28%;
                    margin-top: 20px;
                    padding: 10px;
                "
            >
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" tab="评论"> 评论 </a-tab-pane>
                    <a-tab-pane key="2" tab="活动" force-render>
                        活动
                    </a-tab-pane>
                </a-tabs>
            </div> -->
        </div>
    </a-drawer>
</template>
<script>
import InfoPopover from '../../../Task&Approval/BranchTask/components/InfoPopover';
import LabelList from './Label/LabelList';
import SubTaskList from './SubTask/SubTaskList';
export default {
    props: {
        number: {
            default: -1,
            type: Number,
        },
    },
    model: {
        prop: 'number',
        event: 'change',
    },
    watch: {
        number: function (val) {
            this.taskDetail = this.$store.getters['mission/getMission'][
                this.number
            ];
        },
    },
    components: {
        InfoPopover,
        SubTaskList,
        LabelList,
    },
    mounted() {
        this.taskDetail = this.$store.getters['mission/getMission'][
            this.number
        ];
    },
    data() {
        return {
            labels: ['标签1', '标签1', '标签1'],
            value: ['china'],
            label: ['默认'],
            currentIndex: -1,
            taskInput: false,
            headers: {
                authorization: 'authorization-text',
            },
            visible: false,
            desc: false,
            taskDetail: {},
            distance: [16, 16],
            levelType: ['高', '中', '低', '无'],
            levelColor: ['#f95a5a', '#f7ad3d', '#67c23a', '#d8d8d8'],
            levelStyle: {
                text: 3,
                color: '#d8d8d8',
            },
        };
    },
    methods: {
        onDelete() {
            this.$confirm({
                title: '提示',
                content: '确定删除?',
                okText: '确认',
                cancelText: '取消',
            });
        },
        selectLevel(index) {
            this.levelStyle.text = index;
            this.taskDetail.level = index;
            this.levelStyle.color = this.levelColor[index];
            this.taskDetail.color = this.levelStyle.color;
        },
        showOrCloseTaskInput() {
            this.taskInput = !this.taskInput;
        },
        showOrCloseModal() {
            this.visible = !this.visible;
            //            console.log(this.number);
        },
        showOrCloseDesc() {
            this.desc = !this.desc;
        },
    },
};
</script>
<style lang="css" scoped>
.ant-drawer-mask {
    background-color: transparent;
}
</style>
