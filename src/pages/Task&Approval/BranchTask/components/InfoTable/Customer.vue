<template>
    <div>
        <div
            style="
                margin-bottom: 15px;
                display: flex;
                justify-content: space-between;
            "
        >
            <div>
                场景：
                <a-select
                    default-value="all"
                    style="width: 120px;"
                    @change="handleChange"
                >
                    <a-select-option value="all"> 全部 </a-select-option>
                    <a-select-option value="allCustomer">
                        全部客户
                    </a-select-option>
                    <a-select-option value="myCustomer">
                        我负责的客户
                    </a-select-option>
                    <a-select-option value="puisneCustomer">
                        下属负责的客户
                    </a-select-option>
                    <a-select-option value="inCustomer">
                        我参与的客户
                    </a-select-option>
                    <a-select-option value="careCustomer">
                        我关注的客户
                    </a-select-option>
                </a-select>
            </div>
            <a-input-search style="width: 200px;" @search="onSearch" />
            <a-button> 新建 </a-button>
        </div>
        <a-table
            bordered
            checkable
            :columns="customers"
            style="width: 800px;"
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
            }"
            :data-source="customerData"
            :scroll="{ x: 1500, y: 300 }"
        >
            <a slot="action">action</a>
        </a-table>
        <hr />
    </div>
</template>

<script>
const customers = [
    {
        title: '客户名称',
        width: 100,
        dataIndex: 'customer',
        key: 'customer',
        fixed: 'left',
    },
    { title: '邮箱', width: 100, dataIndex: 'email', key: 'email' },
    { title: '下次联系时间', dataIndex: 'contract', key: '1', width: 150 },
    { title: '最后跟进时间', dataIndex: 'follow', key: '2', width: 150 },
    { title: '创建时间', dataIndex: 'create', key: '3', width: 150 },
];
const customerData = [];
for (let i = 0; i < 100; i++) {
    customerData.push({
        key: i,
        customer: `Edrward ${i}`,
        email: 32,
        create: `London Park no. ${i}`,
    });
}
export default {
    data() {
        return {
            customers,
            customerData,
            selectedRowKeys: [],
            infoResult: [],
        };
    },
    methods: {
        onSelectChange(selectedRowKeys) {
            // console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
            this.infoResult.splice(0, this.infoResult.length);
            for (const item of selectedRowKeys) {
                this.infoResult.push(this.customerData[item]);
            }
            // console.log(this.infoResult);
        },
        getSelectItem() {
            return this.infoResult;
        },
        // onClick() {
        //     console.log(this.infoResult);
        // },
    },
};
</script>

<style></style>
