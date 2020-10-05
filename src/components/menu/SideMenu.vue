<template>
    <a-layout-sider
        :theme="dark"
        :class="['side-menu', isMobile ? null : 'shadow']"
        width="208px"
        :collapsible="collapsible"
        v-model="collapsed"
        :trigger="null"
    >
        <!-- <div :class="['logo', theme]">
      <router-link to="/dashboard/workplace">
        <img src="@/assets/img/logo.png">
        <h1>{{systemName}}</h1>
      </router-link>
    </div> -->
        <div class="content beauty-scroll">
            <i-menu
                :theme="theme"
                :collapsed="collapsed"
                :options="menuData"
                @select="onSelect"
                class="menu"
            />
        </div>

        <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="toggleCollapse"
        />
    </a-layout-sider>
</template>

<script>
import IMenu from './menu';
import { mapState } from 'vuex';
export default {
    name: 'SideMenu',
    components: { IMenu },
    props: {
        collapsible: {
            type: Boolean,
            required: false,
            default: false,
        },
        collapsed: {
            type: Boolean,
            required: false,
            default: false,
        },
        menuData: {
            type: Array,
            required: true,
        },
        theme: {
            type: String,
            required: false,
            default: 'dark',
        },
    },
    created() {
        console.log(this.menuData);
    },
    computed: {
        sideTheme() {
            return this.theme == 'light' ? this.theme : 'dark';
        },
        ...mapState('setting', ['isMobile', 'systemName']),
    },
    methods: {
        onSelect(obj) {
            this.$emit('menuSelect', obj);
        },
        sideMenuWidth() {
            this.collapsed = !this.collapsed;
            //return this.collapsed ? '80px' : '208px'
        },
        toggleCollapse() {
            this.sideMenuWidth();
            //this.$emit('toggleCollapse')
        },
    },
};
</script>

<style lang="less">
@import 'index';
</style>
