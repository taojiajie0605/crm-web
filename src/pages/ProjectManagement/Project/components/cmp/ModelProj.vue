<template>
    <div>
        <a-modal
            title="创建项目"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="确定"
            @cancel="handleCancel"
            width="900px"
            :maskStyle="{ 'background-color': '#fff' }"
            :bodyStyle="{ height: '810px' }"
        >
            <a-form :form="form">
                <a-form-item label="项目名称" required>
                    <div class="flex">
                        <a-input v-model="form.title" style="width: 40%;" />
                        <div
                            class="view-color"
                            :style="
                                'margin-left:10px;backgroundColor:' +
                                this.form.color
                            "
                        ></div>
                    </div>
                </a-form-item>
                <color-checkbox-group
                    :defaultValues="[form.colorid]"
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
                <a-form-item label="项目封面">
                    <a-row type="flex">
                        <a-col :span="6" :order="4" border="8">
                            <div
                                :class="
                                    form.background === bgI[3].url ? 'd1' : 'd2'
                                "
                                @click="changeimg(bgI[3].url)"
                            >
                                <img
                                    :src="bgI[3].url"
                                    style="width: 200px; height: 100px;"
                                />
                            </div>
                        </a-col>
                        <a-col :span="6" :order="3">
                            <div
                                :class="
                                    form.background === bgI[2].url ? 'd1' : 'd2'
                                "
                                @click="changeimg(bgI[2].url)"
                            >
                                <img
                                    :src="bgI[2].url"
                                    style="width: 200px; height: 100px;"
                                />
                            </div>
                        </a-col>
                        <a-col :span="6" :order="2">
                            <div
                                :class="
                                    form.background === bgI[1].url ? 'd1' : 'd2'
                                "
                                @click="changeimg(bgI[1].url)"
                            >
                                <img
                                    :src="bgI[1].url"
                                    style="width: 200px; height: 100px;"
                                />
                            </div>
                        </a-col>
                        <a-col :span="6" :order="1">
                            <div
                                :class="
                                    form.background === bgI[0].url ? 'd1' : 'd2'
                                "
                                @click="changeimg(bgI[0].url)"
                            >
                                <img
                                    :src="bgI[0].url"
                                    style="width: 200px; height: 100px;"
                                />
                            </div>
                        </a-col>
                    </a-row>
                    <a-row type="flex" style="margin-top: 10px;">
                        <a-col :span="6" :order="4">
                            <div
                                :class="
                                    form.background === bgI[7].url ? 'd1' : 'd2'
                                "
                                @click="changeimg(bgI[7].url)"
                            >
                                <img
                                    :src="bgI[7].url"
                                    style="width: 200px; height: 100px;"
                                />
                            </div>
                        </a-col>
                        <a-col :span="6" :order="3">
                            <div
                                :class="
                                    form.background === bgI[6].url ? 'd1' : 'd2'
                                "
                                @click="changeimg(bgI[6].url)"
                            >
                                <img
                                    :src="bgI[6].url"
                                    style="width: 200px; height: 100px;"
                                />
                            </div>
                        </a-col>
                        <a-col :span="6" :order="2">
                            <div
                                :class="
                                    form.background === bgI[5].url ? 'd1' : 'd2'
                                "
                                @click="changeimg(bgI[5].url)"
                            >
                                <img
                                    :src="bgI[5].url"
                                    style="width: 200px; height: 100px;"
                                />
                            </div>
                        </a-col>
                        <a-col :span="6" :order="1">
                            <div
                                :class="
                                    form.background === bgI[4].url ? 'd1' : 'd2'
                                "
                                @click="changeimg(bgI[4].url)"
                            >
                                <img
                                    :src="bgI[4].url"
                                    style="width: 200px; height: 100px;"
                                />
                            </div>
                        </a-col>
                    </a-row>
                </a-form-item>
                <a-form-item label="项目描述">
                    <a-textarea v-model="form.content" :rows="4" />
                </a-form-item>
                <a-form-item label="可见范围">
                    <a-select
                        style="width: 293px;"
                        v-model="form.SeeRange"
                        placeholder="点击选择"
                    >
                        <a-select-option value="1">
                            私有：只有加入的成员才能看见此项目
                        </a-select-option>
                        <a-select-option value="2">
                            公开：企业所有成员都可以看见此项目
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="项目成员" v-if="form.SeeRange === '1'">
                    <a-tree-select
                        show-search
                        style="width: 293px; margin-right: 10px;"
                        :dropdown-style="{
                            maxHeight: '400px',
                            overflow: 'auto',
                        }"
                        placeholder="点击选择（多选）"
                        allow-clear
                        multiple
                        tree-default-expand-all
                        v-model="form.projmember"
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
                <a-form-item label="成员权限" v-if="form.SeeRange === '2'">
                    <a-select
                        style="width: 293px;"
                        v-model="form.memberrole"
                        placeholder="点击选择"
                    >
                        <a-select-option value="1">
                            编辑：编辑描述
                        </a-select-option>
                        <a-select-option value="2">
                            只读：只读描述
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
const bgI = [
    {
        url: 'https://www.72crm.com/api/uploads/project-cover-1.jpg',
    },
    {
        url: 'https://www.72crm.com/api/uploads/project-cover-2.jpg',
    },
    {
        url: 'https://www.72crm.com/api/uploads/project-cover-3.jpg',
    },
    {
        url: 'https://www.72crm.com/api/uploads/project-cover-4.jpg',
    },
    {
        url: 'https://www.72crm.com/api/uploads/project-cover-5.jpg',
    },
    {
        url: 'https://www.72crm.com/api/uploads/project-cover-6.jpg',
    },
    {
        url: 'https://www.72crm.com/api/uploads/project-cover-7.jpg',
    },
    {
        url: 'https://www.72crm.com/api/uploads/project-cover-8.jpg',
    },
];
import ColorCheckbox from '../../../../../components/checkbox/ColorCheckbox'; //颜色选择器
const ColorCheckboxGroup = ColorCheckbox.Group;

export default {
    components: { ColorCheckbox, ColorCheckboxGroup },
    props: ['form'],
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            bgI, //默认8张账目封面
        };
    },
    methods: {
        //图片改变
        changeimg(url) {
            this.form.background = url;
        },

        //提交/取消表单
        handleOk() {
            if (this.form.title === '' || this.form.title === undefined) {
                this.$message.error('项目名称不能为空');
            } else {
                this.confirmLoading = true;
                //console.log("1111111111111111111",this.form)
                this.$emit('fetchModelProj', this.form);
                //console.log("1111111111111111111")
                this.confirmLoading = false;
                this.visible = false;
            }
        },
        handleCancel() {
            this.visible = false;
        },

        //改变颜色
        changeColor(values, colors) {
            //console.log(values[0], colors);
            this.form.color = colors;
            this.form.colorid = values[0];
        },
    },
};
</script>

<style lang="less" scoped>
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
}
.status {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
.d1 {
    border: 6px solid #9bdf70;
    width: 212px;
    height: 112px;
}
.d2 {
    border: 6px solid white;
    width: 212px;
    height: 112px;
}
.view-color {
    display: inline-block;
    height: 30px;
    width: 30px;
    border-radius: 15px; //变圆
    border: 1px dashed gray;
}
</style>
