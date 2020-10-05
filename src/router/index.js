import Vue from 'vue';
//import { checkAuthorization } from '@/utils/request';
import Router from 'vue-router';
// import PageView from '@/layouts/PageView'
import BlankView from '@/layouts/BlankView';
import TabsView from '@/layouts/tabs/TabsView';
import Login from '@/pages/login/Login';
import Registe from '@/pages/registe/registe';
import FrontHome from '@/pages/home/FrontHome';
//import { component } from 'vue/types/umd'
// import AdminHome from '@/pages/home/AdminHome'

Vue.use(Router);

const router = new Router({
    //mode: 'history',
    routes: [
        {
            path: '/',
            name: '首页',
            component: FrontHome,
            redirect: '/login',
            children: [
                {
                    path: '/CustomerManagement',
                    name: '客户管理',
                    component: TabsView,
                    children: [
                        {
                            path: '/CustomerManagement/dashboard',
                            name: '仪表盘',
                            meta: {
                                icon: 'dashboard',
                            },
                            component: () =>
                                import(
                                    '@/pages/CustomerManagement/dashboard/Analysis.vue'
                                ),
                        },
                        {
                            path: '/CustomerManagement/todolist',
                            name: '代办事项',
                            meta: {
                                icon: 'message',
                            },
                            component: () =>
                                import(
                                    '@/pages/CustomerManagement/ToDoList/ToDoList'
                                ),
                        },
                        {
                            path: '/CustomerManagement/cult',
                            name: '线索',
                            meta: {
                                icon: 'branches',
                            },
                            component: () =>
                                import('@/pages/CustomerManagement/Clue/Clue'),
                        },
                        {
                            path: '/CustomerManagement/cult1',
                            name: '客户',
                            meta: {
                                icon: 'team',
                            },
                            component: () =>
                                import(
                                    '@/pages/CustomerManagement/Customer/Customer'
                                ),
                        },
                        {
                            path: '/CustomerManagement/cult2',
                            name: '联系人',
                            meta: {
                                icon: 'contacts',
                            },
                            component: () =>
                                import(
                                    '@/pages/CustomerManagement/Contacts/Contacts'
                                ),
                        },
                        {
                            path: '/CustomerManagement/cult3',
                            name: '商机',
                            meta: {
                                icon: 'pay-circle',
                            },
                            component: () =>
                                import(
                                    '@/pages/CustomerManagement/BusinessOpportunity/BusinessOpportunity'
                                ),
                        },
                        {
                            path: '/CustomerManagement/cult4',
                            name: '合同',
                            meta: {
                                icon: 'reconciliation',
                            },
                            component: () =>
                                import(
                                    '@/pages/CustomerManagement/Contract/Contract'
                                ),
                        },
                        {
                            path: '/CustomerManagement/cult5',
                            name: '回款',
                            meta: {
                                icon: 'money-collect',
                            },
                            component: () =>
                                import(
                                    '@/pages/CustomerManagement/ReturnMoney/ReturnMoney'
                                ),
                        },
                        {
                            path: '/CustomerManagement/cult6',
                            name: '发票',
                            meta: {
                                icon: 'snippets',
                            },
                            component: () =>
                                import('@/pages/CustomerManagement/Bill/Bill'),
                        },
                        {
                            path: '/CustomerManagement/cult7',
                            name: '回访',
                            meta: {
                                icon: 'home',
                            },
                            component: () =>
                                import(
                                    '@/pages/CustomerManagement/ReturnVisit/ReturnVisit'
                                ),
                        },
                        {
                            path: '/CustomerManagement/cult8',
                            name: '产品',
                            meta: {
                                icon: 'codepen',
                            },
                            component: () =>
                                import(
                                    '@/pages/CustomerManagement/Product/Product'
                                ),
                        },
                        {
                            path: '/CustomerManagement/cult9',
                            name: '市场活动',
                            meta: {
                                icon: 'car',
                            },
                            component: () =>
                                import(
                                    '@/pages/CustomerManagement/MarketingActivities/MarketingActivities'
                                ),
                        },
                    ],
                },
                {
                    path: '/b',
                    name: '任务/审批',
                    component: TabsView,
                    children: [
                        {
                            path: '/b/bbbsdfb',
                            name: '我的任务',
                            meta: {
                                icon: 'tag',
                            },
                            component: () =>
                                import('@/pages/Task&Approval/MyTask/MyTask'),
                        },
                        {
                            path: '/b/bbbsdfb1',
                            name: '下属的任务',
                            meta: {
                                icon: 'copy',
                            },
                            component: () =>
                                import(
                                    '@/pages/Task&Approval/PuisneTask/PuisneTask'
                                ),
                        },
                        {
                            path: '/b/bbbsdfb2',
                            name: '我发布的审批',
                            meta: {
                                icon: 'container',
                            },
                            component: () =>
                                import(
                                    '@/pages/Task&Approval/BranchTask/BranchTask'
                                ),
                        },
                        {
                            path: '/b/bbbsdfba',
                            name: '待我审批（办公)',
                            meta: {
                                icon: 'audit',
                            },
                            component: () =>
                                import('@/pages/Task&Approval/Wait/Office'),
                        },
                        {
                            path: '/b/bbbsdfbc',
                            name: '待我审批（合同）',
                            meta: {
                                icon: 'file-protect',
                            },
                            component: () =>
                                import('@/pages/Task&Approval/Wait/Contract'),
                        },
                        {
                            path: '/b/bbbsdfbcc',
                            name: '待我审批（回款）',
                            meta: {
                                icon: 'safety-certificate',
                            },
                            component: () =>
                                import('@/pages/Task&Approval/Wait/Return'),
                        },
                        {
                            path: '/b/bbbsdfbeef',
                            name: '待我审批（发票）',
                            meta: {
                                icon: 'schedule',
                            },
                            component: () =>
                                import('@/pages/Task&Approval/Wait/Bill'),
                        },
                    ],
                },
                {
                    path: '/e',
                    name: '项目管理',
                    component: TabsView,
                    meta: {
                        icon: '',
                    },
                    children: [
                        {
                            path: '/e/a',
                            name: '工作台',
                            meta: {
                                icon: 'desktop',
                            },
                            component: () =>
                                import(
                                    '@/pages/ProjectManagement/WorkBench/WorkBench'
                                ),
                        },
                        {
                            path: '/e/b',
                            name: '项目',
                            meta: {
                                icon: 'pic-left',
                            },
                            component: () =>
                                import(
                                    '@/pages/ProjectManagement/Project/Project'
                                ),
                        },
                        {
                            path: '/e/b1',
                            name: '项目细节',
                            meta: {
                                icon: 'pic-left',
                                invisible: true,
                            },
                            component: () =>
                                import(
                                    '@/pages/ProjectManagement/ProjDetail/ProjDetail'
                                ),
                        },
                        {
                            path: '/e/c',
                            name: '统计分析',
                            meta: {
                                icon: 'bar-chart',
                            },
                            component: () =>
                                import(
                                    '@/pages/ProjectManagement/StatisticalAnalysis/StatisticalAnalysis'
                                ),
                        },
                        {
                            path: '/e/d',
                            name: '归档项目',
                            meta: {
                                icon: 'code',
                            },
                            component: () =>
                                import(
                                    '@/pages/ProjectManagement/ArchivedItems/ArchivedItems'
                                ),
                        },
                        {
                            path: '/e/e',
                            name: '标签',
                            meta: {
                                icon: 'tags',
                            },
                            component: () =>
                                import('@/pages/ProjectManagement/Label/Label'),
                        },
                        {
                            path: '/e/f',
                            name: '回收站',
                            meta: {
                                icon: 'delete',
                            },
                            component: () =>
                                import(
                                    '@/pages/ProjectManagement/DeleteTask/DeleteTask'
                                ),
                        },
                    ],
                },
                {
                    path: '/h',
                    name: '考勤管理',
                    component: TabsView,
                    meta: {
                        icon: '',
                    },
                    children: [
                        {
                            path: '/h/a',
                            name: '考勤打卡',
                            meta: {
                                icon: 'file-done',
                            },
                            component: () =>
                                import(
                                    '@/pages/AttendanceManagement/ClockIn/ClockIn'
                                ),
                        },
                        {
                            path: '/h/b',
                            name: '考勤记录',
                            meta: {
                                icon: 'container',
                            },
                            component: () =>
                                import(
                                    '@/pages/AttendanceManagement/AttendanceRecord/AttendanceRecord'
                                ),
                        },
                        {
                            path: '/h/c',
                            name: '考勤审批',
                            meta: {
                                icon: 'deployment-unit',
                            },
                            component: () =>
                                import(
                                    '@/pages/AttendanceManagement/AttendanceApproval/AttendanceApproval'
                                ),
                        },
                    ],
                },
                {
                    path: '/d',
                    name: '通讯录',
                    component: TabsView,
                    meta: {
                        icon: '',
                    },
                    children: [
                        {
                            path: '/d/a',
                            name: '全部',
                            meta: {
                                icon: 'appstore',
                            },
                            component: () => import('@/pages/MailList/All/All'),
                        },
                        {
                            path: '/d/b',
                            name: '我的关注',
                            meta: {
                                icon: 'star',
                            },
                            component: () =>
                                import(
                                    '@/pages/MailList/MyConcerns/MyConcerns'
                                ),
                        },
                    ],
                },
                {
                    path: '/BusinessIntelligent',
                    name: '商业智能',
                    component: TabsView,
                    redirect:
                        '/BusinessIntelligent/EmployeeCustomerAnalysis/TotalCustomerAnalysis',
                    meta: {
                        icon: '',
                    },
                    children: [
                        {
                            path:
                                '/BusinessIntelligent/EmployeeCustomerAnalysis/EmployeeCustomer',
                            name: '员工客户分析',
                            component: BlankView,
                            meta: {
                                icon: 'user',
                            },
                            children: [
                                {
                                    path:
                                        '/BusinessIntelligent/EmployeeCustomerAnalysis/TotalCustomerAnalysis',
                                    name: '客户总量分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/EmployeeCustomerAnalysis/EmployeeCustomer/TotalCustomerAnalysis'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/EmployeeCustomerAnalysis/CustomerFollowUpTimes',
                                    name: '客户跟进次数分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/EmployeeCustomerAnalysis/CustomerFollowUpTimes/CustomerFollowUpTimes'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/EmployeeCustomerAnalysis/CustomerFollowUpMethod',
                                    name: '客户跟进方式分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/EmployeeCustomerAnalysis/CustomerFollowUpMethod/CustomerFollowUpMethod'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/EmployeeCustomerAnalysis/CustomerTransformation',
                                    name: '客户转化率分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/EmployeeCustomerAnalysis/CustomerTransformation/CustomerTransformation'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/EmployeeCustomerAnalysis/HighSeasCustomers',
                                    name: '公海客户分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/EmployeeCustomerAnalysis/HighSeasCustomers/HighSeasCustomers'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/EmployeeCustomerAnalysis/ProductCycle',
                                    name: '成交周期分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/EmployeeCustomerAnalysis/ProductCycle/ProductCycle'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/EmployeeCustomerAnalysis/CustomerSatisfaction',
                                    name: '员工客户满意度分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/EmployeeCustomerAnalysis/CustomerSatisfaction/CustomerSatisfaction'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/EmployeeCustomerAnalysis/ProductSatisfaction',
                                    name: '产品满意度分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/EmployeeCustomerAnalysis/ProductSatisfaction/ProductSatisfaction'
                                        ),
                                },
                            ],
                        },
                        {
                            path: '/BusinessIntelligent/SalesFunnelAnalysis',
                            name: '销售漏斗分析',
                            component: BlankView,
                            meta: {
                                icon: 'rise',
                            },
                            children: [
                                {
                                    path:
                                        '/BusinessIntelligent/SalesFunnelAnalysis/SalesFunnel',
                                    name: '销售漏斗',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/SalesFunnelAnalysis/SalesFunnel/SalesFunnel'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/SalesFunnelAnalysis/NewBusinessOpportunities',
                                    name: '新增商机分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/SalesFunnelAnalysis/NewBusinessOpportunities/NewBusinessOpportunities'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/SalesFunnelAnalysis/BusinessOpportunityConversionRate',
                                    name: '商机转化率分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/SalesFunnelAnalysis/BusinessOpportunityConversionRate/BusinessOpportunityConversionRate'
                                        ),
                                },
                            ],
                        },
                        {
                            path: '/f/c',
                            name: '员工业绩分析',
                            component: BlankView,
                            meta: {
                                icon: 'bar-chart',
                            },
                            children: [
                                {
                                    path: '/f/c/a',
                                    name: '合同数量分析',
                                },
                                {
                                    path: '/f/c/b',
                                    name: '合同金额分析',
                                },
                                {
                                    path: '/f/c/c',
                                    name: '回款数量分析',
                                },
                                {
                                    path: '/f/c/d',
                                    name: '合同汇总表',
                                },
                                {
                                    path: '/f/c/e',
                                    name: '发票统计分析',
                                },
                            ],
                        },
                        {
                            path: '/BusinessIntelligent/CustomerPortrait',
                            name: '客户画像分析',
                            component: BlankView,
                            meta: {
                                icon: 'team',
                            },
                            children: [
                                {
                                    path:
                                        '/BusinessIntelligent/CustomerPortrait/UrbanDistribution',
                                    name: '城市分布分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/CustomerPortrait/UrbanDistribution/UrbanDistribution'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/CustomerPortrait/CustomerIndustry',
                                    name: '客户行业分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/CustomerPortrait/CustomerIndustry/CustomerIndustry'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/CustomerPortrait/CustomerLevel',
                                    name: '客户级别分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/CustomerPortrait/CustomerLevel/CustomerLevel'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/CustomerPortrait/SourceOfCustomers',
                                    name: '客户来源分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/CustomerPortrait/SourceOfCustomers/SourceOfCustomers'
                                        ),
                                },
                            ],
                        },
                        {
                            path: '/BusinessIntelligent/Product',
                            name: '产品分析',
                            component: BlankView,
                            meta: {
                                icon: 'codepen',
                            },
                            children: [
                                {
                                    path:
                                        '/BusinessIntelligent/Product/ProductSales',
                                    name: '产品销售情况统计',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/Product/ProductSales/ProductSales'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/Product/ProductClassification',
                                    name: '产品分类销售分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/Product/ProductClassification/ProductClassification'
                                        ),
                                },
                            ],
                        },
                        {
                            path: '/BusinessIntelligent/RankingList',
                            name: '排行榜',
                            component: BlankView,
                            meta: {
                                icon: 'trophy',
                            },
                            children: [
                                {
                                    path:
                                        '/BusinessIntelligent/RankingList/ContractAmount',
                                    name: '合同金额排行',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/RankingList/ContractAmount/ContractAmount'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/RankingList/AmountReceived',
                                    name: '回款金额排行',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/RankingList/AmountReceived/AmountReceived'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/RankingList/ContractSigning',
                                    name: '签约合同排行',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/RankingList/ContractSigning/ContractSigning'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/RankingList/ProductSales',
                                    name: '产品销量排行',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/RankingList/ProductSales/ProductSales'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/RankingList/NumberOfNewCustomers',
                                    name: '新增客户数排行',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/RankingList/NumberOfNewCustomers/NumberOfNewCustomers'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/RankingList/NumberOfNewContacts',
                                    name: '新增联系人数排行',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/RankingList/NumberOfNewContacts/NumberOfNewContacts'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/RankingList/FollowUpTimes',
                                    name: '跟进次数排行',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/RankingList/FollowUpTimes/FollowUpTimes'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/RankingList/NumberOfFollowUpCustomers',
                                    name: '跟进客户数排行',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/RankingList/NumberOfFollowUpCustomers/NumberOfFollowUpCustomers'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/RankingList/NumberOfBusinessTrips',
                                    name: '出差次数排行',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/RankingList/NumberOfBusinessTrips/NumberOfBusinessTrips'
                                        ),
                                },
                            ],
                        },
                        {
                            path: '/BusinessIntelligent/WorkAnalysis',
                            name: '办公分析',
                            component: BlankView,
                            meta: {
                                icon: 'build',
                            },
                            children: [
                                {
                                    path:
                                        '/BusinessIntelligent/WorkAnalysis/Log',
                                    name: '日志分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/WorkAnalysis/Log/Log'
                                        ),
                                },
                                {
                                    path:
                                        '/BusinessIntelligent/WorkAnalysis/Approval',
                                    name: '审批分析',
                                    component: () =>
                                        import(
                                            '@/pages/BusinessIntelligent/WorkAnalysis/Approval/Approval'
                                        ),
                                },
                            ],
                        },
                        {
                            path: '/f/h',
                            name: '业绩目标完成情况',
                            meta: {
                                icon: 'environment',
                            },
                        },
                    ],
                },
                {
                    path: '/c',
                    name: '日志',
                    component: TabsView,
                    children: [
                        {
                            path: '/c/a',
                            name: '全部',
                            meta: {
                                icon: 'appstore',
                            },
                            component: () => import('@/pages/Log/All/AllLog'),
                        },
                        {
                            path: '/c/b',
                            name: '我发出的',
                            meta: {
                                icon: 'left-square',
                            },
                            component: () => import('@/pages/Log/All/AllLog'),
                        },
                        {
                            path: '/c/c',
                            name: '我收到的',
                            meta: {
                                icon: 'right-square',
                            },
                            component: () =>
                                import('@/pages/Log/Received/Received'),
                        },
                        {
                            path: '/c/e',
                            name: '跟进记录',
                            meta: {
                                icon: 'message',
                            },
                            component: () =>
                                import(
                                    '@/pages/Log/AllFlowRecord/AllFlowRecord'
                                ),
                        },
                    ],
                },
                {
                    path: '/admin',
                    name: '系统设置',
                    redirect: '/admin/systemsetting/index',
                    component: TabsView,
                    children: [
                        {
                            path: '/admin/systemsetting/index',
                            name: '企业首页',
                            meta: {
                                icon: 'bank',
                            },
                            component: () =>
                                import(
                                    '@/pages/admin/EnterpriseHomepage/EnterpriseHomepage'
                                ),
                        },
                        {
                            path: '/admin/systemsetting/c1',
                            name: '应用管理',
                            meta: {
                                icon: 'gold',
                            },
                            component: () =>
                                import('@/pages/admin/AppManage/AppManage'),
                        },
                        {
                            path: '/admin/systemsetting/c2',
                            name: '员工与部门管理',
                            meta: {
                                icon: 'usergroup-add',
                            },
                            component: () =>
                                import(
                                    '@/pages/admin/WorkAndDepart/WorkerDepart'
                                ),
                        },
                        {
                            path: '/admin/systemsetting/c3',
                            name: '角色权限管理',
                            component: BlankView,
                            meta: {
                                icon: 'user',
                            },
                            children: [
                                {
                                    path: '/admin/systemsetting/a1/c2',
                                    name: '系统管理角色',
                                    component: () =>
                                        import(
                                            '@/pages/admin/RoleManage/SystemManage/SystemManage'
                                        ),
                                },
                                {
                                    path: '/admin/systemsetting/a1/c24',
                                    name: '办公管理角色',
                                    component: () =>
                                        import(
                                            '@/pages/admin/RoleManage/OfficeManage/OfficeManage'
                                        ),
                                },
                                {
                                    path: '/admin/systemsetting/a1/c245',
                                    name: '客户管理角色',
                                    component: () =>
                                        import(
                                            '@/pages/admin/RoleManage/CustManage/CustManage'
                                        ),
                                },
                                {
                                    path: '/admin/systemsetting/a1/c2554',
                                    name: '项目管理角色',
                                    component: () =>
                                        import(
                                            '@/pages/admin/RoleManage/ProjManage/ProjManage'
                                        ),
                                },
                            ],
                        },
                        {
                            path: '/admin/systemsetting/businessapproval',
                            name: '业务审批流',
                            meta: {
                                icon: 'sync',
                            },
                            component: () =>
                                import(
                                    '@/pages/admin/BusinessApproval/BusinessApproval'
                                ),
                        },
                        {
                            path: '/admin/systemsetting/officeapproval',
                            name: '办公审批流',
                            meta: {
                                icon: 'sync',
                            },
                            component: () =>
                                import(
                                    '@/pages/admin/OfficeApproval/OfficeApproval'
                                ),
                        },
                        {
                            path: '/admin/systemsetting/c6',
                            name: '项目管理',
                            meta: {
                                icon: 'desktop',
                            },
                            component: () =>
                                import('@/pages/admin/ProjManage/ProjManage'),
                        },
                        {
                            path: '/admin/systemsetting/c7',
                            name: '客户管理',
                            component: BlankView,
                            meta: {
                                icon: 'ant-cloud',
                            },
                            children: [
                                {
                                    path: '/admin/systemsetting/a3/c245',
                                    name: '自定义字段设置',
                                    component: () =>
                                        import(
                                            '@/pages/admin/CustManage/FieldSetting/FieldSetting'
                                        ),
                                },
                                // {
                                //     path:
                                //         '/admin/systemsetting/a3/c245/formeditor',
                                //     name: '自定义表单',
                                //     component: () =>
                                //         import(
                                //             //'@/pages/admin/CustManage/CustForm/CustForm'
                                //             '@/pages/admin/CustManage/FieldSetting/CustomForm/CustomForm'
                                //         ),
                                //     meta: {
                                //         invisible: true,
                                //     },
                                // },
                                {
                                    path: '/admin/systemsetting/a3/c2454',
                                    name: '客户公海规则设置',
                                    component: () =>
                                        import(
                                            '@/pages/admin/CustManage/SeaSetting/SeaSetting'
                                        ),
                                },
                                {
                                    path: '/admin/systemsetting/a3/c2455',
                                    name: '自定义打印模板',
                                    component: () =>
                                        import(
                                            '@/pages/admin/CustManage/PrintTemplate/PrintTemplate'
                                        ),
                                },
                                {
                                    path:
                                        '/admin/systemsetting/a3/c2455/printtemplate',
                                    name: '打印模板',
                                    component: () =>
                                        import(
                                            '@/pages/admin/CustManage/PrintTemplate/TemplatePage/ContractEditor'
                                        ),
                                    meta: {
                                        invisible: true,
                                    },
                                },
                                {
                                    path: '/admin/systemsetting/a3/c2452',
                                    name: '业务参数设置',
                                    component: () =>
                                        import(
                                            '@/pages/admin/CustManage/BusinessSetting/BusinessSetting'
                                        ),
                                },
                                {
                                    path: '/admin/systemsetting/a3/c245555',
                                    name: '业绩目标设置',
                                    component: () =>
                                        import(
                                            '@/pages/admin/CustManage/TargetSetting/TargetSetting'
                                        ),
                                },
                            ],
                        },
                        {
                            path: '/admin/systemsetting/c8',
                            name: '系统日志',
                            component: BlankView,
                            meta: {
                                icon: 'exception',
                            },
                            children: [
                                {
                                    path: '/admin/systemsetting/a4/c2456',
                                    name: '数据操作日志',
                                    component: () =>
                                        import(
                                            '@/pages/admin/SystemLog/DateOperLog/DateOperLog'
                                        ),
                                },
                                {
                                    path: '/admin/systemsetting/a4/c24565',
                                    name: '系统操作日志',
                                    component: () =>
                                        import(
                                            '@/pages/admin/SystemLog/SystemOperLog/SystemOperLog'
                                        ),
                                },
                                {
                                    path: '/admin/systemsetting/a4/c24567',
                                    name: '登录日志',
                                    component: () =>
                                        import(
                                            '@/pages/admin/SystemLog/LoginLog/LoginLog'
                                        ),
                                },
                            ],
                        },
                        {
                            path: '/admin/systemsetting/c9',
                            name: '其他设置',
                            meta: {
                                icon: 'setting',
                            },
                            component: () =>
                                import(
                                    '@/pages/admin/OtherSetting/OtherSetting'
                                ),
                        },
                    ],
                },
            ],
        },
        {
            path: '/login',
            name: '登录页',
            component: Login,
        },
        {
            path: '/registe',
            name: '注册页',
            component: Registe,
        },
    ],
});

//登录拦截
router.beforeEach((to, from, next) => {
    if (to.path !== '/registe' && to.path !== '/login') {
        //console.log('11111111');
        //这里判断用户是否登录，验证本地存储是否有token
        if (!localStorage.token) {
            // 判断当前的token是否存在
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
