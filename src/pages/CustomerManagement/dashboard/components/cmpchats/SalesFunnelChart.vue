<template>
    <div id="container" class="chart"></div>
</template>

<script>
import { Chart } from '@antv/g2';
export default {
    data() {
        return {
            chart: {},
            data: [],
        };
    },
    methods: {
        init() {
            document.getElementById('container').innerHTML = '';
            this.chart = new Chart({
                container: 'container',
                width: 600,
                padding: [30, 100],
                height: 300,
            });
            this.chart.data(this.data);
            this.chart.axis(false);
            this.chart.coordinate('rect').transpose().scale(1, -1);
            this.chart.tooltip({
                showMarkers: false,
            });
            this.chart
                .interval()
                .adjust('symmetric')
                .position('stage*money')
                .shape('pyramid')
                .color('stage', [
                    '#0050B3',
                    '#1890FF',
                    '#40A9FF',
                    '#69C0FF',
                    '#BAE7FF',
                ])
                .label(
                    'stage*money*businessOpportunity',
                    (stage, money, businessOpportunity) => {
                        return {
                            content: `${stage}(${businessOpportunity}) ${money}`,
                        };
                    },
                    {
                        labelLine: {
                            style: {
                                lineWidth: 1,
                                stroke: 'rgba(0, 0, 0, 0.15)',
                            },
                        },
                    },
                )
                .animate({
                    appear: {
                        animation: 'fade-in',
                    },
                    update: {
                        annotation: 'fade-in',
                    },
                });

            this.chart.interaction('element-active');

            this.chart.render();
        },
        getChartData(data) {
            console.log(data);
            setTimeout(() => {
                this.data = data;
                this.init();
            }, 100);
        },
    },
    mounted() {
        const e = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
    },
};
</script>

<style lang="less" scoped>
.chart {
    width: 90%;
    display: flex;
    justify-content: center;
    margin: 50px auto;
}
</style>
