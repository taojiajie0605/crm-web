<template>
    <div>
        <a-tabs
            default-active-key="1"
            tabBarStyle="background-color:white;padding-right:10px;"
            type="line"
            @change="tabData"
            v-model="activeKey"
        >
            <template slot="tabBarExtraContent">
                <a-select
                    default-value="all"
                    style="width: 120px;"
                    @change="selectType"
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
                    <a-select-option value="借款申请"
                        >借款申请
                    </a-select-option>
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
                            :content="item.matter.content"
                            :icon="item.icon"
                            :id="item.id"
                            :info="item.info"
                            :status="item.status"
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
                            :content="item.matter.content"
                            :icon="item.icon"
                            :id="item.id"
                            :info="item.info"
                            :status="item.status"
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
                            :info="item.info"
                            :content="item.matter.content"
                            :icon="item.icon"
                            :id="item.id"
                            :status="item.status"
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
                            :content="item.matter.content"
                            :icon="item.icon"
                            :id="item.id"
                            :info="item.info"
                            :status="item.status"
                        />
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import ApprovalCell from './components/ApprovalCell';
import FormModal from './components/FormModal';

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
            activeKey: '1',
        };
    },
    components: {
        ApprovalCell,
        FormModal,
    },
    watch: {
        activeKey: (val) => {
            //    console.log(this.listData);
            //   console.log(val);
        },
    },
    methods: {
        selectType(value) {
            // console.log(value);
            const temp = this.listData.filter((value) => {
                return value.type.localeCompare(value);
            });
            console.log(temp);
        },
        showIconModal() {
            // console.log(this.$store.getters['task/getTask']);
            //  console.log(this.listData);
            this.$refs.iconModal.showOrCloseModal();
        },
        tabData() {
            const [activeKey] = this.activeKey;
            this.listData = this.$store.getters['task/getTask'];
            switch (activeKey) {
                case '1':
                    break;
                case '2':
                    this.listData = this.listData.filter((value) => {
                        return value.status === 'wait';
                    });
                    break;
                case '3':
                    this.listData = this.listData.filter((value) => {
                        return value.status === 'pass';
                    });
                    break;
                case '4':
                    this.listData = this.listData.filter((value) => {
                        return value.status === 'refuse';
                    });
                    break;
            }
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
