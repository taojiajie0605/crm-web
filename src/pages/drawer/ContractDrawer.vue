<template>
    <div class="contract-drawer">
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
                        type="reconciliation"
                        style="font-size: 36px; color: #fd5b4a;"
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
                <template v-slot:title> 合同 </template>
                <template v-slot:record>
                    {{ record.contractname }}
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
                            <a-menu-item>
                                <a
                                    rel="noopener noreferrer"
                                    href="#"
                                    @click="handleAbort"
                                    >合同作废</a
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
                                <h4>合同编号</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>客户名称</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>合同金额</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>合同开始时间</h4>
                                <a-date-picker style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>客户签约人</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>备注</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                        <template v-slot:editRight>
                            <div class="edit-item">
                                <h4>合同名称</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>商机名称</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>下单时间</h4>
                                <a-date-picker style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>合同结束时间</h4>
                                <a-date-picker style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>公司签约人</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>合同类型</h4>
                                <a-select default-value="1" style="width: 80%;">
                                    <a-select-option value="1"
                                        >直销合同</a-select-option
                                    >
                                    <a-select-option value="2"
                                        >代理合同</a-select-option
                                    >
                                    <a-select-option value="3"
                                        >服务合同</a-select-option
                                    >
                                    <a-select-option value="4"
                                        >快销合同</a-select-option
                                    >
                                </a-select>
                            </div>
                        </template>
                    </edit-btn>
                </template>
                <template v-slot:info1>
                    <h5>合同编号</h5>
                    <p>{{ record.contractnumber }}</p>
                </template>
                <template v-slot:info2>
                    <h5>客户名称</h5>
                    <p>{{ record.custname }}</p>
                </template>
                <template v-slot:info3>
                    <h5>合同金额</h5>
                    <p>{{ record.contractmoney }}</p>
                </template>
                <template v-slot:info4>
                    <h5>签约时间</h5>
                    <p>{{ record.ordertime }}</p>
                </template>
                <template v-slot:info5>
                    <h5>回款金额</h5>
                    <p>{{ record.returnedmoney }}</p>
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
                                style="font-size: 20px; color: #fd5b4a;"
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
                        <a-icon type="plus-circle" style="color: #fd5b4a;" />
                        由admin创建 >
                        <a-icon
                            type="check-circle"
                            style="color: #fd5b4a; margin-left: 10px;"
                        />
                        由admin审批
                    </a-row>
                </template>
                <template v-slot:twoRowBottom>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="详细资料">
                            <a-card class="tab-content">
                                <ct-details :record="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="活动">
                            <a-card class="tab-content">
                                <dr-activities :records="record">
                                    <template v-slot:acBtnRow>
                                        <div align="left">
                                            <a-button
                                                class="btn-row"
                                                @click="showFollowUp"
                                            >
                                                <a-icon type="plus-circle" />
                                                写跟进
                                            </a-button>
                                            <a-button
                                                class="btn-row"
                                                @click="showNewTask"
                                            >
                                                <a-icon type="plus-circle" />
                                                创建任务
                                            </a-button>
                                            <a-button
                                                class="btn-row"
                                                @click="showNewReturnMoney"
                                            >
                                                <a-icon type="plus-circle" />
                                                创建回款
                                            </a-button>
                                        </div>
                                    </template>
                                    <template v-slot:changecata>
                                        <a-select
                                            default-value="all"
                                            style="width: 150px;"
                                            @change="handleTypeChange"
                                        >
                                            <a-select-option value="all">
                                                <a-icon
                                                    type="appstore"
                                                    theme="filled"
                                                    style="color: #2362fb;"
                                                />
                                                全部活动
                                            </a-select-option>
                                            <a-select-option value="contract">
                                                <a-icon
                                                    type="book"
                                                    theme="filled"
                                                    style="color: #fd5b4a;"
                                                />
                                                合同
                                            </a-select-option>
                                            <a-select-option value="task">
                                                <a-icon
                                                    type="schedule"
                                                    theme="filled"
                                                    style="color: #d376ff;"
                                                />
                                                任务
                                            </a-select-option>
                                            <a-select-option value="money">
                                                <a-icon
                                                    type="interaction"
                                                    theme="filled"
                                                    style="color: #ffb940;"
                                                />
                                                回款
                                            </a-select-option>
                                            <a-select-option value="log">
                                                <a-icon
                                                    type="container"
                                                    theme="filled"
                                                    style="color: #5864ff;"
                                                />
                                                日志
                                            </a-select-option>
                                            <a-select-option value="audit">
                                                <a-icon
                                                    type="experiment"
                                                    theme="filled"
                                                    style="color: #9376ff;"
                                                />
                                                审批
                                            </a-select-option>
                                        </a-select>
                                    </template>
                                    <template v-slot:acDate>
                                        <ac-date>
                                            <template v-slot:acDateTag>
                                                2020-9-15
                                            </template>
                                            <template v-slot:acDateContent>
                                                <a-timeline>
                                                    <a-timeline-item>
                                                        admin 创建了合同2324
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin 修改合同2324为213
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin
                                                        修改了合同名称213为111
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin 删除了合同
                                                    </a-timeline-item>
                                                </a-timeline>
                                            </template>
                                        </ac-date>
                                    </template>
                                </dr-activities>
                                <follow-up ref="FollowUp" />
                                <new-task ref="NewTask" :records="record" />
                                <new-return-money
                                    ref="NewReturnMoney"
                                    :form="emprecord"
                                    @fetchadd="fetchadd"
                                />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="3" tab="产品">
                            <a-card class="tab-content">
                                <dr-product :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="4" tab="回款">
                            <a-card class="tab-content">
                                <dr-return-money :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="5" tab="回访">
                            <a-card class="tab-content">
                                <dr-return-visit :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="6" tab="团队成员">
                            <a-card class="tab-content">
                                <dr-team-com />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="7" tab="附件">
                            <a-card class="tab-content">
                                <appendix />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="8" tab="操作记录">
                            <a-card class="tab-content">
                                <operation-record :operation="operation" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="9" tab="打印记录">
                            <a-card class="tab-content">
                                <print-record :records="record" />
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
import CtDetails from './Contract/CtDetails';
import Appendix from './components/function/Appendix';
import OperationRecord from './components/function/OperationRecord';
import DrReturnMoney from './components/function/DrReturnMoney';
import DrReturnVisit from './components/function/DrReturnVisit';
import DrProduct from './components/function/DrProduct';
import PrintRecord from './components/function/PrintRecord';
import DrActivities from './components/function/DrActivities';
import FollowUp from './components/function/comp/FollowUp';
import NewTask from './components/function/comp/NewTask';
import NewReturnMoney from '@/pages/drawer/components/function/comp/NewReturnMoney';
import DrTeamCom from '@/pages/drawer/components/function/DrTeamCom';
import EditBtn from '@/pages/drawer/components/btn/EditBtn';
import AcDate from '@/pages/drawer/components/function/AcDate';
import Transform from '@/pages/CustomerManagement/Contract/components/Transform';
export default {
    name: 'ContractDrawer',
    props: ['record'],
    components: {
        DrawerHead,
        DrawerTwoRow,
        CtDetails,
        Appendix,
        OperationRecord,
        DrReturnMoney,
        DrReturnVisit,
        DrProduct,
        PrintRecord,
        DrActivities,
        FollowUp,
        NewTask,
        NewReturnMoney,
        DrTeamCom,
        EditBtn,
        AcDate,
        Transform,
    },
    data() {
        return {
            visible: false,
            popvisible: false,
            currentWidth: document.body.clientWidth * 0.8,
            collected: false,
            emprecord: {},
            operation: [
                {
                    time: '2020-4-12',
                    name: 'admin',
                    info: '新建了合同',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将合同名称从小程序修改为系统管理',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将合同编号修改为1212',
                },
                {
                    time: '2020-6-21',
                    name: 'admin',
                    info: '删除了合同',
                },
            ],
        };
    },
    methods: {
        onClose() {
            this.visible = false;
        },
        showFollowUp() {
            this.$refs.FollowUp.visible = true;
        },
        showNewTask() {
            this.$refs.NewTask.visible = true;
        },
        showNewReturnMoney() {
            this.emprecord = {};
            this.$refs.NewReturnMoney.visible = true;
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
        handleAbort() {
            this.$message.warning('合同作废！');
        },
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
.btn-row {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    padding-right: 10px;
    padding-left: 10px;
    margin-right: 20px;
}
.edit-item {
    margin-top: 20px;
}
.audit-btn {
    margin-left: 20px;
}
</style>
