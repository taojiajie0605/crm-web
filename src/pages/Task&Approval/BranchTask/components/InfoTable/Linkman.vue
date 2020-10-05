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
            :columns="linkman"
            style="width: 800px;"
            :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
            }"
            :data-source="linkmanData"
            :scroll="{ x: 1500, y: 300 }"
        >
            <a slot="action">action</a>
        </a-table>
        <hr />
    </div>
</template>

<script>
const linkman = [
    {
        title: '姓名',
        width: 100,
        dataIndex: 'user',
        key: 'user',
        fixed: 'left',
    },
    { title: '手机', width: 100, dataIndex: 'mobile', key: 'mobile' },
    { title: '电话', width: 100, dataIndex: 'tele', key: 'tele' },
    { title: '是否关键决策人', width: 100, dataIndex: 'isKey', key: 'isKey' },
    { title: '职务', width: 100, dataIndex: 'duty', key: 'duty' },
];
const linkmanData = [];
for (let i = 0; i < 100; i++) {
    linkmanData.push({
        key: i,
        user: `Edrward ${i}`,
        mobile: 32,
        tele: `London Park no. ${i}`,
        isKey: '是',
        duty: 'skdfj',
    });
}

export default {
    data() {
        return {
            linkmanData,
            linkman,
            selectedRowKeys: [],
            infoResult: [],
        };
    },
    methods: {
        // onSelectChange(selectedRowKeys) {
        //     console.log('selectedRowKeys changed: ', selectedRowKeys);
        //     this.selectedRowKeys = selectedRowKeys;
        // },
        onSelectChange(selectedRowKeys) {
            // console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
            this.infoResult.splice(0, this.infoResult.length);
            for (const item of selectedRowKeys) {
                this.infoResult.push(this.linkmanData[item]);
            }
            console.log(this.infoResult);
        },
        getSelectItem() {
            return this.infoResult;
        },
        // onClick() {
        //     this.infoResult.splice(0, this.infoResult.length);
        //     for (const item of this.selectedRowKeys) {
        //         this.infoResult.push(this.customerData[item]);
        //     }
        //     console.log(this.infoResult);
        // },
    },
};
</script>

<style></style>
