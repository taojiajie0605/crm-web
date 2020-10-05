<template>
    <!-- <a-row :gutter="[16,8]">
  <a-col :span="12"/>
  <a-col :span="12"/>
  </a-row>-->
    <a-row :gutter="[32, 8]">
        <a-col :span="24">
            <a-drawer
                title="Basic Drawer"
                placement="right"
                :closable="false"
                :visible="visible"
                :after-visible-change="afterVisibleChange"
                width="1200"
                @close="onClose"
            >
                <drawer-customer />
            </a-drawer>
            <a-card :title="currentTable">
                <div>
                    <a-table
                        :columns="columns"
                        :dataSource="dataSource"
                        :scroll="{ x: 1500, y: 900 }"
                        :row-selection="{
                            selectedRowKeys: selectedRowKeys,
                            onChange: onSelectChange,
                        }"
                    >
                        <a-icon type="calendar" />
                        <a
                            slot="drawer"
                            @click="showDrawer($event)"
                            slot-scope="text"
                            >{{ text }}</a
                        >
                    </a-table>
                    <!-- <drawer-customer ref="drawer"></drawer-customer> -->
                </div>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
//  import StandardTable from '@/components/table/StandardTable'

import DrawerCustomer from './components/DrawerCustomer';

const columns = [
    {
        title: '线索名称',
        dataIndex: 'name',
        fixed: 'left',
        width: '300',
        scopedSlots: { customRender: 'drawer' },
    },
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
];

const accessory = [
    { title: '附件名称', dataIndex: 'name' },
    { title: '附件大小', dataIndex: 'size' },
    { title: '上传人', dataIndex: 'user' },
    { title: '上传时间', dataIndex: 'upload' },
    { title: '来源', dataIndex: 'source' },
    { title: '操作', dataIndex: 'operation' },
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
    //  components: {StandardTable},
    components: { DrawerCustomer },
    data() {
        return {
            advanced: true,
            columns: columns,
            // departDataSource:departDataSource,
            dataSource: dataSource,
            newTabIndex: 0,
            selectedRows: [],
            ModalText: 'skldfjaksd',
            accessory: accessory,
            confirmLoading: false,
            selectedRowKeys: [], // Check here to configure the default column
            currentTable: '今日需联系客户',
            visible: false,
        };
    },
    computed: {
        hasSelected() {
            return this.selectedRowKeys.length > 0;
        },
    },
    // components: {
    //   DrawerCustomer,
    // },
    methods: {
        // drawer(event) {

        // console.log(event.tareget.innerHTML);
        // this.drawerVisible = true;
        // },
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
        start() {
            this.loading = true;
            // ajax request after empty completing
            setTimeout(() => {
                this.loading = false;
                this.selectedRowKeys = [];
            }, 1000);
        },
        showDrawer(event) {
            console.log(event.target.innerHTML);
            this.visible = true;
        },
        onClose() {
            this.visible = false;
        },
        // showDrawer(event) {
        //   console.log(event.target.innerHTML);
        //   this.$refs.drawer.showDrawer();
        //   // this.drawerVisible = true;
        //   // this.$emit('selectFunc');
        // },
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
