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
                    title: '客户名称',
                    dataIndex: 'customerName',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '合同名称',
                    dataIndex: 'contractName',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '合同金额（元）',
                    dataIndex: 'contractMoney',
                    align: 'center',
                },
                {
                    width: 100,
                    title: '回款金额（元）',
                    dataIndex: 'paymentCollectionMoney',
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
                {
                    width: 100,
                    title: '下单时间',
                    dataIndex: 'orderTime',
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
            request('/CustomerTransformationDetailTableList', METHOD.POST, {
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
