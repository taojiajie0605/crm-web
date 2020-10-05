<template>
    <!-- <a-row :gutter="[16,8]">
  <a-col :span="12"/>
  <a-col :span="12"/>
</a-row> -->

    <a-row :gutter="[32, 8]">
        <a-col :span="6">
            <a-card title="待办事项">
                <div>
                    <h3>员工</h3>
                    <a-list>
                        <a-list-item
                            v-for="(index, item) in source"
                            :key="item"
                        >
                            <a-avatar
                                slot="avatar"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                            <a @click="changaeTitleOfTable">
                                <span>{{ item }}{{ index }} </span>
                            </a>
                            <a-list-item-meta>
                                <div>content</div>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>
                    <br />
                </div>
            </a-card>
        </a-col>
        <a-col :span="18">
            <a-card :title="currentTable">
                <div>
                    <a-table
                        :columns="currnetColumns"
                        :dataSource="dataSource"
                        :scroll="{ x: 2600 }"
                    >
                        <div slot="description" slot-scope="{ text }">
                            {{ text }}
                        </div>
                        <div slot="action" slot-scope="{ text, record, index }">
                            <a-icon type="edit" />{{ index }}
                        </div>
                    </a-table>
                </div>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
// import StandardTable from '@/components/table/StandardTable'
const departColumns = [
    {
        title: '员工',
        dataIndex: 'item',
    },
];

const departDataSource = [];
const source = '今日需联系客户 分配给我的线索 分配给我的客户 待审核合同 待审核回款 待回款提醒 即将到期合同 待审核发票'.split(
    ' ',
);
// console.log(source);
for (let i = 0; i < source.length; i++) {
    departDataSource.push({
        id: i,
        item: source[i],
    });
}

//console.log(departDataSource);

const columns = [
    [
        { title: '网址', dataIndex: 'name' },
        { title: '客户名称', dataIndex: 'telephone' },
        { title: '客户来源', dataIndex: 'sex' },
        { title: '手机', dataIndex: 'email' },
        { title: '电话', dataIndex: 'depart' },
        { title: '邮箱', dataIndex: 'depart' },
        { title: '客户行业', dataIndex: 'leader' },
        { title: '下次联系时间', dataIndex: 'leader' },
        { title: '备注', dataIndex: 'leader' },
        { title: '锁定状态', dataIndex: 'leader' },
        { title: '成交状态', dataIndex: 'leader' },
        { title: '最后跟进时间', dataIndex: 'leader' },
        { title: '最后跟进时间', dataIndex: 'leader' },
        { title: '详细地址', dataIndex: 'leader' },
        { title: '地区定位', dataIndex: 'leader' },
        { title: '负责人', dataIndex: 'leader' },
        { title: '更新时间', dataIndex: 'leader' },
        { title: '创建时间', dataIndex: 'leader' },
        { title: '创建人', dataIndex: 'leader' },
        { title: '客户级别', dataIndex: 'role' },
    ],

    [
        { title: '线索名称', dataIndex: 'name' },
        { title: '线索来源', dataIndex: 'telephone' },
        { title: '手机', dataIndex: 'sex' },
        { title: '电话', dataIndex: 'email' },
        { title: '邮箱', dataIndex: 'depart' },
        { title: '客户行业', dataIndex: 'depart' },
        { title: '客户级别', dataIndex: 'leader' },
        { title: '备注', dataIndex: 'leader' },
        { title: '最后跟进时间', dataIndex: 'leader' },
        { title: '最后跟进负责', dataIndex: 'leader' },
        { title: '负责人', dataIndex: 'leader' },
        { title: '更新时间', dataIndex: 'leader' },
        { title: '创建时间', dataIndex: 'leader' },
        { title: '创建人', dataIndex: 'leader' },
        { title: '下次联系时间', dataIndex: 'role' },
    ],

    [
        { title: '网址', dataIndex: 'name' },
        { title: '客户名称', dataIndex: 'telephone' },
        { title: '客户来源', dataIndex: 'sex' },
        { title: '手机', dataIndex: 'email' },
        { title: '电话', dataIndex: 'depart' },
        { title: '邮箱', dataIndex: 'depart' },
        { title: '客户行业', dataIndex: 'leader' },
        { title: '下次联系时间', dataIndex: 'leader' },
        { title: '备注', dataIndex: 'leader' },
        { title: '锁定状态', dataIndex: 'leader' },
        { title: '成交状态', dataIndex: 'leader' },
        { title: '最后跟进时间', dataIndex: 'leader' },
        { title: '最后跟进时间', dataIndex: 'leader' },
        { title: '详细地址', dataIndex: 'leader' },
        { title: '地区定位', dataIndex: 'leader' },
        { title: '负责人', dataIndex: 'leader' },
        { title: '更新时间', dataIndex: 'leader' },
        { title: '创建时间', dataIndex: 'leader' },
        { title: '创建人', dataIndex: 'leader' },
        { title: '客户级别', dataIndex: 'role' },
    ],

    [
        { title: '合同编号', dataIndex: 'name' },
        { title: '合同名称', dataIndex: 'telephone' },
        { title: '客户名称', dataIndex: 'sex' },
        { title: '商机名称', dataIndex: 'email' },
        { title: '合同金额', dataIndex: 'depart' },
        { title: '下单时间', dataIndex: 'depart' },
        { title: '合同开始时间', dataIndex: 'leader' },
        { title: '合同结束时间', dataIndex: 'leader' },
        { title: '客户签约人', dataIndex: 'leader' },
        { title: '公司签约人', dataIndex: 'leader' },
        { title: '备注', dataIndex: 'leader' },
        { title: '合同类型', dataIndex: 'leader' },
        { title: '审核状态', dataIndex: 'leader' },
        { title: '已收款金额', dataIndex: 'leader' },
        { title: '未收款金额', dataIndex: 'leader' },
        { title: '最后跟进时间', dataIndex: 'leader' },
        { title: '负责人', dataIndex: 'leader' },
        { title: '更新时间', dataIndex: 'leader' },
        { title: '创建人', dataIndex: 'leader' },
        { title: '角色', dataIndex: 'role' },
    ],

    [
        { title: '回款编号', dataIndex: 'name' },
        { title: '客户名称', dataIndex: 'telephone' },
        { title: '合同编号', dataIndex: 'sex' },
        { title: '期数', dataIndex: 'email' },
        { title: '回款日期', dataIndex: 'depart' },
        { title: '回款金额', dataIndex: 'depart' },
        { title: '回款方式', dataIndex: 'leader' },
        { title: '审核状态', dataIndex: 'leader' },
        { title: '合同金额', dataIndex: 'leader' },
        { title: '负责人', dataIndex: 'leader' },
        { title: '更新时间', dataIndex: 'leader' },
        { title: '创建时间', dataIndex: 'leader' },
        { title: '创建人', dataIndex: 'role' },
    ],

    [
        { title: '期数', dataIndex: 'name' },
        { title: '客户名称', dataIndex: 'telephone' },
        { title: '合同编号', dataIndex: 'sex' },
        { title: '计划回款金额', dataIndex: 'email' },
        { title: '计划回款日期', dataIndex: 'depart' },
        { title: '计划回款方式', dataIndex: 'depart' },
        { title: '提前几日提醒', dataIndex: 'leader' },
        { title: '备注', dataIndex: 'role' },
    ],

    [
        { title: '合同编号', dataIndex: 'name' },
        { title: '合同名称', dataIndex: 'telephone' },
        { title: '客户名称', dataIndex: 'sex' },
        { title: '商机名称', dataIndex: 'email' },
        { title: '合同金额', dataIndex: 'depart' },
        { title: '下单时间', dataIndex: 'depart' },
        { title: '合同开始时间', dataIndex: 'leader' },
        { title: '合同结束时间', dataIndex: 'leader' },
        { title: '客户签约人', dataIndex: 'leader' },
        { title: '公司签约人', dataIndex: 'leader' },
        { title: '备注', dataIndex: 'leader' },
        { title: '合同类型', dataIndex: 'leader' },
        { title: '审核状态', dataIndex: 'leader' },
        { title: '已收款金额', dataIndex: 'leader' },
        { title: '未收款金额', dataIndex: 'leader' },
        { title: '最后跟进时间', dataIndex: 'leader' },
        { title: '负责人', dataIndex: 'leader' },
        { title: '更新时间', dataIndex: 'leader' },
        { title: '创建人', dataIndex: 'leader' },
        { title: '角色', dataIndex: 'role' },
    ],

    [
        { title: '发票申请票号', dataIndex: 'name' },
        { title: '客户名称', dataIndex: 'telephone' },
        { title: '合同编号', dataIndex: 'sex' },
        { title: '合同金额 ', dataIndex: 'email' },
        { title: '开票金额', dataIndex: 'depart' },
        { title: '开票日期', dataIndex: 'depart' },
        { title: '发票号码', dataIndex: 'depart' },
        { title: '物流单号', dataIndex: 'depart' },
        { title: '实际开票日期', dataIndex: 'leader' },
        { title: '负责人', dataIndex: 'leader' },
        { title: '审核状态', dataIndex: 'role' },
    ],
    // {
    //   title: '描述',
    //   dataIndex: 'description',
    //   scopedSlots: { customRender: 'description' }
    // },
    // {
    //   title: '服务调用次数',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   needTotal: true,
    //   customRender: (text) => text + ' 次'
    // },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   needTotal: true
    // },
    // {
    //   title: '更新时间',
    //   dataIndex: 'updatedAt',
    //   sorter: true
    // },
    // {
    //   title: '操作',
    //   scopedSlots: { customRender: 'action' }
    // }
];

const dataSource = [];

for (let i = 0; i < 100; i++) {
    dataSource.push({
        key: i,
        name: 'skdfjasd',
        telephone: '312351521',
        sex: '男',
        email: '122834052@qq.com',
        depart: 'sdkfjdks',
        leader: 'sdkfj',
        role: 'skdfj',
        no: 'NO ' + i,
        description: '这是一段描述',
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: '2018-07-26',
    });
}

export default {
    name: 'QueryList',
    // components: {StandardTable},
    data() {
        return {
            advanced: true,
            columns: columns,
            departColumns: departColumns,
            departDataSource: departDataSource,
            dataSource: dataSource,
            source: source,
            newTabIndex: 0,
            selectedRows: [],
            ModalText: 'skldfjaksd',
            visible: false,
            confirmLoading: false,
            currentTable: '今日需联系客户',
            currnetColumns: [],
        };
    },
    methods: {
        toggleAdvanced() {
            this.advanced = !this.advanced;
        },
        changaeTitleOfTable(e) {
            //console.log(e.target.innerHTML);
            this.currentTable = e.target.innerHTML;
            //console.log(this.currentTable[0]);
            console.log(this.columns[this.currentTable[0]]);

            this.currnetColumns = this.columns[this.currentTable[0]];
            // console.log(this.source.findIndex(this.currentTable));
            //console.log(this.source[1]===this.currentTable);
            // console.log(this.source.indexOf(this.currentTable[0]));

            //this.currnetColumns=
        },
        remove() {
            this.datasource = this.datasource.filter(
                (item) =>
                    this.selectedrows.findindex(
                        (row) => row.key === item.key,
                    ) === -1,
            );
            this.selectedrows = [];
        },
        onclear() {
            this.$message.info('您清空了勾选的所有行');
        },
        addnew() {
            this.datasource.unshift({
                key: this.datasource.length,
                no: 'no ' + this.datasource.length,
                description: '这是一段描述',
                callno: Math.floor(Math.random() * 1000),
                status: Math.floor(Math.random() * 10) % 4,
                updatedat: '2018-07-26',
            });
        },
        handlemenuclick(e) {
            if (e.key === 'delete') {
                this.remove();
            }
        },
        showModal() {
            this.visible = true;
        },
        handleOk() {
            this.ModalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
            }, 2000);
        },
        handleCancel() {
            console.log('Clicked cancel button');
            this.visible = false;
        },
    },
};
</script>

<style lang="less" scoped>
// .search{
//   margin-bottom: 54px;
// }
// .fold{
//   width: calc(100% - 216px);
//   display: inline-block
// }
// .operator{
//   margin-bottom: 18px;
// }
// @media screen and (max-width: 900px) {
//   .fold {
//     width: 100%;
//   }
// }
</style>
