<template>
    <a-row :gutter="[32, 8]">
        <a-col :span="5">
            <!--左侧menu-->
            <a-card
                title="系统管理角色"
                headStyle="font-weight:bold;font-size:16px;margin-left:0px;"
                bodyStyle="padding:0px;height:653px;"
            >
                <a slot="extra" @click="showCreateModal(item)">
                    <a-icon
                        type="plus-circle"
                        style="margin-right: 4px;"
                    />创建角色
                </a>
                <a-modal
                    title="新建角色"
                    :visible="createVisible"
                    :confirm-loading="confirmLoading"
                    @ok="handleCreateOk"
                    @cancel="handleCreateCancel"
                >
                    <p>角色名称</p>
                    <p><a-input v-model="editRole" /></p>
                </a-modal>
                <div>
                    <!--左侧menu内容-->
                    <a-menu
                        style="width: 100%;"
                        v-model="currentitem"
                        mode="inline"
                    >
                        <a-menu-item
                            v-for="item in menudata"
                            :key="item"
                            style="height: 55px; margin: 0px;"
                        >
                            <div
                                style="text-align: middle; padding-top: 5px;"
                                @click="changaeTitleOfTable(item)"
                            >
                                <a style="font-size: 14px;">{{ item }}</a>
                                <!--下拉菜单内容-->
                                <div
                                    v-if="item !== '超级管理员'"
                                    style="float: right;"
                                >
                                    <a-dropdown
                                        placement="bottomLeft"
                                        :trigger="['click']"
                                    >
                                        <a-icon type="down" />
                                        <a-menu slot="overlay">
                                            <a-menu-item
                                                key="1"
                                                @click="showCopyModal(item)"
                                            >
                                                <a-icon type="user" />复制
                                                <a-modal
                                                    title="提示"
                                                    :visible="copyVisible"
                                                    :confirm-loading="
                                                        confirmLoading
                                                    "
                                                    @ok="handleCopyOk"
                                                    @cancel="handleCopyCancel"
                                                >
                                                    <p>确定要复制吗</p>
                                                </a-modal>
                                            </a-menu-item>
                                            <a-menu-item
                                                key="2"
                                                @click="showEditModal(item)"
                                            >
                                                <a-modal
                                                    title="编辑角色"
                                                    :visible="editVisible"
                                                    :confirm-loading="
                                                        confirmLoading
                                                    "
                                                    @ok="handleEditOk"
                                                    @cancel="handleEditCancel"
                                                >
                                                    <p>角色名称</p>
                                                    <p>
                                                        <a-input
                                                            v-model="editRole"
                                                        />
                                                    </p>
                                                </a-modal>
                                                <a-icon type="user" />编辑
                                            </a-menu-item>
                                            <a-menu-item
                                                key="3"
                                                @click="showDeleteModal(item)"
                                            >
                                                <a-icon type="user" />删除
                                                <a-modal
                                                    title="提示"
                                                    :visible="deleteVisible"
                                                    :confirm-loading="
                                                        confirmLoading
                                                    "
                                                    @ok="handleDeleteOk"
                                                    @cancel="handleDeleteCancel"
                                                >
                                                    <p>确定要删除吗</p>
                                                </a-modal>
                                            </a-menu-item>
                                        </a-menu>
                                    </a-dropdown>
                                </div>
                            </div>
                        </a-menu-item>
                    </a-menu>
                </div>
            </a-card>
        </a-col>
        <a-col :span="19">
            <!--右侧table-->
            <a-tabs style="background-color: white;" type="line" size="large">
                <a-tab-pane key="1">
                    <span slot="tab">
                        <div style="font-size: 14px;">
                            角色员工
                        </div>
                    </span>
                    <div
                        align="right"
                        style="margin-right: 20px; margin-bottom: 10px;"
                    >
                        <a-button @click="showRelatedModal">关联员工</a-button>
                        <!--关联员工弹出框-->
                        <a-modal
                            title="关联员工"
                            :visible="relatedVisible"
                            :confirm-loading="confirmLoading"
                            @ok="handleRelatedOk"
                            @cancel="handleRelatedCancel"
                        >
                            <label>选择员工：</label>
                            <!--人员选择-->
                            <a-tree-select
                                show-search
                                style="width: 350px; margin-right: 10px;"
                                :dropdown-style="{
                                    maxHeight: '400px',
                                    overflow: 'auto',
                                }"
                                placeholder="选择人员"
                                allow-clear
                                multiple
                                tree-default-expand-all
                                @change="handleTreeChange"
                                maxTagCount="3"
                                v-model="staff"
                            >
                                <a-tree-select-node
                                    key="0-1"
                                    value="parent 1"
                                    title="员工"
                                >
                                    <a-tree-select-node
                                        key="0-1-1"
                                        value="员工1"
                                        title="员工1"
                                    />
                                    <a-tree-select-node
                                        key="0-1-2"
                                        value="员工2"
                                        title="员工2"
                                    />
                                </a-tree-select-node>
                                <a-tree-select-node
                                    key="0-2"
                                    value="parent 1"
                                    title="部门"
                                >
                                    <a-tree-select-node
                                        key="0-2-1"
                                        value="全公司"
                                        title="全公司"
                                    />
                                    <a-tree-select-node
                                        key="0-2-2"
                                        value="财务部"
                                        title="财务部"
                                    />
                                </a-tree-select-node>
                            </a-tree-select>
                        </a-modal>
                    </div>
                    <!--表格-->
                    <div style="padding-left: 15px; padding-right: 15px;">
                        <a-table
                            :columns="columns"
                            :dataSource="tabledata"
                            :pagination="pagination"
                            :loading="loading"
                            @change="handleTableChange"
                        >
                            <div slot="description" slot-scope="{ text }">
                                {{ text }}
                            </div>
                            <div slot="action" slot-scope="{ record }">
                                <a-icon
                                    @click="showDeleteonerecord(record)"
                                    type="delete"
                                />
                            </div>
                        </a-table>
                    </div>
                </a-tab-pane>
                <a-tab-pane v-if="this.currentitem !== '超级管理员'" key="2">
                    <span slot="tab">
                        <div style="font-size: 14px;">
                            角色权限
                        </div>
                    </span>
                    <a-tabs>
                        <a-button
                            style="margin-right: 20px;"
                            slot="tabBarExtraContent"
                            >保存</a-button
                        >
                        <a-tab-pane key="3" tab="应用权限">
                            <!--多选-->
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    线索管理
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions1"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    客户管理
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions2"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    联系人管理
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions3"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    商机管理
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions4"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    合同设置
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions5"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    回款管理
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions6"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    产品管理
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions7"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    小程序管理
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions8"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    市场活动
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions9"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    外勤
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions10"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    客户回访管理
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions11"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    发票管理
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions12"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    跟进记录管理
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions13"
                                    @change="onChange"
                                />
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="4" tab="数据分析">
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    业绩目标完成情况
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions21"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    销售漏斗
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions22"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    员工客户分析
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions23"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    员工业绩分析
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions24"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    产品分析
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions25"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    客户画像分析
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions26"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    排行榜
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions27"
                                    @change="onChange"
                                />
                            </div>
                            <div
                                style="
                                    margin-left: 20px;
                                    margin-top: 30px;
                                    margin-bottom: 50px;
                                "
                            >
                                <a-checkbox
                                    style="font-weight: bold;"
                                    :indeterminate="indeterminate1"
                                    :checked="checkAll1"
                                    @change="onCheckAllChange"
                                >
                                    呼叫中心
                                </a-checkbox>
                                <br />
                                <a-checkbox-group
                                    style="margin-top: 20px;"
                                    v-model="checkedList1"
                                    :options="plainOptions28"
                                    @change="onChange"
                                />
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="5" tab="数据权限">
                            <a-radio-group
                                v-model="valuesingle"
                                style="margin-left: 35px;"
                                @change="onChangeSingle"
                            >
                                <a-radio :style="radioStyle" :value="1">
                                    本人
                                </a-radio>
                                <a-radio :style="radioStyle" :value="2">
                                    本人及下属
                                </a-radio>
                                <a-radio :style="radioStyle" :value="3">
                                    本部门
                                </a-radio>
                                <a-radio :style="radioStyle" :value="4">
                                    本部门及下属部门
                                </a-radio>
                                <a-radio :style="radioStyle" :value="5">
                                    全部
                                </a-radio>
                            </a-radio-group>
                        </a-tab-pane>
                    </a-tabs>
                </a-tab-pane>
            </a-tabs>
        </a-col>
    </a-row>
</template>

<script>
import { request, METHOD } from '@/utils/request';

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
    },
    {
        title: '部门',
        dataIndex: 'department',
    },
    {
        title: '职位',
        dataIndex: 'position',
    },
    {
        title: '角色',
        dataIndex: 'role',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    name: 'CustManage',
    // components: {StandardTable},
    data() {
        return {
            staff: [], //关联员工人员
            tabledata: [], //表格数据
            pagination: {
                //分页
                current: 1,
                pageSize: 10,
            },
            columns: columns, //表格结构
            loading: false, //表格加载

            menudate: [], //菜单数据

            createVisible: false, //新建弹出框
            copyVisible: false, //复制弹出框
            editVisible: false, //编辑弹出框
            deleteVisible: false, //删除弹出框
            relatedVisible: false, //关联弹出框

            editRole: '', //编辑显示内容
            editRoleOld: '', //原来的名字
            currentitem: '', //当前的menuitem

            confirmLoading: false, //弹出框加载

            //多选框
            checkedList1: [],
            indeterminate1: false, //框半选
            checkAll1: false, //框全选
            plainOptions1: [
                '新建',
                '编辑',
                '查看列表',
                '查看详情',
                '导入',
                '导出',
                '删除',
                '转移',
                '转化',
            ], //一共多少选项
            plainOptions2: [
                '新建',
                '编辑',
                '查看列表',
                '查看详情',
                '导入',
                '导出',
                '删除',
                '转移',
                '放入公海',
                '锁定/解锁',
                '编辑团队成员',
                '设置成交状态',
                '附近的客户',
            ], //一共多少选项
            plainOptions3: [
                '新建',
                '编辑',
                '查看列表',
                '查看详情',
                '删除',
                '转移',
                '编辑团队成员',
                '联系人导出',
                '联系人导入',
            ], //一共多少选项
            plainOptions4: [
                '新建',
                '编辑',
                '查看列表',
                '查看详情',
                '删除',
                '转移',
                '编辑团队成员',
                '导出',
                '打印',
            ], //一共多少选项
            plainOptions5: [
                '新建',
                '编辑',
                '查看列表',
                '查看详情',
                '删除',
                '转移',
                '编辑团队成员',
                '合同作废',
                '导出',
                '打印',
            ], //一共多少选项
            plainOptions6: [
                '新建',
                '编辑',
                '查看列表',
                '查看详情',
                '删除',
                '转移',
                '导出',
                '打印',
            ], //一共多少选项
            plainOptions7: [
                '新建',
                '编辑',
                '查看列表',
                '查看详情',
                '上架/下架',
                '转移',
                '产品导入',
                '产品导出',
                '删除',
            ], //一共多少选项
            plainOptions8: ['小程序列表', '导出', '删除'], //一共多少选项
            plainOptions9: [
                '新建',
                '查看列表',
                '编辑',
                '删除',
                '停用/启用',
                '查看详情',
            ], //一共多少选项
            plainOptions10: ['新建', '查看', '删除', '设置'], //一共多少选项
            plainOptions11: ['新建', '编辑', '查看列表', '查看详情', '删除'], //一共多少选项
            plainOptions12: [
                '新建',
                '编辑',
                '查看列表',
                '查看详情',
                '删除',
                '转移',
                '标记开票',
                '重置开票信息',
            ], //一共多少选项
            plainOptions13: ['查看', '新建', '编辑', '删除'], //一共多少选项

            plainOptions21: ['查看'], //一共多少选项
            plainOptions22: ['查看'], //一共多少选项
            plainOptions23: ['查看'], //一共多少选项
            plainOptions24: ['查看'], //一共多少选项
            plainOptions25: ['查看'], //一共多少选项
            plainOptions26: ['查看'], //一共多少选项
            plainOptions27: ['查看'], //一共多少选项
            plainOptions28: ['查看通话记录', '通话记录分析'], //一共多少选项

            //单选框
            valuesingle: 1,
            //单选框样式
            radioStyle: {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
                marginTop: '10px',
            },
        };
    },

    //初始查询
    mounted() {
        const pager = this.pagination;
        //this.pagination = pager;
        this.fetch({
            results: pager.pageSize,
            page: pager.current,
        });
    },

    methods: {
        //点击分页
        handleTableChange(pagination) {
            //console.log(pagination);
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.fetchpage({
                results: pagination.pageSize,
                page: pagination.current,
                currentitem: this.currentitem, //当前menu项
            });
        },
        //初始查询
        fetch(params = {}) {
            console.log('params:', params);
            this.loading = true;
            request('/RoleCustManage', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.tabledata = data.data.tableanswer; //表格数据
                this.menudata = data.data.menuanswer; //表格数据
                this.currentitem = data.data.menuanswer[0]; //当前menu项
                //console.log("this.currentitem",this.currentitem);
                this.pagination = pagination;
            });
        },
        fetchpage(params = {}) {
            //分页
            //console.log('params:', params);
            this.loading = true;
            request('/RoleCustManage', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.tabledata = data.data.tableanswer; //表格数据
                this.menudata = data.data.menuanswer; //表格数据
                //console.log("this.currentitem",this.currentitem);
                this.pagination = pagination;
            });
        },

        //选择menu选框
        changaeTitleOfTable(item) {
            this.currentitem = item;
            //console.log("item",item)
            const pager = this.pagination;
            pager.current = 1;
            pager.pageSize = 10;
            this.pagination = pager;
            this.fetchchange({
                results: pager.pageSize,
                page: pager.current,
                currentitem: this.currentitem, //当前menu项
            });
        },
        fetchchange(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/RoleCustManage', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.tabledata = data.data.tableanswer; //表格数据
                this.menudata = data.data.menuanswer; //表格数据
                this.pagination = pagination;
            });
        },

        //创建角色弹出框
        showCreateModal() {
            this.createVisible = true;
            this.editRole = '';
        },
        handleCreateOk() {
            if (this.editRole === '' || this.editRole == null) {
                this.$message.error('角色名称不能为空');
            } else {
                this.confirmLoading = true;
                this.fetchadd({
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                    currentitem: this.currentitem, //当前menu项
                    editRole: this.editRole, //新建角色
                });
            }
        },
        handleCreateCancel() {
            this.createVisible = false;
        },
        fetchadd(params = {}) {
            console.log('params:', params);
            this.loading = true;
            request('/RoleCustManageadd', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.tabledata = data.data.tableanswer; //表格数据
                this.menudata = data.data.menuanswer; //表格数据
                this.pagination = pagination;
                this.success(data.data.msg); //操作弹出框

                this.confirmLoading = false;
                this.createVisible = false;
            });
        },
        success(msg) {
            //提示框
            this.$message.success(msg, 3);
        },

        //编辑弹出框
        showEditModal(item) {
            //console.log(item);
            this.editRole = item;
            this.editRoleOld = item;
            this.editVisible = true;
        },
        handleEditOk() {
            if (this.editRole === '' || this.editRole == null) {
                this.$message.error('角色名称不能为空');
            } else {
                this.confirmLoading = true;
                this.fetchmodify({
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                    currentitem: this.currentitem, //当前menu项
                    editRole: this.editRole, //修改后的角色名称
                    editRoleOld: this.editRoleOld, //修改前的角色名称
                });
            }
        },
        handleEditCancel() {
            this.editVisible = false;
        },
        fetchmodify(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/RoleCustManagemodify', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.tabledata = data.data.tableanswer; //表格数据
                this.menudata = data.data.menuanswer; //表格数据
                this.pagination = pagination;
                this.success(data.data.msg); //操作弹出框

                this.confirmLoading = false;
                this.editVisible = false;
            });
        },

        //复制弹出框
        showCopyModal(item) {
            //console.log(item);
            this.editRole = item;
            this.copyVisible = true;
        },
        handleCopyOk() {
            this.confirmLoading = true;
            this.fetchcopy({
                results: this.pagination.pageSize,
                page: this.pagination.current,
                currentitem: this.currentitem, //当前menu项
                editRole: this.editRole, //修改后的角色名称
            });
        },
        handleCopyCancel() {
            this.copyVisible = false;
        },
        fetchcopy(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/RoleCustManagecopy', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.tabledata = data.data.tableanswer; //表格数据
                this.menudata = data.data.menuanswer; //表格数据
                this.pagination = pagination;
                this.success(data.data.msg); //操作弹出框

                this.confirmLoading = false;
                this.copyVisible = false;
            });
        },

        //删除弹出框
        showDeleteModal(item) {
            //console.log(item);
            this.editRole = item;
            this.deleteVisible = true;
        },
        handleDeleteOk() {
            this.confirmLoading = true;
            this.fetchdelete({
                results: this.pagination.pageSize,
                page: this.pagination.current,
                currentitem: this.currentitem, //当前menu项
                editRole: this.editRole, //要删除的角色名称
            });
        },
        handleDeleteCancel() {
            this.deleteVisible = false;
        },
        fetchdelete(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/RoleCustManagedelete', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.tabledata = data.data.tableanswer; //表格数据
                this.menudata = data.data.menuanswer; //表格数据
                this.pagination = pagination;
                this.success(data.data.msg); //操作弹出框

                this.confirmLoading = false;
                this.deleteVisible = false;
            });
        },

        //删除表格一条记录方法
        showDeleteonerecord(record) {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: (
                    <div style="color:black;">此操作将永久删除是否继续?</div>
                ),
                onOk() {
                    //console.log('OK');
                    _this.fetchdeleteonerecord({
                        ...record,
                        results: _this.pagination.pageSize,
                        page: _this.pagination.current,
                        currentitem: _this.currentitem, //当前menu项
                    });
                },
                onCancel() {},
            });
        },
        fetchdeleteonerecord(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/RoleCustManagedeleteonerecord', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                this.loading = false;
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.tabledata = data.data.tableanswer; //表格数据
                this.menudata = data.data.menuanswer; //表格数据
                this.pagination = pagination;
                this.success(data.data.msg); //操作弹出框
            });
        },

        //创建关联员工弹出框
        showRelatedModal() {
            this.staff = []; //默认
            this.relatedVisible = true;
        },
        handleRelatedOk() {
            console.log(this.staff);
            if (this.staff.length == 0) {
                this.$message.error('请选择员工');
            } else {
                this.confirmLoading = true;
                this.fetchaddstaff({
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                    currentitem: this.currentitem, //当前menu项
                    staff: this.staff, //关联员工
                });
            }
        },
        handleRelatedCancel() {
            this.relatedVisible = false;
        },
        //关联员工多选框改变
        handleTreeChange(value) {
            //console.log(`Selected: ${value}`);
            this.staff = value;
            //console.log("Selected:", this.condition.staff);
        },
        fetchaddstaff(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/RoleCustManageaddstaff', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.tabledata = data.data.tableanswer; //表格数据
                this.menudata = data.data.menuanswer; //表格数据
                this.pagination = pagination;
                this.success(data.data.msg); //操作弹出框

                this.confirmLoading = false;
                this.relatedVisible = false;
            });
        },

        //点击编辑多选框方法
        onChange(checkedList1) {
            this.checkedList1 = checkedList1;
            this.indeterminate1 =
                !!checkedList1.length &&
                checkedList1.length < this.plainOptions1.length;
            this.checkAll1 = checkedList1.length === this.plainOptions1.length;
        },
        onCheckAllChange(e) {
            Object.assign(this, {
                checkedList1: e.target.checked ? this.plainOptions1 : [],
                indeterminate1: false,
                checkAll1: e.target.checked,
            });
        },

        onChangeSingle(e) {
            console.log('radio checked', e.target.value);
        },
    },
};
</script>

<style>
.radioStyle {
    display: 'block';
    height: '30px';
    line-height: '30px';
}
.card-container {
    background: #f5f5f5;
    overflow: hidden;
    padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
    height: 120px;
    margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
    padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
    border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    border-color: transparent;
    background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
    border-color: #fff;
    background: #fff;
}

.ant-tabs-nav-scroll {
    margin-left: 20px;
}
</style>
