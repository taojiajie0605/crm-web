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
                businessMoney: {
                    alias: '新增商机金额',
                    min: 0,
                    sync: true, // 将 pv 字段数值同 time 字段数值进行同步
                    nice: true,
                    formatter: (val) => {
                        val = val + '万元';
                        return val;
                    },
                },
                businessNum: {
                    alias: '新增商机数量',
                    min: 0,
                    sync: true, // 将 pv 字段数值同 time 字段数值进行同步
                    nice: true,
                    formatter: (val) => {
                        val = val + '个';
                        return val;
                    },
                },
            });
            this.chart.scale('type', {
                range: [1 / this.data.length / 2, 1 - 1 / this.data.length / 2],
            });
            this.chart.axis('businessMoney', {
                grid: null,
                title: {},
            });
            this.chart.axis('businessNum', {
                title: {},
            });

            this.chart.tooltip({
                showCrosshairs: true,
                shared: true,
            });
            this.chart
                .line()
                .position('type*businessMoney')
                .color('#9AD681')
                .shape('dash');
            this.chart.line().position('type*businessNum').color('#4FAAEB');

            this.chart.render();
        },
        getChartData(data) {
            this.data = data;
            document.getElementById('container').innerHTML =
                '分组柱状图+ 双轴 + 折线';
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
