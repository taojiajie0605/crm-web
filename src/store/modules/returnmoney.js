export default {
    namespaced: true,
    state: {
        returnmoneys: [
            {
                custname: '极客有线公司',
                custid: 1,
                returnmoneynumber: '154',
                contractnumber: '112',
                contractnumberid: 2,
                periodnumber: '2',
                returnmoneydate: '2020-09-05 12:45:53',
                returnmoneycount: 200,
                remarks: 'hjbhj',
                reviewer: ['员工1'],
            },
        ],
    },
    getters: {
        getReturnmoney: (state) => {
            return state.returnmoneys;
        },
        // getTaskById: (state) => (id) => {
        //     return state.task.filter(function (value) {
        //         return value.id === id;
        //     });
        // },
    },
    mutations: {
        setReturnItem(state, returnItem) {
            state.returnmoneys.unshift(returnItem);
        },
    },
};
