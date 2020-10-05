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
            :columns="Contracts"
            style="width: 800px;"
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
            }"
            :data-source="ContractData"
            :scroll="{ x: 1500, y: 300 }"
        >
            <a slot="action">action</a>
        </a-table>
        <hr />
    </div>
</template>

<script>
const Contracts = [
    {
        title: '合同名称',
        width: 100,
        dataIndex: 'contract',
        key: 'contract',
        fixed: 'left',
    },
    { title: '合同编号', width: 100, dataIndex: 'numbering', key: 'numbering' },
    { title: '客户名称', dataIndex: 'user', key: '1', width: 150 },
    { title: '合同金额', dataIndex: 'money', key: '2', width: 150 },
    { title: '开始日期', dataIndex: 'begin', key: '3', width: 150 },
    { title: '结束日期', dataIndex: 'end', key: '4', width: 150 },
];
const ContractData = [];
for (let i = 0; i < 100; i++) {
    ContractData.push({
        key: i,
        chance: `Edrward ${i}`,
        total: 32,
        user: 'skdjf',
        statusGroup: `London Park no. ${i}`,
        status: 'skdfj',
    });
}
export default {
    data() {
        return {
            Contracts,
            ContractData,
            selectedRowKeys: [],
            infoResult: [],
        };
    },
    methods: {
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;
            this.infoResult.splice(0, this.infoResult.length);
            for (const item of selectedRowKeys) {
                this.infoResult.push(this.ContractData[item]);
            }
        },
        getSelectItem() {
            return this.infoResult;
        },
    },
};
</script>

<style></style>
