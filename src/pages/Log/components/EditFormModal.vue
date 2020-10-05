<template>
    <a-modal
        :visible="visible"
        centered
        width="900px"
        :maskStyle="{ 'background-color': '#fff' }"
        :bodyStyle="{
            height: '800px',
            'overflow-x': 'auto',
            'padding-bottom': '10px;',
        }"
        @ok="showOrCloseModal"
        @cancel="showOrCloseModal"
    >
        <template slot="title">
            <b>编辑日志</b>
        </template>
        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" :tab="tabTitle">
                <div>
                    <a-form layout="vertical" :form="form">
                        <a-form-item label="本周工作内容">
                            <a-input
                                type="textarea"
                                v-decorator="[
                                    'title',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    'Please input the title of collection!',
                                            },
                                        ],
                                    },
                                ]"
                            />
                        </a-form-item>
                        <a-form-item label="下周工作内容">
                            <a-input
                                type="textarea"
                                v-decorator="['description']"
                            />
                        </a-form-item>
                        <a-form-item label="遇到的问题">
                            <a-input
                                type="textarea"
                                v-decorator="['description']"
                            />
                        </a-form-item>
                        <a-form-item label="图片上传">
                            <div>
                                <a-upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    list-type="picture-card"
                                    :file-list="fileList"
                                    @preview="handlePreview"
                                    @change="handleChange"
                                >
                                    <div v-if="fileList.length < 8">
                                        <a-icon type="plus" />
                                        <div class="ant-upload-text">
                                            Upload
                                        </div>
                                    </div>
                                </a-upload>
                                <a-modal
                                    :visible="previewVisible"
                                    :footer="null"
                                    @cancel="handleCancel"
                                >
                                    <img
                                        alt="example"
                                        style="width: 100%;"
                                        :src="previewImage"
                                    />
                                </a-modal>
                            </div>
                        </a-form-item>
                        <a-form-item label="文件上传">
                            <a-upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                :multiple="true"
                                :file-list="fileList"
                                @change="handleChange"
                            >
                                <a-button type="link">
                                    <a-icon type="upload" /> 文件上传</a-button
                                >
                            </a-upload>
                        </a-form-item>
                        <a-form-item laebl="发送给" />
                        <a-form-item label="关联业务">
                            <info-popover type="link" />
                        </a-form-item>
                    </a-form>
                </div>
            </a-tab-pane>
        </a-tabs>
    </a-modal>
</template>
<script>
import InfoPopover from '../../Task&Approval/BranchTask/components/InfoPopover';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
export default {
    props: {
        tabTitle: {
            type: String,
            default: '',
        },
    },
    components: {
        InfoPopover,
    },
    data() {
        return {
            visible: false,
            loading: false,
            imageUrl: '',
            previewVisible: false,
            previewImage: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url:
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-2',
                    name: 'image.png',
                    status: 'done',
                    url:
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-3',
                    name: 'image.png',
                    status: 'done',
                    url:
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-4',
                    name: 'image.png',
                    status: 'done',
                    url:
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-5',
                    name: 'image.png',
                    status: 'error',
                },
            ],
        };
    },
    methods: {
        handleCancel() {
            this.previewVisible = false;
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        handleChange({ fileList }) {
            this.fileList = fileList;
        },
        showOrCloseModal() {
            this.visible = !this.visible;
        },
    },
};
</script>
<style lang="less" scoped>
@import '@/theme/default/style.less';
</style>
