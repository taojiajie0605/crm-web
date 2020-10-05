<template>
    <div>
        <a-modal
            title="编辑标签"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="400px"
            :bodyStyle="{ height: '300px' }"
        >
            <div style="display: flex; align-items: center;">
                <div>标签标题：</div>
                <a-input v-model="editlabel.title" style="width: 60%;" />
            </div>
            <div style="margin-top: 20px;">标签颜色：</div>
            <div style="text-align: center; margin-top: 20px;">
                <color-checkbox-group
                    :defaultValues="[editlabel.colorid]"
                    v-if="visible"
                    @change="changeColor"
                    :multiple="false"
                    style="display: inline-block;"
                >
                    <color-checkbox color="rgb(245, 34, 45)" value="1" />
                    <color-checkbox color="rgb(250, 84, 28)" value="2" />
                    <color-checkbox color="rgb(250, 173, 20)" value="3" />
                    <color-checkbox color="rgb(19, 194, 194)" value="4" />
                    <color-checkbox color="rgb(82, 196, 26)" value="5" />
                    <color-checkbox color="rgb(24, 144, 255)" value="6" />
                    <color-checkbox color="rgb(47, 84, 235)" value="7" />
                    <color-checkbox color="rgb(114, 46, 209)" value="8" />
                    <color-checkbox color="rgb(256, 0, 0)" value="9" />
                    <color-checkbox color="rgb(0, 256, 0)" value="10" />
                    <color-checkbox color="rgb(0, 0, 256)" value="11" />
                    <color-checkbox color="rgb(256, 256, 0)" value="12" />
                </color-checkbox-group>
                <div
                    class="view-color"
                    :style="'backgroundColor:' + this.editlabel.color"
                ></div>
            </div>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'
import ColorCheckbox from '../../../../../components/checkbox/ColorCheckbox'; //颜色选择器
const ColorCheckboxGroup = ColorCheckbox.Group;

export default {
    components: { ColorCheckbox, ColorCheckboxGroup },
    props: ['editlabel'],
    data() {
        return {
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载
        };
    },
    methods: {
        //提交/取消表单
        handleOk() {
            if (this.label.title === '' || this.label.title === undefined) {
                this.$message.error('标签名称不能为空');
            } else {
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit('fetchEditLabel', this.editlabel);
                //console.log("1111111111111111111")
                this.visible = false;
                this.confirmLoading = false;
            }
        },
        handleCancel() {
            this.visible = false;
        },

        //改变颜色
        changeColor(values, colors) {
            //console.log(values[0], colors);
            this.editlabel.color = colors;
            this.editlabel.colorid = values[0];
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
.view-color {
    margin-top: 20px;
    display: inline-block;
    height: 96px;
    width: 96px;
    border-radius: 48px;
    border: 1px dashed gray;
}
</style>
