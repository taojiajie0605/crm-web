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
        initZhe() {
            document.getElementById('container').innerHTML = '';
            this.chart = new Chart({
                container: 'container',
                autoFit: true,
                height: 500,
                padding: [30, 10, 30, 40], //图标间距
            });

            this.chart.data(this.data);
            this.chart.scale({
                type: {
                    range: [0, 1],
                },
                pro: {
                    min: 0,
                    nice: true,
                },
            });
            this.chart.scale('type', {
                range: [1 / this.data.length / 2, 1 - 1 / this.data.length / 2],
            });

            this.chart.tooltip({
                showCrosshairs: true, // 展示 Tooltip 辅助线
                shared: true,
            });
            // 添加文本标注
            this.data.forEach((item) => {
                this.chart.annotation().text({
                    position: [item.type, item.pro],
                    content: item.pro + '%',
                    style: {
                        textAlign: 'center',
                    },
                    offsetY: -12,
                });
            });
            this.chart.line().position('type*pro');
            this.chart.point().position('type*pro');

            this.chart.render();
        },
        initBing() {
            document.getElementById('container').innerHTML = '';
            this.chart = new Chart({
                container: 'container',
                autoFit: true,
                height: 500,
            });
            this.chart.coordinate('theta', {
                radius: 0.75,
            });
            this.chart.scale('pro', {
                alias: '转化率',
                formatter: (val) => {
                    val = val + '%';
                    return val;
                },
            });
            this.chart.scale('type', {
                alias: '日期',
            });
            this.chart.tooltip({
                showCrosshairs: true,
                showMarkers: false,
                text: {
                    content: '123',
                },
            });
            this.chart
                .interval()
                .position('pro')
                .color('type', ['#063d8a', '#1770d6', '#47abfc', '#38c060'])
                .adjust('stack')
                .label('pro', {
                    offset: -40,
                    style: {
                        textAlign: 'center',
                        fontSize: 16,
                        shadowBlur: 2,
                        shadowColor: 'rgba(0, 0, 0, .45)',
                        fill: '#fff',
                    },
                });
            this.chart.data(this.data);
            this.chart.interaction('element-single-selected');
            this.chart.render();
        },
        initZhu() {
            document.getElementById('container').innerHTML = '';
            this.chart = new Chart({
                container: 'container',
                autoFit: true,
                height: 500,
            });
            this.chart.data(this.data);
            this.chart.scale('pro', {
                alias: '转化率(%)',
                nice: true,
            });
            this.chart.scale('type', {
                range: [1 / this.data.length / 2, 1 - 1 / this.data.length / 2],
            });
            this.chart.tooltip({
                showMarkers: false,
            });
            this.chart.interval().position('type*pro');
            this.chart.interaction('element-active');

            // 添加文本标注
            this.data.forEach((item) => {
                this.chart.annotation().text({
                    position: [item.type, item.pro],
                    content: item.pro + '%',
                    style: {
                        textAlign: 'center',
                    },
                    offsetY: -12,
                });
            });
            this.chart.render();
        },
        getChartData(data, type) {
            this.data = data;
            if (type === '折线图') {
                this.initZhe();
            } else if (type === '饼状图') {
                this.initBing();
            } else {
                this.initZhu();
            }
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
