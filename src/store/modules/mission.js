export default {
    namespaced: true,
    state: {
        mission: [
            {
                user: 'admin',
                content: '外出',
                date: '',
                check: false,
                level: 0,
                color: '#f95a5a',
                tags: [],
                desc: 'skdfjkasdf',
                created: '2019-8-9',
            },
            {
                user: 'admin',
                content: '公出',
                date: '',
                color: '#f95a5a',
                check: true,
                level: 0,
                tags: [],
                desc: '',
                created: '2019-8-9',
            },
        ],
    },
    getters: {
        getMission: (state) => {
            return state.mission;
        },
    },
    mutations: {
        setMission(state, mission) {
            state.mission.push(mission);
        },
    },
};
