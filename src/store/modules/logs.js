export default {
    namespaced: true,
    state: {
        logs: [
            {
                type: 'day',
                content1: 'ioweur',
                content2: 'weoir',
                content3: 'wkerjkxd',
            },
            {
                type: 'week',
                content1: 'ioweur',
                content2: 'weoir',
                content3: 'wkerjkxd',
            },
            {
                type: 'month',
                content1: 'ioweur',
                content2: 'weoir',
                content3: 'wkerjkxd',
            },
        ],
    },
    getters: {
        getLogs: (state) => {
            return state.logs;
        },
    },
    mutations: {
        setLog(state, log) {
            // state.logs.push(log);
            state.logs.unshift(log);
        },
    },
};
