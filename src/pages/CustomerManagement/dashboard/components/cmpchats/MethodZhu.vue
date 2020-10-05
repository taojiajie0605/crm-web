<template>
    <div id="container333" class="chart"></div>
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
    created() {},
    mounted() {
        const e = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
    },
    methods: {
        init() {
            document.getElementById('container333').innerHTML = '';
            // 初始化图表
            this.chart = new Chart({
                container: 'container333',
                autoFit: true,
                height: 300,
            });

            this.chart.data(this.data);
            this.chart.scale('value', {
                nice: true,
            });
            this.chart.tooltip({
                showMarkers: false,
                shared: true,
            });

            this.chart
                .interval()
                .position('type*value')
                .color('key')
                .adjust([
                    {
                        type: 'dodge',
                        marginRatio: 0,
                    },
                ]);

            this.chart.interaction('active-region');

            this.chart.render();
        },
        dealChartData(data) {
            // 处理显示数据
            const da = [];
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const type = item.type;
                for (const k in item) {
                    if (k == 'type') break;
                    let key;
                    if (k === 'target') key = '目标金额';
                    if (k === 'complete') key = '完成金额';
                    da.push({
                        type: '' + type,
                        key: key,
                        value: item[k],
                    });
                }
            }
            return da;
        },
        getChartData(param) {
            // 获取图表数据
            request('/targetmoney', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.data = this.dealChartData(data.data);
                this.init();
            });
        },
    },
};
</script>

<style lang="less" scoped>
.chart {
    width: 90%;
    margin: 5px auto !important;
}
</style>
