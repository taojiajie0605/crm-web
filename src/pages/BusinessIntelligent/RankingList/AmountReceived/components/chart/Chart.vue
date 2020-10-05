<template>
    <div id="container" class="chart"></div>
</template>

<script>
import { Chart } from '@antv/g2';
export default {
    data() {
        return {
            data: [],
            chart: {},
        };
    },
    mounted() {
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
            this.chart.data(this.data);
            this.chart.scale({
                amountReceived: {
                    min: 0,
                    nice: true,
                    alias: '回款金额（元）',
                },
            });
            this.chart.axis('amountReceived', {});
            this.chart.legend(false);
            this.chart.coordinate().transpose();
            this.chart
                .interval()
                .position('signer*amountReceived')
                .size(26)
                .label('amountReceived', {
                    style: {
                        fill: '#8d8d8d',
                    },
                    offset: 10,
                });
            this.chart.interaction('element-active');
            this.chart.render();
        },
        getChartData(data) {
            this.data = data;
            this.init();
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
