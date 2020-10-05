<template>
    <div>
        <admin-header
            :style="headerStyle"
            :menuData="menuData"
            :collapsed="collapsed"
            @toggleCollapse="toggleCollapse"
        />
        <router-view />
    </div>
</template>

<script>
import AdminHeader from '../../layouts/header/FrontHeader';
import { mapState } from 'vuex';

const minHeight = window.innerHeight - 64 - 24 - 122;

let topMenuData = [];
export default {
    name: 'FrontHome',
    components: { AdminHeader },
    data() {
        return {
            minHeight: minHeight,
            collapsed: false,
            topMenuData: topMenuData,
            showSetting: false,
            menuData: [],
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
        getRouter() {
            const data = this.$router.options.routes.find(
                (item) => item.path === '/',
            ).children;
            // 拷貝一份路由數組
            topMenuData = [];
            for (let i = 0; i < data.length; i++) {
                topMenuData.push(data[i]);
            }
            if (this.$route.path.split('/')[1] === 'admin') {
                topMenuData = Array(topMenuData[7]);
            } else {
                topMenuData.splice(7, 1);
            }
            this.menuData = topMenuData;
        },
    },
    created() {
        this.getRouter();
        console.log(this.menuData);
    },
    watch: {
        '$store.state.setting.currentRouter': function (val) {
            //console.log(this.menuData)
            //console.log('我被執行了')
        },
        $route(/*to, from*/) {
            this.getRouter();
        },
    },
};
</script>

<style lang="less" scoped></style>
