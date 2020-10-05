<template>
    <a-card>
        <div slot="title" class="flex1">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="container"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                考勤记录
            </div>
            <div style="margin: auto; text-align: center;">
                <a-input
                    style="width: 250px; margin-right: 10px;"
                    v-model="nameorphone"
                    size="default"
                    placeholder="请输入员工姓名"
                />
                <a-button type="primary" @click="search"> 搜索 </a-button>
            </div>
            <div>
                <a-button type="primary" icon="redo" @click="redo">
                    重置
                </a-button>
                <a-button
                    type="primary"
                    style="margin-left: 10px;"
                    @click="output"
                >
                    导出
                </a-button>
            </div>
        </div>
        <div align="left">
            <!--时间段-->
            时间段查询：
            <a-range-picker
                v-model="twodate"
                @change="onDateChange"
                style="margin-right: 10px;"
            />
        </div>
        <!--表单-->
        <a-table
            style="margin-top: 10px;"
            :columns="columns"
            :data-source="data"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
        />
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';

//表格标题
const columns = [
    {
        title: '考勤人员',
        dataIndex: 'attperson',
        key: 'attperson',
    },
    {
        title: '所属部门',
        key: 'department',
        dataIndex: 'department',
    },
    {
        title: '考勤日期',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: '签到时间',
        dataIndex: 'signintime',
        key: 'signintime',
    },
    {
        title: '签到地点',
        dataIndex: 'signinplace',
        key: 'signinplace',
    },
    {
        title: '签到备注',
        dataIndex: 'signinremarks',
        key: 'signinremarks',
    },
    {
        title: '签退时间',
        dataIndex: 'signouttime',
        key: 'signouttime',
    },
    {
        title: '签退地点',
        dataIndex: 'signoutplace',
        key: 'signoutplace',
    },
    {
        title: '签退备注',
        dataIndex: 'signoutremarks',
        key: 'signoutremarks',
    },
];

export default {
    data() {
        return {
            data: [], //表格数据
            pagination: {
                //分页
                current: 1,
                pageSize: 10,
            },
            loading: false, //表格加载
            columns, //表格标题

            nameorphone: '', //搜索框
            starttime: String, //开始时间
            endtime: String, //结束时间
            twodate: undefined, //绑定的时间
        };
    },
    //初始查询
    mounted() {
        const pager = this.pagination;
        //this.pagination = pager;
        this.fetch({
            results: pager.pageSize,
            page: pager.current,
            nameorphone: this.nameorphone,
        });
    },
    methods: {
        //点击分页,搜索
        handleTableChange(pagination) {
            //console.log(pagination);
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.fetch({
                results: pagination.pageSize,
                page: pagination.current,
                nameorphone: this.nameorphone,
                starttime: this.starttime,
                endtime: this.endtime,
            });
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/Attrecords', METHOD.POST, {
                ...params,
            }).then((data) => {
                //console.log('data:', data);
                const pagination = { ...this.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.totalbar;
                this.loading = false;
                this.data = data.data.answer;
                this.pagination = pagination;
            });
        },

        //查询方法
        search() {
            (this.pagination = {
                //分页
                current: 1,
                pageSize: 10,
            }),
                this.fetch({
                    results: this.pagination.pageSize,
                    page: this.pagination.current,
                    nameorphone: this.nameorphone,
                    starttime: this.starttime,
                    endtime: this.endtime,
                });
        },

        //时间改变
        onDateChange(date, dateString) {
            this.twodate = date;
            this.starttime = dateString[0];
            this.endtime = dateString[1];
            this.fetch({
                results: this.pagination.pageSize,
                page: this.pagination.current,
                nameorphone: this.nameorphone,
                starttime: this.starttime,
                endtime: this.endtime,
            });
        },

        //重置
        redo() {
            this.nameorphone = '';
            this.starttime = '';
            this.endtime = '';
            this.twodate = [];
        },
    },
};
</script>

<style scoped>
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
}
.flex1 {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: space-between;
}
</style>
