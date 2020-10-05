<template>
    <div class="contact-drawer">
        <a-drawer
            :visible="visible"
            placement="right"
            @close="onClose"
            :closable="false"
            :width="currentWidth"
        >
            <drawer-head
                :icontype="icontype"
                draggable="false"
                style="user-select: none;"
            >
                <template v-slot:icon>
                    <a-icon
                        type="contacts"
                        style="font-size: 36px; color: #27ba4a;"
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
                <template v-slot:title> 联系人 </template>
                <template v-slot:record>
                    {{ record.name }}
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
                                <h4>姓名</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>手机</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>邮箱</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>是否关键决策人</h4>
                                <a-select
                                    style="width: 80%;"
                                    default-value="yes"
                                >
                                    <a-select-option value="yes"
                                        >是</a-select-option
                                    >
                                    <a-select-option value="no"
                                        >否</a-select-option
                                    >
                                </a-select>
                            </div>
                            <div class="edit-item">
                                <h4>下次联系时间</h4>
                                <a-date-picker style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>性别</h4>
                                <a-select
                                    default-value="male"
                                    style="width: 80%;"
                                >
                                    <a-select-option value="male"
                                        >男</a-select-option
                                    >
                                    <a-select-option value="female"
                                        >女</a-select-option
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
                                <h4>电话</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>职务</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>地址</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>备注</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                    </edit-btn>
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
                <template v-slot:info1>
                    <h5>客户名称</h5>
                    <p>{{ record.custname }}</p>
                </template>
                <template v-slot:info2>
                    <h5>职务</h5>
                    <p>{{ record.position }}</p>
                </template>
                <template v-slot:info3>
                    <h5>手机</h5>
                    <p>{{ record.telephone }}</p>
                </template>
                <template v-slot:info4>
                    <h5>创建时间</h5>
                    <p>{{ record.createtime }}</p>
                </template>
            </drawer-head>
            <drawer-two-col>
                <template v-slot:twoColRight>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="重要信息">
                            <a-card class="tab-content">
                                <h3 style="font-weight: 600;">基本信息</h3>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">
                                        是否为关键决策人
                                    </h5>
                                    <h5>{{ record.maker }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">性别</h5>
                                    <h5>
                                        {{ record.gender === 1 ? '男' : '女' }}
                                    </h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">姓名</h5>
                                    <h5>{{ record.name }}</h5>
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
                                    <h5 style="color: #9f9f9f;">职务</h5>
                                    <h5>{{ record.position }}</h5>
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
                                    <h5 style="color: #9f9f9f;">地址</h5>
                                    <h5>{{ record.address }}</h5>
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
                                    <h5 style="color: #9f9f9f;">客户名称</h5>
                                    <h5>{{ record.custname }}</h5>
                                </div>
                            </a-card>
                        </a-tab-pane>
                    </a-tabs>
                </template>
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
                                                        admin 创建了联系人2324
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin
                                                        修改联系人2324为213
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin 删除了联系人
                                                    </a-timeline-item>
                                                </a-timeline>
                                            </template>
                                        </ac-date>
                                    </template>
                                </dr-activities>
                                <follow-up ref="FollowUp" />
                                <new-task ref="NewTask" :records="record" />
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
                                <details-information>
                                    <template v-slot:topTitle>
                                        <div class="details-info-staf"></div>
                                        <div class="details-info-text">
                                            基本信息
                                        </div>
                                    </template>
                                    <template v-slot:topContentLeft1>
                                        <div class="details-info-content">
                                            是否关键决策人
                                        </div>
                                        <div class="details-info-content">
                                            姓名
                                        </div>
                                        <div class="details-info-content">
                                            电话
                                        </div>
                                        <div class="details-info-content">
                                            职务
                                        </div>
                                        <div class="details-info-content">
                                            下次联系时间
                                        </div>
                                        <div class="details-info-content">
                                            负责人
                                        </div>
                                    </template>
                                    <template v-slot:topContentLeft2>
                                        <div class="details-info-content">
                                            {{
                                                record.maker === 1 ? '是' : '否'
                                            }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.name }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.phone }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.position }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.nexttime }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.person }}
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight1>
                                        <div class="details-info-content">
                                            性别
                                        </div>
                                        <div class="details-info-content">
                                            手机
                                        </div>
                                        <div class="details-info-content">
                                            邮箱
                                        </div>
                                        <div class="details-info-content">
                                            地址
                                        </div>
                                        <div class="details-info-content">
                                            备注
                                        </div>
                                        <div class="details-info-content">
                                            客户名称
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight2>
                                        <div class="details-info-content">
                                            {{
                                                record.gender === 1
                                                    ? '男'
                                                    : '女'
                                            }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.telephone }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.email }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.address }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.remarks }}
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
                        <a-tab-pane key="3" tab="商机">
                            <a-card class="tab-content">
                                <dr-business-op :records="record" />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="4" tab="附件">
                            <a-card class="tab-content">
                                <appendix />
                            </a-card>
                        </a-tab-pane>
                        <a-tab-pane key="5" tab="操作记录">
                            <a-card class="tab-content">
                                <operation-record :operation="operation" />
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
import DrawerHead from './components/DrawerHead';
import DrawerTwoCol from './components/DrawerTwoCol';
import DetailsInformation from './components/function/DetailsInformation';
import Appendix from './components/function/Appendix';
import OperationRecord from './components/function/OperationRecord';
import DrBusinessOp from '@/pages/drawer/components/function/DrBusinessOp';
import DrActivities from '@/pages/drawer/components/function/DrActivities';
import FollowUp from '@/pages/drawer/components/function/comp/FollowUp';
import NewTask from '@/pages/drawer/components/function/comp/NewTask';
import NewBusinessOp from '@/pages/drawer/components/function/comp/NewBusinessOp';
import NewContract from '@/pages/drawer/components/function/comp/NewContract';
import NewReturnMoney from '@/pages/drawer/components/function/comp/NewReturnMoney';
import EditBtn from '@/pages/drawer/components/btn/EditBtn';
import AcDate from './components/function/AcDate';
import Transform from '@/pages/CustomerManagement/Contacts/components/Transform';
export default {
    name: 'ContactDrawer',
    props: ['record'],
    components: {
        DrawerHead,
        DrawerTwoCol,
        DetailsInformation,
        Appendix,
        OperationRecord,
        DrBusinessOp,
        DrActivities,
        FollowUp,
        NewTask,
        NewBusinessOp,
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
            collected: false,
            emprecord: {},
            icontype: 'contacts',
            operation: [
                {
                    time: '2020-4-12',
                    name: 'admin',
                    info: '创建了联系人',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将联系人职务从经理修改成老板',
                },
                {
                    time: '2020-6-21',
                    name: 'admin',
                    info: '删除了联系人',
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
