import Mock from 'mockjs';
import '@/mock/extend';

Mock.mock('/TotalCustomerTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/TotalCustomerTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const total = [];
    let totalAddCustomer = 0,
        totalDealCustomer = 0,
        totalTurnoverRate = 0,
        totalContractMoney = 0,
        totalAmountReceived = 0;
    for (let i = 0; i < 3; i++) {
        const a = Math.ceil(Math.random() * 10);
        const b = Math.ceil(Math.random() * 10);
        const c = parseFloat((Math.random() * 10).toFixed(3));
        const d = parseFloat((Math.random() * 10000).toFixed(3));
        const e = parseFloat((Math.random() * 1000).toFixed(3));
        data.push({
            id: i,
            userName: '员工' + Math.ceil(Math.random() * 100),
            addCustomer: a,
            dealCustomer: b,
            turnoverRate: c,
            contractMoney: d,
            amountReceived: e,
        });
        totalAddCustomer += a;
        totalDealCustomer += b;
        totalTurnoverRate += c;
        totalContractMoney += d;
        totalAmountReceived += e;
    }
    total.push({
        id: 'a',
        totalUserName: '总计',
        totalAddCustomer: totalAddCustomer,
        totalDealCustomer: totalDealCustomer,
        totalTurnoverRate: totalTurnoverRate.toFixed(3),
        totalContractMoney: totalContractMoney.toFixed(3),
        totalAmountReceived: totalAmountReceived.toFixed(3),
    });
    return { list: data, total: total };
});
Mock.mock('/CustomerFollowUpTimesTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/CustomerFollowUpTimesTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const total = [];
    let totalAddCustomer = 0;
    let totalDealCustomer = 0;
    for (let i = 0; i < 3; i++) {
        const addNum = Math.ceil(Math.random() * 10);
        const dealNum = Math.ceil(Math.random() * 10);
        data.push({
            id: i,
            userName: '员工' + Math.ceil(Math.random() * 100),
            addCustomer: addNum,
            dealCustomer: dealNum,
        });
        totalAddCustomer += addNum;
        totalDealCustomer += dealNum;
    }
    total.push({
        id: 'sdf',
        totalUserName: '总计',
        totalAddCustomer: totalAddCustomer,
        totalDealCustomer: totalDealCustomer,
    });
    return { list: data, total: total };
});
Mock.mock('/CustomerFollowUpMethodTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/CustomerFollowUpMethodTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const a = Math.ceil(Math.random() * 100);
    const b = Math.ceil(Math.random() * 100);
    const c = Math.ceil(Math.random() * 100);
    const aRate = ((a / (a + b + c)) * 100).toFixed(3);
    const bRate = ((b / (a + b + c)) * 100).toFixed(3);
    const cRate = ((c / (a + b + c)) * 100).toFixed(3);
    data.push({ id: 1, method: '发短信', count: a, rate: aRate });
    data.push({ id: 2, method: '打电话', count: b, rate: bRate });
    data.push({ id: 3, method: '见面拜访', count: c, rate: cRate });
    return data;
});
Mock.mock('/CustomerSatisfactionTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/CustomerSatisfactionTableList 接口接受的参数：');
    console.log(param);
    const data = [];

    for (let i = 0; i < 10; i++) {
        const a = Math.ceil(Math.random() * 20);
        const b = Math.ceil(Math.random() * 20);
        const c = Math.ceil(Math.random() * 20);
        const d = Math.ceil(Math.random() * 20);
        const e = Math.ceil(Math.random() * 20);
        const total = a + b + c + d + e;
        data.push({
            id: i,
            realName: '员工' + (i + 1),
            visitContractNum: total,
            满意: a,
            很满意: b,
            一般: c,
            不满意: d,
            很不满意: e,
        });
    }
    return data;
});
Mock.mock('/HighSeasCustomersTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/HighSeasCustomersTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const total = [];
    let putInTotal = 0;
    let receiveTotal = 0;
    for (let i = 0; i < 10; i++) {
        const putIn = Math.ceil(Math.random() * 100);
        const receive = Math.ceil(Math.random() * 100);
        data.push({
            id: i,
            realName: '员工' + (i + 1),
            deptName: '全公司',
            putInNum: putIn,
            receiveNum: receive,
        });
        putInTotal += putIn;
        receiveTotal += receive;
    }
    total.push({
        id: '1',
        realName: '总计',
        deptName: '',
        putInNumTotal: putInTotal,
        receiveNumTotal: receiveTotal,
    });
    return { list: data, total: total };
});
Mock.mock('/CustomerTransformationTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/HighSeasCustomersTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 10);
    for (let i = 0; i < length; i++) {
        data.push({
            type: 202000 + i + '',
            pro: parseFloat((Math.random() * 100).toFixed(3)),
        });
    }
    return data;
});
Mock.mock('/CustomerTransformationDetailTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/CustomerTransformationDetailTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 100);
    for (let i = 0; i < length; i++) {
        data.push({
            id: i,
            customerName: '员工' + i,
            contractName: '合同' + i,
            contractMoney: Math.ceil(Math.random() * 10000),
            paymentCollectionMoney: Math.ceil(Math.random() * 10000),
            personInCharge: 'admin',
            createTime: '2020-07-31',
            orderTime: '2020-07-31',
        });
    }
    return { list: data, count: length };
});
Mock.mock('/ProductCycleProductTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/ProductCycleProductTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 20);
    for (let i = 0; i < length; i++) {
        data.push({
            id: i,
            productName: '产品' + i,
            transactionCycle: Math.ceil(Math.random() * 10),
            transactionCustomer: Math.ceil(Math.random() * 10),
        });
    }
    return data;
});
Mock.mock('/ProductCycleRegionTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/ProductCycleRegionTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 20);
    for (let i = 0; i < length; i++) {
        data.push({
            id: i,
            regionName: '地区' + i,
            transactionCycle: Math.ceil(Math.random() * 10),
            transactionCustomer: Math.ceil(Math.random() * 10),
        });
    }
    return data;
});
Mock.mock('/ProductCycleEmployeeTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/ProductCycleEmployeeTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 20);
    for (let i = 0; i < length; i++) {
        data.push({
            id: i,
            employeeName: '员工' + i,
            transactionCycle: Math.ceil(Math.random() * 10),
            transactionCustomer: Math.ceil(Math.random() * 10),
        });
    }
    return data;
});
Mock.mock('/SalesFunnelTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/SalesFunnelTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);
    for (let i = 0; i < length; i++) {
        data.push({
            id: i,
            stage: '阶段' + i,
            money: Math.ceil(Math.random() * 100000),
            businessOpportunity: Math.ceil(Math.random() * 10),
        });
    }
    return data;
});
Mock.mock('/getGroupOptions', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/getGroupOptions 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);
    for (let i = 0; i < length; i++) {
        data.push({
            id: i,
            label: '分组' + i,
            value: '分组' + i,
        });
    }
    return data;
});
Mock.mock('/getAddBusinessOpportunitiesTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/getAddBusinessOpportunitiesTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);
    for (let i = 1; i <= length; i++) {
        data.push({
            id: i,
            businessNum: parseFloat((Math.random() * 10).toFixed(1)),
            type: 202000 + i,
            businessMoney: parseFloat((Math.random() * 10).toFixed(2)),
        });
    }
    return data;
});
Mock.mock('/NewBusinessOpportunitiesDetailTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/NewBusinessOpportunitiesDetailTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 80);
    for (let i = 1; i <= length; i++) {
        data.push({
            id: i,
            businessOpportunityName: '商机' + i,
            customerName: '客户' + i,
            commercialUnit: '销售商机组',
            stage: '阶段' + i,
            businessOpportunityMoney: parseFloat(
                (Math.random() * 100000).toFixed(2),
            ),
            expectedTime: '2020-07-31',
            createTime: '2019-07-31',
            personInCharge: '张三',
        });
    }
    return { list: data, count: data.length };
});
Mock.mock(
    '/getBusinessOpportunityConversionRateTableList',
    'post',
    ({ body }) => {
        const param = JSON.parse(body);
        console.log(
            '/getBusinessOpportunityConversionRateTableList 接口接受的参数：',
        );
        console.log(param);
        const data = [];
        const length = Math.ceil(Math.random() * 8);
        for (let i = 1; i <= length; i++) {
            data.push({
                id: i,
                businessNum: parseFloat((Math.random() * 10).toFixed(1)),
                proportion: parseFloat((Math.random() * 100).toFixed(2)),
                type: 202000 + i,
                businessMoney: parseFloat((Math.random() * 10).toFixed(2)),
            });
        }
        return data;
    },
);
Mock.mock('/getContractAmountRankingTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/getContractAmountRankingTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);

    for (let i = 1; i <= length; i++) {
        data.push({
            id: i,
            ranking: i,
            signer: '张' + i,
            department: '销售部',
            contractAmount: parseFloat((Math.random() * 100000).toFixed(2)),
        });
    }
    return data;
});
Mock.mock('/getAmountReceivedTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/getAmountReceivedTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);

    for (let i = 1; i <= length; i++) {
        data.push({
            id: i,
            ranking: i,
            signer: '李' + i,
            department: '销售部',
            amountReceived: parseFloat((Math.random() * 100000).toFixed(2)),
        });
    }
    return data;
});
Mock.mock('/getContractSigningTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/getContractSigningTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);

    for (let i = 1; i <= length; i++) {
        data.push({
            id: i,
            ranking: i,
            signer: '王' + i,
            department: '销售部',
            contractedAmountOfMoney: Math.ceil(Math.random() * 10),
        });
    }
    return data;
});
Mock.mock('/getProductSalesTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/getProductSalesTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);

    for (let i = 1; i <= length; i++) {
        data.push({
            id: i,
            ranking: i,
            signer: '员工' + i,
            department: '销售部',
            productSales: Math.ceil(Math.random() * 10),
        });
    }
    return data;
});
Mock.mock('/getNumberOfNewCustomersTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/getNumberOfNewCustomersTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);

    for (let i = 1; i <= length; i++) {
        data.push({
            id: i,
            ranking: i,
            signer: 'admin' + i,
            department: '全公司',
            count: Math.ceil(Math.random() * 10),
        });
    }
    return data;
});
Mock.mock('/getNumberOfNewContactsTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/getNumberOfNewContactsTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);

    for (let i = 1; i <= length; i++) {
        data.push({
            id: i,
            ranking: i,
            signer: 'admin' + i,
            department: '全公司',
            count: Math.ceil(Math.random() * 10),
        });
    }
    return data;
});
Mock.mock('/getFollowUpTimesTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/getFollowUpTimesTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);

    for (let i = 1; i <= length; i++) {
        data.push({
            id: i,
            ranking: i,
            signer: '员工' + i,
            department: '全公司',
            count: Math.ceil(Math.random() * 100),
        });
    }
    return data;
});
Mock.mock('/getNumberOfFollowUpCustomersTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/getNumberOfFollowUpCustomersTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);

    for (let i = 1; i <= length; i++) {
        data.push({
            id: i,
            ranking: i,
            signer: '员工' + i,
            department: '全公司',
            count: Math.ceil(Math.random() * 100),
        });
    }
    return data;
});
Mock.mock('/getNumberOfBusinessTripsTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/getNumberOfBusinessTripsTableList 接口接受的参数：');
    console.log(param);
    const data = [];
    const length = Math.ceil(Math.random() * 8);

    for (let i = 1; i <= length; i++) {
        data.push({
            id: i,
            ranking: i,
            signer: '员工' + i,
            department: '全公司',
            count: Math.ceil(Math.random() * 100),
        });
    }
    return data;
});
Mock.mock('/CustomerIndustryChart', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/CustomerIndustryChart 接口接受的参数：');
    console.log(param);
    const data = [
        { industry: 'IT', totalCustomer: 86, dealCustomer: 20 },
        { industry: '纺织', totalCustomer: 106, dealCustomer: 20 },
        { industry: '建筑', totalCustomer: 94, dealCustomer: 10 },
        { industry: '制造', totalCustomer: 98, dealCustomer: 33 },
        { industry: '土木工程', totalCustomer: 98, dealCustomer: 50 },
    ];
    return data;
});
Mock.mock('/CustomerLevelChart', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/CustomerLevelChart 接口接受的参数：');
    console.log(param);
    const data = [
        { level: 'A(重点客户)', totalCustomer: 86, dealCustomer: 20 },
        { level: 'B(普通用户)', totalCustomer: 106, dealCustomer: 66 },
        { level: 'C(非重点用户)', totalCustomer: 75, dealCustomer: 32 },
    ];
    return data;
});
Mock.mock('/CustomerSourceChart', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/CustomerSourceChart 接口接受的参数：');
    console.log(param);
    const data = [
        { source: '促销', totalCustomer: 86, dealCustomer: 20 },
        { source: '搜索引擎', totalCustomer: 106, dealCustomer: 66 },
        { source: '广告', totalCustomer: 110, dealCustomer: 32 },
        { source: '转介绍', totalCustomer: 20, dealCustomer: 1 },
    ];
    return data;
});
Mock.mock('/LogAnalysisTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    console.log('/LogAnalysisTableList 接口接受的参数：');
    console.log(param);
    const data = [];

    return data;
});
