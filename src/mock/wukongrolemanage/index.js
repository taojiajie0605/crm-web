import Mock from 'mockjs';
import '@/mock/extend';

//角色权限管理/系统管理角色
const systemtabledata = [
    {
        id: 1,
        name: 'admin',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
    {
        id: 2,
        name: 'admin',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
    {
        id: 3,
        name: '编辑',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
];
const systemmenudata = [
    '超级管理员',
    '系统设置管理员',
    '部门与员工管理员',
    '审批流管理员',
    '工作台管理员',
    '客户管理员',
];
Mock.mock('/RoleSystemManage', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleSystemManageadd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '新建成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '新建成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleSystemManagemodify', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '修改成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '修改成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleSystemManagecopy', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '复制成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '复制成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleSystemManagedelete', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '删除成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '删除成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleSystemManagedeleteonerecord', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '删除记录成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '删除记录成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleSystemManageaddstaff', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '关联员工成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = systemtabledata;
        result.menuanswer = systemmenudata;
        result.msg = '关联员工成功';
        result.totalbar = 200;
    }
    return result;
});

//角色权限管理/办公管理角色
const Officetabledata = [
    {
        id: 1,
        name: 'admin',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
    {
        id: 2,
        name: 'admin',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
    {
        id: 3,
        name: '编辑',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
];
const Officemenudata = ['公告管理员'];
Mock.mock('/RoleOfficeManage', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleOfficeManageadd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '新建成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '新建成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleOfficeManagemodify', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '修改成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '修改成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleOfficeManagecopy', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '复制成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '复制成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleOfficeManagedelete', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '删除成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '删除成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleOfficeManagedeleteonerecord', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '删除记录成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '删除记录成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleOfficeManageaddstaff', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '关联员工成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Officetabledata;
        result.menuanswer = Officemenudata;
        result.msg = '关联员工成功';
        result.totalbar = 200;
    }
    return result;
});

//角色权限管理/客户管理角色
const Custtabledata = [
    {
        id: 1,
        name: 'admin',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
    {
        id: 2,
        name: 'admin',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
    {
        id: 3,
        name: '编辑',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
];
const Custmenudata = ['销售经理角色', '销售员角色'];
Mock.mock('/RoleCustManage', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleCustManageadd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '新建成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '新建成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleCustManagemodify', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '修改成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '修改成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleCustManagecopy', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '复制成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '复制成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleCustManagedelete', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '删除成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '删除成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleCustManagedeleteonerecord', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '删除记录成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '删除记录成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleCustManageaddstaff', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '关联员工成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Custtabledata;
        result.menuanswer = Custmenudata;
        result.msg = '关联员工成功';
        result.totalbar = 200;
    }
    return result;
});

//角色权限管理/项目管理角色
const Projtabledata = [
    {
        id: 1,
        name: 'admin',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
    {
        id: 2,
        name: 'admin',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
    {
        id: 3,
        name: '编辑',
        department: '项目只读角色',
        position: '职位',
        role: '系统管理员',
    },
];
const Projmenudata = ['项目管理员', '项目鼓励员'];
Mock.mock('/RoleProjManage', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleProjManageadd', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '新建成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '新建成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleProjManagemodify', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '修改成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '修改成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleProjManagecopy', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '复制成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '复制成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleProjManagedelete', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '删除成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '删除成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleProjManagedeleteonerecord', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '删除记录成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '删除记录成功';
        result.totalbar = 200;
    }
    return result;
});
Mock.mock('/RoleProjManageaddstaff', 'post', ({ body }) => {
    const result = {};
    //console.log('JSON.parse(body)', body);
    const { results, page } = JSON.parse(body);
    //console.log('results',results);
    //console.log('page',page);
    if (page === 1 && results === 10) {
        //console.log('进入2');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '关联员工成功';
        result.totalbar = 200;
    }
    if (page === 2 && results === 10) {
        //console.log('进入3');
        result.tableanswer = Projtabledata;
        result.menuanswer = Projmenudata;
        result.msg = '关联员工成功';
        result.totalbar = 200;
    }
    return result;
});
