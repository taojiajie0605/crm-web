<template>
    <div>
        <a-tabs
            default-active-key="1"
            tabBarStyle="background-color:white;padding-right:10px;"
            type="line"
            @change="callback"
        >
            <a-tab-pane key="1" tab="全部">
                <div
                    align="right"
                    style="height: 700px; overflow-y: auto; overflow-x: hidden;"
                >
                    <return-money-drawer
                        ref="ReturnMoneyDrawer"
                        :record="record"
                    />
                    <contract-drawer ref="ContractDrawer" :record="record" />
                    <div v-for="item in data" :key="item">
                        <approval-cell
                            :userName="item.reviwer"
                            :auditor="item.reviwer"
                            :createTime="item.returnmoneydate"
                            :content="item.returnmoneynumber"
                            icon="money-collect"
                            :id="item.id"
                        >
                            <template slot="content">
                                <a-button
                                    type="link"
                                    @click="showOrCloseDrawer(item)"
                                    >{{ item.returnmoneynumber }}</a-button
                                >
                            </template>
                            <template slot="contract">
                                {{ item.contractnumber }}
                            </template>
                        </approval-cell>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="待我审批的" force-render>
                <div
                    align="right"
                    style="height: 700px; overflow-y: auto; overflow-x: hidden;"
                >
                    <return-money-drawer
                        ref="ReturnMoneyDrawer"
                        :record="record"
                    />
                    <contract-drawer ref="ContractDrawer" :record="record" />
                    <div v-for="item in data" :key="item">
                        <approval-cell
                            :userName="item.reviwer"
                            :auditor="item.reviwer"
                            :createTime="item.returnmoneydate"
                            :content="item.returnmoneynumber"
                            icon="money-collect"
                            :id="item.id"
                        >
                            <template slot="content">
                                <a-button
                                    type="link"
                                    @click="showOrCloseDrawer(item)"
                                    >{{ item.returnmoneynumber }}</a-button
                                >
                            </template>
                            <template slot="contract">
                                {{ item.contractnumber }}
                            </template>
                        </approval-cell>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="我已审批的">
                <div
                    align="right"
                    style="height: 700px; overflow-y: auto; overflow-x: hidden;"
                >
                    <return-money-drawer
                        ref="ReturnMoneyDrawer"
                        :record="record"
                    />
                    <contract-drawer ref="ContractDrawer" :record="record" />
                    <div v-for="item in data" :key="item">
                        <approval-cell
                            :userName="item.reviwer"
                            :auditor="item.reviwer"
                            :createTime="item.returnmoneydate"
                            :content="item.returnmoneynumber"
                            icon="money-collect"
                            :id="item.id"
                        >
                            <template slot="content">
                                <a-button
                                    type="link"
                                    @click="showOrCloseDrawer(item)"
                                    >{{ item.returnmoneynumber }}</a-button
                                >
                            </template>
                            <template slot="contract">
                                {{ item.contractnumber }}
                            </template>
                        </approval-cell>
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import ApprovalCell from './components/ApprovalCell';
import FormModal from '../BranchTask/components/FormModal';
import ReturnMoneyDrawer from '@/pages/drawer/ReturnMoneyDrawer';
import ContractDrawer from '@/pages/drawer/ContractDrawer';

const approvalType = '普通审批 请假审批 出差审批 加班审批 差旅报销 借款申请'.split(
    ' ',
);
const icons = 'folder skin switcher tablet wallet shop'.split(' ');
export default {
    data() {
        return {
            currentType: 'all',
            listData: this.$store.getters['returnmoney/getReturnmoney'],
            approvalType,

            totalreturnedmoney: 0, //回款金额
            selectedRowKeys: [], //选择的条
            Rowcontent: [], //选择条的内容
            record: {
                //表格一条数据
            },
            data: [], //表格数据
            pagination: {
                //分页
                current: 1,
                pageSize: 10,
            },
            loading: false, //表格加载

            //3个级联搜索
            nameorphone: '', //搜索框内容
            scene: '1', //场景内容
            screencondition: undefined, //筛选条件
            screencontent: '', //筛选内容
        };
    },
    mounted() {
        const pager = this.pagination;
        //this.pagination = pager;
        this.fetch({
            results: pager.pageSize,
            page: pager.current,
            scene: this.scene,
            nameorphone: this.nameorphone,
            screencondition: this.screencondition,
            screencontent: this.screencontent,
        });
    },
    components: {
        ApprovalCell,
        FormModal,
        ReturnMoneyDrawer,
        ContractDrawer,
    },
    computed: {},
    methods: {
        showIconModal() {
            // console.log(this.$store.getters['task/getTask']);
            console.log(this.listData);
            this.$refs.iconModal.showOrCloseModal();
        },
        showOrCloseDrawer(record) {
            this.$refs.ReturnMoneyDrawer.visible = true;
            this.record = record;
            console.log(this.record);
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManagereturnmoney', METHOD.POST, {
                ...params,
            }).then((data) => {
                // console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.data = data.data.answer;
                this.pagination = pagination;
                this.selectedRowKeys = []; //选择的条
                this.totalreturnedmoney = data.data.totalreturnedmoney; //回款金额
            });
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
