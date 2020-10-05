import Mock from 'mockjs';
import '@/mock/extend';

//通讯录/全部
const Alldata = [
    {
        id: 1,
        letter: 'A',
        follow: 2,
        name: 'admin',
        phone: '15135568666',
        department: '部门',
        station: '岗位',
    },
    {
        id: 2,
        letter: 'A',
        follow: 1,
        name: 'admin',
        phone: '15135568666',
        department: '部门',
        station: '岗位',
    },
    {
        id: 3,
        letter: 'A',
        follow: 2,
        name: 'admin',
        phone: '15135568666',
        department: '部门',
        station: '岗位',
    },
];
Mock.mock('/MailAll', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Alldata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Alldata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/MailAllConcerns', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = Alldata;
        result.totalbar = 200;
        result.msg = '收藏成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = Alldata;
        result.totalbar = 200;
        result.msg = '收藏成功';
    }
    return result;
});

//通讯录/我的关注
const MyConcernsdata = [
    {
        id: 1,
        letter: 'A',
        follow: 2,
        name: 'admin',
        phone: '15135568666',
        department: '部门',
        station: '岗位',
    },
    {
        id: 2,
        letter: 'A',
        follow: 1,
        name: 'admin',
        phone: '15135568666',
        department: '部门',
        station: '岗位',
    },
    {
        id: 3,
        letter: 'A',
        follow: 2,
        name: 'admin',
        phone: '15135568666',
        department: '部门',
        station: '岗位',
    },
];
Mock.mock('/MailMyConcerns', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = MyConcernsdata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = MyConcernsdata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/MailMyConcernsConcerns', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入1');
        result.answer = MyConcernsdata;
        result.totalbar = 200;
        result.msg = '取消收藏成功';
    }
    if (page === 2 && results === 10) {
        //console.log('进入2');
        result.answer = MyConcernsdata;
        result.totalbar = 200;
        result.msg = '取消收藏成功';
    }
    return result;
});
