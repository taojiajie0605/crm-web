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
            :columns="Chances"
            style="width: 800px;"
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
            }"
            :data-source="chanceData"
            :scroll="{ x: 1500, y: 300 }"
        >
            <a slot="action">action</a>
        </a-table>
        <hr />
    </div>
</template>

<script>
const Chances = [
    {
        title: '商机名称',
        width: 100,
        dataIndex: 'chance',
        key: 'chance',
        fixed: 'left',
    },
    { title: '商机金额', width: 100, dataIndex: 'total', key: 'total' },
    { title: '客户名称', dataIndex: 'user', key: '1', width: 150 },
    { title: '商机状态组', dataIndex: 'statusGroup', key: '2', width: 150 },
    { title: '状态', dataIndex: 'status', key: '3', width: 150 },
];
const chanceData = [];
for (let i = 0; i < 100; i++) {
    chanceData.push({
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
            Chances,
            chanceData,
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
                this.infoResult.push(this.chanceData[item]);
            }
            console.log(this.infoResult);
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
