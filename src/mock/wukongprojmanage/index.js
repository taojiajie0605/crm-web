import Mock from 'mockjs';
import '@/mock/extend';

//项目管理/工作台
const today = [];
const nexttodo = [];
const latertodo = [];
const mail = [
    {
        id: 1,
        taskname: '收账',
        username: 'admin',
        endtime: '2020-08-25',
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        relatedinfo: '',
        subtask: '',
        appendix: 3,
        checked: false,
    },
    {
        id: 2,
        taskname: '签合同',
        username: 'admin',
        endtime: '2020-08-09',
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 2,
                title: '尽快完成',
                colorid: '2',
                color: 'rgb(250, 84, 28)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        relatedinfo: '3',
        subtask: '',
        appendix: 3,
        checked: false,
    },
    {
        id: 3,
        taskname: '催回款',
        username: 'admin',
        endtime: '',
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 2,
                title: '尽快完成',
                colorid: '2',
                color: 'rgb(250, 84, 28)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        relatedinfo: '1',
        subtask: '',
        appendix: 3,
        checked: false,
    },
    {
        id: 4,
        taskname: '做项目',
        username: 'admin',
        endtime: '2020-08-29',
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 2,
                title: '尽快完成',
                colorid: '2',
                color: 'rgb(250, 84, 28)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        relatedinfo: '4',
        subtask: '2',
        appendix: 3,
        checked: false,
    },
    {
        id: 5,
        taskname: '财务统计',
        username: 'admin',
        endtime: '2020-08-09',
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 2,
                title: '尽快完成',
                colorid: '2',
                color: 'rgb(250, 84, 28)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        relatedinfo: '',
        subtask: '4',
        appendix: 3,
        checked: false,
    },
];
Mock.mock('/MyTask', 'post', ({ body }) => {
    const result = {};
    result.mail = mail;
    result.today = today;
    result.nexttodo = nexttodo;
    result.latertodo = latertodo;
    return result;
});
Mock.mock('/MyTaskAdd', 'post', ({ body }) => {
    const result = {};
    result.msg = '新建/修改成功';
    return result;
});

//项目管理/项目
const proj = [
    {
        id: 1,
        title: '收账',
        background: 'https://www.72crm.com/api/uploads/project-cover-5.jpg',
        content:
            '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
        follow: false,
        SeeRange: '1',
        projmember: ['张三', '李四', 'admin'],
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 3,
                title: '紧急任务',
                colorid: '3',
                color: 'rgb(250, 173, 20)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        memberrole: '1',
        colorid: '1',
        color: 'rgb(245, 34, 45)',
    },
    {
        id: 2,
        title: '签合同',
        background: 'https://www.72crm.com/api/uploads/project-cover-3.jpg',
        content:
            '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
        follow: true,
        SeeRange: '2',
        projmember: ['张三', 'admin'],
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 3,
                title: '紧急任务',
                colorid: '3',
                color: 'rgb(250, 173, 20)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        memberrole: '2',
        colorid: '3',
        color: 'rgb(250, 173, 20)',
    },
    {
        id: 3,
        title: '催回款',
        background: 'https://www.72crm.com/api/uploads/project-cover-8.jpg',
        content:
            '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
        follow: false,
        SeeRange: '1',
        projmember: ['员工1', '员工2', '员工3'],
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 3,
                title: '紧急任务',
                colorid: '3',
                color: 'rgb(250, 173, 20)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        memberrole: '1',
        colorid: '4',
        color: 'rgb(19, 194, 194)',
    },
    {
        id: 4,
        title: '做项目',
        background: 'https://www.72crm.com/api/uploads/project-cover-2.jpg',
        content:
            '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
        follow: true,
        SeeRange: '2',
        projmember: ['王五'],
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 3,
                title: '紧急任务',
                colorid: '3',
                color: 'rgb(250, 173, 20)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        memberrole: '2',
        colorid: '2',
        color: 'rgb(250, 84, 28)',
    },
];
Mock.mock('/AllProj', 'post', ({ body }) => {
    const result = {};
    result.proj = proj;
    return result;
});
Mock.mock('/AllProjConcerns', 'post', ({ body }) => {
    const result = {};
    result.msg = '收藏成功';
    return result;
});
Mock.mock('/AllProjAdd', 'post', ({ body }) => {
    const result = {};
    result.msg = '新建/编辑成功';
    return result;
});
Mock.mock('/MyConcernsProjAdd', 'post', ({ body }) => {
    const result = {};
    result.proj = proj;
    return result;
});

//项目管理/项目细节/看板视图
const item = [
    {
        title: '要做',
        content: [
            {
                id: 1,
                taskname: '收账',
                username: 'admin',
                endtime: '2020-08-25',
                checked: false,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: '1',
                subtask: '',
                appendix: '2',
            },
            {
                id: 2,
                taskname: '签合同',
                username: 'admin',
                endtime: '2020-08-09',
                checked: false,
                labels: [
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: '5',
                subtask: '4',
                appendix: '',
            },
            {
                id: 3,
                taskname: '催回款',
                username: 'admin',
                endtime: '',
                checked: false,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                ],
                relatedinfo: '3',
                subtask: '2',
                appendix: '2',
            },
            {
                id: 4,
                taskname: '做项目',
                username: 'admin',
                endtime: '2020-08-29',
                checked: false,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: '2',
                subtask: '',
                appendix: '4',
            },
            {
                id: 5,
                taskname: '财务统计',
                username: 'admin',
                endtime: '2020-08-09',
                checked: false,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: '3',
                subtask: '1',
                appendix: '',
            },
        ],
    },
    {
        title: '在做',
        content: [],
    },
    {
        title: '待定',
        content: [],
    },
];
Mock.mock('/projdetail', 'post', ({ body }) => {
    const result = {};
    result.item = item;
    return result;
});
Mock.mock('/projdetailadd', 'post', ({ body }) => {
    const result = {};
    result.msg = '新建成功';
    return result;
});
Mock.mock('/projdetailfile', 'post', ({ body }) => {
    const result = {};
    result.msg = '归档成功';
    return result;
});

//项目管理/项目细节/附件
const appendix = [
    {
        id: 1,
        appentitle: '收账单',
        appensize: '1k',
        upperson: 'admin',
        follow: false,
        uptime: '2020-08-28',
    },
    {
        id: 2,
        appentitle: '工资单',
        appensize: '1k',
        upperson: 'admin',
        follow: false,
        uptime: '2020-08-28',
    },
    {
        id: 3,
        appentitle: '员工名单',
        appensize: '1k',
        upperson: 'admin',
        follow: false,
        uptime: '2020-08-28',
    },
    {
        id: 4,
        appentitle: '客户名单',
        appensize: '1k',
        upperson: 'admin',
        follow: false,
        uptime: '2020-08-28',
    },
];
Mock.mock('/appendix', 'post', ({ body }) => {
    const result = {};
    result.appendix = appendix;
    result.totalbar = 200;
    return result;
});
Mock.mock('/deleteappendix', 'post', ({ body }) => {
    const result = {};
    result.msg = '操作成功';
    return result;
});
Mock.mock('/changeappendixname', 'post', ({ body }) => {
    const result = {};
    result.msg = '编辑成功';
    return result;
});

//项目管理/项目细节/任务统计
const completestatus = [
    {
        id: 1,
        name: 'admin',
        totaltask: '10',
        finishtask: '4',
        unfinishtask: '5',
        overdue: '1',
        completionrete: '40',
    },
    {
        id: 2,
        name: '张三',
        totaltask: '20',
        finishtask: '10',
        unfinishtask: '8',
        overdue: '2',
        completionrete: '50',
    },
    {
        id: 3,
        name: '李四',
        totaltask: '10',
        finishtask: '4',
        unfinishtask: '5',
        overdue: '1',
        completionrete: '40',
    },
    {
        id: 4,
        name: '王五',
        totaltask: '10',
        finishtask: '4',
        unfinishtask: '5',
        overdue: '1',
        completionrete: '40',
    },
];
//扇形图1
Mock.mock('/projdetailTableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    const data = [];
    data.push({ id: 1, method: '完成', count: 6, rate: 60 });
    data.push({ id: 2, method: '未完成', count: 4, rate: 40 });
    return data;
});
//扇形图2
Mock.mock('/projdetailTableList2', 'post', ({ body }) => {
    const param = JSON.parse(body);
    const data = [];
    data.push({ id: 1, method: '逾期', count: 4, rate: 40 });
    data.push({ id: 2, method: '未逾期', count: 6, rate: 60 });
    return data;
});
//柱状图
Mock.mock('/projdetailTableListZhu', 'post', ({ body }) => {
    const param = JSON.parse(body);
    const data = [];
    data.push({ id: 1, method: '总任务', count: 10, rate: 60 });
    data.push({ id: 2, method: '未完成', count: 2, rate: 20 });
    data.push({ id: 2, method: '已完成', count: 3, rate: 30 });
    data.push({ id: 2, method: '已逾期', count: 2, rate: 20 });
    data.push({ id: 2, method: '已归档', count: 3, rate: 30 });
    return data;
});
//双轴柱状图任务
Mock.mock('/projdetailTableTaskList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    const data = [];
    data.push({
        customerNum: 2,
        dealCustomerNum: 3,
        type: '在做',
    });
    data.push({
        customerNum: 1,
        dealCustomerNum: 1,
        type: '待定',
    });
    data.push({
        customerNum: 4,
        dealCustomerNum: 2,
        type: '要做',
    });
    data.push({
        customerNum: 3,
        dealCustomerNum: 3,
        type: '今天要做',
    });
    data.push({
        customerNum: 2,
        dealCustomerNum: 4,
        type: '下一步要做',
    });
    return data;
});
//双轴柱状图标签
Mock.mock('/projdetailTableLableList', 'post', ({ body }) => {
    const param = JSON.parse(body);
    const data = [];
    data.push({
        customerNum: 2,
        dealCustomerNum: 3,
        type: '请按时完成',
    });
    data.push({
        customerNum: 1,
        dealCustomerNum: 1,
        type: '请尽快完成',
    });
    data.push({
        customerNum: 4,
        dealCustomerNum: 2,
        type: '比较紧急',
    });
    return data;
});
//成员完成情况
Mock.mock('/completestatus', 'post', ({ body }) => {
    const result = {};
    result.return = completestatus;
    result.totalbar = 200;
    return result;
});

//项目管理/项目细节/归档任务
const archivedtask = [
    {
        id: 1,
        taskname: '收账',
        checked: false,
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 2,
                title: '尽快完成',
                colorid: '2',
                color: 'rgb(250, 84, 28)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        relatedinfo: '',
        subtask: '',
        appendix: 3,
        endtime: '2020-08-25',
    },
    {
        id: 2,
        taskname: '签合同',
        checked: true,
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 2,
                title: '尽快完成',
                colorid: '2',
                color: 'rgb(250, 84, 28)',
            },
            {
                id: 3,
                title: '紧急任务',
                colorid: '3',
                color: 'rgb(250, 173, 20)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        relatedinfo: 5,
        subtask: 2,
        appendix: '',
        endtime: '2020-08-25',
    },
    {
        id: 3,
        taskname: '回款',
        checked: true,
        labels: [],
        relatedinfo: 5,
        subtask: 2,
        appendix: 3,
        endtime: '',
    },
    {
        id: 4,
        taskname: '解约',
        checked: false,
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 2,
                title: '尽快完成',
                colorid: '2',
                color: 'rgb(250, 84, 28)',
            },
            {
                id: 3,
                title: '紧急任务',
                colorid: '3',
                color: 'rgb(250, 173, 20)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        relatedinfo: 5,
        subtask: '',
        appendix: 3,
        endtime: '2020-08-25',
    },
];
//所有归档的任务
Mock.mock('/archivedtask', 'post', ({ body }) => {
    const result = {};
    result.return = archivedtask;
    return result;
});

//项目管理/统计分析
const allproj = [
    {
        id: 1,
        name: '收账',
    },
    {
        id: 2,
        name: '签合同',
    },
    {
        id: 3,
        name: '收回款',
    },
    {
        id: 4,
        name: '做项目',
    },
];
//所有项目id及名称
Mock.mock('/allproj', 'post', ({ body }) => {
    const result = {};
    result.return = allproj;
    return result;
});

//项目管理/归档项目
const archivedproj = [
    {
        id: 1,
        projname: '收账',
        archivedtime: '2020-08-26 11:32:05',
    },
    {
        id: 2,
        projname: '签合同',
        archivedtime: '2020-08-26 11:32:05',
    },
    {
        id: 3,
        projname: '收回款',
        archivedtime: '2020-08-26 11:32:05',
    },
    {
        id: 4,
        projname: '做项目',
        archivedtime: '2020-08-26 11:32:05',
    },
];
Mock.mock('/archivedproj', 'post', ({ body }) => {
    const result = {};
    result.return = archivedproj;
    return result;
});
Mock.mock('/recoveryproj', 'post', ({ body }) => {
    const result = {};
    result.msg = '恢复成功';
    return result;
});

//项目管理/标签
//所有标签
const alllabels = [
    {
        id: 1,
        title: '按时完成',
        colorid: '1',
        color: 'rgb(245, 34, 45)',
    },
    {
        id: 2,
        title: '尽快完成',
        colorid: '2',
        color: 'rgb(250, 84, 28)',
    },
    {
        id: 3,
        title: '紧急任务',
        colorid: '3',
        color: 'rgb(250, 173, 20)',
    },
    {
        id: 4,
        title: '非常紧急',
        colorid: '4',
        color: 'rgb(19, 194, 194)',
    },
];
//所有标签
Mock.mock('/alllabels', 'post', ({ body }) => {
    const result = {};
    result.return = alllabels;
    return result;
});
//改变标签
Mock.mock('/Editlabel', 'post', ({ body }) => {
    const result = {};
    result.msg = '修改成功';
    return result;
});
//删除标签
Mock.mock('/deletelabel', 'post', ({ body }) => {
    const result = {};
    result.msg = '删除成功';
    return result;
});
//该标签相关的项目
const projlabel = [
    {
        title: '收账',
        color: 'rgb(82, 196, 26)',
        content: [
            {
                id: 1,
                taskname: '收账',
                checked: false,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: 5,
                subtask: 2,
                appendix: 3,
                endtime: '2020-08-25',
            },
            {
                id: 2,
                taskname: '收账',
                checked: true,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: 5,
                subtask: 2,
                appendix: 3,
                endtime: '2020-08-25',
            },
            {
                id: 3,
                taskname: '收账',
                checked: true,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: 5,
                subtask: 2,
                appendix: 3,
                endtime: '2020-08-25',
            },
            {
                id: 4,
                taskname: '收账',
                checked: false,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: 5,
                subtask: 2,
                appendix: 3,
                endtime: '2020-08-25',
            },
        ],
    },
    {
        title: '签合同',
        color: 'rgb(47, 84, 235)',
        content: [
            {
                id: 1,
                taskname: '收账',
                checked: true,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: 5,
                subtask: 2,
                appendix: 3,
                endtime: '2020-08-25',
            },
            {
                id: 2,
                taskname: '收账',
                checked: false,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: 5,
                subtask: 2,
                appendix: 3,
                endtime: '2020-08-25',
            },
        ],
    },
    {
        title: '回款',
        color: 'rgb(19, 194, 194)',
        content: [
            {
                id: 1,
                taskname: '收账',
                checked: false,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: 5,
                subtask: 2,
                appendix: 3,
                endtime: '2020-08-25',
            },
            {
                id: 2,
                taskname: '收账',
                checked: true,
                labels: [
                    {
                        id: 1,
                        title: '按时完成',
                        colorid: '1',
                        color: 'rgb(245, 34, 45)',
                    },
                    {
                        id: 2,
                        title: '尽快完成',
                        colorid: '2',
                        color: 'rgb(250, 84, 28)',
                    },
                    {
                        id: 3,
                        title: '紧急任务',
                        colorid: '3',
                        color: 'rgb(250, 173, 20)',
                    },
                    {
                        id: 4,
                        title: '非常紧急',
                        colorid: '4',
                        color: 'rgb(19, 194, 194)',
                    },
                ],
                relatedinfo: 5,
                subtask: 2,
                appendix: 3,
                endtime: '2020-08-25',
            },
        ],
    },
];
//所有标签
Mock.mock('/projlabel', 'post', ({ body }) => {
    const result = {};
    result.return = projlabel;
    return result;
});

//项目管理/回收站
const deletetask = [
    {
        id: 1,
        taskname: '收账',
        checked: false,
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 2,
                title: '尽快完成',
                colorid: '2',
                color: 'rgb(250, 84, 28)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        relatedinfo: '',
        subtask: '',
        appendix: 3,
        endtime: '2020-08-25',
    },
    {
        id: 2,
        taskname: '签合同',
        checked: true,
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 2,
                title: '尽快完成',
                colorid: '2',
                color: 'rgb(250, 84, 28)',
            },
            {
                id: 3,
                title: '紧急任务',
                colorid: '3',
                color: 'rgb(250, 173, 20)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        relatedinfo: 5,
        subtask: 2,
        appendix: '',
        endtime: '2020-08-25',
    },
    {
        id: 3,
        taskname: '回款',
        checked: true,
        labels: [],
        relatedinfo: 5,
        subtask: 2,
        appendix: 3,
        endtime: '',
    },
    {
        id: 4,
        taskname: '解约',
        checked: false,
        labels: [
            {
                id: 1,
                title: '按时完成',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            },
            {
                id: 2,
                title: '尽快完成',
                colorid: '2',
                color: 'rgb(250, 84, 28)',
            },
            {
                id: 3,
                title: '紧急任务',
                colorid: '3',
                color: 'rgb(250, 173, 20)',
            },
            {
                id: 4,
                title: '非常紧急',
                colorid: '4',
                color: 'rgb(19, 194, 194)',
            },
        ],
        relatedinfo: 5,
        subtask: '',
        appendix: 3,
        endtime: '2020-08-25',
    },
];
//所有删除的任务
Mock.mock('/deletetask', 'post', ({ body }) => {
    const result = {};
    result.return = deletetask;
    return result;
});
