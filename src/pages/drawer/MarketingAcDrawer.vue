<template>
    <div class="marketing-ac-drawer">
        <a-drawer
            :visible="visible"
            :closable="false"
            placement="right"
            @close="onClose"
            :width="currentWidth"
        >
            <drawer-head draggable="false">
                <template v-slot:icon>
                    <a-icon
                        type="car"
                        style="font-size: 36px; color: #c84afd;"
                    />
                </template>
                <template v-slot:star>
                    <a-icon
                        type="star"
                        :theme="collected ? 'filled' : 'outlined'"
                        @click="starClick"
                        style="
                            color: #ffd700;
                            font-size: 20px;
                            padding-top: 20px;
                        "
                    />
                </template>
                <template v-slot:title> 市场活动 </template>
                <template v-slot:record>{{ record.activityname }}</template>
                <template v-slot:more>
                    <a-dropdown>
                        <a-button>...</a-button>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a
                                    rel="noopener noreferrer"
                                    href="#"
                                    @click="handleDelete"
                                    >删除</a
                                >
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </template>
                <template v-slot:secondBtn>
                    <a-button
                        class="clue-drawer-edit"
                        style="margin-left: 20px;"
                        @click="edit"
                    >
                        编辑
                    </a-button>
                    <edit-btn ref="EditBtn">
                        <template v-slot:title>
                            <div class="details-info-staf"></div>
                            <div class="details-info-text">基本信息</div>
                        </template>
                        <template v-slot:editLeft>
                            <div class="edit-item">
                                <h4>产品名称</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>单位</h4>
                                <a-select style="width: 80%;" default-value="1">
                                    <a-select-option value="1"
                                        >个</a-select-option
                                    >
                                    <a-select-option value="2"
                                        >块</a-select-option
                                    >
                                    <a-select-option value="3"
                                        >只</a-select-option
                                    >
                                    <a-select-option value="4"
                                        >把</a-select-option
                                    >
                                    <a-select-option value="5"
                                        >枚</a-select-option
                                    >
                                    <a-select-option value="6"
                                        >瓶</a-select-option
                                    >
                                    <a-select-option value="7"
                                        >盒</a-select-option
                                    >
                                    <a-select-option value="8"
                                        >台</a-select-option
                                    >
                                    <a-select-option value="9"
                                        >箱</a-select-option
                                    >
                                    <a-select-option value="10"
                                        >套</a-select-option
                                    >
                                    <a-select-option value="11"
                                        >千克</a-select-option
                                    >
                                    <a-select-option value="12"
                                        >吨</a-select-option
                                    >
                                    <a-select-option value="13"
                                        >米</a-select-option
                                    >
                                </a-select>
                            </div>
                            <div class="edit-item">
                                <h4>价格</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>产品描述</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                        <template v-slot:editRight>
                            <div class="edit-item">
                                <h4>产品类型</h4>
                                <a-select
                                    style="width: 80%;"
                                    default-value="default"
                                >
                                    <a-select-option value="default"
                                        >默认</a-select-option
                                    >
                                </a-select>
                            </div>
                            <div class="edit-item">
                                <h4>产品编码</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>是否上下架</h4>
                                <a-select default-value="1" style="width: 80%;">
                                    <a-select-option value="1"
                                        >是</a-select-option
                                    >
                                    <a-select-option value="2"
                                        >否</a-select-option
                                    >
                                </a-select>
                            </div>
                            <div class="edit-item">
                                <h4>备注</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                        <template v-slot:title2>
                            <div class="details-info-staf"></div>
                            <div class="details-info-text">图片信息</div>
                        </template>
                        <template v-slot:editLeft2>
                            <h4>产品图片</h4>
                            <div uploader>
                                <a-upload
                                    name="file"
                                    :multiple="true"
                                    class="avatar-uploader"
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    :headers="headers"
                                    @change="handleChange"
                                >
                                    <a-button>
                                        <a-icon type="upload" /> Click to Upload
                                    </a-button>
                                </a-upload>
                            </div>
                            <p>
                                图片建议上传：290（宽） * 220(高)
                                （最多只能上传9张图片）
                            </p>
                            <h4>产品详情图片</h4>
                            <div class="uploader">
                                <a-upload
                                    name="file"
                                    :multiple="true"
                                    class="avatar-uploader"
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    :headers="headers"
                                    @change="handleChange"
                                >
                                    <a-button>
                                        <a-icon type="upload" /> Click to Upload
                                    </a-button>
                                </a-upload>
                            </div>
                            <p>
                                图片建议上传：750(宽) *
                                600(高)（最多只能上传9张图片）
                            </p>
                        </template>
                        <template v-slot:title3>
                            <div class="details-info-staf"></div>
                            <div class="details-info-text">字段信息</div>
                        </template>
                        <template v-slot:main>
                            <p>您可以通过勾选自定义配置分享后表单的字段信息</p>
                            <a-checkbox-group
                                @change="onChange"
                                style="width: 100%;"
                            >
                                <a-row>
                                    <a-col :span="6">
                                        <a-checkbox value="1">
                                            客户名称
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="6">
                                        <a-checkbox value="2">
                                            客户来源
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="6">
                                        <a-checkbox value="3">
                                            手机
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="6">
                                        <a-checkbox value="4">
                                            电话
                                        </a-checkbox>
                                    </a-col>
                                </a-row>
                                <a-row>
                                    <a-col :span="6">
                                        <a-checkbox value="5">
                                            网址
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="6">
                                        <a-checkbox value="6">
                                            邮箱
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="6">
                                        <a-checkbox value="7">
                                            客户行业
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="6">
                                        <a-checkbox value="8">
                                            客户级别
                                        </a-checkbox>
                                    </a-col>
                                </a-row>
                                <a-row>
                                    <a-col :span="6">
                                        <a-checkbox value="9">
                                            下次联系时间
                                        </a-checkbox>
                                    </a-col>
                                    <a-col :span="6">
                                        <a-checkbox value="10">
                                            备注
                                        </a-checkbox>
                                    </a-col>
                                </a-row>
                            </a-checkbox-group>
                        </template>
                    </edit-btn>
                </template>
                <template v-slot:info1>
                    <h5>关联对象</h5>
                    <p>{{ record.assobject }}</p>
                </template>
                <template v-slot:info2>
                    <h5>状态</h5>
                    <p>{{ record.state }}</p>
                </template>
                <template v-slot:info3>
                    <h5>创建人</h5>
                    <p>{{ record.founder }}</p>
                </template>
                <template v-slot:info4>
                    <h5>截止时间</h5>
                    <p>{{ record.endtime }}</p>
                </template>
            </drawer-head>
            <drawer-one>
                <template v-slot:oneMain>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="预览">
                            <a-card class="tab-content">
                                <preview />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="基本信息">
                            <a-card class="tab-content">
                                <details-information>
                                    <template v-slot:topTitle>
                                        <div class="details-info-staf"></div>
                                        <div class="details-info-text">
                                            基本信息
                                        </div>
                                    </template>
                                    <template v-slot:topContentLeft1>
                                        <div class="details-info-content">
                                            活动名称
                                        </div>
                                        <div class="details-info-content">
                                            参与人员
                                        </div>
                                        <div class="details-info-content">
                                            开始时间
                                        </div>
                                        <div class="details-info-content">
                                            浏览数
                                        </div>
                                        <div class="details-info-content">
                                            活动预算
                                        </div>
                                        <div class="details-info-content">
                                            活动简介
                                        </div>
                                        <div class="details-info-content">
                                            创建人
                                        </div>
                                        <div class="details-info-content">
                                            更新时间
                                        </div>
                                    </template>
                                    <template v-slot:topContentLeft2>
                                        <div class="details-info-content">
                                            {{ record.activityname }}
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.starttime }}
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.activitybudget }}
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.founder }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.updatetime }}
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight1>
                                        <div class="details-info-content">
                                            关联对象
                                        </div>
                                        <div class="details-info-content">
                                            活动类型
                                        </div>
                                        <div class="details-info-content">
                                            截止时间
                                        </div>
                                        <div class="details-info-content">
                                            提交数
                                        </div>
                                        <div class="details-info-content">
                                            活动地址
                                        </div>
                                        <div class="details-info-content">
                                            状态
                                        </div>
                                        <div class="details-info-content">
                                            创建时间
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight2>
                                        <div class="details-info-content">
                                            {{ record.assobject }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.activitytype }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.endtime }}
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.activityaddress }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.state }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.createtime }}
                                        </div>
                                    </template>
                                    <template v-slot:exTitle>
                                        <div class="details-info-staf"></div>
                                        <div class="details-info-text">
                                            图片信息
                                        </div>
                                    </template>
                                    <template v-slot:exMain>
                                        暂无图片信息-
                                    </template>
                                </details-information>
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="3" tab="统计分析">
                            <a-card class="tab-content">
                                <a-row>
                                    <a-col :span="2" style="font-size: 16px;">
                                        状态
                                    </a-col>
                                    <a-col :span="5">
                                        <a-select
                                            default-value="all"
                                            style="width: 200px;"
                                        >
                                            <a-select-option value="all"
                                                >全部</a-select-option
                                            >
                                            <a-select-option value="1"
                                                >未成功</a-select-option
                                            >
                                            <a-select-option value="2"
                                                >同步成功</a-select-option
                                            >
                                            <a-select-option value="3"
                                                >同步失败</a-select-option
                                            >
                                        </a-select>
                                    </a-col>
                                    <a-col :span="12" />
                                    <a-col :span="3">
                                        <a-button type="primary" align="right"
                                            >同步到客户</a-button
                                        >
                                    </a-col>
                                    <a-col :span="2">
                                        <a-button type="primary" align="right"
                                            >导出</a-button
                                        >
                                    </a-col>
                                </a-row>
                                <div class="blank"></div>
                                <a-table :columns="columns" :data="data" />
                            </a-card>
                        </a-tab-pane>
                    </a-tabs>
                </template>
            </drawer-one>
        </a-drawer>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import DrawerHead from './components/DrawerHead';
import DrawerOne from './components/DrawerOne';
import DetailsInformation from './components/function/DetailsInformation';
import EditBtn from './components/btn/EditBtn';
import Preview from './components/function/Preview';
const columns = [
    {
        title: '回访编号',
        scopedSlots: { customRender: 'name' },
        key: 'name',
    },
    {
        title: '回访时间',
        dataIndex: 'returnvisittime',
        key: 'returnvisittime',
    },
    {
        title: '回访人',
        dataIndex: 'returnvisitperson',
        key: 'returnvisitperson',
    },
    {
        title: '回访形式',
        dataIndex: 'returnvisittype',
        key: 'returnvisittype',
    },
    {
        title: '客户名称',
        dataIndex: 'custname',
        key: 'custname',
    },
    {
        title: '联系人',
        dataIndex: 'contactname',
        key: 'contactname',
    },
];
export default {
    name: 'MarketingAcDrawer',
    components: {
        DrawerHead,
        DrawerOne,
        DetailsInformation,
        EditBtn,
        Preview,
    },
    props: ['record'],
    data() {
        return {
            visible: false,
            currentWidth: document.body.clientWidth * 0.8,
            collected: false,
        };
    },
    methods: {
        onClose() {
            this.visible = false;
        },
        starClick() {
            this.collected = !this.collected;
        },
        edit() {
            this.$refs.EditBtn.visible = true;
        },
        //点击删除
        handleDelete() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定删除?</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchDelete();
                },
                onCancel() {},
            });
        },
        //删除选中调用方法
        fetchDelete() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageclueTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
        fetch(params = {}) {
            this.loading = true;
            request('/DrawerCompReturnVisit', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.answer;
            });
        },
        fetchadd() {},
        custAddForm() {
            this.emprecord = {};
            this.$refs.CustAddForm.visible = true;
        },
    },
};
</script>

<style scoped>
::v-deep .ant-drawer-wrapper-body {
    background-color: #f5f6f9;
}
::v-deep .ant-drawer-body {
    padding: 0px;
    overflow-y: hidden;
}
.tab-content {
    overflow-y: scroll;
    height: 450px;
    border: hidden;
}
.details-info-staf {
    height: 20px;
    width: 5px;
    border-radius: 3px;
    background-color: blue;
    display: inline-block;
}
.details-info-text {
    display: inline-block;
    padding-left: 20px;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    top: -3px;
}
.details-info-content {
    padding-top: 30px;
}
.blank {
    height: 60px;
}
</style>
