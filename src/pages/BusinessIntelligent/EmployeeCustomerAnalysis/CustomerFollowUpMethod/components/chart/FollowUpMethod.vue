<template>
    <div id="container" class="chart"></div>
</template>

<script>
import { Chart, Util } from '@antv/g2';
import { request, METHOD } from '@/utils/request';
export default {
    data() {
        return {
            data: [],
            chart: {},
        };
    },
    methods: {
        initBing() {
            document.getElementById('container').innerHTML = '';
            this.chart = new Chart({
                container: 'container',
                autoFit: true,
                height: 300,
            });
            this.chart.data(this.data);

            this.chart.coordinate('theta', {
                radius: 0.75,
            });
            this.chart.tooltip({
                showMarkers: false,
            });

            this.chart
                .interval()
                .adjust('stack')
                .position('count')
                .color('method')
                .style({ opacity: 0.4 })
                .state({
                    active: {
                        style: (element) => {
                            const shape = element.shape;
                            return {
                                matrix: Util.zoom(shape, 1.1),
                            };
                        },
                    },
                })
                .label('method', () => {
                    return {
                        offset: -30,
                        style: {
                            fill: 'white',
                            fontSize: 12,
                            shadowBlur: 2,
                            shadowColor: 'rgba(0, 0, 0, .45)',
                        },
                        content: (obj) => {
                            return obj.method + '\n' + obj.rate + '%';
                        },
                    };
                });
            this.chart.interaction('element-single-selected');
            this.chart.render();
        },
        initZhu() {
            document.getElementById('container').innerHTML = '';
            this.chart = new Chart({
                container: 'container',
                autoFit: true,
                height: 400,
            });
            this.chart.data(this.data);
            this.chart.scale('count', {
                nice: true,
            });
            this.chart.tooltip({
                showMarkers: false,
            });
            this.chart
                .interval()
                .adjust('stack')
                .position('method*count')
                .color('method');
            this.chart.interaction('element-single-selected');
            this.chart.render();
        },
        getChartData(param, type) {
            // 获取图表数据
            request('/CustomerFollowUpMethodTableList', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = data.data;
                if (type === '饼状图') this.initBing();
                else {
                    this.initZhu();
                }
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
