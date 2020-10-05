import Mock from 'mockjs';
import '@/mock/extend';

// const user = Mock.mock({
//     name: '@ADMIN',
//     avatar: '@AVATAR',
//     address: '@CITY',
//     position: '@POSITION',
// });

// Mock.mock('/login', 'post', ({ body }) => {
//     const result = {};
//     //console.log('JSON.parse(body)', {body});
//     const { name, password } = JSON.parse(body);

//     if (name !== 'admin' || password !== '888888') {
//         result.code = -1;
//         result.message = '账户名或密码错误（admin/888888）';
//     } else {
//         result.code = 0;
//         result.message = Mock.mock('@TIMEFIX').CN + '，欢迎回来';
//         result.data = {};
//         result.data.user = user;
//         result.data.token = 'Authorization:' + Math.random();
//         result.data.expireAt = new Date(new Date().getTime() + 30 * 60 * 1000);
//     }
//     //console.log('result',result);
//     return result;
// });

Mock.mock('/login', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', {body});
    const { userid, password } = JSON.parse(body);

    if (userid === '19876543210' && password === '123456') {
        result.msg = 'ok';
        result.userinfo = {
            userid: '19876543210',
            username: 'Mr.Tao',
        };
        result.token = 'token';
    } else {
        result.msg = '账号或密码错误';
    }
    //console.log('result',result);
    return result;
});
