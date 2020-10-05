import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
import setting from './modules/setting';
import task from './modules/task';
import mission from './modules/mission';
import logs from './modules/logs';
import flowrecord from './modules/flowrecord';
import label from './modules/label';
import returnmoney from './modules/returnmoney';

import PouchDB from 'pouchdb';

const db = new PouchDB('adminDb');

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        account,
        setting,
        task,
        mission,
        label,
        logs,
        flowrecord,
        returnmoney,
    },
});
// 读取用户信息
db.get('currUser')
    .then((doc) => store.commit('account/setUser', doc.user))
    .catch(() => {});

export default store;
