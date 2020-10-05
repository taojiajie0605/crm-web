<template>
    <div>
        <a-drawer
            @close="showOrCloseDrawer"
            :closable="false"
            width="500px"
            :visible="visible"
        >
            <a-row>
                <a-col :span="12">
                    <a-button shape="circle">in</a-button>
                    {{ record.name }}
                </a-col>
                <a-col :span="12">
                    <div style="width: 100%;">
                        <a-space>
                            <a-button type="primary" style="float: right;">
                                编辑
                            </a-button>
                            <a-dropdown style="float: right;">
                                <a-menu slot="overlay" @click="handleMenuClick">
                                    <a-menu-item key="1">
                                        <a-icon type="user" />重置密码
                                    </a-menu-item>
                                    <a-menu-item key="2">
                                        <a-icon type="user" />禁用
                                    </a-menu-item>
                                </a-menu>
                                <a-button style="margin-left: 8px;">
                                    更多<a-icon type="down" />
                                </a-button>
                            </a-dropdown>
                        </a-space>
                    </div>
                </a-col>
            </a-row>

            <a-row :gutter="[16, 16]">
                <a-col :span="24">
                    帐号类型
                    <br />
                    创建时间 {{ record.updatedAt }}
                </a-col>
            </a-row>

            <a-divider style="width: 100%;" />

            <a-row :gutter="[16, 16]">
                <a-col :span="12"> 姓名 </a-col>
                <a-col :span="12">
                    {{ record.name }}
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="12"> 手机号 </a-col>
                <a-col :gutter="[12]">
                    {{ record.telephone }}
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="[12]"> 性别 </a-col>
                <a-col :span="[12]">
                    {{ record.sex }}
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="12"> 邮箱 </a-col>
                <a-col :span="12">
                    {{ record.email }}
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="12"> 部门 </a-col>
                <a-col :span="12">
                    {{ record.depart }}
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col> 岗位 </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="12"> 直属上级 </a-col>
                <a-col :span="12">
                    {{ record.leader }}
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="12"> 角色 </a-col>
                <a-col :span="12">
                    {{ record.role }}
                </a-col>
            </a-row>

            <!-- {{ record }} -->
        </a-drawer>
    </div>
</template>

<script>
export default {
    props: {
        record: {
            default: {},
            type: function () {
                return {};
            },
        },
    },
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        showOrCloseDrawer() {
            this.visible = !this.visible;
        },
    },
};
</script>

<style></style>
