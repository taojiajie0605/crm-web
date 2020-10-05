<template>
    <a-layout-header :class="[headerTheme, 'admin-header']">
        <div :class="['admin-header-wide', layout]">
            <router-link to="/" :class="['logo', 'pc', headerTheme]">
                <img width="32" src="@/assets/img/logo.png" />
                <h1 v-if="!isMobile">CRM管理系统</h1>
            </router-link>
            <a-divider v-if="isMobile" type="vertical" />
            <div v-if="!isMobile" class="admin-header-menu">
                <top-menu
                    :theme="headerTheme"
                    mode="horizontal"
                    :options="menuData"
                    @select="onSelect"
                />
            </div>
            <div
                v-show="this.$route.path.split('/')[1] !== 'admin'"
                :class="['admin-header-right', headerTheme]"
            >
                <a-button
                    type="primary"
                    @click="refresh('/admin/systemsetting/index')"
                    style="margin-top: 8px;"
                    >企业后台</a-button
                >
                <header-search class="header-item" />
                <a-tooltip
                    class="header-item"
                    title="帮助文档"
                    placement="bottom"
                >
                    <a>
                        <a-icon type="question-circle-o" />
                    </a>
                </a-tooltip>
                <a-tooltip
                    class="header-item"
                    title="聊天窗口"
                    placement="bottom"
                    @click="openChatList"
                >
                    <a>
                        <a-icon type="message" />
                    </a>
                </a-tooltip>
                <header-notice class="header-item" />
                <header-avatar class="header-item" />
                <a-dropdown class="lang header-item">
                    <div><a-icon type="global" /> {{ langAlias }}</div>
                    <a-menu
                        @click="(val) => setLang(val.key)"
                        :selected-keys="[lang]"
                        slot="overlay"
                    >
                        <a-menu-item v-for="lang in langList" :key="lang.key">{{
                            lang.key.toLowerCase() + ' ' + lang.name
                        }}</a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
            <div
                v-show="this.$route.path.split('/')[1] === 'admin'"
                :class="['admin-header-right', headerTheme]"
                style="margin-top: 8px;"
            >
                <a-button
                    type="primary"
                    @click="refresh('/CustomerManagement/dashboard')"
                    style="margin-right: 6px;"
                    >返回首页</a-button
                >
                <a-button @click="$router.push({ path: '/' })"
                    >退出系统</a-button
                >
            </div>
        </div>
        <chat-list ref="ChatList" />
    </a-layout-header>
</template>

<script>
import HeaderSearch from './HeaderSearch';
import HeaderNotice from './HeaderNotice';
import HeaderAvatar from './HeaderlAvatar';
import ChatList from '@/pages/chat/ChatList';
// import IMenu from '@/components/menu/menu'
import TopMenu from '@/components/menu/topMenu';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'FrontHeader',
    components: { TopMenu, HeaderAvatar, HeaderNotice, HeaderSearch, ChatList },
    props: ['collapsed', 'menuData'],
    data() {
        return {
            langList: [
                { key: 'CN', name: '简体中文', alias: '简体' },
                { key: 'HK', name: '繁體中文', alias: '繁體' },
                { key: 'US', name: 'English', alias: 'English' },
            ],
        };
    },
    computed: {
        ...mapState('setting', [
            'theme',
            'isMobile',
            'layout',
            'systemName',
            'lang',
        ]),
        headerTheme() {
            if (
                this.layout == 'side' &&
                this.theme.mode == 'dark' &&
                !this.isMobile
            ) {
                return 'light';
            }
            return this.theme.mode;
        },
        langAlias() {
            const lang = this.langList.find((item) => item.key == this.lang);
            return lang.alias;
        },
    },
    methods: {
        refresh(from) {
            this.$router.push({
                path: from,
            });
            console.log('2222', from);
            //this.$store.commit('setCurrentRouter', from);
            //window.location.replace(from);
            //this.resetSetItem('watchStorage', from);
        },
        toggleCollapse() {
            this.$emit('toggleCollapse');
        },
        onSelect(obj) {
            this.$emit('menuSelect', obj);
        },
        ...mapMutations('setting', ['setLang']),
        openChatList() {
            if (this.$refs.ChatList.visible == false) {
                this.$refs.ChatList.visible = true;
                this.$refs.ChatList.hide = false;
            } else {
                this.$refs.ChatList.hide = true;
                setTimeout(() => {
                    this.$refs.ChatList.visible = false;
                }, 500);
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import 'index';
</style>
