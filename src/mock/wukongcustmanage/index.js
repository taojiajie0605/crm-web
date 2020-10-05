import Mock from 'mockjs';
import '@/mock/extend';

//客户管理/仪表盘/销售简报
const saleskit = [
    {
        id: 1,
        imgname: 'kehu',
        salename: '新增客户（人）',
        salenum: 5,
        comparetime: '较上周',
        comparenum: '20',
    },
    {
        id: 2,
        imgname: 'lianxiren',
        salename: '新增联系人（人）',
        salenum: 6,
        comparetime: '较上周',
        comparenum: '30',
    },
    {
        id: 3,
        imgname: 'shangji',
        salename: '新增商机（个）',
        salenum: 6,
        comparetime: '较上周',
        comparenum: '10',
    },
    {
        id: 4,
        imgname: 'hetong',
        salename: '新增合同（个）',
        salenum: 5,
        comparetime: '较上周',
        comparenum: '15',
    },
    {
        id: 5,
        imgname: 'hetongjine',
        salename: '新增金额（元）',
        salenum: 300520,
        comparetime: '较上周',
        comparenum: '25',
    },
    {
        id: 6,
        imgname: 'shangjijine',
        salename: '商机金额（元）',
        salenum: 200252,
        comparetime: '较上周',
        comparenum: '30',
    },
    {
        id: 7,
        imgname: 'huikuanjine',
        salename: '回款金额（元）',
        salenum: 102020,
        comparetime: '较上周',
        comparenum: '10',
    },
    {
        id: 8,
        imgname: 'genjinjilu',
        salename: '新增跟进记录（条）',
        salenum: 6,
        comparetime: '较上周',
        comparenum: '22',
    },
];
//销售简报
Mock.mock('/saleskit', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    result.answer = saleskit;
    return result;
});
//双轴柱状图金额目标及完成情况
Mock.mock('/targetmoney', 'post', ({ body }) => {
    const param = JSON.parse(body);
    const data = [];
    data.push({
        target: 2,
        complete: 3,
        type: '2019-09',
    });
    data.push({
        target: 1,
        complete: 1,
        type: '2019-11',
    });
    data.push({
        target: 4,
        complete: 2,
        type: '2019-01',
    });
    data.push({
        target: 3,
        complete: 3,
        type: '2019-03',
    });
    data.push({
        target: 2,
        complete: 4,
        type: '2019-05',
    });
    data.push({
        target: 2,
        complete: 4,
        type: '2019-07',
    });
    data.push({
        target: 2,
        complete: 4,
        type: '2019-09',
    });
    return data;
});
//数据汇总
const dataSummery = {
    cust: {
        newadd: 5,
        turndeal: 3,
    },
    follow: {
        custfollow: 1,
        uncustfollow: 4,
    },
    buop: {
        newadd: 2,
        totalmoney: 25000,
        winbuop: 1,
    },
    contracts: {
        sign: 3,
        contractsmoney: 50230,
    },
    returnmoney: {
        totalmoney: 30000,
        expectmoney: 20025,
    },
};
Mock.mock('/dataSummery', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    result.answer = dataSummery;
    return result;
});
//销售漏斗
const SalesFunnel = [
    {
        stage: '验证客户',
        money: 23000,
        businessOpportunity: 2,
    },
    {
        stage: '需求分析',
        money: 35252,
        businessOpportunity: 2,
    },
    {
        stage: '方案/报价',
        money: 42053,
        businessOpportunity: 5,
    },
    {
        stage: '赢单',
        money: 45221,
        businessOpportunity: 3,
    },
];
Mock.mock('/SalesFunnel', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/销售漏斗 接口接受的参数：');
    //console.log(param);
    const result = {};
    result.answer = SalesFunnel;
    return result;
});
//业绩指标完成率
const KpiChart = [
    {
        value: 80,
        target: 50000,
        money: 40000,
    },
];
Mock.mock('/KpiChart', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/业绩指标完成率的参数：');
    //console.log(param);
    const result = {};
    result.answer = KpiChart;
    return result;
});
//排行榜
//回款金额
const RankingList0 = [
    {
        rank: 1,
        name: '李四',
        returnmoney: '30000.00',
        completerate: '60.00',
    },
    {
        rank: 2,
        name: '张三',
        returnmoney: '25000.00',
        completerate: '30.00',
    },
    {
        rank: 3,
        name: 'admin',
        returnmoney: '13200.00',
        completerate: '10.00',
    },
    {
        rank: 4,
        name: '王五',
        returnmoney: '2230',
        completerate: '5.00',
    },
];
//合同金额
const RankingList1 = [
    {
        rank: 1,
        name: '张三',
        contractsmoney: '45000.00',
        completerate: '80.00',
    },
    {
        rank: 2,
        name: '李四',
        contractsmoney: '35000.00',
        completerate: '75.00',
    },
    {
        rank: 3,
        name: '王五',
        contractsmoney: '25022.00',
        completerate: '63.20',
    },
    {
        rank: 4,
        name: 'admin',
        contractsmoney: '13620',
        completerate: '20.10',
    },
];
//合同数
const RankingList2 = [
    {
        rank: 1,
        name: '王五',
        contractsnum: '5',
    },
    {
        rank: 2,
        name: '李四',
        contractsnum: '4',
    },
    {
        rank: 3,
        name: '张三',
        contractsnum: '3',
    },
    {
        rank: 4,
        name: 'admin',
        contractsnum: '1',
    },
];
//新增客户数
const RankingList3 = [
    {
        rank: 1,
        name: '张三',
        newcustnum: '6',
    },
    {
        rank: 2,
        name: '李四',
        newcustnum: '4',
    },
    {
        rank: 3,
        name: '王五',
        newcustnum: '2',
    },
    {
        rank: 4,
        name: 'admin',
        newcustnum: '0',
    },
];
//新增联系人
const RankingList4 = [
    {
        rank: 1,
        name: 'admin',
        newcontacts: '3',
    },
    {
        rank: 2,
        name: '李四',
        newcontacts: '2',
    },
    {
        rank: 3,
        name: '王五',
        newcontacts: '1',
    },
    {
        rank: 4,
        name: '张三',
        newcontacts: '0',
    },
];
//新增商机
const RankingList5 = [
    {
        rank: 1,
        name: '张三',
        newbuop: '9',
    },
    {
        rank: 2,
        name: '李四',
        newbuop: '7',
    },
    {
        rank: 3,
        name: '王五',
        newbuop: '4',
    },
    {
        rank: 4,
        name: 'admin',
        newbuop: '1',
    },
];
//新增商机金额
const RankingList6 = [
    {
        rank: 1,
        name: '张三',
        newbuopmoney: '88870.95',
    },
    {
        rank: 2,
        name: 'admin',
        newbuopmoney: '55660.20',
    },
    {
        rank: 3,
        name: '王五',
        newbuopmoney: '23126.00',
    },
    {
        rank: 4,
        name: '李四',
        newbuopmoney: '20253.00',
    },
];
//新增更进记录个数
const RankingList7 = [
    {
        rank: 1,
        name: '张三',
        newfollow: '5',
    },
    {
        rank: 2,
        name: '李四',
        newfollow: '3',
    },
    {
        rank: 3,
        name: '王五',
        newfollow: '2',
    },
    {
        rank: 4,
        name: 'admin',
        newfollow: '0',
    },
];
Mock.mock('/RankingList', 'post', ({ body }) => {
    const { nowselect } = JSON.parse(body);
    console.log('/排行榜的参数：');
    console.log(nowselect);
    const result = {};
    if (nowselect === '回款金额') {
        result.answer = RankingList0;
    } else if (nowselect === '合同金额') {
        result.answer = RankingList1;
    } else if (nowselect === '合同数') {
        result.answer = RankingList2;
    } else if (nowselect === '新增客户数') {
        result.answer = RankingList3;
    } else if (nowselect === '新增联系人') {
        result.answer = RankingList4;
    } else if (nowselect === '新增商机') {
        result.answer = RankingList5;
    } else if (nowselect === '新增商机金额') {
        result.answer = RankingList6;
    } else {
        result.answer = RankingList7;
    }
    return result;
});
//遗忘提醒
const forgettingreminder = [
    {
        time: '超过7天',
        num: 3,
    },
    {
        time: '超过15天',
        num: 5,
    },
    {
        time: '超过30天',
        num: 6,
    },
    {
        time: '超过3个月',
        num: 0,
    },
    {
        time: '超过6个月',
        num: 7,
    },
    {
        time: '逾期',
        num: 9,
    },
];
Mock.mock('/forgettingreminder', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/遗忘提醒的参数：');
    //console.log(param);
    const result = {};
    result.answer = forgettingreminder;
    return result;
});

//-------------------------------------------------------------------

//客户管理/线索
const cluedata = [
    {
        id: 1,
        cluename: '小程序项目',
        cluesource: '线上询问',
        phone: '151518151',
        telephone: '15135568666',
        email: '185285556@163.com',
        address: '浙江绍兴',
        custindustry: 'IT',
        custlevel: 'A（重点客户）',
        nexttime: '2020-08-03 15:29:03',
        remarks: '不是很急，但很重要',
        lasttime: '2020-08-03 15:29:03',
        lastrecord: '',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: 'admin',
        follow: 2,
    },
    {
        id: 2,
        cluename: 'app开发',
        cluesource: '广告',
        phone: '151518151',
        telephone: '15135568666',
        email: '185285556@163.com',
        address: '浙江绍兴',
        custindustry: 'IT',
        custlevel: 'A（重点客户）',
        nexttime: '2020-08-03 15:29:03',
        remarks: '重点客户，项目大，工程量多',
        lasttime: '2020-08-03 15:29:03',
        lastrecord: '',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: '张三',
        follow: 1,
    },
    {
        id: 3,
        cluename: '网页端开发',
        cluesource: '线上询问',
        phone: '151518151',
        telephone: '15135568666',
        email: '185285556@163.com',
        address: '浙江杭州',
        custindustry: 'IT',
        custlevel: 'A（重点客户）',
        nexttime: '2020-08-03 15:29:03',
        remarks: '重点客户',
        lasttime: '2020-08-03 15:29:03',
        lastrecord: '',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: '李四',
        follow: 2,
    },
];
const clueCheck = [
    {
        id: 1,
        phone: '151518151',
        telephone: '542572',
        cluename: '小程序app',
        person: '王五',
        modular: '线索',
    },
    {
        id: 2,
        phone: '151518151',
        telephone: '542572',
        cluename: '网页端app',
        person: '李四',
        modular: '线索',
    },
    {
        id: 3,
        phone: '151518151',
        telephone: '542572',
        cluename: '小程序',
        person: '张三',
        modular: '线索',
    },
];
Mock.mock('/CustomerManageclue', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = cluedata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = cluedata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/CustomerManageclueConcerns', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = cluedata;
        result.totalbar = 200;
        result.msg = '收藏成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = cluedata;
        result.totalbar = 200;
        result.msg = '收藏成功';
    }
    return result;
});
Mock.mock('/CustomerManageclueAdd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = cluedata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = cluedata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    return result;
});
//转移
Mock.mock('/CustomerManageclueTrans', 'post', ({ body }) => {
    const result = {};
    result.answer = cluedata;
    result.msg = '操作成功';
    return result;
});
//查重
Mock.mock('/CustomerManageclueCheck', 'post', ({ body }) => {
    const result = {};
    result.answer = clueCheck;
    return result;
});
//-------------------------------------------------------------------

//客户管理/客户
const Customerdata = [
    {
        id: 1,
        custname: '极客有线公司',
        founder: 'admin',
        phone: '151518151',
        telephone: '15135568666',
        website: 'https:bilibili.com',
        email: '185285556@163.com',
        custindustry: 'IT',
        custlevel: 'A（重点客户）',
        nexttime: '2020-08-03 15:29:03',
        remarks: '客户量大',
        lockstate: 1,
        transactionstate: 1,
        lasttime: '2020-08-03 15:29:03',
        lastrecord: '无',
        detailaddress: '浙江省,绍兴市,越城区',
        areaposition: '浙江省,绍兴市,越城区',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        custsource: '广告',
        follow: 2,
    },
    {
        id: 2,
        custname: '腾讯控股有线公司',
        founder: '张三',
        phone: '151518151',
        telephone: '15135568666',
        website: 'https:bilibili.com',
        email: '185285556@163.com',
        custindustry: 'IT',
        custlevel: 'A（重点客户）',
        nexttime: '2020-08-03 15:29:03',
        remarks: '项目多',
        lockstate: 2,
        transactionstate: 2,
        lasttime: '2020-08-03 15:29:03',
        lastrecord: '无',
        detailaddress: '浙江省,绍兴市,越城区',
        areaposition: '浙江省,绍兴市,越城区',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        custsource: '广告',
        follow: 1,
    },
    {
        id: 3,
        custname: '阿里控股有限公司',
        founder: '李四',
        phone: '151518151',
        telephone: '15135568666',
        website: 'https:bilibili.com',
        email: '185285556@163.com',
        custindustry: 'IT',
        custlevel: 'A（重点客户）',
        nexttime: '2020-08-03 15:29:03',
        remarks: '项目资金丰富',
        lockstate: 1,
        transactionstate: 1,
        lasttime: '2020-08-03 15:29:03',
        lastrecord: '无',
        detailaddress: '浙江省,绍兴市,越城区',
        areaposition: '浙江省,绍兴市,越城区',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        custsource: '广告',
        follow: 2,
    },
];
const CustomerCheck = [
    {
        id: 1,
        custname: '谢老板',
        createtime: '2020-08-03 15:29:03',
        person: 'admin',
        phone: '151518151',
        lasttime: '2020-08-03 15:29:03',
        modular: '客户',
    },
    {
        id: 2,
        custname: '李总监',
        createtime: '2020-08-03 15:29:03',
        person: '张三',
        phone: '151518151',
        lasttime: '2020-08-03 15:29:03',
        modular: '客户',
    },
    {
        id: 3,
        custname: '张包工',
        createtime: '2020-08-03 15:29:03',
        person: '李四',
        phone: '151518151',
        lasttime: '2020-08-03 15:29:03',
        modular: '客户',
    },
];
Mock.mock('/CustomerManageCustomer', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Customerdata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Customerdata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/CustomerManageCustomerConcerns', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Customerdata;
        result.totalbar = 200;
        result.msg = '收藏成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Customerdata;
        result.totalbar = 200;
        result.msg = '收藏成功';
    }
    return result;
});
Mock.mock('/CustomerManageCustomerAdd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Customerdata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Customerdata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    return result;
});
//转移
Mock.mock('/CustomerManageCustomerTrans', 'post', ({ body }) => {
    const result = {};
    result.answer = Customerdata;
    result.msg = '操作成功';
    return result;
});
//查重
Mock.mock('/CustomerManageCustomerCheck', 'post', ({ body }) => {
    const result = {};
    result.answer = CustomerCheck;
    return result;
});
//-------------------------------------------------------------------

//客户管理/联系人
const Contactsdata = [
    {
        id: 1,
        name: '王总',
        custname: '极客有线公司',
        phone: '151518151',
        telephone: '15135568666',
        email: '185285556@163.com',
        position: '老板',
        maker: 1,
        address: 'A（重点客户）',
        nexttime: '2020-08-03 15:29:03',
        remarks: '性格好，易谈',
        gender: 2,
        lasttime: '2020-08-03 15:29:03',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: 'admin',
        follow: 1,
    },
    {
        id: 2,
        name: '李经理',
        custname: '极客有线公司',
        phone: '151518151',
        telephone: '15135568666',
        email: '185285556@163.com',
        position: '经理',
        maker: 2,
        address: 'A（重点客户）',
        nexttime: '2020-08-03 15:29:03',
        remarks: '业务能力强',
        gender: 1,
        lasttime: '2020-08-03 15:29:03',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: '李四',
        follow: 2,
    },
    {
        id: 3,
        name: '叶总监',
        custname: '腾讯控股有限公司',
        phone: '151518151',
        telephone: '15135568666',
        email: '185285556@163.com',
        position: '总监',
        maker: 1,
        address: 'A（重点客户）',
        nexttime: '2020-08-03 15:29:03',
        remarks: '技术一流',
        gender: 1,
        lasttime: '2020-08-03 15:29:03',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: '张三',
        follow: 1,
    },
];
const ContactsCheck = [
    {
        id: 1,
        custname: '谢老板',
        createtime: '2020-08-03 15:29:03',
        person: 'admin',
        phone: '151518151',
        lasttime: '2020-08-03 15:29:03',
        modular: '客户',
    },
    {
        id: 2,
        custname: '李总监',
        createtime: '2020-08-03 15:29:03',
        person: '张三',
        phone: '151518151',
        lasttime: '2020-08-03 15:29:03',
        modular: '客户',
    },
    {
        id: 3,
        custname: '张包工',
        createtime: '2020-08-03 15:29:03',
        person: '李四',
        phone: '151518151',
        lasttime: '2020-08-03 15:29:03',
        modular: '客户',
    },
];
Mock.mock('/CustomerManageContacts', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Contactsdata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Contactsdata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/CustomerManageContactsConcerns', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Contactsdata;
        result.totalbar = 200;
        result.msg = '收藏成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Contactsdata;
        result.totalbar = 200;
        result.msg = '收藏成功';
    }
    return result;
});
Mock.mock('/CustomerManageContactsAdd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Contactsdata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Contactsdata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    return result;
});
//转移
Mock.mock('/CustomerManageContactsTrans', 'post', ({ body }) => {
    const result = {};
    result.answer = Contactsdata;
    result.msg = '操作成功';
    return result;
});
//查重
Mock.mock('/CustomerManageContactsCheck', 'post', ({ body }) => {
    const result = {};
    result.answer = ContactsCheck;
    return result;
});
//-------------------------------------------------------------------

//客户管理/商机
const buopdata = [
    {
        id: 1,
        buopname: '管理小程序',
        custname: '极客有线公司',
        buopmoney: '21231',
        expecteddate: '2020-08-03 15:29:03',
        remarks: '任务量适合',
        buopstate: '销售流程商机组',
        buopstage: '验证客户',
        lasttime: '2020-08-03 15:29:03',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: '张三',
        follow: 1,
    },
    {
        id: 2,
        buopname: '网页管理系统',
        custname: '腾讯控股有线公司',
        buopmoney: '234234',
        expecteddate: '2020-08-03 15:29:03',
        remarks: '任务大人少',
        buopstate: '销售流程商机组',
        buopstage: '需求分析',
        lasttime: '2020-08-03 15:29:03',
        person: '李四',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: '王五',
        follow: 2,
    },
    {
        id: 3,
        buopname: '智能购物系统',
        custname: '阿里控股有线公司',
        buopmoney: '12342',
        expecteddate: '2020-08-03 15:29:03',
        remarks: '应该能做',
        buopstate: '销售流程商机组',
        buopstage: '需求分析',
        lasttime: '2020-08-03 15:29:03',
        person: '王五',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: 'admin',
        follow: 1,
    },
];
Mock.mock('/CustomerManagebuop', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = buopdata;
        result.totalbar = 200;
        result.totalmoney = 200000;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = buopdata;
        result.totalbar = 200;
        result.totalmoney = 200000;
    }
    return result;
});
Mock.mock('/CustomerManagebuopConcerns', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = buopdata;
        result.totalbar = 200;
        result.totalmoney = 200000;
        result.msg = '收藏成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = buopdata;
        result.totalbar = 200;
        result.totalmoney = 200000;
        result.msg = '收藏成功';
    }
    return result;
});
Mock.mock('/CustomerManagebuopAdd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = buopdata;
        result.totalbar = 200;
        result.totalmoney = 200000;
        result.msg = '新建成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = buopdata;
        result.totalbar = 200;
        result.totalmoney = 200000;
        result.msg = '新建成功';
    }
    return result;
});
//转移
Mock.mock('/CustomerManagebuopTrans', 'post', ({ body }) => {
    const result = {};
    result.answer = buopdata;
    result.msg = '操作成功';
    return result;
});
//-------------------------------------------------------------------

//客户管理/合同
const contractdata = [
    {
        id: 1,
        contractnumber: '111',
        contractname: '智能购物小程序版权',
        custname: '极客有线公司',
        buopname: '管理小程序',
        contractmoney: '28025',
        ordertime: '2020-08-03 15:29:03',
        contractstarttime: '2020-08-03 15:29:03',
        contractendtime: '2020-08-03 15:29:03',
        custsigner: '王五',
        compsigner: 'admin',
        remarks: '无',
        contracttype: '直销合同',
        auditstatus: 2,
        returnedmoney: '200',
        unreturnedmoney: '600',
        lastfollowuptime: '2020-08-03 15:29:03',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: 'admin',
    },
    {
        id: 2,
        contractnumber: '112',
        contractname: '智能家居网页管理系统',
        custname: '王老板',
        buopname: '网页管理系统',
        contractmoney: '58645',
        ordertime: '2020-08-03 15:29:03',
        contractstarttime: '2020-08-03 15:29:03',
        contractendtime: '2020-08-03 15:29:03',
        custsigner: '李四',
        compsigner: 'admin',
        remarks: '工作量很大',
        contracttype: '直销合同',
        auditstatus: 1,
        returnedmoney: '200',
        unreturnedmoney: '600',
        lastfollowuptime: '2020-08-03 15:29:03',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: 'admin',
    },
    {
        id: 3,
        contractnumber: '113',
        contractname: '在线旅游网页管理系统',
        custname: '叶经理',
        buopname: '管理系统',
        contractmoney: '5826446',
        ordertime: '2020-08-03 15:29:03',
        contractstarttime: '2020-08-03 15:29:03',
        contractendtime: '2020-08-03 15:29:03',
        custsigner: '李四',
        compsigner: 'admin',
        remarks: '很会做生意',
        contracttype: '直销合同',
        auditstatus: 2,
        returnedmoney: '200',
        unreturnedmoney: '600',
        lastfollowuptime: '2020-08-03 15:29:03',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: 'admin',
    },
];
Mock.mock('/CustomerManagecontract', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = contractdata;
        result.totalbar = 200;
        result.totalmoney = 200000;
        result.totalreturnedmoney = 100000;
        result.totalunreturnedmoney = 100000;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = contractdata;
        result.totalbar = 200;
        result.totalmoney = 200000;
        result.totalreturnedmoney = 100000;
        result.totalunreturnedmoney = 100000;
    }
    return result;
});
Mock.mock('/CustomerManagecontractAdd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = contractdata;
        result.totalbar = 200;
        result.totalmoney = 200000;
        result.totalreturnedmoney = 100000;
        result.totalunreturnedmoney = 100000;
        result.msg = '新建成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = contractdata;
        result.totalbar = 200;
        result.totalmoney = 200000;
        result.totalreturnedmoney = 100000;
        result.totalunreturnedmoney = 100000;
        result.msg = '新建成功';
    }
    return result;
});
//转移
Mock.mock('/CustomerManagecontractTrans', 'post', ({ body }) => {
    const result = {};
    result.answer = contractdata;
    result.msg = '操作成功';
    return result;
});
//-------------------------------------------------------------------

//客户管理/回款
const returnmoneydata = [
    {
        id: 1,
        returnmoneynumber: '154',
        custname: '极客有线公司',
        contractnumber: '113',
        periodnumber: '第一期',
        returnmoneydate: '2020-08-03 15:29:03',
        returnmoneycount: '120',
        returnmoneytype: '支付宝',
        remarks: '已回完毕',
        auditstatus: 4,
        contractmoney: '28025',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: '张三',
    },
    {
        id: 2,
        returnmoneynumber: '155',
        custname: '腾讯控股有线公司',
        contractnumber: '112',
        periodnumber: '第二期',
        returnmoneydate: '2020-08-03 15:29:03',
        returnmoneycount: '120',
        returnmoneytype: '支付宝',
        remarks: '基本回款，继续跟进',
        auditstatus: 5,
        contractmoney: '58645',
        person: '王五',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: 'admin',
    },
    {
        id: 3,
        returnmoneynumber: '156',
        custname: '阿里控股有线公司',
        contractnumber: '111',
        periodnumber: '第一期',
        returnmoneydate: '2020-08-03 15:29:03',
        returnmoneycount: '120',
        returnmoneytype: '支付宝',
        remarks: '还欠不少赶紧催',
        auditstatus: 6,
        contractmoney: '5826446',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: '李四',
    },
];
Mock.mock('/CustomerManagereturnmoney', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = returnmoneydata;
        result.totalbar = 200;
        result.totalreturnedmoney = 100000;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = returnmoneydata;
        result.totalbar = 200;
        result.totalreturnedmoney = 100000;
    }
    return result;
});
Mock.mock('/CustomerManagereturnmoneyAdd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = returnmoneydata;
        result.totalbar = 200;
        result.totalreturnedmoney = 100000;
        result.msg = '新建成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = returnmoneydata;
        result.totalbar = 200;
        result.totalreturnedmoney = 100000;
        result.msg = '新建成功';
    }
    return result;
});
//转移
Mock.mock('/CustomerManagereturnmoneyTrans', 'post', ({ body }) => {
    const result = {};
    result.answer = returnmoneydata;
    result.msg = '操作成功';
    return result;
});
//-------------------------------------------------------------------

//客户管理/发票
const billdata = [
    {
        id: 1,
        billapplynumber: '116',
        custname: '绍兴极客有线公司',
        contractnumber: '111',
        contractmoney: '28000',
        billmoney: '150',
        billdate: '2020-08-03 15:29:03',
        truebilldate: '2020-08-03 15:29:03',
        billtype: '收据',
        billnumber: '1232',
        logisticsnumber: '16165615',
        person: 'admin',
        auditstatus: 4,
        operation: 1,
    },
    {
        id: 2,
        billapplynumber: '117',
        custname: '阿里控股有线公司',
        contractnumber: '112',
        contractmoney: '58645',
        billmoney: '150',
        billdate: '2020-08-03 15:29:03',
        truebilldate: '2020-08-03 15:29:03',
        billtype: '收据',
        billnumber: '1233',
        logisticsnumber: '16165615',
        person: 'admin',
        auditstatus: 5,
        operation: 2,
    },
    {
        id: 3,
        billapplynumber: '118',
        custname: '腾讯控股有线公司',
        contractnumber: '113',
        contractmoney: '58645',
        billmoney: '50000',
        billdate: '2020-08-03 15:29:03',
        truebilldate: '2020-08-03 15:29:03',
        billtype: '收据',
        billnumber: '1234',
        logisticsnumber: '16165615',
        person: 'admin',
        auditstatus: 6,
        operation: 1,
    },
];
Mock.mock('/CustomerManagebill', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = billdata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = billdata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/CustomerManagebillAdd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = billdata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = billdata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    return result;
});
//转移
Mock.mock('/CustomerManagebillTrans', 'post', ({ body }) => {
    const result = {};
    result.answer = billdata;
    result.msg = '操作成功';
    return result;
});
//-------------------------------------------------------------------

//客户管理/回访
const returndata = [
    {
        id: 1,
        returnvisitname: '13306',
        returnvisittime: '2020-08-03 15:29:03',
        returnvisitperson: 'admin',
        returnvisittype: '见面拜访',
        custname: '绍兴极客有线公司',
        contactname: '张三',
        contractnumber: '111',
        custsatisfaction: '很满意',
        custreturn: '以后多多合作',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: 'admin',
    },
    {
        id: 2,
        returnvisitname: '13307',
        returnvisittime: '2020-08-03 15:29:03',
        returnvisitperson: 'admin',
        returnvisittype: '见面拜访',
        custname: '腾讯控股有线公司',
        contactname: '李四',
        contractnumber: '112',
        custsatisfaction: '很满意',
        custreturn: '看好你哦',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: 'admin',
    },
    {
        id: 3,
        returnvisitname: '13308',
        returnvisittime: '2020-08-03 15:29:03',
        returnvisitperson: 'admin',
        returnvisittype: '见面拜访',
        custname: '阿里控股有线公司',
        contactname: '王五',
        contractnumber: '113',
        custsatisfaction: '很满意',
        custreturn: '多多合作',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: 'admin',
    },
];
Mock.mock('/CustomerManagereturn', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = returndata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = returndata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/CustomerManagereturnAdd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = returndata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = returndata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    return result;
});
//删除
Mock.mock('/CustomerManagereturnTrans', 'post', ({ body }) => {
    const result = {};
    result.answer = returndata;
    result.msg = '操作成功';
    return result;
});
//-------------------------------------------------------------------

//客户管理/产品
const Productsdata = [
    {
        id: 1,
        productname: '客户管理',
        producttype: '默认',
        unit: '千克',
        productcode: '12235',
        productprice: '120',
        uponshelf: 1,
        describe: '小程序App',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: '李四',
    },
    {
        id: 2,
        productname: '商品管理',
        producttype: '默认',
        unit: '套',
        productcode: '1153131',
        productprice: '120',
        uponshelf: 2,
        describe: '管理系统',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: '王五',
    },
    {
        id: 3,
        productname: '计件统计',
        producttype: '默认',
        unit: '只',
        productcode: '1153131',
        productprice: '120',
        uponshelf: 1,
        describe: '计算系统',
        person: 'admin',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        founder: '张三',
    },
];
Mock.mock('/CustomerManageProducts', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Productsdata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Productsdata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/CustomerManageProductsAdd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Productsdata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Productsdata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    return result;
});
//转移
Mock.mock('/CustomerManageProductsTrans', 'post', ({ body }) => {
    const result = {};
    result.answer = Productsdata;
    result.msg = '操作成功';
    return result;
});
//-------------------------------------------------------------------

//客户管理/市场活动
const Marketingdata = [
    {
        id: 1,
        activityname: '购入材料',
        assobject: '客户',
        founder: 'admin',
        activitytype: '广告',
        starttime: '2020-08-03 15:29:03',
        endtime: '2020-08-03 15:29:03',
        activitybudget: '2000.03',
        activityaddress: '视屏会议',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        state: 1,
    },
    {
        id: 2,
        activityname: '应聘人才',
        assobject: '线索',
        founder: 'admin',
        activitytype: '营销',
        starttime: '2020-08-03 15:29:03',
        endtime: '2020-08-03 15:29:03',
        activitybudget: '2000.03',
        activityaddress: '大厦2楼大厅',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        state: 2,
    },
    {
        id: 3,
        activityname: '购入生活必需品',
        assobject: '线索',
        founder: 'admin',
        activitytype: '广电子告',
        starttime: '2020-08-03 15:29:03',
        endtime: '2020-08-03 15:29:03',
        activitybudget: '2000.03',
        activityaddress: '大厦9楼公共会议',
        updatetime: '2020-08-03 15:29:03',
        createtime: '2020-08-03 15:29:03',
        state: 1,
    },
];
Mock.mock('/CustomerManageMarketing', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Marketingdata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Marketingdata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/CustomerManageMarketingAdd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Marketingdata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Marketingdata;
        result.totalbar = 200;
        result.msg = '新建成功';
    }
    return result;
});
//转移
Mock.mock('/CustomerManageMarketingTrans', 'post', ({ body }) => {
    const result = {};
    result.answer = Productsdata;
    result.msg = '操作成功';
    return result;
});
