<template>
    <div id="container1"></div>
</template>

<script>
import { Chart } from '@antv/g2';
export default {
    data() {
        return {
            data: [],
        };
    },
    mounted() {
        const e = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
    },
    methods: {
        init() {
            document.getElementById('container1').innerHTML = '';
            this.chart = new Chart({
                container: 'container1',
                autoFit: true,
                height: 400,
            });
            this.chart.data(this.data);
            this.chart.coordinate('theta', {
                radius: 0.75,
                innerRadius: 0.65,
            });
            this.chart.tooltip({
                showTitle: false,
                showMarkers: false,
                itemTpl:
                    '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
            });
            this.chart
                .interval()
                .adjust('stack')
                .position('totalCustomer')
                .color('source')
                .label('source');
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
