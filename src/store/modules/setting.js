import config from '@/config';
import { ADMIN } from '@/config/default';
export default {
    namespaced: true,
    state: {
        currentRouter: 'admin',
        isMobile: false,
        animates: ADMIN.animates,
        palettes: ADMIN.palettes,
        dustbins: [],
        ...config,
    },
    mutations: {
        setCurrentRouter(state, form) {
            state.currentRouter = form;
            console.log('1111', form);
        },
        setDevice(state, isMobile) {
            state.isMobile = isMobile;
        },
        setTheme(state, theme) {
            state.theme = theme;
        },
        setLayout(state, layout) {
            state.layout = layout;
        },
        setMultiPage(state, multiPage) {
            state.multiPage = multiPage;
        },
        setAnimate(state, animate) {
            state.animate = animate;
        },
        setWeekMode(state, weekMode) {
            state.weekMode = weekMode;
        },
        setFixedHeader(state, fixedHeader) {
            state.fixedHeader = fixedHeader;
        },
        setFixedSideBar(state, fixedSideBar) {
            state.fixedSideBar = fixedSideBar;
        },
        setLang(state, lang) {
            state.lang = lang;
        },
        setHideSetting(state, hideSetting) {
            state.hideSetting = hideSetting;
        },
        setDustbins(state, dustbins) {
            state.dustbins = dustbins;
        },
    },
};
