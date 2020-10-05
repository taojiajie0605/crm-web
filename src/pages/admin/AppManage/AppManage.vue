<template>
    <div>
        <a-card title="应用管理">
            <p class="font">
                已启用应用
            </p>
            <!-- 已启用应用 -->
            <div style="display: flex; flex-wrap: wrap;">
                <div
                    class="style1"
                    style="margin: 10px;"
                    :key="index"
                    v-for="(element, index) in appdata.useapp"
                >
                    <a-dropdown style="cursor: pointer;">
                        <a-icon
                            type="more"
                            style="
                                float: right;
                                margin-right: 8px;
                                margin-top: 5px;
                            "
                        />
                        <a-menu slot="overlay">
                            <a-menu-item @click="showStop(element)">
                                停用
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    <div class="flex">
                        <a-avatar
                            size="large"
                            shape="square"
                            :src="
                                require('@/assets/img/' +
                                    element.imgname +
                                    '.png')
                            "
                        />
                        <div class="font" style="margin-left: 10px;">
                            {{ element.appname }}
                        </div>
                    </div>
                </div>
            </div>

            <p class="font" style="margin-top: 15px;">
                已停用应用
            </p>
            <!-- 已启用应用 -->
            <div style="display: flex; flex-wrap: wrap;">
                <div
                    class="style1"
                    style="margin: 10px;"
                    :key="index"
                    v-for="(element, index) in appdata.stopapp"
                >
                    <a-dropdown style="cursor: pointer;">
                        <a-icon
                            type="more"
                            style="
                                float: right;
                                margin-right: 8px;
                                margin-top: 5px;
                            "
                        />
                        <a-menu slot="overlay">
                            <a-menu-item @click="showStart(element)">
                                启用
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    <div class="flex">
                        <a-avatar
                            size="large"
                            shape="square"
                            :src="
                                require('@/assets/img/' +
                                    element.imgname +
                                    '.png')
                            "
                        />
                        <div class="font" style="margin-left: 10px;">
                            {{ element.appname }}
                        </div>
                    </div>
                </div>
            </div>

            <p class="font" style="margin-top: 15px;">
                增值应用
            </p>
            <!-- 增值应用 -->
            <div style="display: flex; flex-wrap: wrap;">
                <div
                    class="style1"
                    style="margin: 10px;"
                    :key="index"
                    v-for="(element, index) in appdata.addapp"
                >
                    <div
                        style="
                            float: right;
                            margin-right: 8px;
                            margin-top: 5px;
                            cursor: pointer;
                            font-size: 10px;
                        "
                        @click="showModal"
                    >
                        了解详情
                        <a-icon type="right" />
                    </div>
                    <div class="flex">
                        <a-avatar
                            size="large"
                            shape="square"
                            :src="
                                require('@/assets/img/' +
                                    element.imgname +
                                    '.png')
                            "
                        />
                        <div class="font" style="margin-left: 10px;">
                            {{ element.appname }}
                        </div>
                    </div>
                </div>
            </div>

            <p class="font" style="margin-top: 15px;">
                敬请期待
            </p>
            <!-- 敬请期待 -->
            <div style="display: flex; flex-wrap: wrap;">
                <div
                    class="style1"
                    style="margin: 10px; position: relative;"
                    :key="index"
                    v-for="(element, index) in appdata.comingsoonapp"
                >
                    <div
                        style="
                            float: right;
                            margin-right: 8px;
                            margin-top: 5px;
                        "
                    >
                        <span class="moremark">即将发布</span>
                    </div>
                    <div class="flex">
                        <a-avatar
                            size="large"
                            shape="square"
                            :src="
                                require('@/assets/img/' +
                                    element.imgname +
                                    '.png')
                            "
                        />
                        <div class="font" style="margin-left: 10px;">
                            {{ element.appname }}
                        </div>
                    </div>
                </div>
            </div>
        </a-card>

        <!-- 增值业务 -->
        <a-modal
            v-model="visible"
            title="呼叫中心"
            width="700px"
            @ok="handleOk"
        >
            <p>
                您可以联系正云官方开通正云呼叫中心服务。开通后您可以获得以下服务：
            </p>
            <p>
                <a-icon type="phone" theme="twoTone" two-tone-color="#eb2f96" />
                官方服务热线：400-0812-558
            </p>
            <!--表单-->
            <a-table
                :columns="columns"
                :data-source="data"
                :pagination="false"
            />
        </a-modal>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';

const columns = [
    {
        title: '功能',
        dataIndex: 'function',
        key: 'function',
    },
    {
        title: '功能描述',
        key: 'functiondetail',
        dataIndex: 'functiondetail',
    },
];

export default {
    name: 'AppManage',
    data() {
        return {
            visible: false,
            appdata: {}, //应用

            columns, //表格标题
            data: [
                {
                    function: '一键外呼',
                    functiondetail: '在系统中点击拨号按钮就可以实现一键外呼。',
                },
                {
                    function: '呼入弹屏',
                    functiondetail:
                        '客户来电，自动匹配系统客户，一键查看客户信息。',
                },
                {
                    function: '通话录音',
                    functiondetail: '通话自动录音，支持在线播放和下载。',
                },
                {
                    function: '通话记录',
                    functiondetail:
                        '自动生成通话记录，可以随时查看通话时长、通话时间等信息。',
                },
            ], //表格数据
        };
    },
    mounted() {
        this.fetch();
    },

    methods: {
        //应用查询
        fetch() {
            //console.log('params:', params);
            request('/appdata', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
            }).then((data) => {
                //console.log('data:', data);
                // Read total count from server
                // pagination.total = data.totalCount;
                this.appdata = data.data.answer;
            });
        },

        // 停用
        showStop(app) {
            const _this = this;
            this.$confirm({
                title: '提示',
                content: (
                    <div style="color:black;">
                        停用任务审批后，企业所有员工将无法使用此功能。确定要停用吗
                    </div>
                ),
                onOk() {
                    request('/appstart', METHOD.POST, {
                        user: sessionStorage.userinfo, //用户信息
                        app: app, //要启用的应用
                    }).then((data) => {
                        //console.log('111');
                        _this.$message.success(data.data.msg);
                        this.fetch();
                    });
                },
                onCancel() {
                    //console.log('Cancel');
                },
            });
        },

        // 启用
        showStart(app) {
            request('/appstart', METHOD.POST, {
                user: sessionStorage.userinfo, //用户信息
                app: app, //要停用的应用
            }).then((data) => {
                //console.log('111');
                this.$message.success(data.data.msg);
                this.fetch();
            });
        },

        //了解详情
        showModal() {
            this.visible = true;
        },

        //点击确定
        handleOk() {
            this.visible = false;
        },
    },
};
</script>

<style lang="less" scoped>
.font {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
}
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    float: left;
    margin: 20px;
}

.style1 {
    width: 240px;
    height: 80px;
    border: 1px solid #96c2f1;
    border-radius: 10px 10px 10px 10px;
    box-shadow: 5px 5px 5px #ccc;
}
.style1:hover {
    background-color: rgb(245, 245, 214);
}

.moremark {
    color: #b3884f;
    font-size: 12px;
    background: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#f9f3ed),
        to(#f8e1be)
    );
    background: linear-gradient(90deg, #f9f3ed, #f8e1be);
    padding: 5px;
    border-radius: 2px;
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
    position: absolute;
    top: 10;
    right: 0;
}
//@import '../../../assets/aicon/iconfont.css';
</style>
