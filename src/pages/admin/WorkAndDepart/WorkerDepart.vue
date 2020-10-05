<template>
    <a-row :gutter="[32, 8]">
        <a-col :span="5">
            <a-card
                title="企业组织架构"
                headStyle="font-weight:bold;font-size:16px;margin-left:0px;"
                bodyStyle="padding:0px;height:653px;"
            >
                <div>
                    <a-row>
                        <a-col :span="24">
                            <h3 style="margin-left: 10px; margin-top: 10px;">
                                <b>员工</b>
                            </h3>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :offset="1" :span="22">
                            <a-button
                                @click="showWorkerModal"
                                type="dashed"
                                block
                                >新建员工</a-button
                            >
                            <new-worker-form ref="worker" />
                        </a-col>
                    </a-row>
                    <a-menu
                        :default-selected-keys="['1']"
                        mode="inline"
                        :theme="theme"
                    >
                        <a-menu-item
                            v-for="(item, index) in source"
                            :key="item"
                        >
                            <div style="float: left; text-align: middle;">
                                <img
                                    style="
                                        width: 20px;
                                        height: 20px;
                                        margin-right: 10px;
                                    "
                                    :src="
                                        require('@/assets/img/icons/' +
                                            icons[index] +
                                            '.png')
                                    "
                                />
                                <a
                                    @click="changeTitleOfTable(item)"
                                    style="font-size: 14px;"
                                    size="large"
                                    icon="mail"
                                    >{{ item }}</a
                                >
                            </div>
                        </a-menu-item>
                    </a-menu>
                    <a-row>
                        <a-col :span="24">
                            <h3 style="margin-left: 10px; margin-top: 10px;">
                                <b>部门</b>
                            </h3>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :offset="1" :span="22">
                            <a-button
                                @click="showDepartModal"
                                type="dashed"
                                block
                                >创建部门</a-button
                            >
                            <new-depart-form ref="depart" />
                        </a-col>
                    </a-row>
                    <a-dropdown :trigger="['contextmenu']">
                        <div>
                            <div class="left" id="left">
                                <a-directory-tree
                                    style="font-size: 16px;"
                                    v-if="treeData.length > 0"
                                    :treeData="treeData"
                                    :defaultExpandAll="true"
                                    @select="this.onSelect"
                                    @rightClick="this.onRightClick"
                                />
                            </div>
                        </div>
                        <a-menu slot="overlay">
                            <a-menu-item key="1"> 编辑 </a-menu-item>
                            <a-menu-item key="2"> 删除 </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
            </a-card>
        </a-col>
        <a-col :span="19">
            <reset-passwd ref="resetpasswd" />
            <worker-drawer ref="drawer" :record="record" />
            <reset-login-account ref="resetlogin" />
            <a-card bodyStyle="padding:0px;">
                <template slot="title">
                    <template v-if="currentComponent === 1">
                        <div
                            style="
                                display: flex;
                                align-items: center;
                                width: 100%;
                            "
                        >
                            <div style="margin-right: 15px;">
                                {{ currentTable }}: {{ dataSource.length }}
                            </div>

                            <a-alert
                                style="width: 320px;"
                                message="未添加部门和角色的员工无法正常登录系统"
                                type="warning"
                                show-icon
                            />
                        </div>
                    </template>
                    <template v-else-if="currentComponent === 2">
                        <div
                            style="
                                height: 37px;
                                display: flex;
                                align-items: center;
                            "
                        >
                            <a-space>
                                <span
                                    >已选中 {{ selectedRowKeys.length }}项</span
                                >
                                <a-button
                                    size="small"
                                    shape="round"
                                    @click="disableUser"
                                    ><a-icon
                                        type="minus-circle"
                                    />禁用</a-button
                                >
                                <a-button
                                    size="small"
                                    shape="round"
                                    @click="activeUser"
                                    ><a-icon type="play-circle" />激活</a-button
                                >
                                <a-button size="small" shape="round">
                                    <a-icon type="edit" />编辑</a-button
                                >
                                <a-button
                                    size="small"
                                    shape="round"
                                    @click="showResetPasswdModal"
                                    ><a-icon type="lock" />重置密码</a-button
                                >
                                <a-button
                                    size="small"
                                    shape="round"
                                    @click="showRsetLoginModal"
                                >
                                    <a-icon type="redo" />重置登录帐号</a-button
                                >
                            </a-space>
                        </div>
                    </template>
                    <template v-else-if="currentComponent === 3">
                        <div
                            style="
                                height: 37px;
                                display: flex;
                                align-items: center;
                            "
                        >
                            <a-space>
                                <span
                                    >已选中 {{ selectedRowKeys.length }}项</span
                                >
                                <a-button
                                    size="small"
                                    shape="round"
                                    @click="disableUser"
                                    ><a-icon
                                        type="minus-circle"
                                    />禁用</a-button
                                >
                                <a-button
                                    size="small"
                                    shape="round"
                                    @click="activeUser"
                                    ><a-icon type="play-circle" />激活</a-button
                                >
                                <a-button
                                    size="small"
                                    shape="round"
                                    @click="showResetPasswdModal"
                                    ><a-icon type="lock" />重置密码</a-button
                                >
                            </a-space>
                        </div>
                    </template>
                    <template v-if="currentComponent === 4">
                        <div
                            style="
                                display: flex;
                                justify-content: space-around;
                            "
                        >
                            <div
                                style="
                                    display: flex;
                                    align-items: center;
                                    width: 100%;
                                "
                            >
                                <div style="margin-right: 15px;">
                                    {{ currentTable }}: {{ dataSource.length }}
                                </div>
                            </div>
                            <div>
                                <a-space>
                                    <a-button
                                        type="link"
                                        icon="plus-circle"
                                        @click="onDeleteDepart"
                                        >删除</a-button
                                    >
                                    <a-button type="link" icon="plus-circle"
                                        >编辑</a-button
                                    >
                                </a-space>
                            </div>
                        </div>
                    </template>
                </template>
                <div
                    style="
                        padding-left: 15px;
                        padding-right: 15px;
                        padding-top: 15px;
                    "
                >
                    <a-table
                        :row-selection="{
                            selectedRowKeys: selectedRowKeys,
                            onChange: onSelectChange,
                        }"
                        :columns="columns"
                        :dataSource="dataSource"
                    >
                        <a
                            slot="name"
                            @click="showDrawer(record)"
                            slot-scope="text, record"
                            >{{ text }}</a
                        >
                    </a-table>
                </div>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import NewWorkerForm from './components/NewWorkerForm';
import NewDepartForm from './components/NewDepartForm';
import WorkerDrawer from './components/WorkerDrawer';
import ResetPasswd from './components/ResetPasswd';
import ResetLoginAccount from './components/ResetLoginAccount';

const departColumns = [
    {
        title: '员工',
        dataIndex: 'item',
    },
];

const departDataSource = [];
const source = '所有员工 新加入的员工 激活员工 未激活员工 停用员工'.split(' ');
for (let i = 0; i < source.length; i++) {
    departDataSource.push({
        id: i,
        item: source[i],
    });
}

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        slots: { title: 'customTitle' },
        scopedSlots: { customRender: 'name' },
    },
    {
        title: '手机号',
        dataIndex: 'telephone',
    },
    {
        title: '性别',
        dataIndex: 'sex',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
    },
    {
        title: '部门',
        dataIndex: 'depart',
    },
    {
        title: '岗位',
        dataIndex: 'depart',
    },
    {
        title: '直属上级',
        dataIndex: 'leader',
    },
    {
        title: '角色',
        dataIndex: 'role',
    },
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
    components: {
        ResetLoginAccount,
        ResetPasswd,
        NewWorkerForm,
        NewDepartForm,
        WorkerDrawer,
    },
    data() {
        return {
            NodeTreeItem: null, // 右键菜单
            nodeId: 0,
            treeData: [
                {
                    value: '全公司',
                    label: '全公司',
                    title: '全公司',
                    key: '0-0',
                    children: [
                        {
                            value: '部门一',
                            label: '部门一',
                            title: '部门一',
                            key: '0-0-0',
                        },
                    ],
                },
            ],
            icons: ['users', 'zengjia', 'jihuo', 'shanchu', 'suoding'],
            record: {},
            currentItem: '',
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
            currentTable: '所有员工',
            selectedRowKeys: [], // Check here to configure the default column
            currentComponent: 1,
        };
    },
    watch: {
        selectedRowKeys: function (val) {
            if (val.length === 1) {
                this.currentComponent = 2;
            } else if (val.length >= 2) {
                this.currentComponent = 3;
            } else {
                this.currentComponent = 1;
            }
            // console.log(this.currentComponent);
        },
    },
    methods: {
        showRsetLoginModal() {
            this.$refs.resetlogin.showOrCloseModal();
        },
        showWorkerModal() {
            this.$refs.worker.showOrCloseModal();
        },
        showDepartModal() {
            this.$refs.depart.showOrCloseModal();
        },
        showDrawer(record) {
            this.record = record;
            this.$refs.drawer.showOrCloseDrawer();
            // console.log(record);
        },
        onSelectChange(selectedRowKeys) {
            // console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
        },
        showResetPasswdModal() {
            // console.log('sdkfj');
            // console.log(this.$refs.resetpasswd);
            this.$refs.resetpasswd.showOrCloseModal();
        },

        onDeleteDepart() {
            this.$confirm({
                title: '提示',
                content: '此操作将删除顶替部门，是否继续？',
                okText: '确认',
                cancelText: '取消',
            });
        },

        disableUser() {
            this.$confirm({
                title: '提示',
                content: '这些员工账号将被禁用, 是否继续?',
                okText: '确认',
                cancelText: '取消',
            });
        },
        activeUser() {
            this.$confirm({
                title: '提示',
                content: '这些员工账号将被激活, 是否继续?',
                okText: '确认',
                cancelText: '取消',
            });
        },
        clearMenu() {
            this.NodeTreeItem = null;
        },
        onSelect(selectedKeys, info) {
            //console.log(info.nativeEvent.target.innerText);
            this.currentComponent = 4;
            this.currentTable = info.nativeEvent.target.innerText;
            this.nodeId = selectedKeys[0];
            // console.log(this.nodeId);

            // ...
        },
        toggleAdvanced() {
            this.advanced = !this.advanced;
        },
        changeTitleOfTable(e) {
            this.currentComponent = 1;
            // console.log(e.target.innerHTML);
            this.currentTable = e;
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
        onselect(keys, event) {
            console.log('trigger select', keys, event);
            this.currentTable = keys[0];
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
.global {
    font-size: 18px;
}
</style>
