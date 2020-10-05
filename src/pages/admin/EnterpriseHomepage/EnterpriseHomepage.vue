<template>
    <a-card title="企业首页">
        <div class="chart-statistics">
            <div class="head">企业平台信息</div>
            <div class="content">
                <a-row :gutter="[24, 24]">
                    <a-col :span="12">
                        <AccountChart />
                    </a-col>
                    <a-col :span="12">
                        <LeaseTermChart />
                    </a-col>
                </a-row>
            </div>
        </div>
        <hr class="hr" />
        <div class="info">
            <div class="head">企业基本信息设置</div>
            <div class="centent">
                <a-form>
                    <a-row :gutter="24">
                        <a-col :span="5">
                            <a-form-item label="企业名称">
                                <a-input
                                    v-decorator="[
                                        'note',
                                        {
                                            rules: [
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your note!',
                                                },
                                            ],
                                        },
                                    ]"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="5">
                            <a-form-item label="审批类型图标" required>
                                <a-upload
                                    name="avatar"
                                    list-type="picture-card"
                                    class="avatar-uploader"
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    :show-upload-list="false"
                                    :before-upload="beforeUpload"
                                    @change="handleChange"
                                >
                                    <img
                                        v-if="imageUrl"
                                        :src="imageUrl"
                                        alt="avatar"
                                    />
                                    <div v-else>
                                        <a-icon
                                            :type="loading ? 'loading' : 'plus'"
                                        />
                                        <div class="ant-upload-text">
                                            Upload
                                        </div>
                                    </div>
                                </a-upload>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="24">
                        <a-col :span="5" style="text-align: right;">
                            <a-button type="primary">保存</a-button>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </div>
    </a-card>
</template>

<script>
import AccountChart from './chart/Account';
import LeaseTermChart from './chart/LeaseTerm';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default {
    name: 'EnterpriseHomepage',
    components: {
        AccountChart,
        LeaseTermChart,
    },
    data() {
        return {
            loading: false,
            imageUrl: '',
            data: [
                {
                    type: '评估中',
                    percent: 0.23,
                },
                {
                    type: '设计中',
                    percent: 0.28,
                },
                {
                    type: '正在开发',
                    percent: 0.3,
                },
                {
                    type: '已上线',
                    percent: 0.19,
                },
            ],
        };
    },
    mounted() {},
    methods: {
        handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, (imageUrl) => {
                    this.imageUrl = imageUrl;
                    this.loading = false;
                });
            }
        },
        beforeUpload(file) {
            const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.$message.error('You can only upload JPG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('Image must smaller than 2MB!');
            }
            return isJpgOrPng && isLt2M;
        },
    },
};
</script>

<style lang="less" scoped>
.head {
    font-weight: bold;
    color: #000;
}
.hr {
    height: 1px;
    border: none;
    background-color: rgb(231, 229, 229);
}
</style>
