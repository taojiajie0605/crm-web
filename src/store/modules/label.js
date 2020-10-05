export default {
    namespaced: true,
    state: {
        labels: [
            {
                id: 1,
                label: 'kafsdkf',
                color: '#53d397',
            },
            {
                id: 2,
                label: 'kafsdkf',
                color: '#19c1bd',
            },
            {
                id: 3,
                label: 'kafsdkf',
                color: '#58dada',
            },
        ],
    },
    getters: {
        getLabels: (state) => {
            return state.labels;
        },
    },
    mutations: {
        setFlowrecord(state, label) {
            state.labels.push(label);
        },
    },
};
