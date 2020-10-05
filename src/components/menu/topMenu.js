/**
 * 该插件可根据菜单配置自动生成 ANTD menu组件
 * menuOptions示例：
 * [
 *  {
 *    name: '菜单名称',
 *    path: '菜单路由',
 *    meta: {
 *      icon: '菜单图标',
 *      invisible: 'boolean, 是否不可见, 默认 false',
 *    },
 *    children: [子菜单配置]
 *  },
 *  {
 *    name: '菜单名称',
 *    path: '菜单路由',
 *    meta: {
 *      icon: '菜单图标',
 *      invisible: 'boolean, 是否不可见, 默认 false',
 *    },
 *    children: [子菜单配置]
 *  }
 * ]
 *
 * i18n: 国际化配置。组件默认会根据 options route配置的 path 和 name 生成英文以及中文的国际化配置，如需自定义或增加其他语言，配置
 * 此项即可。如：
 * i18n: {
 *   CN: {dashboard: {name: '监控中心'}}
 *   HK: {dashboard: {name: '監控中心'}}
 * }
 **/
import Menu from 'ant-design-vue/es/menu';
import Icon from 'ant-design-vue/es/icon';

const { Item, SubMenu } = Menu;

export default {
    name: 'IMenu',
    props: {
        options: {
            type: Array,
            required: true,
        },
        theme: {
            type: String,
            required: false,
            default: 'dark',
        },
        mode: {
            type: String,
            required: false,
            default: 'inline',
        },
        collapsed: {
            type: Boolean,
            required: false,
            default: false,
        },
        i18n: Object,
    },
    data() {
        return {
            openKeys: [],
            selectedKeys: [],
            cachedOpenKeys: [],
        };
    },
    computed: {
        rootSubmenuKeys: (vm) => {
            const keys = [];
            vm.options.forEach((item) => {
                keys.push(item.path);
            });
            return keys;
        },
        menuTheme() {
            return this.theme == 'light' ? this.theme : 'dark';
        },
    },
    created() {
        this.updateMenu();
        // 自定义国际化配置
        if (this.i18n && this.i18n.messages) {
            const messages = this.i18n.messages;
            Object.keys(messages).forEach((key) => {
                this.$i18n.mergeLocaleMessage(key, messages[key]);
            });
        }
    },
    watch: {
        collapsed(val) {
            if (val) {
                this.cachedOpenKeys = this.openKeys;
                this.openKeys = [];
            } else {
                this.openKeys = this.cachedOpenKeys;
            }
        },
        $route: function () {
            //this.updateMenu();
        },
    },
    methods: {
        renderIcon: function (h, icon) {
            return !icon || icon == 'none'
                ? null
                : h(Icon, { props: { type: icon } });
        },
        renderMenuItem: function (h, menu) {
            return h(Item, { key: menu.path }, [
                h('router-link', { props: { to: menu.path } }, [
                    this.renderIcon(h, menu.meta ? menu.meta.icon : 'none'),
                    // h('span', [menu.name !== '登录页' ? this.$t(menu.name + ''): ''])
                    menu.name !== '登录页'
                        ? h('span', [this.$t(menu.name + '')])
                        : '',
                ]),
            ]);
        },
        renderSubMenu: function (h, menu) {
            const this_ = this;
            const subItem = [
                h('span', { slot: 'title' }, [
                    this.renderIcon(h, menu.meta ? menu.meta.icon : 'none'),
                    h('span', [this.$t(menu.name + '')]),
                ]),
            ];
            const itemArr = [];
            menu.children.forEach(function (item) {
                itemArr.push(this_.renderItem(h, item));
            });
            return h(SubMenu, { key: menu.path }, subItem.concat(itemArr));
        },
        renderItem: function (h, menu) {
            const meta = menu.meta;
            if (!meta || !meta.invisible) {
                const renderChildren = false;
                const children = menu.children;
                if (children != undefined) {
                    // for (let i = 0; i < children.length; i++) {
                    //   const childMeta = children[i].meta
                    //   if (!childMeta || !childMeta.invisible) {
                    //     renderChildren = true
                    //     break
                    //   }
                    // }
                }
                return menu.children && renderChildren
                    ? this.renderSubMenu(h, menu)
                    : this.renderMenuItem(h, menu);
            }
        },
        renderMenu: function (h, menuTree) {
            const this_ = this;
            const menuArr = [];
            menuTree.forEach(function (menu, i) {
                menuArr.push(this_.renderItem(h, menu, '0', i));
            });
            return menuArr;
        },
        formatOptions(options, parentPath) {
            const this_ = this;
            options.forEach((route) => {
                const ispath = route.path.substring(0, 1) == '/';
                route.path = ispath
                    ? route.path
                    : parentPath + '/' + route.path;
                if (route.children) {
                    this_.formatOptions(route.children, route.path);
                }
            });
        },
        onOpenChange(openKeys) {
            const latestOpenKey = openKeys.find(
                (key) => this.openKeys.indexOf(key) === -1,
            );
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys;
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : [];
            }
        },
        updateMenu() {
            const routes = this.$route.matched.concat();
            const route = routes.pop();
            this.selectedKeys = [this.getSelectedKey(route)];
            const openKeys = [];
            routes.forEach((item) => {
                openKeys.push(item.path);
            });
            this.collapsed || this.mode === 'horizontal'
                ? (this.cachedOpenKeys = openKeys)
                : (this.openKeys = openKeys);
        },
        getSelectedKey(route) {
            //console.log('222222', route);
            if (route.meta.invisible && route.parent) {
                return this.getSelectedKey(route.parent);
            }
            //console.log('1111', route.path);
            //console.log('1111', route.parent);
            return route.path;
        },
    },
    render(h) {
        return h(
            Menu,
            {
                props: {
                    theme: this.menuTheme,
                    mode: this.$props.mode,
                    openKeys: this.openKeys,
                    selectedKeys: this.selectedKeys,
                },
                on: {
                    openChange: this.onOpenChange,
                    select: (obj) => {
                        //console.log('------', obj.selectedKeys);
                        this.selectedKeys = obj.selectedKeys;
                        this.$emit('select', obj);
                    },
                },
            },
            this.renderMenu(h, this.options),
        );
    },
};
