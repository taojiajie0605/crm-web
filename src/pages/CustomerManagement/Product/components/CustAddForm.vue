<template>
    <div>
        <a-modal
            title="新建产品"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="950px"
            :maskStyle="{ 'background-color': '#fff' }"
            :bodyStyle="{ height: '600px' }"
        >
            <a-form
                :form="form"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 17 }"
            >
                <div class="head">
                    <a-icon type="caret-right" />
                    基本信息
                </div>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="产品名称" required>
                            <a-input v-model="form.productname" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="产品类型" required>
                            <a-select
                                :default-value="form.producttype"
                                placeholder="请选择"
                                @change="producttypeSelect(value)"
                            >
                                <a-select-option value="1">
                                    默认
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="单位">
                            <a-select
                                :default-value="form.unit"
                                placeholder="请选择"
                                @change="unitSelect(value)"
                            >
                                <a-select-option value="1">
                                    个
                                </a-select-option>
                                <a-select-option value="2">
                                    块
                                </a-select-option>
                                <a-select-option value="3">
                                    只
                                </a-select-option>
                                <a-select-option value="4">
                                    把
                                </a-select-option>
                                <a-select-option value="5">
                                    枚
                                </a-select-option>
                                <a-select-option value="6">
                                    瓶
                                </a-select-option>
                                <a-select-option value="7">
                                    盒
                                </a-select-option>
                                <a-select-option value="8">
                                    台
                                </a-select-option>
                                <a-select-option value="9">
                                    吨
                                </a-select-option>
                                <a-select-option value="10">
                                    千克
                                </a-select-option>
                                <a-select-option value="11">
                                    米
                                </a-select-option>
                                <a-select-option value="12">
                                    箱
                                </a-select-option>
                                <a-select-option value="13">
                                    套
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="产品编码" required>
                            <a-input-number
                                style="width: 100%;"
                                v-model="form.productcode"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="价格" required>
                            <a-input-number
                                style="width: 100%;"
                                v-model="form.productprice"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="是否上下架" required>
                            <a-select
                                :default-value="form.uponshelf"
                                placeholder="请选择"
                                @change="makerSelect(value)"
                            >
                                <a-select-option value="1">
                                    上架
                                </a-select-option>
                                <a-select-option value="2">
                                    下架
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="产品描述">
                            <a-input v-model="form.describe" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <div class="head">
                    <a-icon type="caret-right" />
                    图片信息
                </div>
                <a-form-item label="产品图片">
                    <div class="clearfix">
                        <a-upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            list-type="picture-card"
                            :file-list="fileList"
                            @preview="handlePreview"
                            @change="handleImageChange"
                        >
                            <div v-if="fileList.length < 8">
                                <a-icon type="plus" />
                                <div class="ant-upload-text">上传</div>
                            </div>
                        </a-upload>
                        <a-modal
                            :visible="previewVisible"
                            :footer="null"
                            @cancel="handleImageCancel"
                        >
                            <img
                                alt="example"
                                style="width: 100%;"
                                :src="previewImage"
                            />
                        </a-modal>
                    </div>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'
//图片预览方法
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
export default {
    props: ['form'],
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            previewVisible: false, //预览框显示
            previewImage: '', //预览图内容
            fileList: [], //提交图数组
        };
    },
    methods: {
        //产品类型单选框选择
        producttypeSelect(value) {
            //console.log(value);
            this.form.producttype = value;
            //console.log(this.form.scope);
        },
        //单位单选框选择
        unitSelect(value) {
            //console.log(value);
            this.form.unit = value;
        },
        //是否上架单选框选择
        uponshelfSelect(value) {
            this.form.uponshelf = value;
        },

        //提交/取消表单
        handleOk() {
            if (
                this.form.productname === '' ||
                this.form.productname === undefined
            ) {
                this.$message.error('产品名称不能为空');
            } else if (
                this.form.producttype === '' ||
                this.form.producttype === undefined
            ) {
                this.$message.error('产品类型不能为空');
            } else if (
                this.form.productcode === '' ||
                this.form.productcode === undefined
            ) {
                this.$message.error('产品编码不能为空');
            } else if (
                this.form.productprice === '' ||
                this.form.productprice === undefined
            ) {
                this.$message.error('产品价格不能为空');
            } else if (
                this.form.uponshelf === '' ||
                this.form.uponshelf === undefined
            ) {
                this.$message.error('产品上下架不能为空');
            } else {
                this.form.fileList = this.fileList;
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit('fetchadd', this.form);
                //console.log("1111111111111111111")
                this.visible = false;
                this.confirmLoading = false;
            }
        },
        handleCancel() {
            this.visible = false;
        },

        //图片预览取消
        handleImageCancel() {
            this.previewVisible = false;
        },
        //图片预览
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        //图片数组改变
        handleImageChange(file) {
            this.form.fileList = this.fileList;
            if (file.file.status === 'error') {
                console.log('失败');
            } else if (file.file.status === 'uploading') {
                console.log('上传中');
            } else console.log('成功');
            this.fileList = file.fileList;
        },
    },
};
</script>

<style lang="less" scoped>
.status {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head {
    font-weight: bold;
    color: #000;
    margin: 20px 0 10px 0;
}
.list {
    .item {
        padding: 5px 0;
        .title {
            display: inline-block;
            width: 30%;
        }
        .content {
            color: #000;
        }
    }
}

//上传图片
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>
