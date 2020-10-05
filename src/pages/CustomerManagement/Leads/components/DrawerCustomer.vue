<template>
    <!-- <a-row :gutter="[16,8]">
  <a-col :span="12"/>
  <a-col :span="12"/>
  </a-row>-->
    <div>
        <a-row :gutter="[32, 8]">
            <a-row>
                <a-col :span="24">
                    <a-row>
                        <a-col :span="12">
                            <div style="margin-left: 10px;">
                                <a-icon
                                    style="font-size: 50px;"
                                    type="setting"
                                    theme="filled"
                                />
                            </div>
                        </a-col>
                        <a-col :offset="7" :span="5">
                            <a-modal
                                title="转移"
                                :visibe="moveVisible"
                                @ok="handleMoveOk"
                                @cancel="handleMoveCancel"
                            />
                            <a-button type="primary" @click="showMoveModal"
                                >转移</a-button
                            >&nbsp; &nbsp; &nbsp;
                            <a-button
                                @click="showEditModal"
                                style="margint-left: 10px;"
                                type="primary"
                                >编辑</a-button
                            >
                            <a-modal
                                title="编辑线索"
                                :visible="editVisible"
                                @ok="handleEditOk"
                                centered
                                @cancel="handleEditCancel"
                                :maskStyle="{ 'background-color': '#fff' }"
                                :bodyStyle="{ height: '600px' }"
                            >
                                <edit-leads-form />
                            </a-modal>
                            <a-dropdown>
                                <a-menu slot="overlay" @click="handleMenuClick">
                                    <a-modal
                                        title="提示"
                                        :visible="convertVisible"
                                        @ok="handleConvertOk"
                                        @cancel="handleConvertCancel"
                                    >
                                        <p>
                                            <a-icon
                                                type="exclamation-circle"
                                                size="20"
                                            />
                                            确定将这些线索转换为客户吗?
                                        </p>
                                    </a-modal>
                                    <a-menu-item
                                        key="1"
                                        @click="showConvertModal"
                                    >
                                        <a-icon type="user" />转化为客户
                                    </a-menu-item>
                                    <a-menu-item
                                        key="2"
                                        @click="showDeleteModal"
                                    >
                                        <a-modal
                                            title="提示"
                                            :visible="deleteVisible"
                                            @ok="handleDeleteOk"
                                            @cancel="handleDeleteCancel"
                                        >
                                            <p>
                                                <a-icon
                                                    type="exclamation-circle"
                                                    size="20"
                                                />
                                                确定删除
                                            </p>
                                        </a-modal>
                                        <a-icon type="user" />
                                        删除
                                    </a-menu-item>
                                </a-menu>
                                <a-button style="margin-left: 8px;">
                                    ...
                                    <a-icon type="down" />
                                </a-button>
                            </a-dropdown>
                            <!-- <a-button style="margint-left:10px;" type="primary">...</a-button> -->
                        </a-col>
                    </a-row>
                    <br />
                    <a-row>
                        <a-col style="margin-left: 10px;" :span="4">
                            <a-statistic
                                title="姓名"
                                :value="112893"
                                style="margin-right: 50px;"
                            />
                        </a-col>
                        <a-col :offset="1" :span="4">
                            <a-statistic
                                title="线索来源"
                                :precision="2"
                                :value="112893"
                            />
                        </a-col>
                        <a-col :offset="1" :span="4">
                            <a-statistic
                                title="手机"
                                :value="112893"
                                style="margin-right: 50px;"
                            />
                        </a-col>
                        <a-col :offset="1" :span="4">
                            <a-statistic
                                title="负责人"
                                :precision="2"
                                :value="112893"
                            />
                        </a-col>
                        <a-col :offset="1" :span="3">
                            <a-statistic
                                title="创建时间"
                                :precision="2"
                                :value="112893"
                            />
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="15">
                    <div>
                        <a-tabs default-active-key="1" type="editable-card">
                            <a-tab-pane key="1" tab="活动">
                                <div style="margin-left: 10px;">
                                    <a-tag color="pink">写跟进</a-tag>
                                    <!-- <a-tag color="red">创建任务</a-tag>
                  <a-tag color="orange">创建联系人</a-tag>
                  <a-tag color="green">创建商机</a-tag>
                  <a-tag color="cyan">创建合同</a-tag>
                  <a-tag color="blue">创建回款</a-tag>-->
                                </div>

                                <div
                                    style="margin-top: 30px; margin-left: 10px;"
                                >
                                    <quill-editor
                                        ref="myQuillEditor"
                                        v-model="content"
                                        :options="editorOption"
                                        @blur="onEditorBlur($event)"
                                        @focus="onEditorFocus($event)"
                                        @ready="onEditorReady($event)"
                                    />
                                </div>

                                <div
                                    style="margin-top: 30px; margin-left: 10px;"
                                ></div>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="详细资料" force-render>
                                <h2>基本信息</h2>
                                <a-row>
                                    <a-col :span="12">
                                        <a-statistic
                                            title="线索来源"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="客户行业"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="线索来源"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="客户行业"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                    </a-col>
                                    <a-col :span="12">
                                        <a-statistic
                                            title="线索来源"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="客户行业"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="线索来源"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="客户行业"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                    </a-col>
                                </a-row>

                                <h2>系统信息</h2>
                                <a-row>
                                    <a-col :span="12">
                                        <a-statistic
                                            title="线索来源"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="客户行业"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="线索来源"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="客户行业"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                    </a-col>
                                    <a-col :span="12">
                                        <a-statistic
                                            title="线索来源"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="客户行业"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="线索来源"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                        <a-statistic
                                            title="客户行业"
                                            :value="112893"
                                            style="margin-right: 50px;"
                                        />
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="附件">
                                <a-upload type="primary">
                                    <a-button>上传附件</a-button>
                                </a-upload>
                                <a-table :columns="columns" />
                            </a-tab-pane>
                            <a-tab-pane key="4" tab="操作记录">
                                <a-timeline mode="alternate">
                                    <a-timeline-item
                                        >Create a services site
                                        2015-09-01</a-timeline-item
                                    >
                                    <a-timeline-item color="green"
                                        >Solve initial network problems
                                        2015-09-01</a-timeline-item
                                    >
                                    <a-timeline-item>
                                        <a-icon
                                            slot="dot"
                                            type="clock-circle-o"
                                            style="font-size: 16px;"
                                        />Sed ut perspiciatis unde omnis iste
                                        natus error sit voluptatem accusantium
                                        doloremque laudantium, totam rem
                                        aperiam, eaque ipsa quae ab illo
                                        inventore veritatis et quasi architecto
                                        beatae vitae dicta sunt explicabo.
                                    </a-timeline-item>
                                    <a-timeline-item color="red"
                                        >Network problems being solved
                                        2015-09-01</a-timeline-item
                                    >
                                    <a-timeline-item
                                        >Create a services site
                                        2015-09-01</a-timeline-item
                                    >
                                    <a-timeline-item>
                                        <a-icon
                                            slot="dot"
                                            type="clock-circle-o"
                                            style="font-size: 16px;"
                                        />Technical testing 2015-09-01
                                    </a-timeline-item>
                                </a-timeline>
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </a-col>
                <a-col :offset="1" :span="7">
                    <a-tabs type="editable-card">
                        <a-tab-pane tab="重要信息" key="5">
                            <a-statistic
                                title="基本信息"
                                :value="112893"
                                style="margin-right: 50px;"
                            />
                            <a-statistic
                                title="线索来源"
                                :value="112893"
                                style="margin-right: 50px;"
                            />
                            <a-statistic
                                title="广告"
                                :value="112893"
                                style="margin-right: 50px;"
                            />
                            <a-statistic
                                title="客户行业"
                                :value="112893"
                                style="margin-right: 50px;"
                            />
                            <a-statistic
                                title="商业服务"
                                :value="112893"
                                style="margin-right: 50px;"
                            />
                            <a-statistic
                                title="客户级别"
                                :value="112893"
                                style="margin-right: 50px;"
                            />
                            <a-statistic
                                title="线索名称"
                                :value="112892"
                                style="margin-right: 50px;"
                            />
                            <a-statistic
                                title="手机"
                                :value="112892"
                                style="margin-right: 50px;"
                            />
                            <a-statistic
                                title="电话"
                                :value="112892"
                                style="margin-right: 50px;"
                            />
                        </a-tab-pane>
                    </a-tabs>
                </a-col>
            </a-row>
        </a-row>
    </div>
</template>

<script>
import EditLeadsForm from './EditLeadsForm';

const columns = [
    {
        title: '附件名称',
        dataIndex: 'name',
    },
    {
        title: '附件大小',
        dataIndex: 'size',
    },
    {
        title: '上传人',
        dataIndex: 'owner',
    },
    {
        title: '来源',
        dataIndex: 'owner',
    },
    {
        title: '操作',
        dataIndex: 'owner',
    },
];
export default {
    name: 'DrawerCustomer',
    components: { EditLeadsForm },
    //  components:{quillEditor},
    data() {
        return {
            columns,
            content: '<h2>I am Example</h2>',
            deleteVisible: false,
            moveVisible: false,
            convertVisible: false,
            editVisible: false,
            editorOption: {
                //  富文本编辑器配置
                modules: {
                    toolbar: '#toolbar',
                },
                theme: 'snow',
                placeholder: '请输入正文',
            },
        };
    },
    methods: {
        showMoveModal() {
            this.moveVisible = true;
        },
        handleMoveOk(e) {
            console.log(e.target.envent);
            this.moveVisible = false;
        },
        handleMoveCancel(e) {
            console.log(e.target.envent);
            this.moveVisible = false;
        },
        showConvertModal() {
            this.convertVisible = true;
        },
        handleConvertOk(e) {
            console.log(e.target.envent);
            this.convertVisible = false;
        },
        handleConvertCancel(e) {
            console.log(e.target.envent);
            this.convertVisible = false;
        },
        showEditModal() {
            this.editVisible = true;
        },
        handleEditOk(e) {
            console.log(e.target.envent);
            this.editVisible = false;
        },
        handleEditCancel(e) {
            console.log(e.target.envent);
            this.editVisible = false;
        },

        showDeleteModal() {
            this.deleteVisible = true;
        },
        handleDeleteOk(e) {
            console.log(e.target.envent);
            this.deleteVisible = false;
        },
        handleDeleteCancel(e) {
            console.log(e.target.envent);
            this.deleteVisible = false;
        },
        onEditorBlur(quill) {
            console.log('editor blur!', quill);
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill);
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill);
        },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text);
            this.content = html;
        },
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
    mounted() {
        console.log('this is current quill instance object', this.editor);
    },
};
</script>
