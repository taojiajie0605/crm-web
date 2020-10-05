export default {
    namespaced: true,
    state: {
        task: [
            {
                id: 1,
                name: 'admin',
                detail: '借款',
                type: '借款申请 ',
                matter: {
                    content: '公出',
                    detail: 'sdkafs',
                },
                check: 'skdfj',
                time: '2010-9-8',
                content: '公出',
                auditor: 'sdkfj',
                icon: 'shop',
                status: 'wait',
                info: [[], [], [], []],
            },
            {
                id: 2,
                name: 'admin',
                type: '借款申请 ',
                check: 'skdfj',
                time: '2010-9-8',
                auditor: 'sdkfj',
                matter: {
                    content: '公出',
                    detail: 'sdkafs',
                },
                icon: 'shop',
                status: 'pass',
                info: [[], [], [], []],
            },
            {
                id: 3,
                name: 'admin',
                type: '借款申请 ',
                check: 'skdfj',
                time: '2010-9-8',
                matter: {
                    content: '公出',
                    detail: 'sdkafs',
                },
                auditor: 'sdkfj',
                icon: 'shop',
                status: 'refuse',
                info: [[], [], [], []],
            },
        ],
    },
    getters: {
        getTask: (state) => {
            return state.task;
        },
        getTaskById: (state) => (id) => {
            return state.task.filter(function (value) {
                return value.id === id;
            });
        },
    },
    mutations: {
        setTask(state, task) {
            state.task.unshift(task);
        },
    },
};
