<template>
    <a-modal
        :title="type + ' 详情'"
        width="1000px"
        :visible="isShow"
        :footer="null"
        @cancel="handleCancel"
    >
        <a-table
            :columns="columns"
            :data-source="data"
            rowKey="id"
            :pagination="pagination"
            @change="handleTableChange"
            :loading="loading"
        />
    </a-modal>
</template>

<script>
import { request, METHOD } from '@/utils/request';
export default {
    data() {
        return {
            isShow: false,
            type: '',
            loading: false,
            pagination: {
                //分页
                current: 1,
                pageSize: 10,
            },
            data: [],
            columns: [
                {
                    width: 100,
                    title: '商机名称',
                    dataIndex: 'businessOpportunityName',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '客户名称',
                    dataIndex: 'customerName',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '商机状态组',
                    dataIndex: 'commercialUnit',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '商机阶段',
                    dataIndex: 'stage',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '商机金额',
                    dataIndex: 'businessOpportunityMoney',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '预计成交日期',
                    dataIndex: 'expectedTime',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '负责人',
                    dataIndex: 'personInCharge',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '创建时间',
                    dataIndex: 'createTime',
                    align: 'center',
                },
            ],
        };
    },
    methods: {
        handleCancel() {
            this.isShow = false;
            this.pagination = {
                //分页
                current: 1,
                pageSize: 10,
            };
        },
        getList(param) {
            // 初始化数据
            this.loading = true;
            const factor = {
                pageSize: this.pagination.pageSize,
                current: this.pagination.current,
                searchKey: param,
            };
            request('/NewBusinessOpportunitiesDetailTableList', METHOD.POST, {
                ...factor,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.list;
                this.pagination.total = data.data.count;
            });
        },
        handleTableChange(pagination) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            this.pagination = pager;
            this.getList('');
        },
    },
};
</script>
