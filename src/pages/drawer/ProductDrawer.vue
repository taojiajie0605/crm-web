<template>
    <div class="product-drawer">
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
                        type="codepen"
                        style="font-size: 36px; color: #26d4da;"
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
                <template v-slot:title> 产品 </template>
                <template v-slot:record>{{ record.productname }}</template>
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
                            <a-menu-item>
                                <a
                                    rel="noopener noreferrer"
                                    href="#"
                                    @click="handleOnShelf"
                                    >上架</a
                                >
                            </a-menu-item>
                            <a-menu-item>
                                <a
                                    rel="noopener noreferrer"
                                    href="#"
                                    @click="handleOffShelf"
                                    >下架</a
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
                            <div>
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
                            <div>
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
                    </edit-btn>
                </template>
                <template v-slot:info1>
                    <h5>产品类别</h5>
                    <p>{{ record.producttype }}</p>
                </template>
                <template v-slot:info2>
                    <h5>产品单位</h5>
                    <p>{{ record.unit }}</p>
                </template>
                <template v-slot:info3>
                    <h5>产品价格</h5>
                    <p>{{ record.productprice }}</p>
                </template>
                <template v-slot:info4>
                    <h5>产品编码</h5>
                    <p>{{ record.productcode }}</p>
                </template>
            </drawer-head>
            <drawer-one>
                <template v-slot:oneMain>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="详细资料">
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
                                            单位
                                        </div>
                                        <div class="details-info-content">
                                            产品名称
                                        </div>
                                        <div class="details-info-content">
                                            价格
                                        </div>
                                        <div class="details-info-content">
                                            负责人
                                        </div>
                                    </template>
                                    <template v-slot:topContentLeft2>
                                        <div class="details-info-content">
                                            {{ record.unit }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.productname }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.productprice }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.person }}
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight1>
                                        <div class="details-info-content">
                                            是否上下架
                                        </div>
                                        <div class="details-info-content">
                                            产品编码
                                        </div>
                                        <div class="details-info-content">
                                            产品描述
                                        </div>
                                        <div class="details-info-content">
                                            产品类型
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight2>
                                        <div class="details-info-content">
                                            {{ record.uponshelf }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.productcode }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.describe }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.producttype }}
                                        </div>
                                    </template>
                                    <template v-slot:bottomTitle>
                                        <div class="details-info-staf"></div>
                                        <div class="details-info-text">
                                            系统信息
                                        </div>
                                    </template>
                                    <template v-slot:bottomContentLeft1>
                                        <div class="details-info-content">
                                            创建人
                                        </div>
                                        <div class="details-info-content">
                                            更新时间
                                        </div>
                                    </template>
                                    <template v-slot:bottomContentLeft2>
                                        <div class="details-info-content">
                                            {{ record.founder }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.updatetime }}
                                        </div>
                                    </template>
                                    <template v-slot:bottomContentRight1>
                                        <div class="details-info-content">
                                            创建时间
                                        </div>
                                    </template>
                                    <template v-slot:bottomContentRight2>
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
                                        <div class="details-info-content">
                                            暂无图片信息
                                            <!-- {{ record.img }} -->
                                        </div>
                                    </template>
                                </details-information>
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="附件">
                            <a-card class="tab-content">
                                <appendix />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="3" tab="操作记录">
                            <a-card class="tab-content">
                                <operation-record :operation="operation" />
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
import Appendix from './components/function/Appendix';
import OperationRecord from './components/function/OperationRecord';
import EditBtn from '@/pages/drawer/components/btn/EditBtn';
export default {
    name: 'ProductDrawer',
    props: ['record'],
    components: {
        DrawerHead,
        DrawerOne,
        DetailsInformation,
        Appendix,
        OperationRecord,
        EditBtn,
    },
    data() {
        return {
            visible: false,
            currentWidth: document.body.clientWidth * 0.8,
            collected: false,
            operation: [
                {
                    time: '2020-4-12',
                    name: 'admin',
                    info: '新建了产品',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将产品名称从小程序修改为管理小程序',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将产品编号修改为132132',
                },
                {
                    time: '2020-6-21',
                    name: 'admin',
                    info: '删除了产品',
                },
            ],
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
        handleOnShelf() {
            this.$message.success('已上架');
        },
        handleOffShelf() {
            this.$message.success('已下架');
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
.edit-item {
    margin-top: 20px;
}
</style>
