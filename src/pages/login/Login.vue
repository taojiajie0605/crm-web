<template>
    <common-layout>
        <div style="margin: 100px 200px; float: right;">
            <h2>欢迎来到正云</h2>
            <a-form :form="form" @submit="handleSubmit">
                <a-form-item>
                    <a-input
                        v-model="staffid"
                        placeholder="测试用户名：19876543210"
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
                        v-model="password"
                        placeholder="测试密码：123456"
                        type="password"
                        style="width: 500px; height: 60px;"
                        v-decorator="[
                            'passwd',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码',
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
                        @click="login"
                    >
                        登录
                    </a-button>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 0 }">
                    <router-link style="font-size: 20px;" to="registe"
                        >注册</router-link
                    >
                </a-form-item>
            </a-form>
        </div>
    </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout';
import { login } from '@/services';
import { request, METHOD } from '@/utils/request';

export default {
    name: 'Login',
    components: { CommonLayout },
    data() {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this, { name: 'coordinated' }),

            staffid: undefined,
            password: undefined,
        };
    },
    methods: {
        fetch() {
            //console.log('1111');
            request('/login', METHOD.POST, {
                userid: this.staffid,
                password: this.password,
            }).then((data) => {
                //console.log('data:', data);
                if (data.data.msg === 'ok') {
                    //存储token
                    localStorage.setItem(
                        'token',
                        JSON.stringify(data.data.token),
                    );
                    //存储用户信息
                    sessionStorage.setItem(
                        'userinfo',
                        JSON.stringify(data.data.userinfo),
                    );
                    this.$router.push({
                        path: '/CustomerManagement/dashboard',
                    });
                    this.$message.success('登陆成功');
                } else {
                    this.$message.error(data.data.msg);
                }
            });
        },

        login() {
            if (!(this.staffid && this.password)) {
                this.$message.warning('请填写账号和密码');
            } else if (!/^1[3456789]\d{9}$/.test(this.staffid)) {
                this.$message.error('手机号格式有误');
            } else {
                this.fetch();
            }
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
