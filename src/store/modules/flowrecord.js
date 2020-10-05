export default {
    namespaced: true,
    state: {
        flowrecord: [
            {
                user: 'admin',
                type: '合同',
                icon: '',
                chance: '',
                message: '客户意向度适中，后续继续跟进 ',
                visited: 'email',
                date: '2019-9-8',
                check: false,
            },
            {
                user: 'admin',
                type: '商机',
                icon: '',
                chance: '',
                visited: 'telephone',
                message: '客户意向度适中，后续继续跟进 ',
                date: '2019-9-8',
                check: false,
            },
        ],
    },
    getters: {
        getFlowrecord: (state) => {
            return state.flowrecord;
        },
    },
    mutations: {
        setFlowrecord(state, flowrecord) {
            state.flowrecord.push(flowrecord);
        },
    },
};
