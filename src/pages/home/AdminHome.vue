<template>
    <div>
        <admin-header
            :style="headerStyle"
            :menuData="topMenuData"
            :collapsed="collapsed"
            @toggleCollapse="toggleCollapse"
        />
        <router-view />
    </div>
</template>

<script>
import AdminHeader from '../../layouts/header/AdminHeader';
import { mapState } from 'vuex';

const minHeight = window.innerHeight - 64 - 24 - 122;

let topMenuData = [];
export default {
    name: 'AdminHome',
    components: { AdminHeader },
    data() {
        return {
            minHeight: minHeight,
            collapsed: false,
            topMenuData: topMenuData,
            showSetting: false,
        };
    },
    provide() {
        return {
            layoutMinHeight: minHeight,
        };
    },
    computed: {
        ...mapState('setting', [
            'isMobile',
            'theme',
            'layout',
            'footerLinks',
            'copyright',
            'fixedHeader',
            'fixedSideBar',
            'hideSetting',
        ]),
        sideMenuWidth() {
            return this.collapsed ? '80px' : '256px';
        },
        headerStyle() {
            const width =
                this.fixedHeader && this.layout == 'side' && !this.isMobile
                    ? `calc(100% - ${this.sideMenuWidth})`
                    : '100%';
            const position = this.fixedHeader ? 'fixed' : 'static';
            const transition = this.fixedHeader ? 'transition: width 0.2s' : '';
            return `width: ${width}; position: ${position}; ${transition}`;
        },
    },
    methods: {
        toggleCollapse() {
            this.collapsed = !this.collapsed;
        },
        onMenuSelect() {
            this.toggleCollapse();
        },
    },
    beforeCreate() {
        topMenuData = this.$router.options.routes.find(
            (item) => item.path === '/admin',
        ).children;
    },
};
</script>

<style lang="less" scoped></style>
