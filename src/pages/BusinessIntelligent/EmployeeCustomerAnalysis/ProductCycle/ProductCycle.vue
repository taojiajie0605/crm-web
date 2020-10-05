<template>
    <a-card>
        <a-tabs default-active-key="1" @change="callback">
            <a-tab-pane key="1" tab="员工客户成交周期">
                <EmployeeCustomer />
            </a-tab-pane>
            <a-tab-pane key="2" tab="地区成交周期" force-render>
                <Region />
            </a-tab-pane>
            <a-tab-pane key="3" tab="产品成交周期">
                <Product />
            </a-tab-pane>
        </a-tabs>
    </a-card>
</template>

<script>
import EmployeeCustomer from './components/EmployeeCustomer';
import Region from './components/Region';
import Product from './components/Product';
export default {
    data() {},
    components: {
        EmployeeCustomer,
        Region,
        Product,
    },
    methods: {
        callback(key) {
            console.log(key);
        },
    },
};
</script>

<style lang="less" scoped>
/deep/.ant-card-body {
    padding: 6px 24px !important;
    zoom: 1;
}
</style>
