<template>
    <a-modal
        :visible="visible"
        width="650px"
        @ok="showOrCloseModal"
        @cancel="showOrCloseModal"
    >
        <template slot="title">
            <b>编辑跟进记录</b>
        </template>
        <div
            style="
                border-radius: 2px;
                border: 1px solid #e6e6e6;
                padding: 15px;
                width: 600px;
                height: 300px;
                overflow-y: auto;
            "
        >
            <a-row>
                <a-col :span="5">
                    <a-select
                        default-value="lucy"
                        style="width: 120px;"
                        @change="handleChange"
                    >
                        <a-select-option value="jack"> 打电话 </a-select-option>
                        <a-select-option value="lucy"> 发邮件 </a-select-option>
                        <a-select-option value="disabled">
                            发短信
                        </a-select-option>
                        <a-select-option value="Yiminghe">
                            见面拜访
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :offset="1" :span="6">
                    <a-date-picker @change="onChange" />
                </a-col>
                <a-col :offset="1" :span="3">
                    <a-popover>
                        <template slot="content">
                            <a-menu
                                style="width: 256px;"
                                mode="vertical"
                                @click="handleClick"
                            >
                                <a-menu-item
                                    key="1"
                                    @click="setContent($event)"
                                >
                                    电话无人接听
                                </a-menu-item>
                                <a-menu-item
                                    key="2"
                                    @click="setContent($event)"
                                >
                                    客户无意向
                                </a-menu-item>
                                <a-menu-item
                                    key="3"
                                    @click="setContent($event)"
                                >
                                    客户意向度适中，后续继续跟进
                                </a-menu-item>
                                <a-menu-item
                                    key="4"
                                    @click="setContent($event)"
                                >
                                    客户意向度较强，成交几率较大
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-button> 常用语 </a-button>
                    </a-popover>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="24">
                    <textarea
                        style="width: 100%; border: 0px;"
                        rows="3"
                        cols="20"
                        v-model="content"
                    ></textarea>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="24">
                    图片上传
                    <div class="clearfix">
                        <a-upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            list-type="picture-card"
                            :file-list="fileList"
                            @preview="handlePreview"
                            @change="handleChange"
                        >
                            <div v-if="fileList.length < 8">
                                <a-icon type="plus" />
                                <div class="ant-upload-text">Upload</div>
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
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="24">
                    <a-upload
                        name="file"
                        :multiple="true"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChangeFile"
                    >
                        <a-button> <a-icon type="upload" /> 文件上传 </a-button>
                    </a-upload>
                </a-col>
            </a-row>
        </div>
    </a-modal>
</template>
<script>
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
export default {
    data() {
        return {
            visible: false,
            content: '',
            previewVisible: false,
            headers: {
                authorization: 'authorization-text',
            },
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
                    uid: '-5',
                    name: 'image.png',
                    status: 'error',
                },
            ],
        };
    },
    methods: {
        handleChangeFile(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                this.$message.success(
                    `${info.file.name} file uploaded successfully`,
                );
            } else if (info.file.status === 'error') {
                this.$message.error(`${info.file.name} file upload failed.`);
            }
        },
        showOrCloseModal() {
            this.visible = !this.visible;
        },
        setContent(e) {
            this.content = e.domEvent.srcElement.textContent;
        },
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
    },
};
</script>
<style scoped></style>
