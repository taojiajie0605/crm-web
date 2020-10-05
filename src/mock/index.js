import Mock from 'mockjs';
import '@/mock/user/current';
import '@/mock/project';
import '@/mock/user/login';
import '@/mock/workplace';
import '@/mock/wukong';
import '@/mock/wukongrolemanage';
import '@/mock/wukongmaillist';
import '@/mock/wukongcustmanage';
import '@/mock/wukongprojmanage';
import '@/mock/wukongAttendmanage';

import '@/mock/chart';
import '@/mock/table';
import '@/mock/drawer';
// 设置全局延时
Mock.setup({
    timeout: '300-600',
});
