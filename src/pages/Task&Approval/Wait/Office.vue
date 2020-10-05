<template>
    <div>
        <a-tabs
            default-active-key="1"
            tabBarStyle="background-color:white;padding-right:10px;"
            type="line"
            @change="callback"
        >
            <template slot="tabBarExtraContent">
                <a-select
                    label-in-value
                    default-value="all"
                    style="width: 120px;"
                    @change="handleChange"
                    v-model="currentType"
                >
                    <a-select-option value="all"> 全部审批 </a-select-option>
                    <a-select-option value="folder"> 普通审批 </a-select-option>
                    <a-select-option value="skin"> 请假审批 </a-select-option>
                    <a-select-option value="switcher">
                        出差审批
                    </a-select-option>
                    <a-select-option value="tablet"> 加班审批 </a-select-option>
                    <a-select-option value="wallet"> 差旅报销 </a-select-option>
                    <a-select-option value="shop">借款申请 </a-select-option>
                </a-select>
                <a-divider type="vertical" />
                <a-button type="primary" @click="showIconModal">
                    <form-modal ref="iconModal" />
                    新建审批
                </a-button>
                <a-divider type="vertical" />
                <a-button type="danger"> 导出 </a-button>
            </template>
            <a-tab-pane key="1" tab="全部">
                <div
                    align="right"
                    style="height: 700px; overflow-y: auto; overflow-x: hidden;"
                >
                    <div v-for="item in listData" :key="item">
                        <approval-cell
                            :userName="item.name"
                            :auditor="item.auditor"
                            :approvalType="item.type"
                            :createTime="item.time"
                            :content="item.content"
                            :icon="item.icon"
                            :id="item.id"
                        />
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="待审批" force-render>
                <div
                    align="right"
                    style="height: 700px; overflow-y: auto; overflow-x: hidden;"
                >
                    <div v-for="item in listData" :key="item">
                        <approval-cell
                            :userName="item.name"
                            :auditor="item.auditor"
                            :approvalType="item.type"
                            :createTime="item.time"
                            :content="item.content"
                            :icon="item.icon"
                            :id="item.id"
                        />
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="审批通过">
                <div
                    align="right"
                    style="height: 700px; overflow-y: auto; overflow-x: hidden;"
                >
                    <div v-for="item in listData" :key="item">
                        <approval-cell
                            :userName="item.name"
                            :auditor="item.auditor"
                            :approvalType="item.type"
                            :createTime="item.time"
                            :content="item.content"
                            :icon="item.icon"
                            :id="item.id"
                        />
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="4" tab="审批拒绝">
                <div
                    align="right"
                    style="height: 700px; overflow-y: auto; overflow-x: hidden;"
                >
                    <div v-for="item in listData" :key="item">
                        <approval-cell
                            :userName="item.name"
                            :auditor="item.auditor"
                            :approvalType="item.type"
                            :createTime="item.time"
                            :content="item.content"
                            :icon="item.icon"
                            :id="item.id"
                        />
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
        <!-- <a-card>
            <template slot="title">
                <div class="flex" align="left" style="float: left;">
                    <a-select
                        label-in-value
                        default-value="all"
                        style="width: 120px;"
                        @change="handleChange"
                        v-model="currentType"
                    >
                        <a-select-option value="all">
                            全部审批
                        </a-select-option>
                        <a-select-option value="folder">
                            普通审批
                        </a-select-option>
                        <a-select-option value="skin">
                            请假审批
                        </a-select-option>
                        <a-select-option value="switcher">
                            出差审批
                        </a-select-option>
                        <a-select-option value="tablet">
                            加班审批
                        </a-select-option>
                        <a-select-option value="wallet">
                            差旅报销
                        </a-select-option>
                        <a-select-option value="shop"
                            >借款申请
                        </a-select-option>
                    </a-select>
                </div>
                <div style="margin: auto; text-align: center;">
                    <a-menu mode="horizontal" :default-selected-keys="['1']">
                        <a-menu-item key="1">
                            全部
                        </a-menu-item>
                        <a-menu-item key="2">我负责的</a-menu-item
                        ><a-menu-item key="3"> 我参与的</a-menu-item>
                    </a-menu>
                </div>
            </template>
            <template slot="extra">
                <a-button @click="showIconModal">新建审批</a-button>
                <a-divider type="vertical" />
                <a-button>导出</a-button>
            </template>
        </a-card> -->
    </div>
</template>

<script>
import ApprovalCell from '../BranchTask/components/ApprovalCell';
import FormModal from '../BranchTask/components/FormModal';
import { mapGetters } from 'vuex';

const approvalType = '普通审批 请假审批 出差审批 加班审批 差旅报销 借款申请'.split(
    ' ',
);
const icons = 'folder skin switcher tablet wallet shop'.split(' ');
export default {
    data() {
        return {
            currentType: 'all',
            listData: this.$store.getters['task/getTask'],
            approvalType,
        };
    },
    components: {
        ApprovalCell,
        FormModal,
    },
    computed: {},
    methods: {
        showIconModal() {
            // console.log(this.$store.getters['task/getTask']);
            console.log(this.listData);
            this.$refs.iconModal.showOrCloseModal();
        },
    },
};
</script>

<style scoped>
.ant-tabs-extra-content[style] {
    float: right !important;
    /* float: unset !important; */
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
}
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
}
</style>
