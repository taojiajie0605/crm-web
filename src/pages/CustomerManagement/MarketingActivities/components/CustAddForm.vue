<template>
    <div>
        <a-modal
            title="新建活动"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="950px"
            :maskStyle="{ 'background-color': '#fff' }"
        >
            <a-form
                :form="form"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 17 }"
                class="scroll"
            >
                <div class="head">
                    <a-icon type="caret-right" />
                    基本信息
                </div>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="活动名称" required>
                            <a-input v-model="form.activityname" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item
                            label="关联对象"
                            help="（用户提交的表单信息可以同步到关联模块）"
                            required
                        >
                            <a-select
                                v-model="form.assobject"
                                placeholder="请选择"
                            >
                                <a-select-option value="1">
                                    客户
                                </a-select-option>
                                <a-select-option value="2">
                                    线索
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item
                            label="参与人员"
                            help="（参与人员将获得自己专属的表单二维码）"
                            required
                        >
                            <a-tree-select
                                show-search
                                placeholder="选择员工（多选）"
                                allow-clear
                                multiple
                                tree-default-expand-all
                                v-model="form.participants"
                                maxTagCount="2"
                            >
                                <a-tree-select-node
                                    key="0-1"
                                    value="部门1"
                                    title="部门1"
                                >
                                    <a-tree-select-node
                                        key="0-1-1"
                                        value="员工1"
                                        title="员工1"
                                    />
                                    <a-tree-select-node
                                        key="0-1-2"
                                        value="员工2"
                                        title="员工2"
                                    />
                                </a-tree-select-node>
                                <a-tree-select-node
                                    key="0-2"
                                    value="部门2"
                                    title="部门2"
                                >
                                    <a-tree-select-node
                                        key="0-2-1"
                                        value="员工3"
                                        title="员工3"
                                    />
                                    <a-tree-select-node
                                        key="0-2-2"
                                        value="员工4"
                                        title="员工4"
                                    />
                                </a-tree-select-node>
                            </a-tree-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="活动类型">
                            <a-select
                                v-model="form.activitytype"
                                placeholder="请选择"
                            >
                                <a-select-option value="1">
                                    广告
                                </a-select-option>
                                <a-select-option value="2">
                                    研讨会/会议
                                </a-select-option>
                                <a-select-option value="3">
                                    电子邮件
                                </a-select-option>
                                <a-select-option value="4">
                                    营销
                                </a-select-option>
                                <a-select-option value="5">
                                    公共关系
                                </a-select-option>
                                <a-select-option value="6">
                                    合作伙伴
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="开始时间" required>
                            <a-date-picker
                                v-model="form.starttime"
                                style="width: 312px;"
                                show-time
                                placeholder="选择日期"
                                @change="onstartDateChange"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="截止时间" required>
                            <a-date-picker
                                v-model="form.endtime"
                                style="width: 312px;"
                                show-time
                                placeholder="选择日期"
                                @change="onendDateChange"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="浏览数">
                            <a-input-number
                                style="width: 100%;"
                                v-model="form.views"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="提交数">
                            <a-input-number
                                style="width: 100%;"
                                v-model="form.submits"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="活动预算">
                            <a-input-number
                                style="width: 100%;"
                                v-model="form.activitybudget"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="活动地址">
                            <a-input v-model="form.activityaddress" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="活动简介">
                            <a-textarea
                                v-model="form.briefintroduction"
                                :rows="4"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <div class="head">
                    <a-icon type="caret-right" />
                    图片信息
                </div>
                <a-form-item label="活动图片">
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
                <div class="head">
                    <a-icon type="caret-right" />
                    字段信息
                </div>
                <a-form-item
                    style="margin-left: 100px;"
                    help="（您可以通过勾选自定义配置分享后表单的字段信息）"
                >
                    <a-checkbox-group
                        :default-value="form.checked ? form.checked : checked"
                        @change="onChange"
                    >
                        <a-row>
                            <a-col :span="8">
                                <a-checkbox value="1"> 客户名称 </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="2"> 客户来源 </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="3"> 手机 </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="4"> 电话 </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="5"> 网址 </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="6"> 邮箱 </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="7"> 客户行业 </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="8"> 客户级别 </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="9">
                                    下次联系时间
                                </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="10"> 备注 </a-checkbox>
                            </a-col>
                        </a-row>
                    </a-checkbox-group>
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

            //选择框
            checked: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        };
    },
    methods: {
        //提交/取消表单
        handleOk() {
            if (
                this.form.activityname === '' ||
                this.form.activityname === undefined
            ) {
                this.$message.error('活动名称不能为空');
            } else if (
                this.form.assobject === '' ||
                this.form.assobject === undefined
            ) {
                this.$message.error('关联对象不能为空');
            } else if (
                this.form.participants === '' ||
                this.form.participants === undefined
            ) {
                this.$message.error('参与人员不能为空');
            } else if (
                this.form.starttime === '' ||
                this.form.starttime === undefined
            ) {
                this.$message.error('开始时间不能为空');
            } else if (
                this.form.endtime === '' ||
                this.form.endtime === undefined
            ) {
                this.$message.error('截止时间不能为空');
            } else {
                if (
                    this.form.checked === '' ||
                    this.form.checked === undefined
                ) {
                    this.form.checked = this.checked;
                    //console.log(this.form.checked);
                }
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

        //开始时间改变
        onstartDateChange(date, dateString) {
            this.form.starttime = dateString;
        },
        //截止日期改变
        onendDateChange(date, dateString) {
            this.form.endtime = dateString;
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

        //多选框改变
        onChange(checkedValues) {
            this.form.checked = checkedValues;
            //console.log('checked = ', checkedValues);
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
//滚动条css
.scroll {
    height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
}
.scroll::-webkit-scrollbar {
    width: 8px;
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
