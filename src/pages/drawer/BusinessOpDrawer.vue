<template>
    <div class="business-op-drawer">
        <a-drawer
            :visible="visible"
            :closable="false"
            placement="right"
            @close="onClose"
            :width="currentWidth"
        >
            <drawer-head>
                <template v-slot:icon>
                    <a-icon
                        type="pay-circle"
                        style="font-size: 36px; color: #fb9323;"
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
                <template v-slot:title> 商机 </template>
                <template v-slot:record>
                    {{ record.buopname }}
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
                                <h4>商机名称</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>商机金额</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>商机状态组</h4>
                                <a-select default-value="1" style="width: 80%;">
                                    <a-select-option value="1"
                                        >销售流程商机组</a-select-option
                                    >
                                </a-select>
                            </div>
                            <div class="edit-item">
                                <h4>备注</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                        <template v-slot:editRight>
                            <div class="edit-item">
                                <h4>客户名称</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>预计成交日期</h4>
                                <a-date-picker style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>商机阶段</h4>
                                <a-select default-value="1" style="width: 80%;">
                                    <a-select-option value="1"
                                        >验证客户</a-select-option
                                    >
                                    <a-select-option value="2"
                                        >需求分析</a-select-option
                                    >
                                    <a-select-option value="3"
                                        >方案报价</a-select-option
                                    >
                                </a-select>
                            </div>
                        </template>
                    </edit-btn>
                </template>
                <template v-slot:info1>
                    <h5>客户名称</h5>
                    <p>{{ record.custname }}</p>
                </template>
                <template v-slot:info2>
                    <h5>商机金额（元）</h5>
                    <p>{{ record.buopmoney }}</p>
                </template>
                <template v-slot:info3>
                    <h5>商机组</h5>
                    <p>销售流程商机组</p>
                </template>
                <template v-slot:info4>
                    <h5>负责人</h5>
                    <p>{{ record.person }}</p>
                </template>
                <template v-slot:info5>
                    <h5>创建时间</h5>
                    <p>{{ record.createtime }}</p>
                </template>
            </drawer-head>
            <drawer-three>
                <template v-slot:threeLeft>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="活动">
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
                                                @click="showNewContact"
                                            >
                                                <a-icon type="plus-circle" />
                                                创建联系人
                                            </a-button>
                                            <a-button
                                                class="btn-row"
                                                @click="showNewContract"
                                            >
                                                <a-icon type="plus-circle" />
                                                创建合同
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
                                                        admin 创建了商机2324
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin
                                                        修改商机名称2324为123
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin
                                                        修改了商机名称123为233
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin 删除了商机
                                                    </a-timeline-item>
                                                </a-timeline>
                                            </template>
                                        </ac-date>
                                    </template>
                                </dr-activities>
                                <follow-up ref="FollowUp" />
                                <new-task ref="NewTask" :records="record" />
                                <new-contact
                                    ref="NewContact"
                                    :form="emprecord"
                                    @fetchadd="fetchadd"
                                />
                                <new-contract
                                    ref="NewContract"
                                    :form="emprecord"
                                    @fetchadd="fetchadd"
                                />
                                <new-return-money
                                    ref="NewReturnMoney"
                                    :form="emprecord"
                                    @fetchadd="fetchadd"
                                />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="详细资料">
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
                                            商机名称
                                        </div>
                                        <div class="details-info-content">
                                            预计成交日期
                                        </div>
                                        <div class="details-info-content">
                                            负责人
                                        </div>
                                        <div class="details-info-content">
                                            商机状态组
                                        </div>
                                    </template>
                                    <template v-slot:topContentLeft2>
                                        <div class="details-info-content">
                                            {{ record.buopname }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.expecteddate }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.person }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.buopstate }}
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight1>
                                        <div class="details-info-content">
                                            商机金额
                                        </div>
                                        <div class="details-info-content">
                                            备注
                                        </div>
                                        <div class="details-info-content">
                                            商机阶段
                                        </div>
                                        <div class="details-info-content">
                                            客户名称
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight2>
                                        <div class="details-info-content">
                                            {{ record.buopmoney }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.remarks }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.buopstage }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.custname }}
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
                                        <div class="details-info-content">
                                            最后跟进时间
                                        </div>
                                    </template>
                                    <template v-slot:bottomContentRight2>
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
                        <a-tab-pane key="3" tab="附件">
                            <a-card class="tab-content">
                                <appendix />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="4" tab="操作记录">
                            <a-card class="tab-content">
                                <operation-record :operation="operation" />
                            </a-card>
                        </a-tab-pane>
                    </a-tabs>
                </template>
                <template v-slot:threeRight>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="重要信息">
                            <a-card class="tab-content">
                                <h3 style="font-weight: 600;">基本信息</h3>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">商机名称</h5>
                                    <h5>{{ record.buopname }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">商机金额</h5>
                                    <h5>{{ record.buopmoney }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">
                                        预计成交日期
                                    </h5>
                                    <h5>{{ record.expecteddate }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">商机阶段</h5>
                                    <h5>{{ record.buopstage }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">商机状态组</h5>
                                    <h5>{{ record.buopstate }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">客户名称</h5>
                                    <h5>{{ record.custname }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">备注</h5>
                                    <h5>{{ record.remarks }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">负责人</h5>
                                    <h5>{{ record.person }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">创建人</h5>
                                    <h5>{{ record.founder }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">创建时间</h5>
                                    <h5>{{ record.createtime }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">更新时间</h5>
                                    <h5>{{ record.updatetime }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">
                                        最后跟进时间
                                    </h5>
                                    <h5>{{ record.lasttime }}</h5>
                                </div>
                            </a-card>
                        </a-tab-pane>
                    </a-tabs>
                </template>
            </drawer-three>
        </a-drawer>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import DrawerHead from './components/DrawerHead';
import DrawerThree from './components/DrawerThree';
import DetailsInformation from './components/function/DetailsInformation';
import Appendix from './components/function/Appendix';
import OperationRecord from './components/function/OperationRecord';
import DrActivities from './components/function/DrActivities';
import FollowUp from './components/function/comp/FollowUp';
import NewTask from './components/function/comp/NewTask';
import NewContact from '@/pages/drawer/components/function/comp/NewContact';
import NewContract from '@/pages/drawer/components/function/comp/NewContract';
import NewReturnMoney from '@/pages/drawer/components/function/comp/NewReturnMoney';
import EditBtn from '@/pages/drawer/components/btn/EditBtn';
import AcDate from '@/pages/drawer/components/function/AcDate';
import Transform from '@/pages/CustomerManagement/BusinessOpportunity/components/Transform';
export default {
    name: 'BusinessOpDrawer',
    props: ['record'],
    components: {
        DrawerHead,
        DrawerThree,
        DetailsInformation,
        Appendix,
        OperationRecord,
        DrActivities,
        FollowUp,
        NewTask,
        NewContact,
        NewContract,
        NewReturnMoney,
        EditBtn,
        AcDate,
        Transform,
    },
    data() {
        return {
            visible: false,
            currentWidth: document.body.clientWidth * 0.8,
            emprecord: {},
            collected: false,
            operation: [
                {
                    time: '2020-4-12',
                    name: 'admin',
                    info: '新建了商机',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将商机名称从小程序修改为管理小程序',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将商机阶段修改为验证客户',
                },
                {
                    time: '2020-6-21',
                    name: 'admin',
                    info: '删除了商机',
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
        showNewContact() {
            this.emprecord = {};
            this.$refs.NewContact.visible = true;
        },
        showNewContract() {
            this.emprecord = {};
            this.$refs.NewContract.visible = true;
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
        //打印方法
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
.mainContact {
    width: 100%;
    height: 100px;
    border: 1px solid #eceff5;
    border-radius: 10px;
    box-shadow: 2px 2px 5px #eceff5;
    display: flex;
    align-content: center;
    justify-items: center;
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
.imp-title {
    margin-top: 20px;
}
</style>
