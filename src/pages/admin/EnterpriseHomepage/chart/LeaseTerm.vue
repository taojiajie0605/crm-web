<template>
    <div class="chart">
        <div class="title">{{ msg }}</div>
        <div id="leaseTerm"></div>
        <span>开始时间：{{ startTime }}</span>
        <span>结束时间：{{ endTime }}</span>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { Chart } from '@antv/g2';
export default {
    name: 'LeaseTerm',
    components: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
    mounted() {
        this.initComponent();
    },
    data() {
        return {
            msg: '',
            startTime: '2020-07-01',
            endTime: '2099-01-01',
            chart: null,
            data: [{ item: '剩余天数', count: 28644, percent: 1 }],
        };
    },
    // 方法集合
    methods: {
        initComponent() {
            // 此函数为个人习惯,喜欢创建一个初始化的函数
            this.msg = '租期到期时间';
            // 决定图表布局大小，以及显示的容器
            const chart = new Chart({
                container: 'leaseTerm',
                width: 500,
                height: 240,
            });
            // 绑定参数
            chart.source(this.data);
            // 图表的显示类型，默认为柱状图
            chart.coordinate('theta', {
                radius: 0.6,
                innerRadius: 0.8,
            });
            // 提示文字
            chart
                .annotation()
                .text({
                    position: ['50%', '50%'],
                    content: '剩余天数',
                    style: {
                        fontSize: 14,
                        fill: '#8c8c8c',
                        textAlign: 'center',
                    },
                    offsetY: -20,
                })
                .text({
                    position: ['50%', '50%'],
                    content: this.data[0].count + ' 天',
                    style: {
                        fontSize: 16,
                        fill: '#8c8c8c',
                        textAlign: 'center',
                    },
                    offsetY: 20,
                });
            // 隐藏图例
            chart.legend(false);
            //渲染
            chart
                .interval()
                .adjust('stack')
                .position('percent')
                .color('#E6E6FA')
                .tooltip({
                    showTitle: false,
                    showMarkers: false,
                });
            this.chart = chart;
            this.chart.render();
        },
    },
    // 计算属性
    computed: {},
};
</script>

<style lang="less" scoped>
.chart {
    width: 100%;
    padding: 0 auto;
    text-align: center;
    .title {
        color: #000;
    }
    span {
        display: block;
    }
}
</style>
