<template>
    <div class="return-money-drawer">
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
                        type="money-collect"
                        style="font-size: 36px; color: #ffb940;"
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
                <template v-slot:title> 回款 </template>
                <template v-slot:record>
                    {{ record.contractnumber }}
                </template>
                <template v-slot:more>
                    <a-dropdown>
                        <a-button>...</a-button>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a
                                    rel="noopener noreferrer"
                                    href="#"
                                    @click="handlePrint"
                                    >打印</a
                                >
                            </a-menu-item>
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
                                <h4>回款编号</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>合同编号</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>回款日期</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>回款方式</h4>
                                <a-select
                                    style="width: 80%;"
                                    default-value="alipay"
                                >
                                    <a-select-option value="alipay"
                                        >支付宝</a-select-option
                                    >
                                    <a-select-option value="check"
                                        >支票</a-select-option
                                    >
                                    <a-select-option value="cash"
                                        >现金</a-select-option
                                    >
                                    <a-select-option value="trans"
                                        >汇款</a-select-option
                                    >
                                    <a-select-option value="wechat"
                                        >微信</a-select-option
                                    >
                                    <a-select-option value="other"
                                        >其他</a-select-option
                                    >
                                </a-select>
                            </div>
                        </template>
                        <template v-slot:editRight>
                            <div class="edit-item">
                                <h4>客户名称</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>期数</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>回款金额</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>备注</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                    </edit-btn>
                </template>
                <template v-slot:info1>
                    <h5>客户名称</h5>
                    <p>{{ record.custname }}</p>
                </template>
                <template v-slot:info2>
                    <h5>合同金额</h5>
                    <p>{{ record.contractmoney }}</p>
                </template>
                <template v-slot:info3>
                    <h5>合同名称</h5>
                    <p>{{ record.contractname }}</p>
                </template>
                <template v-slot:info4>
                    <h5>回款日期</h5>
                    <p>{{ record.returnmoneydate }}</p>
                </template>
                <template v-slot:info5>
                    <h5>回款金额</h5>
                    <p>{{ record.returnmoneycount }}</p>
                </template>
                <template v-slot:info6>
                    <h5>负责人</h5>
                    <p>{{ record.person }}</p>
                </template>
            </drawer-head>
            <drawer-two-row>
                <template v-slot:twoRowTop>
                    <a-row style="font-weight: 600; font-size: 16px;">
                        <a-col :span="12">
                            <a-icon
                                type="audit"
                                style="font-size: 20px; color: #ffb940;"
                            />
                            审批流信息
                            <span style="margin-left: 20px;">
                                <a-popover
                                    v-model="popvisible"
                                    title="审批流程"
                                    trigger="click"
                                >
                                    <div slot="content">
                                        <a-timeline>
                                            <a-timeline-item>
                                                <p>2020-8-12 14:23</p>
                                                <p>admin 创建了此申请</p>
                                            </a-timeline-item>
                                            <a-timeline-item>
                                                <p>2020-8-22 11:31</p>
                                                <p>admin 通过了此申请</p>
                                            </a-timeline-item>
                                        </a-timeline>
                                    </div>
                                    <a-button>查看历史审批流程</a-button>
                                </a-popover>
                            </span>
                        </a-col>
                        <a-col :span="12" align="right">
                            <a-button
                                type="primary"
                                class="audit-btn"
                                @click="auditOk"
                            >
                                通过
                            </a-button>
                            <a-button
                                type="danger"
                                class="audit-btn"
                                @click="auditRefuse"
                            >
                                拒绝
                            </a-button>
                            <a-button
                                type="default"
                                class="audit-btn"
                                @click="auditBack"
                            >
                                撤回
                            </a-button>
                        </a-col>
                    </a-row>
                    <a-row style="margin-top: 10px;">
                        <a-icon
                            type="plus-circle"
                            style="color: #ffb940; font-weight: 600;"
                        />
                        由admin创建 >
                        <a-icon
                            type="check-circle"
                            style="color: #ffb940; margin-left: 10px;"
                        />
                        由admin审批
                    </a-row>
                </template>
                <template v-slot:twoRowBottom>
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
                                            期数
                                        </div>
                                        <div class="details-info-content">
                                            回款日期
                                        </div>
                                        <div class="details-info-content">
                                            汇款方式
                                        </div>
                                        <div class="details-info-content">
                                            负责人
                                        </div>
                                        <div class="details-info-content">
                                            合同编号
                                        </div>
                                        <div class="details-info-content">
                                            客户名称
                                        </div>
                                    </template>
                                    <template v-slot:topContentLeft2>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.returnmoneydate }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.returnmoneytype }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.person }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.contractnumber }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.custname }}
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight1>
                                        <div class="details-info-content">
                                            回款编号
                                        </div>
                                        <div class="details-info-content">
                                            回款金额
                                        </div>
                                        <div class="details-info-content">
                                            备注
                                        </div>
                                        <div class="details-info-content">
                                            审核状态
                                        </div>
                                        <div class="details-info-content">
                                            合同名称
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight2>
                                        <div class="details-info-content">
                                            {{ record.returnmoneynumber }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.returnmoneycount }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.remarks }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.auditstatus }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.contractname }}
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
                        <a-tab-pane key="4" tab="打印记录">
                            <a-card class="tab-content">
                                这是打印记录的组件
                            </a-card>
                        </a-tab-pane>
                    </a-tabs>
                </template>
            </drawer-two-row>
        </a-drawer>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import DrawerHead from './components/DrawerHead';
import DrawerTwoRow from './components/DrawerTwoRow';
import DetailsInformation from './components/function/DetailsInformation';
import Appendix from './components/function/Appendix';
import OperationRecord from './components/function/OperationRecord';
import EditBtn from '@/pages/drawer/components/btn/EditBtn';
export default {
    name: 'ReturnMoneyDrawer',
    props: ['record'],
    components: {
        DrawerHead,
        DrawerTwoRow,
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
            popvisible: false,
            operation: [
                {
                    time: '2020-4-12',
                    name: 'admin',
                    info: '新建了回款',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将回款金额从2100万元修改为9000万元',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将回款编号从0001修改为0002',
                },
                {
                    time: '2020-6-21',
                    name: 'admin',
                    info: '删除了回款',
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
        auditOk() {
            this.$message.success('已通过');
        },
        auditRefuse() {
            this.$message.error('已拒绝');
        },
        auditBack() {
            this.$message.success('已撤回');
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
        handleAbort() {},
        handlePrint() {
            this.$message.loading('正在打印中...请稍候...');
            setTimeout(() => {
                this.$message.success('已经打印到模板中！');
            }, 3000);
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
    height: 460px;
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
.audit-btn {
    margin-left: 20px;
}
</style>
