<template>
    <div class="bill-drawer">
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
                        type="snippets"
                        style="font-size: 36px; color: #2bc59f;"
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
                <template v-slot:title> 发票 </template>
                <template v-slot:record>
                    {{ record.billapplynumber }}
                </template>
                <template v-slot:firstBtn>
                    <a-button
                        class="clue-drawer-shift"
                        @click="handleTransform"
                    >
                        转移
                    </a-button>
                    <Transform ref="Transform" />
                </template>
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
                                <h4>发票申请编号</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>合同编号</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>开票金额</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>开票类型</h4>
                                <a-select style="width: 80%;" default-value="1">
                                    <a-select-option value="1"
                                        >增值税专用发票</a-select-option
                                    >
                                    <a-select-option value="2"
                                        >增值税普通发票</a-select-option
                                    >
                                    <a-select-option value="3"
                                        >国税通用机打发票</a-select-option
                                    >
                                    <a-select-option value="4"
                                        >地税通用机打发票</a-select-option
                                    >
                                    <a-select-option value="5"
                                        >收据</a-select-option
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
                                <h4>合同金额</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>开票日期</h4>
                                <a-date-picker style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>备注</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                        <template v-slot:title2>
                            <div class="details-info-staf"></div>
                            <div class="details-info-text">发票信息</div>
                        </template>
                        <template v-slot:editLeft2>
                            <div class="edit-item">
                                <h4>抬头类型</h4>
                                <a-select style="width: 80%;" default-value="1">
                                    <a-select-option value="1"
                                        >单位</a-select-option
                                    >
                                    <a-select-option value="2"
                                        >个人</a-select-option
                                    >
                                </a-select>
                            </div>
                            <div class="edit-item">
                                <h4>纳税人识别号</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>开户账号</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>电话</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                        <template v-slot:editRight2>
                            <div class="edit-item">
                                <h4>发票抬头</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>开户行</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>开票地址</h4>
                                <a-date-picker style="width: 80%;" />
                            </div>
                        </template>
                        <template v-slot:title3>
                            <div class="details-info-staf"></div>
                            <div class="details-info-text">邮寄信息</div>
                        </template>
                        <template v-slot:editLeft3>
                            <div class="edit-item">
                                <h4>联系人</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>邮寄地址</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                        <template v-slot:editRight3>
                            <div class="edit-item">
                                <h4>联系方式</h4>
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
                    <h5>开票金额</h5>
                    <p>{{ record.billmoney }}</p>
                </template>
                <template v-slot:info3>
                    <h5>发票号码</h5>
                    <p>{{ record.billnumber }}</p>
                </template>
                <template v-slot:info4>
                    <h5>实际开票日期</h5>
                    <p>{{ record.truebilldate }}</p>
                </template>
            </drawer-head>
            <drawer-two-row>
                <template v-slot:twoRowTop>
                    <a-row style="font-weight: 600; font-size: 16px;">
                        <a-col :span="12">
                            <a-icon
                                type="audit"
                                style="font-size: 20px; color: #2bc59f;"
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
                        <a-icon type="plus-circle" style="color: #2bc59f;" />
                        由admin创建 >
                        <a-icon
                            type="check-circle"
                            style="color: #2bc59f; margin-left: 10px;"
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
                                            发票申请编号
                                        </div>
                                        <div class="details-info-content">
                                            合同编号
                                        </div>
                                        <div class="details-info-content">
                                            开票金额（元）
                                        </div>
                                        <div class="details-info-content">
                                            开票类型
                                        </div>
                                        <div class="details-info-content">
                                            创建人
                                        </div>
                                        <div class="details-info-content">
                                            创建时间
                                        </div>
                                    </template>
                                    <template v-slot:topContentLeft2>
                                        <div class="details-info-content">
                                            {{ record.billapplynumber }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.contractnumber }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.billmoney }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.billtype }}
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight1>
                                        <div class="details-info-content">
                                            客户名称
                                        </div>
                                        <div class="details-info-content">
                                            合同金额
                                        </div>
                                        <div class="details-info-content">
                                            开票日期
                                        </div>
                                        <div class="details-info-content">
                                            备注
                                        </div>
                                        <div class="details-info-content">
                                            负责人
                                        </div>
                                        <div class="details-info-content">
                                            更新日期
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight2>
                                        <div class="details-info-content">
                                            {{ record.custname }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.contractmoney }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.billdate }}
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.person }}
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                    </template>
                                    <template v-slot:bottomTitle>
                                        <div class="details-info-staf"></div>
                                        <div class="details-info-text">
                                            发票信息
                                        </div>
                                    </template>
                                    <template v-slot:bottomContentLeft1>
                                        <div class="details-info-content">
                                            抬头类型
                                        </div>
                                        <div class="details-info-content">
                                            纳税人识别号
                                        </div>
                                        <div class="details-info-content">
                                            开户账号
                                        </div>
                                        <div class="details-info-content">
                                            电话
                                        </div>
                                    </template>
                                    <template v-slot:bottomContentLeft2>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                    </template>
                                    <template v-slot:bottomContentRight1>
                                        <div class="details-info-content">
                                            最后跟进记录
                                        </div>
                                        <div class="details-info-content">
                                            创建时间
                                        </div>
                                        <div class="details-info-content">
                                            最后跟进时间
                                        </div>
                                    </template>
                                    <template v-slot:bottomContentRight2>
                                        <div class="details-info-content">
                                            {{ record.lastrecord }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.createtime }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.lasttime }}
                                        </div>
                                    </template>
                                    <template v-slot:exTitle>
                                        <div class="details-info-staf"></div>
                                        <div class="details-info-text">
                                            发票信息
                                        </div>
                                    </template>
                                    <template v-slot:exContentLeft1>
                                        <div class="details-info-content">
                                            抬头类型
                                        </div>
                                        <div class="details-info-content">
                                            纳税人识别号
                                        </div>
                                        <div class="details-info-content">
                                            开户账号
                                        </div>
                                        <div class="details-info-content">
                                            电话
                                        </div>
                                    </template>
                                    <template v-slot:exContentLeft2>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                        <div class="details-info-content">
                                            -
                                        </div>
                                    </template>
                                    <template v-slot:exContentRight1>
                                        <div class="details-info-content">
                                            最后跟进记录
                                        </div>
                                        <div class="details-info-content">
                                            创建时间
                                        </div>
                                        <div class="details-info-content">
                                            最后跟进时间
                                        </div>
                                    </template>
                                    <template v-slot:exContentRight2>
                                        <div class="details-info-content">
                                            {{ record.lastrecord }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.createtime }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.lasttime }}
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
import Transform from '@/pages/CustomerManagement/Bill/components/Transform';
export default {
    name: 'BillDrawer',
    props: ['record'],
    components: {
        DrawerHead,
        DrawerTwoRow,
        DetailsInformation,
        Appendix,
        OperationRecord,
        EditBtn,
        Transform,
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
                    info: '创建了发票',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '修改了发票',
                },
                {
                    time: '2020-6-21',
                    name: 'admin',
                    info: '删除了发票',
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
        handleTransform() {
            this.$refs.Transform.visible = true;
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
    height: 350px;
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
