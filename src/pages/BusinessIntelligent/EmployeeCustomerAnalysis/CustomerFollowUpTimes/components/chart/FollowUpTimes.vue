<template>
    <div id="container" class="chart"></div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import { Chart } from '@antv/g2';
export default {
    name: 'TotalCustomer',
    data() {
        return {
            data: [],
            chart: {},
        };
    },
    mounted() {
        this.init();
        const e = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
    },
    methods: {
        init() {
            document.getElementById('container').innerHTML = '';
            this.chart = new Chart({
                container: 'container',
                autoFit: true,
                height: 500,
            });
            const margin = 1 / this.data.length;
            this.chart.data(this.data);
            this.chart.scale({
                type: {
                    alias: '时间',
                    range: [margin / 2, 1 - margin / 2],
                },
                customerCount: {
                    alias: '跟进客户数',
                    min: 0,
                    formatter: (value) => {
                        return value + '个';
                    },
                    sync: true,
                    nice: true,
                },
                recordCount: {
                    alias: '跟进次数',
                    formatter: (value) => {
                        return value + '次';
                    },
                    min: 0,
                    sync: true,
                    nice: true,
                },
            });
            this.chart.axis('customerCount', {
                title: {},
            });
            this.chart.axis('recordCount', {
                title: {},
            });
            this.chart.tooltip({
                showMarkers: true,
                shared: true,
            });

            this.chart
                .interval()
                .position('type*customerCount')
                .color('#1890ff');

            this.chart
                .line()
                .position('type*recordCount')
                .color('#13c2c2')
                .size(3)
                .shape('smooth');
            this.chart.interaction('active-region');
            this.chart.render();
        },
        getChartData(param) {
            // 获取图表数据
            request('/CustomerFollowUpTimesChart', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data;
                this.init();
            });
        },
    },
};
</script>

<style lang="less" scoped>
.chart {
    width: 90%;
    margin-top: 50px;
    margin-bottom: 50px;
    margin: 50px auto;
}
</style>
