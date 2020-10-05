<template>
    <div>
        <a-modal
            title="客户查重"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @cancel="handleCancel"
            width="800px"
            :footer="null"
        >
            <div
                style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    justify-content: center;
                "
            >
                <a-input
                    style="width: 700px; margin-right: 10px;"
                    v-model="nameorphone"
                    size="default"
                    placeholder="请输入客户名称/手机/电话"
                />
                <a-button type="primary" icon="search" @click="search">
                    查重
                </a-button>
            </div>
            <!--table表-->
            <a-table
                v-show="tableshow"
                style="margin-top: 10px;"
                rowKey="id"
                :columns="columns"
                :data-source="data"
                :pagination="false"
                :loading="loading"
            />
            <div v-show="tableshow" style="margin-top: 10px;">
                注：查重结果最多显示10条，如不完整，请完善查重条件
            </div>
        </a-modal>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
const columns = [
    {
        title: '客户名称',
        dataIndex: 'custname',
        key: 'custname',
    },
    {
        title: '创建时间',
        dataIndex: 'createtime',
        key: 'createtime',
    },
    {
        title: '负责人',
        dataIndex: 'person',
        key: 'person',
    },
    {
        title: '最后跟进时间',
        dataIndex: 'lasttime',
        key: 'lasttime',
    },
    {
        title: '模块',
        dataIndex: 'modular',
        key: 'modular',
    },
];
export default {
    name: 'DuplicateCheck',
    data() {
        return {
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载
            data: [], //表格数据
            columns, //表格标题
            loading: false, //表格加载

            tableshow: false,
            nameorphone: '', //搜索框内容
        };
    },
    methods: {
        //点击搜索方法
        search() {
            this.fetch({
                nameorphone: this.nameorphone,
            });
            this.tableshow = true;
        },
        fetch(params = {}) {
            //console.log('params:', params);
            this.loading = true;
            request('/CustomerManageContactsCheck', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.answer;
            });
        },
        //点击取消
        handleCancel() {
            this.tableshow = false;
            this.visible = false;
        },
    },
};
</script>

<style lang="less" scoped>
.status {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head {
    font-weight: bold;
    color: #000;
    margin: 20px 0 10px 0;
}
.list {
    .item {
        padding: 5px 0;
        .title {
            display: inline-block;
            width: 30%;
        }
        .content {
            color: #000;
        }
    }
}
</style>
