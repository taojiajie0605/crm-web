<template>
    <div class="customer-drawer">
        <a-drawer
            :visible="visible"
            placement="right"
            @close="onClose"
            :width="currentWidth"
            :closable="false"
        >
            <drawer-head
                :icontype="icontype"
                draggable="false"
                style="user-select: none;"
            >
                <template v-slot:icon>
                    <a-icon
                        type="team"
                        style="font-size: 36px; color: #2362fb;"
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
                <template v-slot:title> 客户 </template>
                <template v-slot:record>
                    {{ record.custname }}
                </template>
                <template v-slot:more>
                    <a-dropdown>
                        <a-button>...</a-button>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a
                                    rel="noopener noreferrer"
                                    href="#"
                                    @click="handleChangeState"
                                    >更改成交状态</a
                                >
                                <ChangeState
                                    ref="ChangeState"
                                    @fetchChangeState="fetchChangeState"
                                />
                            </a-menu-item>
                            <a-menu-item>
                                <a
                                    rel="noopener noreferrer"
                                    href="#"
                                    @click="handlePutSea"
                                    >放入公海</a
                                >
                                <PutSea
                                    ref="PutSea"
                                    @fetchPutSea="fetchPutSea"
                                />
                            </a-menu-item>
                            <a-menu-item>
                                <a
                                    rel="noopener noreferrer"
                                    href="#"
                                    @click="handleLock"
                                    >锁定</a
                                >
                            </a-menu-item>
                            <a-menu-item>
                                <a
                                    rel="noopener noreferrer"
                                    href="#"
                                    @click="handleUnlock"
                                    >解锁</a
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
                <template v-slot:firstBtn>
                    <a-button
                        class="clue-drawer-shift"
                        @click="handleTransform"
                    >
                        转移
                    </a-button>
                    <Transform ref="Transform" />
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
                                <h4>客户名称</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>手机</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>网址</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>客户行业</h4>
                                <a-select
                                    style="width: 80%;"
                                    default-value="请选择行业"
                                >
                                    <a-select-option value="it"
                                        >IT</a-select-option
                                    >
                                    <a-select-option value="sell"
                                        >销售</a-select-option
                                    >
                                    <a-select-option value="build"
                                        >房地产</a-select-option
                                    >
                                    <a-select-option value="trans"
                                        >运输</a-select-option
                                    >
                                    <a-select-option value="gov"
                                        >政府</a-select-option
                                    >
                                    <a-select-option value="busi"
                                        >商业</a-select-option
                                    >
                                    <a-select-option value="pro"
                                        >生产</a-select-option
                                    >
                                </a-select>
                            </div>
                            <div class="edit-item">
                                <h4>下次联系时间</h4>
                                <a-date-picker style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>地区</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>详细地址</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                        <template v-slot:editRight>
                            <div class="edit-item">
                                <h4>客户来源</h4>
                                <a-select
                                    style="width: 80%;"
                                    default-value="请选择来源"
                                >
                                    <a-select-option value="sell"
                                        >促销</a-select-option
                                    >
                                    <a-select-option value="search"
                                        >搜索引擎</a-select-option
                                    >
                                    <a-select-option value="ad"
                                        >广告</a-select-option
                                    >
                                    <a-select-option value="online"
                                        >线上</a-select-option
                                    >
                                    <a-select-option value="email"
                                        >电子邮件</a-select-option
                                    >
                                    <a-select-option value="call"
                                        >电话</a-select-option
                                    >
                                </a-select>
                            </div>
                            <div class="edit-item">
                                <h4>电话</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>邮箱</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>客户级别</h4>
                                <a-select
                                    default-value="请选择客户级别"
                                    style="width: 80%;"
                                >
                                    <a-select-option value="a"
                                        >A(重点客户)</a-select-option
                                    >
                                    <a-select-option value="b"
                                        >B(普通客户)</a-select-option
                                    >
                                    <a-select-option value="c"
                                        >C(非优先客户)</a-select-option
                                    >
                                </a-select>
                            </div>
                            <div class="edit-item">
                                <h4>备注</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                    </edit-btn>
                </template>
                <template v-slot:info1>
                    <h5>客户级别</h5>
                    <p>{{ record.custlevel }}</p>
                </template>
                <template v-slot:info2>
                    <h5>成交状态</h5>
                    <p>
                        {{ record.transactionstate === 1 ? '完成' : '未完成' }}
                    </p>
                </template>
                <template v-slot:info3>
                    <h5>负责人</h5>
                    <p>{{ record.person }}</p>
                </template>
                <template v-slot:info4>
                    <h5>更新时间</h5>
                    <p>{{ record.updatetime }}</p>
                </template>
            </drawer-head>
            <drawer-two-col>
                <template v-slot:twoColLeft>
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
                                                @click="showNewBusinessOp"
                                            >
                                                <a-icon type="plus-circle" />
                                                创建商机
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
                                            <a-select-option value="contact">
                                                <a-icon
                                                    type="phone"
                                                    theme="filled"
                                                    style="color: #27ba4a;"
                                                />
                                                联系人
                                            </a-select-option>
                                            <a-select-option value="buop">
                                                <a-icon
                                                    type="trophy"
                                                    theme="filled"
                                                    style="color: #ffb940;"
                                                />
                                                商机
                                            </a-select-option>
                                            <a-select-option value="cust">
                                                <a-icon
                                                    type="smile"
                                                    theme="filled"
                                                    style="color: #487dff;"
                                                />
                                                客户
                                            </a-select-option>
                                        </a-select>
                                    </template>
                                    <template v-slot:acDate>
                                        <ac-date>
                                            <template v-slot:acDateTag>
                                                2020-8-5
                                            </template>
                                            <template v-slot:acDateContent>
                                                <a-timeline>
                                                    <a-timeline-item>
                                                        admin 创建了客户2324
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin 修改客户2324为213
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin
                                                        修改了客户来源为线下
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin 删除了客户
                                                    </a-timeline-item>
                                                </a-timeline>
                                            </template>
                                        </ac-date>
                                        <ac-date>
                                            <template v-slot:acDateTag>
                                                2020-8-17
                                            </template>
                                            <template v-slot:acDateContent>
                                                <a-timeline>
                                                    <a-timeline-item>
                                                        admin 创建了客户2324
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin 修改客户2324为213
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin
                                                        修改了客户来源为线下
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin 删除了客户
                                                    </a-timeline-item>
                                                </a-timeline>
                                            </template>
                                        </ac-date>
                                        <ac-date>
                                            <template v-slot:acDateTag>
                                                2020-8-17
                                            </template>
                                            <template v-slot:acDateContent>
                                                <a-timeline>
                                                    <a-timeline-item>
                                                        admin 创建了客户2324
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin 删除了客户
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
                                <new-business-op
                                    ref="NewBusinessOp"
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
                                <details-info :record="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="3" tab="联系人">
                            <a-card class="tab-content">
                                <dr-contact :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="4" tab="团队成员">
                            <a-card class="tab-content">
                                <dr-team-com :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="5" tab="商机">
                            <a-card class="tab-content">
                                <dr-business-op :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="6" tab="合同">
                            <a-card class="tab-content">
                                <dr-contract :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="7" tab="回款">
                            <a-card class="tab-content">
                                <dr-return-money :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="8" tab="回访">
                            <a-card class="tab-content">
                                <dr-return-visit :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="9" tab="发票">
                            <a-card class="tab-content">
                                <dr-bill :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="10" tab="呼叫记录">
                            <a-card class="tab-content">
                                <call-record :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="11" tab="附件">
                            <a-card class="tab-content">
                                <appendix />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="12" tab="操作记录">
                            <a-card class="tab-content">
                                <operation-record :operation="operation" />
                            </a-card>
                        </a-tab-pane>
                    </a-tabs>
                </template>
                <template v-slot:twoColRight>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="重要信息">
                            <a-card class="tab-content">
                                <h3 style="font-weight: 600;">基本信息</h3>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">客户来源</h5>
                                    <h5>{{ record.custsource }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">客户行业</h5>
                                    <h5>{{ record.custindustry }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">客户级别</h5>
                                    <h5>{{ record.custlevel }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">客户名称</h5>
                                    <h5>{{ record.custname }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">手机</h5>
                                    <h5>{{ record.telephone }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">电话</h5>
                                    <h5>{{ record.phone }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">网址</h5>
                                    <h5>{{ record.website }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">邮箱</h5>
                                    <h5>{{ record.email }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">
                                        下次联系时间
                                    </h5>
                                    <h5>{{ record.nexttime }}</h5>
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
                                    <h5 style="color: #9f9f9f;">
                                        负责人获取客户时间
                                    </h5>
                                    <h5>{{ record.createtime }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">
                                        最后跟进记录
                                    </h5>
                                    <h5>{{ record.lastrecord }}</h5>
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
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">成交状态</h5>
                                    <h5>{{ record.transactionstate }}</h5>
                                </div>
                            </a-card>
                        </a-tab-pane>
                    </a-tabs>
                </template>
            </drawer-two-col>
        </a-drawer>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import DrawerHead from '../components/DrawerHead';
import DrawerTwoCol from '../components/DrawerTwoCol';
import DetailsInfo from './comp/DetailsInfo';
import Appendix from '../components/function/Appendix';
import OperationRecord from '../components/function/OperationRecord';
import DrContact from '../components/function/DrContact';
import DrBusinessOp from '@/pages/drawer/components/function/DrBusinessOp';
import DrContract from '@/pages/drawer/components/function/DrContract';
import DrReturnMoney from '@/pages/drawer/components/function/DrReturnMoney';
import DrReturnVisit from '@/pages/drawer/components/function/DrReturnVisit';
import DrBill from '@/pages/drawer/components/function/DrBill';
import CallRecord from '@/pages/drawer/components/function/CallRecord';
import DrActivities from '@/pages/drawer/components/function/DrActivities';
import FollowUp from '@/pages/drawer/components/function/comp/FollowUp';
import NewTask from '@/pages/drawer/components/function/comp/NewTask';
import CustAddForm from '@/pages/CustomerManagement/Contacts/components/CustAddForm';
import NewContact from '@/pages/drawer/components/function/comp/NewContact';
import NewBusinessOp from '@/pages/drawer/components/function/comp/NewBusinessOp';
import NewContract from '@/pages/drawer/components/function/comp/NewContract';
import NewReturnMoney from '@/pages/drawer/components/function/comp/NewContract';
import DrTeamCom from '@/pages/drawer/components/function/DrTeamCom';
import EditBtn from '@/pages/drawer/components/btn/EditBtn';
import AcDate from '@/pages/drawer/components/function/AcDate';
import Transform from '@/pages/CustomerManagement/Customer/components/comps/Transform';
import PutSea from '@/pages/CustomerManagement/Customer/components/comps/PutSea';
import ChangeState from '@/pages/CustomerManagement/Customer/components/comps/ChangeState';
export default {
    name: 'CustomerDrawer',
    props: ['record'],
    components: {
        DrawerHead,
        DrawerTwoCol,
        DetailsInfo,
        Appendix,
        OperationRecord,
        DrContact,
        DrBusinessOp,
        DrContract,
        DrReturnMoney,
        DrReturnVisit,
        DrBill,
        CallRecord,
        DrActivities,
        FollowUp,
        NewTask,
        CustAddForm,
        NewContact,
        NewBusinessOp,
        NewContract,
        NewReturnMoney,
        DrTeamCom,
        EditBtn,
        AcDate,
        Transform,
        PutSea,
        ChangeState,
    },
    data() {
        return {
            visible: false,
            currentWidth: document.body.clientWidth * 0.8,
            icontype: 'team',
            emprecord: {},
            collected: false,
            operation: [
                {
                    time: '2020-4-12',
                    name: 'admin',
                    info: '新建了客户',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将客户来源从线下修改成广告',
                },
                {
                    time: '2020-6-21',
                    name: 'admin',
                    info: '将客户行业从建筑修改成IT',
                },
                {
                    time: '2020-6-21',
                    name: 'admin',
                    info: '删除了客户',
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
        fetchadd(params = {}) {
            console.log('params:', params);
            this.loading = true;
            request('/CustomerManageContactsAdd', METHOD.POST, {
                results: this.pagination.pageSize,
                page: this.pagination.current,
                scene: this.scene,
                nameorphone: this.nameorphone,
                screencondition: this.screencondition,
                screencontent: this.screencontent,
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.data = data.data.answer;
                this.pagination = pagination;
                //弹出框
                this.loading = false;
                this.$message.success(data.data.msg);
                this.selectedRowKeys = []; //选择的条
            });
        },
        showNewContact() {
            this.emprecord = {};
            this.$refs.NewContact.visible = true;
        },
        showNewBusinessOp() {
            this.emprecord = {};
            this.$refs.NewBusinessOp.visible = true;
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
        //放入公海
        handlePutSea() {
            this.$refs.PutSea.visible = true;
        },
        //放入公海子调用方法
        fetchPutSea(putsea) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageCustomerTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
                //放入公海内容
                putsea: putsea,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
        //更改成交弹出框方法
        handleChangeState() {
            this.$refs.ChangeState.visible = true;
        },
        //更改成交子调用方法
        fetchChangeState(changestate) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageCustomerTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
                //更改内容
                changestate: changestate,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
        handleLock() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: (
                    <div style="color:black;">
                        确定要锁定这些客户吗？锁定后将不会掉入公海。
                    </div>
                ),
                onOk() {
                    //console.log('OK');
                    _this.fetchLock();
                },
                onCancel() {},
            });
        },
        //锁定选中调用方法
        fetchLock() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageCustomerTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },

        //点击解锁
        handleUnlock() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: <div style="color:black;">确定要解锁这些客户吗？</div>,
                onOk() {
                    //console.log('OK');
                    _this.fetchUnlock();
                },
                onCancel() {},
            });
        },
        //解锁选中调用方法
        fetchUnlock() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageCustomerTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
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
            request('/CustomerManageCustomerTrans', METHOD.POST, {
                Rowcontent: this.Rowcontent, //哪些行要操作
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.handleRefresh();
            });
        },
    },
};
</script>

<style>
.ant-drawer-wrapper-body {
    background-color: #f5f6f9;
}
.ant-drawer-body {
    padding: 0px;
}
.tab-content {
    overflow-y: scroll;
    height: 460px;
    border: hidden;
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
