import Mock from 'mockjs';

//考勤管理/考勤打卡
const todayclockin = {
    id: 1,
    attperson: '张三',
    department: '财务部',
    date: '2020-09-11',
    signintime: '08:29:03',
    signinplace: '浙江省绍兴市越城区中关村',
    signinremarks: '',
    signouttime: '',
    signoutplace: '浙江省绍兴市越城区中关村',
    signoutremarks: '我没有早退',
};
Mock.mock('/todaycheck', 'post', ({ body }) => {
    const result = {};
    result.todayclockin = todayclockin;
    result.msg = '打卡成功';
    return result;
});

//考勤管理/考勤记录
const Attrecords = [
    {
        id: 1,
        attperson: '张三',
        department: '财务部',
        date: '2020-09-09',
        signintime: '08:29:03',
        signinplace: '浙江省绍兴市越城区中关村',
        signinremarks: '',
        signouttime: '15:29:03',
        signoutplace: '浙江省绍兴市越城区中关村',
        signoutremarks: '我没有早退',
    },
    {
        id: 2,
        attperson: '李四',
        department: '项目部',
        date: '2020-09-09',
        signintime: '08:29:03',
        signinplace: '浙江省绍兴市越城区中关村',
        signinremarks: '迟到了怎么办',
        signouttime: '15:29:03',
        signoutplace: '浙江省绍兴市越城区中关村',
        signoutremarks: '我没有早退',
    },
    {
        id: 3,
        attperson: '王五',
        department: '财务部',
        date: '2020-09-09',
        signintime: '08:29:03',
        signinplace: '浙江省绍兴市越城区中关村',
        signinremarks: '我没有迟到',
        signouttime: '15:29:03',
        signoutplace: '浙江省绍兴市越城区中关村',
        signoutremarks: '我没有早退',
    },
];
Mock.mock('/Attrecords', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Attrecords;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Attrecords;
        result.totalbar = 200;
    }
    return result;
});

//考勤管理/考勤审批/请假审批
const myAtt = [
    {
        id: 1,
        applicant: '张三',
        leavetype: '病假',
        remarks: '请假太难了',
        starttime: '2020-09-09',
        endtime: '2020-09-10',
        department: '财务部',
        createtime: '2020-09-8',
        station: 1,
        reviewer: '李四',
    },
    {
        id: 2,
        applicant: 'admin',
        leavetype: '产假',
        remarks: '请假太难了',
        starttime: '2020-09-09',
        endtime: '2020-09-10',
        department: '财务部',
        createtime: '2020-09-8',
        station: 2,
        reviewer: '李四',
    },
    {
        id: 3,
        applicant: '王五',
        leavetype: '婚假',
        remarks: '请假太难了',
        starttime: '2020-09-09',
        endtime: '2020-09-10',
        department: '财务部',
        createtime: '2020-09-8',
        station: 3,
        reviewer: '李四',
    },
];
Mock.mock('/myAttleave', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = myAtt;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = myAtt;
        result.totalbar = 200;
    }
    return result;
});
//考勤管理/考勤审批/出差审批
const myAttBuss = [
    {
        id: 1,
        applicant: '张三',
        reason: '谈客户',
        vehicle: '飞机',
        starttime: '2020-09-09',
        endtime: '2020-09-10',
        department: '财务部',
        createtime: '2020-09-8',
        station: 1,
        reviewer: '李四',
    },
    {
        id: 2,
        applicant: 'admin',
        reason: '技术交流',
        vehicle: '汽车',
        starttime: '2020-09-09',
        endtime: '2020-09-10',
        department: '财务部',
        createtime: '2020-09-8',
        station: 2,
        reviewer: '李四',
    },
    {
        id: 3,
        applicant: '王五',
        reason: '签合同',
        vehicle: '火车',
        starttime: '2020-09-09',
        endtime: '2020-09-10',
        department: '财务部',
        createtime: '2020-09-8',
        station: 3,
        reviewer: '李四',
    },
];
Mock.mock('/myAttBuss', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = myAttBuss;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = myAttBuss;
        result.totalbar = 200;
    }
    return result;
});
//考勤管理/考勤审批/加班审批
const addAtt = [
    {
        id: 1,
        applicant: '张三',
        addreason: '赶项目',
        remarks: '请假太难了',
        starttime: '2020-09-09',
        endtime: '2020-09-10',
        department: '财务部',
        createtime: '2020-09-8',
        station: 1,
        reviewer: '李四',
    },
    {
        id: 2,
        applicant: 'admin',
        addreason: '谈客户',
        remarks: '请假太难了',
        starttime: '2020-09-09',
        endtime: '2020-09-10',
        department: '财务部',
        createtime: '2020-09-8',
        station: 2,
        reviewer: '李四',
    },
    {
        id: 3,
        applicant: '王五',
        addreason: '做报表',
        remarks: '请假太难了',
        starttime: '2020-09-09',
        endtime: '2020-09-10',
        department: '财务部',
        createtime: '2020-09-8',
        station: 3,
        reviewer: '李四',
    },
];
Mock.mock('/addAtt', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = addAtt;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = addAtt;
        result.totalbar = 200;
    }
    return result;
});
//新建审批方法
Mock.mock('/newatt', 'post', ({ body }) => {
    const result = {};
    result.msg = '新建成功';
    return result;
});

//通过拒绝方法
Mock.mock('/passorreject', 'post', ({ body }) => {
    const result = {};
    result.msg = '操作成功';
    return result;
});
