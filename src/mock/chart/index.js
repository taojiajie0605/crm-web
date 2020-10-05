import Mock from 'mockjs';
import '@/mock/extend';

Mock.mock('/TotalCustomerChart', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/TotalCustomerChart 接口接受的参数：');
    console.log(param);
    const data = [];
    const num = Math.ceil(Math.random() * 12);
    for (let i = 0; i < num; i++) {
        data.push({
            customerNum: Math.ceil(Math.random() * 100),
            dealCustomerNum: Math.ceil(Math.random() * 100),
            type: 202000 + i + 1,
        });
    }
    return data;
});
Mock.mock('/CustomerFollowUpTimesChart', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/CustomerFollowUpTimesChart 接口接受的参数：');
    console.log(param);
    const data = [];
    const num = Math.ceil(Math.random() * 12);
    for (let i = 0; i < num; i++) {
        data.push({
            recordCount: Math.ceil(Math.random() * 100),
            customerCount: Math.ceil(Math.random() * 100),
            type: 202000 + i + 1,
        });
    }
    return data;
});
Mock.mock('/UrbanDistributionChart', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/UrbanDistributionChart 接口接受的参数：');
    console.log(param);
    const data = [
        { region: '浙江', totalCustomer: 86, dealCustomer: 20 },
        { region: '江苏', totalCustomer: 106, dealCustomer: 20 },
        { region: '内蒙古', totalCustomer: 94, dealCustomer: 10 },
        { region: '台湾', totalCustomer: 98, dealCustomer: 33 },
        { region: '上海', totalCustomer: 98, dealCustomer: 50 },
        { region: '新疆', totalCustomer: 97, dealCustomer: 40 },
        { region: '黑龙江', totalCustomer: 98, dealCustomer: 22 },
        { region: '北京', totalCustomer: 96, dealCustomer: 9 },
    ];
    return data;
});
Mock.mock('/ProductClassificationChart', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/ProductClassificationChart 接口接受的参数：');
    console.log(param);
    const data = [
        { product: '服务器', count: 23 },
        { product: 'DELL一体机', count: 23 },
        { product: 'DELL笔记本', count: 23 },
    ];
    return data;
});

//聊天消息列
const MessageListData = [
    {
        id: 1,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=24eecdd9112a5331be90f4a6c7239e56&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F160812%2F4-160Q2151302.jpg',
        name: '张总',
        lastrecord: '好的',
        lasttime: '2020-9-1 14:25',
        position: '正云智能科技 管理',
    },
    {
        id: 2,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827899&di=e2a8363fc3c7963648967e8d6a154af1&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F17%2F174124tp3sa6vvckc25oc8.jpg',
        name: '王总',
        lastrecord: '明天就过去',
        lasttime: '2020-8-15 11:15',
        position: '阿里巴巴 工程师',
    },
    {
        groupid: 1,
        groupname: '研发小组',
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599737657085&di=eea52083ebc75b2fd578427deda7c149&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F59%2F79%2F9257486e6b2bec3.jpg',
        lastrecord: '知道了',
        lasttime: '2020-9-30 11:15',
    },
    {
        groupid: 2,
        groupname: '销售小组',
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599737657085&di=eea52083ebc75b2fd578427deda7c149&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F59%2F79%2F9257486e6b2bec3.jpg',
        lastrecord: 'ok没问题',
        lasttime: '2020-9-20 11:15',
    },
    {
        id: 5,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=92c9fdf88a49bb1268e369782bb601af&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201301%2F05%2F163809wo066osj41x6xwo2.jpg',
        name: '王五',
        lastrecord: '今天开始分配任务',
        lasttime: '2020-8-2 17:02',
        position: '正云智能科技 工程师',
    },
    {
        id: 6,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=16fa5eefb4fbbb8f9a542629416e141e&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2009-03-09%2F200939203936123_2.jpg',
        name: '刘总',
        lastrecord: '任务已经完成了',
        lasttime: '2020-7-29 19:08',
        position: '极客信息科技有限公司 工程师',
    },
    {
        id: 7,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=c87da496b34e806cebb94c9babde498b&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F24%2F97%2F12%2Fpic_lib%2Fs960x639%2F002-land016s960x639.jpg',
        name: '王总',
        lastrecord: '今天招人',
        lasttime: '2020-7-7 19:08',
        position: 'xx智能科技 主管',
    },
    {
        id: 8,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=64297073795161ee79a09c3792c6c43c&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2009-02-24%2F20092247525811_2.jpg',
        name: '工头',
        lastrecord: '你好',
        lasttime: '2020-7-7 19:08',
        position: '正云智能科技 技术工人',
    },
];
Mock.mock('/MessageList', 'post', ({ body }) => {
    const result = {};
    result.answer = MessageListData;
    return result;
});

//所有联系人
const allcontacts = {
    id: 1,
    title: '绍兴极客有线公司',
    img:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=16fa5eefb4fbbb8f9a542629416e141e&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2009-03-09%2F200939203936123_2.jpg',
    membersnum: 20,
    members: [
        {
            id: 1,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=24eecdd9112a5331be90f4a6c7239e56&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F160812%2F4-160Q2151302.jpg',
            name: '张总',
            department: '正云智能科技',
            position: '管理',
        },
        {
            id: 2,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827899&di=e2a8363fc3c7963648967e8d6a154af1&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F17%2F174124tp3sa6vvckc25oc8.jpg',
            name: '王总',
            department: '阿里巴巴',
            position: '工程师',
        },
        {
            id: 3,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=669bf573d70d053699af6b5474f1a313&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F162e189b94a5faac15a4fba25ea242e1.jpeg',
            name: '张三',
            department: '考拉仓库',
            position: '管理部',
        },
        {
            id: 4,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=afcb8f9dfe9f87bf2f5d2a2ad95343db&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F18816%2F18815745.jpg',
            name: '李四',
            department: '财务部',
            position: '核算员',
        },
        {
            id: 5,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=92c9fdf88a49bb1268e369782bb601af&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201301%2F05%2F163809wo066osj41x6xwo2.jpg',
            name: '王五',
            department: '科技部',
            position: '工程师',
        },
        {
            id: 6,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=16fa5eefb4fbbb8f9a542629416e141e&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2009-03-09%2F200939203936123_2.jpg',
            name: '刘总',
            department: '设计部',
            position: '设计人员',
        },
        {
            id: 7,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=c87da496b34e806cebb94c9babde498b&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F24%2F97%2F12%2Fpic_lib%2Fs960x639%2F002-land016s960x639.jpg',
            name: '王总',
            department: '工程运维部',
            position: '工程人员',
        },
        {
            id: 8,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=64297073795161ee79a09c3792c6c43c&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2009-02-24%2F20092247525811_2.jpg',
            name: '工头',
            department: '决算部',
            position: '决算师',
        },
    ],
};
Mock.mock('/allcontacts', 'post', () => {
    const result = {};
    result.answer = allcontacts;
    return result;
});
//按公司部门查询
const ChCompanyMemberData = {
    id: 1,
    title: '绍兴极客有线公司',
    content: [
        {
            departmentid: 1,
            title: '经理室',
            membernum: 3,
        },
        {
            departmentid: 2,
            title: '财务部',
            membernum: 6,
        },
        {
            departmentid: 3,
            title: '商务部',
            membernum: 2,
        },
        {
            departmentid: 4,
            title: '研发部',
            membernum: 8,
        },
        {
            departmentid: 5,
            title: '设计部',
            membernum: 1,
        },
        {
            departmentid: 6,
            title: '工程运维部',
            membernum: 3,
        },
    ],
};
Mock.mock('/ChCompanyMember', 'post', () => {
    const result = {};
    result.answer = ChCompanyMemberData;
    return result;
});
//某个部门下的员工
const members = {
    id: 1,
    title: '财务部',
    members: [
        {
            id: 1,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=24eecdd9112a5331be90f4a6c7239e56&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F160812%2F4-160Q2151302.jpg',
            name: '张总',
            department: '正云智能科技',
            position: '管理',
        },
        {
            id: 2,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827899&di=e2a8363fc3c7963648967e8d6a154af1&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F17%2F174124tp3sa6vvckc25oc8.jpg',
            name: '王总',
            department: '阿里巴巴',
            position: '工程师',
        },
        {
            id: 3,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=669bf573d70d053699af6b5474f1a313&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F162e189b94a5faac15a4fba25ea242e1.jpeg',
            name: '张三',
            department: '考拉仓库',
            position: '管理部',
        },
        {
            id: 4,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=afcb8f9dfe9f87bf2f5d2a2ad95343db&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F18816%2F18815745.jpg',
            name: '李四',
            department: '财务部',
            position: '核算员',
        },
        {
            id: 5,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=92c9fdf88a49bb1268e369782bb601af&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201301%2F05%2F163809wo066osj41x6xwo2.jpg',
            name: '王五',
            department: '科技部',
            position: '工程师',
        },
        {
            id: 6,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=16fa5eefb4fbbb8f9a542629416e141e&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2009-03-09%2F200939203936123_2.jpg',
            name: '刘总',
            department: '设计部',
            position: '设计人员',
        },
        {
            id: 7,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=c87da496b34e806cebb94c9babde498b&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F24%2F97%2F12%2Fpic_lib%2Fs960x639%2F002-land016s960x639.jpg',
            name: '王总',
            department: '工程运维部',
            position: '工程人员',
        },
        {
            id: 8,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=64297073795161ee79a09c3792c6c43c&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2009-02-24%2F20092247525811_2.jpg',
            name: '工头',
            department: '决算部',
            position: '决算师',
        },
    ],
};
Mock.mock('/members', 'post', () => {
    const result = {};
    result.answer = members;
    return result;
});

//查找群组
const ChGroupData = [
    {
        groupid: 1,
        groupname: '研发小组',
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599737657085&di=eea52083ebc75b2fd578427deda7c149&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F59%2F79%2F9257486e6b2bec3.jpg',
        remarks: '群聊',
        groupmember: [ChCompanyMemberData[0], ChCompanyMemberData[1]],
    },
    {
        groupid: 2,
        groupname: '销售小组',
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599737657085&di=eea52083ebc75b2fd578427deda7c149&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F59%2F79%2F9257486e6b2bec3.jpg',
        remarks: '讨论组',
        groupmember: [ChCompanyMemberData[0], ChCompanyMemberData[1]],
    },
    {
        groupid: 3,
        groupname: '软件外包团队',
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599737657085&di=eea52083ebc75b2fd578427deda7c149&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F59%2F79%2F9257486e6b2bec3.jpg',
        remarks: '讨论组',
        groupmember: [ChCompanyMemberData[0], ChCompanyMemberData[1]],
    },
];
Mock.mock('/ChGroup', 'post', () => {
    const result = {};
    result.answer = ChGroupData;
    return result;
});

//创建群聊/查找所有员工
const allmembers = [
    {
        id: 1,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=24eecdd9112a5331be90f4a6c7239e56&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F160812%2F4-160Q2151302.jpg',
        name: '张总',
        department: '正云智能科技',
        position: '管理',
    },
    {
        id: 2,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827899&di=e2a8363fc3c7963648967e8d6a154af1&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F17%2F174124tp3sa6vvckc25oc8.jpg',
        name: '王总',
        department: '阿里巴巴',
        position: '工程师',
    },
    {
        id: 3,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=669bf573d70d053699af6b5474f1a313&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F162e189b94a5faac15a4fba25ea242e1.jpeg',
        name: '张三',
        department: '考拉仓库',
        position: '管理部',
    },
    {
        id: 4,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=afcb8f9dfe9f87bf2f5d2a2ad95343db&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F18816%2F18815745.jpg',
        name: '李四',
        department: '财务部',
        position: '核算员',
    },
    {
        id: 5,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=92c9fdf88a49bb1268e369782bb601af&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201301%2F05%2F163809wo066osj41x6xwo2.jpg',
        name: '王五',
        department: '科技部',
        position: '工程师',
    },
    {
        id: 6,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=16fa5eefb4fbbb8f9a542629416e141e&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2009-03-09%2F200939203936123_2.jpg',
        name: '刘总',
        department: '设计部',
        position: '设计人员',
    },
    {
        id: 7,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=c87da496b34e806cebb94c9babde498b&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F24%2F97%2F12%2Fpic_lib%2Fs960x639%2F002-land016s960x639.jpg',
        name: '王总',
        department: '工程运维部',
        position: '工程人员',
    },
    {
        id: 8,
        img:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=64297073795161ee79a09c3792c6c43c&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2009-02-24%2F20092247525811_2.jpg',
        name: '工头',
        department: '决算部',
        position: '决算师',
    },
];
Mock.mock('/allmembers', 'post', () => {
    const result = {};
    result.answer = allmembers;
    return result;
});
//创建群聊/提交
Mock.mock('/addgroup', 'post', () => {
    const result = {};
    result.msg = '新建成功';
    return result;
});

//同事群聊搜索
const chartsearch = {
    contacts: [
        {
            id: 1,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=24eecdd9112a5331be90f4a6c7239e56&imgtype=0&src=http%3A%2F%2Fpicture.ik123.com%2Fuploads%2Fallimg%2F160812%2F4-160Q2151302.jpg',
            name: '张总',
            department: '正云智能科技',
            position: '管理',
        },
        {
            id: 2,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827899&di=e2a8363fc3c7963648967e8d6a154af1&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201311%2F17%2F174124tp3sa6vvckc25oc8.jpg',
            name: '王总',
            department: '阿里巴巴',
            position: '工程师',
        },
        {
            id: 3,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=669bf573d70d053699af6b5474f1a313&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F162e189b94a5faac15a4fba25ea242e1.jpeg',
            name: '张三',
            department: '考拉仓库',
            position: '管理部',
        },
        {
            id: 4,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=afcb8f9dfe9f87bf2f5d2a2ad95343db&imgtype=0&src=http%3A%2F%2Fimg8.zol.com.cn%2Fbbs%2Fupload%2F18816%2F18815745.jpg',
            name: '李四',
            department: '财务部',
            position: '核算员',
        },
        {
            id: 5,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599652827898&di=92c9fdf88a49bb1268e369782bb601af&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201301%2F05%2F163809wo066osj41x6xwo2.jpg',
            name: '王五',
            department: '科技部',
            position: '工程师',
        },
        {
            id: 6,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=16fa5eefb4fbbb8f9a542629416e141e&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2009-03-09%2F200939203936123_2.jpg',
            name: '刘总',
            department: '设计部',
            position: '设计人员',
        },
        {
            id: 7,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=c87da496b34e806cebb94c9babde498b&imgtype=0&src=http%3A%2F%2Fimg.article.pchome.net%2F00%2F24%2F97%2F12%2Fpic_lib%2Fs960x639%2F002-land016s960x639.jpg',
            name: '王总',
            department: '工程运维部',
            position: '工程人员',
        },
        {
            id: 8,
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599710567689&di=64297073795161ee79a09c3792c6c43c&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2009-02-24%2F20092247525811_2.jpg',
            name: '工头',
            department: '决算部',
            position: '决算师',
        },
    ],
    groups: [
        {
            groupname: '研发小组',
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599737657085&di=eea52083ebc75b2fd578427deda7c149&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F59%2F79%2F9257486e6b2bec3.jpg',
            remarks: '群聊',
            groupmember: [ChCompanyMemberData[0], ChCompanyMemberData[1]],
        },
        {
            groupname: '销售小组',
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599737657085&di=eea52083ebc75b2fd578427deda7c149&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F59%2F79%2F9257486e6b2bec3.jpg',
            remarks: '讨论组',
            groupmember: [ChCompanyMemberData[0], ChCompanyMemberData[1]],
        },
        {
            groupname: '软件外包团队',
            img:
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599737657085&di=eea52083ebc75b2fd578427deda7c149&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F59%2F79%2F9257486e6b2bec3.jpg',
            remarks: '讨论组',
            groupmember: [ChCompanyMemberData[0], ChCompanyMemberData[1]],
        },
    ],
};
Mock.mock('/chartsearch', 'post', () => {
    const result = {};
    result.answer = chartsearch;
    return result;
});

//聊天置顶
Mock.mock('/topchat', 'post', () => {
    const result = {};
    result.msg = '置顶成功';
    return result;
});
