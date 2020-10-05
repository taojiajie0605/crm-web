<template>
    <common-layout>
        <div style="margin-top: 100px; margin-right: 90px;">
            <h2>欢迎来到正云</h2>
            <a-form :form="form" @submit="handleSubmit">
                <a-form-item>
                    <a-input
                        placeholder="请输入用户名"
                        style="width: 500px; height: 60px;"
                        v-decorator="[
                            'user',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                ],
                            },
                        ]"
                    >
                        <a-icon slot="prefix" type="user" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                        placeholder="请输入手机号"
                        style="width: 500px; height: 60px;"
                        v-decorator="[
                            'passwd',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '手机号不能为空',
                                    },
                                ],
                            },
                        ]"
                    >
                        <a-icon type="mobile" slot="prefix" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                        placeholder="手机验证码"
                        @search="onSearch"
                        style="width: 500px; height: 60px;"
                        v-decorator="[
                            'passwd',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '验证码不能为空',
                                    },
                                ],
                            },
                        ]"
                        enter-button
                    >
                        <a-button slot="enterButton"> 获取验证码 </a-button>
                        <a-icon slot="prefix" type="message" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                        placeholder="设置密码"
                        style="width: 500px; height: 60px;"
                        v-decorator="[
                            'passwd',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '密码不能为空',
                                    },
                                ],
                            },
                        ]"
                    >
                        <a-icon slot="prefix" type="lock" />
                    </a-input>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 0 }">
                    <a-button
                        type="primary"
                        style="height: 60px; width: 200px;"
                        html-type="submit"
                    >
                        注册
                    </a-button>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 6, offset: 0 }">
                    <router-link to="login">登录</router-link>
                </a-form-item>
            </a-form>
        </div>
        <!-- <div class="top">
            <div class="header">
                <img alt="logo" class="logo" src="@/assets/img/logo.png" />
                <span class="title">{{ systemName }}</span>
            </div>
            <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
        </div>
        <div class="login">
            <a-form @submit="onSubmit" :form="form">
                <a-tabs
                    size="large"
                    :tabBarStyle="{ textAlign: 'center' }"
                    style="padding: 0 2px;"
                >
                    <a-tab-pane tab="账户密码登录" key="1">
                        <a-alert
                            type="error"
                            :closable="true"
                            v-show="error"
                            :message="error"
                            showIcon
                            style="margin-bottom: 24px;"
                        />
                        <a-form-item>
                            <a-input
                                autocomplete="autocomplete"
                                size="large"
                                placeholder="admin"
                                v-decorator="[
                                    'name',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入账户名',
                                                whitespace: true,
                                            },
                                        ],
                                    },
                                ]"
                            >
                                <a-icon slot="prefix" type="user" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-input
                                size="large"
                                placeholder="888888"
                                autocomplete="autocomplete"
                                type="password"
                                v-decorator="[
                                    'password',
                                    {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入密码',
                                                whitespace: true,
                                            },
                                        ],
                                    },
                                ]"
                            >
                                <a-icon slot="prefix" type="lock" />
                            </a-input>
                        </a-form-item>
                    </a-tab-pane>
                    <a-tab-pane tab="手机号登录" key="2">
                        <a-form-item>
                            <a-input size="large" placeholder="mobile number">
                                <a-icon slot="prefix" type="mobile" />
                            </a-input>
                        </a-form-item>
                        <a-form-item>
                            <a-row :gutter="8" style="margin: 0 -4px;">
                                <a-col :span="16">
                                    <a-input size="large" placeholder="captcha">
                                        <a-icon slot="prefix" type="mail" />
                                    </a-input>
                                </a-col>
                                <a-col :span="8" style="padding-left: 4px;">
                                    <a-button
                                        style="width: 100%;"
                                        class="captcha-button"
                                        size="large"
                                        >获取验证码</a-button
                                    >
                                </a-col>
                            </a-row>
                        </a-form-item>
                    </a-tab-pane>
                </a-tabs>
                <div>
                    <a-checkbox :checked="true">自动登录</a-checkbox>
                    <a style="float: right;">忘记密码</a>
                </div>
                <a-form-item>
                    <a-button
                        :loading="logging"
                        style="width: 100%; margin-top: 24px;"
                        size="large"
                        htmlType="submit"
                        type="primary"
                        >登录</a-button
                    >
                </a-form-item>
                <div>
                    其他登录方式
                    <a-icon class="icon" type="alipay-circle" />
                    <a-icon class="icon" type="taobao-circle" />
                    <a-icon class="icon" type="weibo-circle" />
                    <router-link style="float: right;" to="/dashboard/workplace"
                        >注册账户</router-link
                    >
                </div>
            </a-form>
        </div> -->
    </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout';
import { login } from '@/services';
import { setAuthorization } from '@/utils/request';

export default {
    name: 'Login',
    components: { CommonLayout },
    data() {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'coordinated' }),
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        },
        handleSelectChange(value) {
            console.log(value);
            this.form.setFieldsValue({
                note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.common-layout {
    .content {
        padding-right: 30px;
        .ant-input {
            border: 0px;
            background-color: #f6f4fc;
            border-radius: 0px;
            height: 90;
        }
    }
    .top {
        text-align: center;
        .header {
            height: 44px;
            line-height: 44px;
            a {
                text-decoration: none;
            }
            .logo {
                height: 44px;
                vertical-align: top;
                margin-right: 16px;
            }
            .title {
                font-size: 33px;
                color: @title-color;
                font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica,
                    sans-serif;
                font-weight: 600;
                position: relative;
                top: 2px;
            }
        }
        .desc {
            font-size: 14px;
            color: @text-color-second;
            margin-top: 12px;
            margin-bottom: 40px;
        }
    }
    .login {
        width: 368px;
        margin: 0 auto;
        @media screen and (max-width: 576px) {
            width: 95%;
        }
        @media screen and (max-width: 320px) {
            .captcha-button {
                font-size: 14px;
            }
        }
        .icon {
            font-size: 24px;
            color: @text-color-second;
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: @primary-color;
            }
        }
    }
}
</style>
