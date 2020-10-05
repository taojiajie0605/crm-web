import Mock from 'mockjs';
import '@/mock/extend';

//drawer中关于联系人组件的数据
const DrawerComponentsContactData = [
    {
        id: 1,
        name: '张三',
        telephone: 15698252020,
        position: '老板',
        operation: '无',
    },
    {
        id: 2,
        name: '李四',
        telephone: 15698252920,
        position: '总监',
        operation: '首要联系人',
    },
    {
        id: 3,
        name: '王伟',
        telephone: 15698251111,
        position: '员工',
        operation: '无',
    },
];

Mock.mock('/DrawerCompContact', 'post', () => {
    const result = {};
    result.answer = DrawerComponentsContactData;
    return result;
});

const DrawerComponentsBusinessOpData = [
    {
        id: 1,
        name: '管理小程序',
        buopmoney: '21231',
        custname: '极客有线公司',
        buopstate: '销售流程商机组',
        buopstage: '验证客户',
    },
    {
        id: 2,
        name: '网页管理系统',
        buopmoney: '234234',
        custname: '腾讯控股有线公司',
        buopstate: '销售流程商机组',
        buopstage: '需求分析',
    },
    {
        id: 3,
        name: '智能购物系统',
        buopmoney: '12342',
        custname: '阿里控股有线公司',
        buopstate: '销售流程商机组',
        buopstage: '需求分析',
    },
];

Mock.mock('/DrawerCompBusinessOp', 'post', () => {
    const result = {};
    result.answer = DrawerComponentsBusinessOpData;
    return result;
});

const DrawerComponentsContractData = [
    {
        id: 1,
        contractnumber: '111',
        name: '智能购物小程序版权',
        custname: '极客有线公司',
        contractmoney: '28025',
        contractstarttime: '2020-08-03 15:29:03',
        contractendtime: '2020-08-03 15:29:03',
        auditstatus: 2,
    },
    {
        id: 2,
        contractnumber: '112',
        name: '智能家居网页管理系统',
        custname: '王老板',
        contractmoney: '58645',
        contractstarttime: '2020-08-03 15:29:03',
        contractendtime: '2020-08-03 15:29:03',
        auditstatus: 1,
    },
    {
        id: 3,
        contractnumber: '113',
        name: '在线旅游网页管理系统',
        custname: '叶经理',
        contractmoney: '5826446',
        contractstarttime: '2020-08-03 15:29:03',
        contractendtime: '2020-08-03 15:29:03',
        auditstatus: 2,
    },
];

Mock.mock('/DrawerCompContract', 'post', () => {
    const result = {};
    result.answer = DrawerComponentsContractData;
    return result;
});

const DrawerComponentsReturnMoneyData = [
    {
        id: 1,
        name: '154',
        periodnumber: '第一期',
        returnmoneydate: '2020-08-03 15:29:03',
        returnmoneycount: '120',
        contractmoney: '28025',
        person: 'admin',
        contractname: '123',
        auditstatus: 1,
    },
    {
        id: 2,
        name: '155',
        periodnumber: '第二期',
        returnmoneydate: '2020-08-03 15:29:03',
        returnmoneycount: '120',
        contractmoney: '58645',
        person: '王五',
        contractname: '233',
        auditstatus: 2,
    },
    {
        id: 3,
        name: '156',
        periodnumber: '第一期',
        returnmoneydate: '2020-08-03 15:29:03',
        returnmoneycount: '120',
        contractmoney: '5826446',
        person: 'admin',
        contractname: '234',
        auditstatus: 1,
    },
];

Mock.mock('/DrawerCompReturnMoney', 'post', () => {
    const result = {};
    result.answer = DrawerComponentsReturnMoneyData;
    return result;
});

const DrawerComponentsReturnVisitData = [
    {
        id: 1,
        name: '13306',
        returnvisittime: '2020-08-03 15:29:03',
        returnvisitperson: 'admin',
        returnvisittype: '见面拜访',
        custname: '绍兴极客有线公司',
        contactname: '张三',
    },
    {
        id: 2,
        name: '13307',
        returnvisittime: '2020-08-03 15:29:03',
        returnvisitperson: 'admin',
        returnvisittype: '见面拜访',
        custname: '腾讯控股有线公司',
        contactname: '李四',
    },
    {
        id: 3,
        name: '13308',
        returnvisittime: '2020-08-03 15:29:03',
        returnvisitperson: 'admin',
        returnvisittype: '见面拜访',
        custname: '阿里控股有线公司',
        contactname: '王五',
    },
];

Mock.mock('/DrawerCompReturnVisit', 'post', () => {
    const result = {};
    result.answer = DrawerComponentsReturnVisitData;
    return result;
});

const DrawerComponentsProductData = [
    {
        id: 1,
        name: '客户管理',
        producttype: '默认',
        unit: '千克',
        productprice: '120',
        sellprice: 100,
        amount: 20,
        discount: '20%',
        total: '2000',
    },
    {
        id: 2,
        name: '商品管理',
        producttype: '默认',
        unit: '套',
        productprice: '120',
        sellprice: 100,
        amount: 110,
        discount: '40%',
        total: '2400',
    },
    {
        id: 3,
        name: '计件统计',
        producttype: '默认',
        unit: '只',
        productprice: '120',
        sellprice: 100,
        amount: 50,
        discount: '15%',
        total: '3500',
    },
];

Mock.mock('/DrawerCompProduct', 'post', () => {
    const result = {};
    result.answer = DrawerComponentsProductData;
    return result;
});

const DrawerComponentsPrintRecordData = [
    {
        id: 1,
        name: '2020-01-19',
        template: '自定义合同打印模板',
        operation: '无',
    },
];

Mock.mock('/DrawerCompPrintRecord', 'post', () => {
    const result = {};
    result.answer = DrawerComponentsPrintRecordData;
    return result;
});

const DrawerComponentsCallRecordData = [];

Mock.mock('/DrawerCompCallRecord', 'post', () => {
    const result = {};
    result.answer = DrawerComponentsCallRecordData;
    return result;
});

const SearchTeamMateData = [
    {
        id: 1,
        name: 'admin',
    },
    {
        id: 2,
        name: '张三',
    },
    {
        id: 3,
        name: '李四',
    },
];

Mock.mock('/SearchTeamMate', 'post', () => {
    const result = {};
    result.answer = SearchTeamMateData;
    return result;
});

const DrawerTeamMateData = [
    {
        id: 1,
        name: 'admin',
        position: '老板',
        role: '负责人',
        right: '负责人权限',
    },
    {
        id: 2,
        name: 'admin',
        position: '监工',
        role: '负责人',
        right: '负责人权限',
    },
    {
        id: 3,
        name: '李四',
        position: '员工',
        role: '员工',
        right: '员工权限',
    },
];

Mock.mock('/DrawerTeamMate', 'post', () => {
    const result = {};
    result.answer = DrawerTeamMateData;
    return result;
});
