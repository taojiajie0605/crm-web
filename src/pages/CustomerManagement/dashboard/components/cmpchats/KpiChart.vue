<template>
    <div>
        <div id="container3333" class="chart"></div>
        <div style="display: flex; justify-content: center;" class="font">
            <span style="margin-right: 20px;">目标金额：{{ target }} 元</span>
            <span v-if="selectmoney === '1'">合同金额: {{ money }} 元</span>
            <span v-else>回款金额: {{ money }} 元</span>
        </div>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import { Chart, registerShape } from '@antv/g2';

export default {
    name: 'TotalCustomer',
    data() {
        return {
            data: [], //业绩指标完成率数据
            target: '', //目标金额
            money: '', //金额
            selectmoney: '', //合同或回款
            //chart: {},
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
            document.getElementById('container3333').innerHTML = '';
            // 初始化图表
            // 自定义Shape 部分
            registerShape('point', 'pointer', {
                draw(cfg, container) {
                    const group = container.addGroup({});
                    // 获取极坐标系下画布中心点
                    const center = this.parsePoint({ x: 0, y: 0 });
                    // 绘制指针
                    group.addShape('line', {
                        attrs: {
                            x1: center.x,
                            y1: center.y,
                            x2: cfg.x,
                            y2: cfg.y,
                            stroke: cfg.color,
                            lineWidth: 5,
                            lineCap: 'round',
                        },
                    });
                    group.addShape('circle', {
                        attrs: {
                            x: center.x,
                            y: center.y,
                            r: 9.75,
                            stroke: cfg.color,
                            lineWidth: 4.5,
                            fill: '#fff',
                        },
                    });
                    return group;
                },
            });

            const color = ['#0086FA', '#FFBF00', '#F5222D'];
            const chart = new Chart({
                container: 'container3333',
                autoFit: true,
                height: 280,
                padding: [0, 0, 30, 0],
            });
            chart.data(this.data);
            chart.animate(false);

            chart.coordinate('polar', {
                startAngle: (-9 / 8) * Math.PI,
                endAngle: (1 / 8) * Math.PI,
                radius: 0.75,
            });
            chart.scale('value', {
                min: 0,
                max: 100,
                tickInterval: 10,
            });

            chart.axis('1', false);
            chart.axis('value', {
                line: null,
                label: {
                    offset: -40,
                    style: {
                        fontSize: 18,
                        fill: '#CBCBCB',
                        textAlign: 'center',
                        textBaseline: 'middle',
                    },
                },
                tickLine: {
                    length: -24,
                },
                grid: null,
            });
            chart.legend(false);
            chart.tooltip(false);
            chart
                .point()
                .position('value*1')
                .shape('pointer')
                .color('value', (val) => {
                    if (val < 20) {
                        return color[0];
                    } else if (val <= 80) {
                        return color[1];
                    } else if (val <= 100) {
                        return color[2];
                    }
                });

            draw(this.data);

            function draw(data) {
                const val = data[0].value;
                const lineWidth = 25;
                chart.annotation().clear(true);
                // 绘制仪表盘背景
                chart.annotation().arc({
                    top: false,
                    start: [0, 1],
                    end: [6, 1],
                    style: {
                        stroke: '#CBCBCB',
                        lineWidth,
                        lineDash: null,
                    },
                });

                if (val >= 20) {
                    chart.annotation().arc({
                        start: [0, 1],
                        end: [val, 1],
                        style: {
                            stroke: color[0],
                            lineWidth,
                            lineDash: null,
                        },
                    });
                }

                if (val >= 80) {
                    chart.annotation().arc({
                        start: [20, 1],
                        end: [80, 1],
                        style: {
                            stroke: color[1],
                            lineWidth,
                            lineDash: null,
                        },
                    });
                }

                if (val > 80 && val <= 100) {
                    chart.annotation().arc({
                        start: [80, 1],
                        end: [val, 1],
                        style: {
                            stroke: color[2],
                            lineWidth,
                            lineDash: null,
                        },
                    });
                }

                if (val > 20 && val <= 80) {
                    chart.annotation().arc({
                        start: [20, 1],
                        end: [val, 1],
                        style: {
                            stroke: color[1],
                            lineWidth,
                            lineDash: null,
                        },
                    });
                }

                if (val < 20) {
                    chart.annotation().arc({
                        start: [0, 1],
                        end: [val, 1],
                        style: {
                            stroke: color[0],
                            lineWidth,
                            lineDash: null,
                        },
                    });
                }

                // 绘制指标数字
                chart.annotation().text({
                    position: ['50%', '85%'],
                    content: '完成率',
                    style: {
                        fontSize: 20,
                        fill: '#545454',
                        textAlign: 'center',
                    },
                });
                chart.annotation().text({
                    position: ['50%', '90%'],
                    content: `${data[0].value} %`,
                    style: {
                        fontSize: 36,
                        fill: '#545454',
                        textAlign: 'center',
                    },
                    offsetY: 15,
                });
                chart.changeData(data);
            }
        },
        getChartData(param) {
            this.selectmoney = param.selectmoney; //合同或回款
            // 获取图表数据
            request('/KpiChart', METHOD.POST, {
                ...param,
            }).then((data) => {
                this.target = data.data.answer[0].target; //目标金额
                this.money = data.data.answer[0].money; //金额
                this.data = data.data.answer;
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
.font {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
}
</style>
