<template>
    <div class="return-visit-drawer">
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
                        type="home"
                        style="font-size: 36px; color: #ff9232;"
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
                <template v-slot:title> 回访 </template>
                <template v-slot:record>
                    {{ record.returnvisitname }}
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
                                <h4>回访编号</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>回访人</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>客户名称</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>合同编号</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>客户反馈</h4>
                                <a-input style="width: 80%;" />
                            </div>
                        </template>
                        <template v-slot:editRight>
                            <div class="edit-item">
                                <h4>回访时间</h4>
                                <a-date-picker style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>回访形式</h4>
                                <a-select default-value="1" style="width: 80%;">
                                    <a-select-option value="1"
                                        >见面拜访</a-select-option
                                    >
                                    <a-select-option value="2"
                                        >电话</a-select-option
                                    >
                                    <a-select-option value="3"
                                        >短信</a-select-option
                                    >
                                    <a-select-option value="4"
                                        >邮件</a-select-option
                                    >
                                    <a-select-option value="5"
                                        >微信</a-select-option
                                    >
                                </a-select>
                            </div>
                            <div class="edit-item">
                                <h4>联系人</h4>
                                <a-input style="width: 80%;" />
                            </div>
                            <div class="edit-item">
                                <h4>客户满意度</h4>
                                <a-select default-value="1" style="width: 80%;">
                                    <a-select-option value="1"
                                        >很满意</a-select-option
                                    >
                                    <a-select-option value="2"
                                        >满意</a-select-option
                                    >
                                    <a-select-option value="3"
                                        >一般</a-select-option
                                    >
                                    <a-select-option value="4"
                                        >不满意</a-select-option
                                    >
                                    <a-select-option value="5"
                                        >很不满意</a-select-option
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
                    <h5>回访时间</h5>
                    <p>{{ record.returnvisittime }}</p>
                </template>
                <template v-slot:info3>
                    <h5>回访人</h5>
                    <p>{{ record.returnvisitperson }}</p>
                </template>
                <template v-slot:info4>
                    <h5>回访形式</h5>
                    <p>{{ record.returnvisittype }}</p>
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
                                            回访形式
                                        </div>
                                        <div class="details-info-content">
                                            回访编号
                                        </div>
                                        <div class="details-info-content">
                                            回访人
                                        </div>
                                        <div class="details-info-content">
                                            联系人
                                        </div>
                                        <div class="details-info-content">
                                            客户反馈
                                        </div>
                                    </template>
                                    <template v-slot:topContentLeft2>
                                        <div class="details-info-content">
                                            {{ record.returnvisittype }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.returnvisitname }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.returnvisitperson }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.contactname }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.custreturn }}
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight1>
                                        <div class="details-info-content">
                                            客户满意度
                                        </div>
                                        <div class="details-info-content">
                                            回访时间
                                        </div>
                                        <div class="details-info-content">
                                            客户名称
                                        </div>
                                        <div class="details-info-content">
                                            合同编号
                                        </div>
                                    </template>
                                    <template v-slot:topContentRight2>
                                        <div class="details-info-content">
                                            {{ record.custsatisfaction }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.returnvisittime }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.custname }}
                                        </div>
                                        <div class="details-info-content">
                                            {{ record.contractnumber }}
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
    name: 'ReturnVisitDrawer',
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
                    info: '新建了回访',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将回访形式从电话修改为见面拜访',
                },
                {
                    time: '2020-5-12',
                    name: 'admin',
                    info: '将回访人从临时工修改为经理',
                },
                {
                    time: '2020-6-21',
                    name: 'admin',
                    info: '删除了回访',
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
