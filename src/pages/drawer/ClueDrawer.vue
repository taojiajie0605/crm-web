<template>
    <div class="clue-drawer">
        <a-drawer
            placement="right"
            :visible="visible"
            :closable="false"
            @close="onClose"
            @ok="ok"
            :width="currentWidth"
        >
            <drawer-head draggable="false" style="user-select: none;">
                <template v-slot:icon>
                    <a-icon
                        type="branches"
                        style="font-size: 36px; color: #704afd;"
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
                <template v-slot:title> 线索 </template>
                <template v-slot:record>
                    {{ record.cluename }}
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
                                    @click="handleChangeCust"
                                    >转化为客户</a
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
                                <h4>线索名称</h4>
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
                        </template>
                        <template v-slot:editRight>
                            <div class="edit-item">
                                <h4>线索来源</h4>
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
                                <h4>地址</h4>
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
                    <h5>姓名</h5>
                    <p>{{ record.cluename }}</p>
                </template>
                <template v-slot:info2>
                    <h5>线索来源</h5>
                    <p>{{ record.cluesource }}</p>
                </template>
                <template v-slot:info3>
                    <h5>手机</h5>
                    <p>{{ record.phone }}</p>
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
            <drawer-two-col>
                <template v-slot:twoColLeft>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="活动">
                            <a-card class="tab-content">
                                <dr-activities :records="record">
                                    fsadfdsaffdafadfdas
                                    <template v-slot:acBtnRow>
                                        <div align="left">
                                            <a-button
                                                class="btn-row"
                                                @click="showFollowUp"
                                            >
                                                <a-icon type="plus-circle" />
                                                写跟进
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
                                                2020-9-15
                                            </template>
                                            <template v-slot:acDateContent>
                                                <a-timeline>
                                                    <a-timeline-item>
                                                        admin 创建了线索2324
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin 修改线索2324为213
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin
                                                        修改了线索来源为搜索引擎
                                                    </a-timeline-item>
                                                    <a-timeline-item>
                                                        admin 删除了线索
                                                    </a-timeline-item>
                                                </a-timeline>
                                            </template>
                                        </ac-date>
                                    </template>
                                </dr-activities>
                                <follow-up ref="FollowUp" />
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
                                            线索来源
                                        </div>
                                        <div class="details-info-content">
                                            客户级别
                                        </div>
                                        <div class="details-info-content">
                                            手机
                                        </div>
                                        <div class="details-info-content">
                                            邮箱
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
                                            {{ record.cluesource }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.custlevel }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.telephone }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.email }}
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
                                            客户行业
                                        </div>
                                        <div class="details-info-content">
                                            线索名称
                                        </div>
                                        <div class="details-info-content">
                                            电话
                                        </div>
                                        <div class="details-info-content">
                                            地址
                                        </div>
                                        <div class="details-info-content">
                                            备注
                                        </div>
                                        <div class="details-info-content">
                                            最后跟进记录
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight2>
                                        <div class="details-info-content">
                                            {{ record.custindustry }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.cluename }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.phone }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.address }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.remarks }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.lastrecord }}
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
                <template v-slot:twoColRight>
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="重要信息">
                            <a-card class="tab-content">
                                <h3 style="font-weight: 600;">基本信息</h3>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">线索来源</h5>
                                    <h5>{{ record.cluesource }}</h5>
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
                                    <h5 style="color: #9f9f9f;">线索名称</h5>
                                    <h5>{{ record.cluename }}</h5>
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
                                    <h5 style="color: #9f9f9f;">邮箱</h5>
                                    <h5>{{ record.email }}</h5>
                                </div>
                                <div class="imp-title">
                                    <h5 style="color: #9f9f9f;">地址</h5>
                                    <h5>{{ record.address }}</h5>
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
import DrActivities from './components/function/DrActivities';
import FollowUp from './components/function/comp/FollowUp';
import Transform from '@/pages/CustomerManagement/Clue/components/comps/Transform';
import EditBtn from '@/pages/drawer/components/btn/EditBtn';
import AcDate from './components/function/AcDate';
export default {
    name: 'ClueDrawer',
    props: ['record'],
    components: {
        DrawerHead,
        DrawerTwoCol,
        DetailsInformation,
        Appendix,
        OperationRecord,
        DrActivities,
        FollowUp,
        Transform,
        EditBtn,
        AcDate,
    },
    data() {
        return {
            visible: false,
            currentWidth: document.body.clientWidth * 0.8,
            thisrecord: this.record,
            collected: false,
            operation: [
                {
                    time: '2020-4-12',
                    name: 'admin',
                    info: '创建了线索',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '修改了线索',
                },
                {
                    time: '2020-6-21',
                    name: 'admin',
                    info: '分享',
                },
                {
                    time: '2020-6-21',
                    name: 'admin',
                    info: '删除了线索',
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
        starClick() {
            this.collected = !this.collected;
        },
        handleTransform() {
            this.$refs.Transform.visible = true;
        },
        edit() {
            this.$refs.EditBtn.visible = true;
        },
        //转化
        handleChangeCust() {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: (
                    <div style="color:black;">确定将这些线索转换为客户吗?</div>
                ),
                onOk() {
                    //console.log('OK');
                    _this.fetchChangeCust();
                },
                onCancel() {},
            });
        },
        fetchChangeCust() {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageclueTrans', METHOD.POST, {
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
.btn-row {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
}
.edit-item {
    margin-top: 20px;
}
.imp-title {
    margin-top: 20px;
}
</style>
