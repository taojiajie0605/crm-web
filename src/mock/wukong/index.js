import Mock from 'mockjs';
import '@/mock/extend';

//应用管理
const appdata = {
    useapp: [
        {
            id: 1,
            appname: '客户管理',
            imgname: 'kehuguanli',
        },
        {
            id: 2,
            appname: '任务/审批',
            imgname: 'renwushenpi',
        },
        {
            id: 3,
            appname: '项目管理',
            imgname: 'xiangmuguanli',
        },
        {
            id: 4,
            appname: '考勤管理',
            imgname: 'kaoqinguanli',
        },
        {
            id: 5,
            appname: '通讯录',
            imgname: 'tongxunlu',
        },
        {
            id: 6,
            appname: '商业智能',
            imgname: 'shangyezhineng',
        },
        {
            id: 7,
            appname: '日志',
            imgname: 'rizhi',
        },
    ],
    stopapp: [
        {
            id: 8,
            appname: '邮箱',
            imgname: 'youxiang',
        },
    ],
    addapp: [
        {
            id: 9,
            appname: '呼叫中心',
            imgname: 'hujiaozhongxin',
        },
    ],
    comingsoonapp: [
        {
            id: 10,
            appname: '人力资源管理',
            imgname: 'renliguanli',
        },
        {
            id: 11,
            appname: '进销存管理',
            imgname: 'jinxiaocunguanli',
        },
    ],
};
Mock.mock('/appdata', 'post', ({ body }) => {
    const result = {};
    result.answer = appdata;
    return result;
});
//停用启用
Mock.mock('/appstart', 'post', ({ body }) => {
    const result = {};
    result.msg = '操作成功';
    return result;
});

//项目管理
const data = [
    {
        id: 1,
        role: '编辑',
        description: '项目只读角色',
        configure: ['Apple', 'Pear', 'Orange'],
    },
    {
        id: 2,
        role: '只读',
        description: '成员初始加入时默认享有的权限',
        configure: ['Apple', 'Orange'],
    },
    {
        id: 3,
        role: '只读',
        description: '成员初始加入时默认享有的权限',
        configure: ['Apple', 'Pear'],
    },
];
Mock.mock('/projmanage', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.answer = data;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.answer = data;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/projmanagemodify', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.answer = data;
        result.totalbar = 200;
        result.msg = '修改成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.answer = data;
        result.totalbar = 200;
        result.msg = '修改成功';
    }
    return result;
});
Mock.mock('/projmanagedelete', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.answer = data;
        result.totalbar = 200;
        result.msg = '删除成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.answer = data;
        result.totalbar = 200;
        result.msg = '删除成功';
    }
    return result;
});
Mock.mock('/projmanageadd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.answer = data;
        result.totalbar = 200;
        result.msg = '添加成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.answer = data;
        result.totalbar = 200;
        result.msg = '添加成功';
    }
    return result;
});

//业务审批流
const busiapprovedata = [
    {
        id: 1,
        approveName: '发票审批流程',
        approveType: '授权审批人',
        associateObj: '发票',
        uesScope: '全公司',
        lastModifyUser: 'admin',
        lastModifyTime: '2020-07-25 12:56:35',
        state: '停用',
        approveExplain: '说明1',
    },
    {
        id: 2,
        approveName: '回款审批流程',
        approveType: '授权审批人',
        associateObj: '回款',
        uesScope: '全公司',
        lastModifyUser: 'admin',
        lastModifyTime: '2020-07-25 12:56:35',
        state: '启用',
        approveExplain: '说明2',
    },
    {
        id: 3,
        approveName: '合同审批流程',
        approveType: '固定审批流',
        associateObj: '发票',
        uesScope: '全公司',
        lastModifyUser: 'admin',
        lastModifyTime: '2020-07-25 12:56:35',
        state: '启用',
        approveExplain: '说明3',
    },
];
Mock.mock('/busiapprove', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = busiapprovedata;
        result.totalbar = 200;
        //result.msg='添加成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = busiapprovedata;
        result.totalbar = 200;
        //result.msg='添加成功';
    }
    return result;
});
Mock.mock('/busiapprovedelete', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = busiapprovedata;
        result.totalbar = 200;
        result.msg = '删除成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = busiapprovedata;
        result.totalbar = 200;
        result.msg = '删除成功';
    }
    return result;
});
Mock.mock('/busiapprovestop', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = busiapprovedata;
        result.totalbar = 200;
        result.msg = '停用成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = busiapprovedata;
        result.totalbar = 200;
        result.msg = '停用成功';
    }
    return result;
});

//客户管理/自定义字段设置
const fieldsettingdata = [
    {
        id: 1,
        mode: '线索管理',
        updatetime: '2000-01-01 00:00:00',
    },
    {
        id: 2,
        mode: '客户管理',
        updatetime: '2000-01-01 00:00:00',
    },
    {
        id: 3,
        mode: '联系人管理',
        updatetime: '2000-01-01 00:00:00',
    },
    {
        id: 4,
        mode: '产品管理',
        updatetime: '2000-01-01 00:00:00',
    },
    {
        id: 5,
        mode: '商机管理',
        updatetime: '2000-01-01 00:00:00',
    },
    {
        id: 6,
        mode: '合同管理',
        updatetime: '2000-01-01 00:00:00',
    },
];
Mock.mock('/fieldsetting', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        console.log('进入1');
        result.answer = fieldsettingdata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        console.log('进入2');
        result.answer = fieldsettingdata;
        result.totalbar = 200;
    }
    return result;
});

//客户管理/客户公海规则设置
const seasettingdata = [
    {
        id: 1,
        seaname: '系统默认公海',
        seaadmin: 'admin',
        seamember: 'admin',
        custnumber: 4,
        state: '启用',
        personrule: 1,
        frequencyrule: 1,
        remindrule: 1,
        recoverrule: 1,
        configure: ['Apple', 'Pear', 'Orange'],
    },
    {
        id: 1,
        seaname: '系统默认公海',
        seaadmin: 'admin',
        seamember: 'admin',
        custnumber: 3,
        state: '停用',
        personrule: 2,
        frequencyrule: 2,
        remindrule: 1,
        recoverrule: 1,
        configure: ['Apple', 'Orange'],
    },
    {
        id: 1,
        seaname: '系统默认公海',
        seaadmin: 'admin',
        seamember: 'admin',
        custnumber: 4,
        state: '启用',
        personrule: 1,
        frequencyrule: 2,
        remindrule: 1,
        recoverrule: 2,
        configure: ['Pear', 'Orange'],
    },
];
Mock.mock('/seasetting', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        console.log('进入1');
        result.answer = seasettingdata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        console.log('进入2');
        result.answer = seasettingdata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/seasettingdelete', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = seasettingdata;
        result.totalbar = 200;
        result.msg = '删除成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = seasettingdata;
        result.totalbar = 200;
        result.msg = '删除成功';
    }
    return result;
});
Mock.mock('/seasettingstop', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = seasettingdata;
        result.totalbar = 200;
        result.msg = '停用成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = seasettingdata;
        result.totalbar = 200;
        result.msg = '停用成功';
    }
    return result;
});
Mock.mock('/seasettingadd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.answer = seasettingdata;
        result.totalbar = 200;
        result.msg = '添加成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.answer = seasettingdata;
        result.totalbar = 200;
        result.msg = '添加成功';
    }
    return result;
});

//客户管理/打印设置
const PrintTemplatedata = [
    {
        id: 1,
        modename: '合同条款打印模板',
        associobject: '合同',
        createtime: '2020-07-23 08:57:48',
        founder: 'ddcdc',
        updatetime: '2020-07-23 08:57:48',
    },
    {
        id: 2,
        modename: '商机打印模板',
        associobject: '商机',
        createtime: '2020-07-23 08:57:48',
        founder: 'scdc',
        updatetime: '2020-07-23 08:57:48',
    },
    {
        id: 3,
        modename: '回款打印模板',
        associobject: '回款',
        createtime: '2020-07-23 08:57:48',
        founder: '颈康胶囊',
        updatetime: '2020-07-23 08:57:48',
    },
];
Mock.mock('/PrintTemplate', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        console.log('进入1');
        result.answer = PrintTemplatedata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        console.log('进入2');
        result.answer = PrintTemplatedata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/PrintTemplatedelete', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = PrintTemplatedata;
        result.totalbar = 200;
        result.msg = '删除成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = PrintTemplatedata;
        result.totalbar = 200;
        result.msg = '删除成功';
    }
    return result;
});
Mock.mock('/PrintTemplatemodify', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.answer = PrintTemplatedata;
        result.totalbar = 200;
        result.msg = '修改成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.answer = PrintTemplatedata;
        result.totalbar = 200;
        result.msg = '修改成功';
    }
    return result;
});
Mock.mock('/PrintTemplateadd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.answer = PrintTemplatedata;
        result.totalbar = 200;
        result.msg = '复制成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.answer = PrintTemplatedata;
        result.totalbar = 200;
        result.msg = '复制成功';
    }
    return result;
});

//系统日志/数据操作日志
const DateOperLogdata = [
    {
        id: 1,
        user: 'admin',
        time: '2020-07-23 08:57:48',
        ipaddress: '122.236.35.114',
        module: '客户管理',
        behaviour: '编辑',
        object: '员工业绩目标设置',
        action: '编辑了一条员工业绩目标设置',
    },
    {
        id: 2,
        user: 'admin',
        time: '2020-07-23 08:57:48',
        ipaddress: '122.236.35.114',
        module: '客户管理',
        behaviour: '编辑',
        object: '员工业绩目标设置',
        action: '编辑了一条员工业绩目标设置',
    },
    {
        id: 3,
        user: 'admin',
        time: '2020-07-23 08:57:48',
        ipaddress: '122.236.35.114',
        module: '客户管理',
        behaviour: '编辑',
        object: '员工业绩目标设置',
        action: '编辑了一条员工业绩目标设置',
    },
];
Mock.mock('/DateOperLog', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        console.log('进入1');
        result.answer = DateOperLogdata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        console.log('进入2');
        result.answer = DateOperLogdata;
        result.totalbar = 200;
    }
    return result;
});

//系统日志/系统操作日志
const SystemOperLogdata = [
    {
        id: 1,
        user: 'admin',
        time: '2020-07-23 08:57:48',
        ipaddress: '122.236.35.114',
        module: '客户管理',
        behaviour: '编辑',
        object: '员工业绩目标设置',
        action: '编辑了一条员工业绩目标设置',
    },
    {
        id: 2,
        user: 'admin',
        time: '2020-07-23 08:57:48',
        ipaddress: '122.236.35.114',
        module: '客户管理',
        behaviour: '编辑',
        object: '员工业绩目标设置',
        action: '编辑了一条员工业绩目标设置',
    },
    {
        id: 3,
        user: 'admin',
        time: '2020-07-23 08:57:48',
        ipaddress: '122.236.35.114',
        module: '客户管理',
        behaviour: '编辑',
        object: '员工业绩目标设置',
        action: '编辑了一条员工业绩目标设置',
    },
];
Mock.mock('/SystemOperLog', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        console.log('进入1');
        result.answer = SystemOperLogdata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        console.log('进入2');
        result.answer = SystemOperLogdata;
        result.totalbar = 200;
    }
    return result;
});

//系统日志/登录日志
const LoginLogdata = [
    {
        id: 1,
        user: 'admin',
        logintime: '2020-07-23 08:57:56',
        ipaddress: '122.236.20.141',
        address: '中国浙江省绍兴市',
        devicetype: '网页',
        terminalkernel: 'Chrome84.0.4147.89',
        platform: 'Windows 10 or Windo',
        identification: '成功',
    },
    {
        id: 2,
        user: 'admin',
        logintime: '2020-07-23 08:57:56',
        ipaddress: '122.236.20.141',
        address: '中国浙江省绍兴市',
        devicetype: '网页',
        terminalkernel: 'Chrome84.0.4147.89',
        platform: 'Windows 10 or Windo',
        identification: '成功',
    },
    {
        id: 3,
        user: 'admin',
        logintime: '2020-07-23 08:57:56',
        ipaddress: '122.236.20.141',
        address: '中国浙江省绍兴市',
        devicetype: '网页',
        terminalkernel: 'Chrome84.0.4147.89',
        platform: 'Windows 10 or Windo',
        identification: '成功',
    },
];
Mock.mock('/LoginLog', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        console.log('进入1');
        result.answer = LoginLogdata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        console.log('进入2');
        result.answer = LoginLogdata;
        result.totalbar = 200;
    }
    return result;
});
