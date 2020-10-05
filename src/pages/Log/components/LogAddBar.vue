<template>
    <div
        style="
            border: 1px solid #e6e6e6;
            border-radius: 2px;
            margin-top: 15px;
            width: 900px;
            background-color: white;
        "
    >
        <a-tabs type="line" v-model="activeKey">
            <a-tab-pane key="0" tab="日报">
                <div
                    style="
                        padding-bottom: 15px;
                        margin-left: 10px;
                        margin-right: 10px;
                    "
                >
                    <template v-if="currentComponent === 1">
                        <div style="padding-left: 15px;">
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                "
                            >
                                今日工作内容
                                <a-icon
                                    type="close-circle"
                                    @click="showEditCell"
                                />
                            </div>
                            <textarea
                                v-model="content1"
                                style="resize: none; border: 0px; width: 100%;"
                                rows="2"
                                placeholder="请输入内容"
                            ></textarea>
                            明日工作内容<br />
                            <textarea
                                v-model="content2"
                                style="resize: none; border: 0px; width: 100%;"
                                rows="2"
                                placeholder="请输入内容"
                            ></textarea>
                            遇到的问题<br />
                            <textarea
                                v-model="content3"
                                style="resize: none; border: 0px; width: 100%;"
                                rows="2"
                                placeholder="请输入内容"
                            ></textarea>
                        </div>

                        <a-upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            :default-file-list="defaultFileList"
                        />
                        <div style="padding-bottom: 20px;">
                            <div>
                                <div>
                                    <a-upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        list-type="picture"
                                        :default-file-list="fileList"
                                        class="upload-list-inline"
                                    >
                                        <a-button type="link">
                                            <a-icon type="upload" /> 图片上传
                                        </a-button>
                                    </a-upload>
                                    <a-upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        list-type="picture"
                                        :default-file-list="fileList"
                                        class="upload-list-inline"
                                    >
                                        <a-button type="link">
                                            <a-icon type="upload" /> 附件上传
                                        </a-button>
                                    </a-upload>
                                </div>
                                <info-popover type="link" />
                            </div>
                            <div
                                style="
                                    position: absolute;
                                    bottom: 15px;
                                    right: 15px;
                                "
                            >
                                <a-button
                                    type="primary"
                                    size="small"
                                    @click="addLog"
                                    >发布</a-button
                                >
                            </div>
                        </div>
                    </template>
                    <template v-else-if="currentComponent === 2">
                        <a-input @focus="showEditCell">
                            <a-icon
                                slot="prefix"
                                @focus="showEditCell"
                                type="edit"
                            />
                        </a-input>
                    </template>
                </div>
            </a-tab-pane>
            <a-tab-pane key="1" tab="周报">
                <div
                    style="
                        padding-bottom: 15px;
                        margin-left: 10px;
                        margin-right: 10px;
                    "
                >
                    <template v-if="currentComponent === 1">
                        <div style="padding-left: 15px;">
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                "
                            >
                                本 周工作内容
                                <a-icon
                                    type="close-circle"
                                    @click="showEditCell"
                                />
                            </div>
                            <textarea
                                v-model="content1"
                                style="resize: none; border: 0px; width: 100%;"
                                rows="2"
                                placeholder="请输入内容"
                            ></textarea>
                            下周工作内容<br />
                            <textarea
                                v-model="content2"
                                style="resize: none; border: 0px; width: 100%;"
                                rows="2"
                                placeholder="请输入内容"
                            ></textarea>
                            遇到的问题<br />
                            <textarea
                                v-model="content3"
                                style="resize: none; border: 0px; width: 100%;"
                                rows="2"
                                placeholder="请输入内容"
                            ></textarea>
                        </div>

                        <a-upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            :default-file-list="defaultFileList"
                        />
                        <div style="padding-bottom: 20px;">
                            <div>
                                <div>
                                    <a-upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        list-type="picture"
                                        :default-file-list="fileList"
                                        class="upload-list-inline"
                                    >
                                        <a-button type="link">
                                            <a-icon type="upload" /> 图片上传
                                        </a-button>
                                    </a-upload>
                                    <a-upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        list-type="picture"
                                        :default-file-list="fileList"
                                        class="upload-list-inline"
                                    >
                                        <a-button type="link">
                                            <a-icon type="upload" /> 附件上传
                                        </a-button>
                                    </a-upload>
                                </div>
                                <info-popover type="link" />
                            </div>
                            <div
                                style="
                                    position: absolute;
                                    bottom: 15px;
                                    right: 15px;
                                "
                            >
                                <a-button
                                    type="primary"
                                    size="small"
                                    @click="addLog"
                                    >发布</a-button
                                >
                            </div>
                        </div>
                    </template>
                    <template v-else-if="currentComponent === 2">
                        <a-input @focus="showEditCell">
                            <a-icon
                                slot="prefix"
                                @focus="showEditCell"
                                type="edit"
                            />
                        </a-input>
                    </template>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="月报">
                <div
                    style="
                        padding-bottom: 15px;
                        margin-left: 10px;
                        margin-right: 10px;
                    "
                >
                    <template v-if="currentComponent === 1">
                        <div style="padding-left: 15px;">
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                "
                            >
                                本月工作内容
                                <a-icon
                                    type="close-circle"
                                    @click="showEditCell"
                                />
                            </div>
                            <textarea
                                v-model="content1"
                                style="resize: none; border: 0px; width: 100%;"
                                rows="2"
                                placeholder="请输入内容"
                            ></textarea>
                            下月工作内容<br />
                            <textarea
                                v-model="content2"
                                style="resize: none; border: 0px; width: 100%;"
                                rows="2"
                                placeholder="请输入内容"
                            ></textarea>
                            遇到的问题<br />
                            <textarea
                                v-model="content3"
                                style="resize: none; border: 0px; width: 100%;"
                                rows="2"
                                placeholder="请输入内容"
                            ></textarea>
                        </div>

                        <a-upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            :default-file-list="defaultFileList"
                        />
                        <div style="padding-bottom: 20px;">
                            <div>
                                <div>
                                    <a-upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        list-type="picture"
                                        :default-file-list="fileList"
                                        class="upload-list-inline"
                                    >
                                        <a-button type="link">
                                            <a-icon type="upload" /> 图片上传
                                        </a-button>
                                    </a-upload>
                                    <a-upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        list-type="picture"
                                        :default-file-list="fileList"
                                        class="upload-list-inline"
                                    >
                                        <a-button type="link">
                                            <a-icon type="upload" /> 附件上传
                                        </a-button>
                                    </a-upload>
                                </div>
                                <info-popover type="link" />
                            </div>
                            <div
                                style="
                                    position: absolute;
                                    bottom: 15px;
                                    right: 15px;
                                "
                            >
                                <a-button
                                    type="primary"
                                    size="small"
                                    @click="addLog"
                                    >发布</a-button
                                >
                            </div>
                        </div>
                    </template>
                    <template v-else-if="currentComponent === 2">
                        <a-input @focus="showEditCell">
                            <a-icon
                                slot="prefix"
                                @focus="showEditCell"
                                type="edit"
                            />
                        </a-input>
                    </template>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import InfoPopover from '../../Task&Approval/BranchTask/components/InfoPopover';
export default {
    components: {
        InfoPopover,
    },
    data() {
        return {
            input: true,
            edit: false,
            currentComponent: 2,
            content1: '',
            content2: '',
            content3: '',
            activeKey: '0',
        };
    },
    methods: {
        showEditCell() {
            if (this.currentComponent === 1) this.currentComponent = 2;
            else this.currentComponent = 1;
        },
        addLog() {
            const type = ['day', 'week', 'month'];
            this.$store.commit('logs/setLog', {
                type: type[this.activeKey],
                content1: this.content1,
                content2: this.content2,
                content3: this.content3,
            });
            this.content3 = '';
            this.content2 = '';
            this.content1 = '';
        },
    },
};
</script>
<style scoped>
.upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
}
</style>
