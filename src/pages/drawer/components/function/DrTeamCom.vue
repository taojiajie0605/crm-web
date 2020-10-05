<template>
    <div class="dr-team-com">
        <a-row>
            <a-col :span="12" />
            <a-col :span="12" align="right">
                <a-button class="btn-shift" @click="add">+团队成员</a-button>
                <a-button class="btn-edit" @click="edit">编辑</a-button>
                <a-button class="btn-edit" @click="remove">移除</a-button>
                <a-button class="btn-edit" @click="quit">退出团队</a-button>
            </a-col>
        </a-row>
        <a-row>
            <a-table
                style="margin-top: 30px;"
                :columns="columns"
                :data-source="data"
                :pagination="false"
                :loading="loading"
                @change="handleTableChange"
                :row-selection="{
                    selectedRowKeys: selectedRowKeys,
                    onChange: onSelectbarChange,
                }"
            >
                <!--线索名称-->
                <span slot="name" slot-scope="record">
                    <a @click="id(record)">{{ record.name }} </a>
                </span>
            </a-table>
        </a-row>
        <a-modal
            title="退出团队"
            :visible="quitVisible"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            是否确定退出团队？
        </a-modal>
        <new-team-com ref="NewTeamCom" :records="records" />
    </div>
</template>

<script>
import NewTeamCom from './comp/NewTeamCom';
import { request, METHOD } from '@/utils/request';
const columns = [
    {
        title: '姓名',
        scopedSlots: { customRender: 'name' },
        key: 'name',
    },
    {
        title: '职位',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: '团队角色',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: '权限',
        dataIndex: 'right',
        key: 'right',
    },
];
export default {
    props: ['records'],
    name: 'DrTeamCom',
    components: {
        NewTeamCom,
    },
    data() {
        return {
            quitVisible: false,
            record: {},
            data: [],
            loading: false, //表格加载
            columns, //表格标题
            emprecord: {},
            staged: {},
            selectedRowKeys: [],
        };
    },
    mounted() {
        this.fetch({
            custid: this.records.id,
        });
    },
    methods: {
        quit() {
            this.quitVisible = true;
        },
        handleOk() {
            this.quitVisible = false;
        },
        handleCancel() {
            this.quitVisible = false;
        },
        edit() {},
        remove() {},
        add() {
            this.$refs.NewTeamCom.visible = true;
        },
        fetch(params = {}) {
            this.loading = true;
            request('/DrawerTeamMate', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.answer;
            });
        },
        onSelectbarChange(selectedRowKeys, Rowcontent) {
            //console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.Rowcontent = Rowcontent;
            this.selectedRowKeys = selectedRowKeys;
        },
    },
};
</script>

<style scoped>
.btn-shift {
    background-color: #389e0b;
    color: white;
}
.btn-edit {
    background-color: #2362fb;
    color: white;
    margin-left: 10px;
}
/* 先把a的样式弄成和普通text一致，等接口完善后删除这条a的样式即可 */
a {
    color: #565656;
    cursor: text;
}
</style>
