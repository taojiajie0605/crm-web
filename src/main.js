import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import router from './router';
import './theme/index.less';
import Antd from 'ant-design-vue';
// import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
//import VueQuillEditor from 'vue-quill-editor'
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css'; // import styles
import 'quill/dist/quill.snow.css'; // for snow theme
import 'quill/dist/quill.bubble.css'; // for bubble theme
// import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
//import 'quill/dist/quill.core.css'
//import 'quill/dist/quill.bubble.css'
// import * as Quill from 'quill'; // 富文本基于quill
//import G2 from '@antv/g2'
import Viser from 'viser-vue';
import '@/mock';
import store from './store';
import 'animate.css/source/animate.css';
import Plugins from '@/plugins';
import { initI18n } from '@/utils/i18n';

//import contentmenu from 'v-contextmenu';
//import 'v-contextmenu/dist/index.css';

import KFormDesign from 'k-form-design';
import 'k-form-design/lib/k-form-design.css';

import { VueEditor } from 'vue2-editor';

Vue.use(VueEditor);
//Vue.use(contentmenu);
Vue.use(Router);

Vue.config.productionTip = false;
//Vue.use(G2)
Vue.use(Viser);
Vue.use(Antd);
Vue.use(Plugins);
//Vue.use(VueQuillEditor)
Vue.use(quillEditor);

Vue.use(KFormDesign);

const i18n = initI18n(router, 'CN', 'US');

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app');

//百度地图
import BaiduMap from 'vue-baidu-map';
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'fHrNQj6DHTjZtfTvfqbsuvTzKc5V9SBl',
});
//element-ui
import { Autocomplete } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Autocomplete);

//import '@/assets/icons/index.js';
//vue监听
// Vue.prototype.resetSetItem = function (key, newVal) {
//     if (key === 'watchStorage') {
//         // 创建一个StorageEvent事件
//         const newStorageEvent = document.createEvent('StorageEvent');
//         const storage = {
//             setItem: function (k, val) {
//                 sessionStorage.setItem(k, val);

//                 // 初始化创建的事件
//                 newStorageEvent.initStorageEvent(
//                     'setItem',
//                     false,
//                     false,
//                     k,
//                     null,
//                     val,
//                     null,
//                     null,
//                 );

//                 // 派发对象
//                 window.dispatchEvent(newStorageEvent);
//             },
//         };
//         return storage.setItem(key, newVal);
//     }
// };
