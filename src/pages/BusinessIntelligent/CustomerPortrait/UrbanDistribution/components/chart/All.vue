<template>
    <div id="container1"></div>
</template>

<script>
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
export default {
    data() {
        return {
            userData: [],
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
            fetch(
                'https://gw.alipayobjects.com/os/antvdemo/assets/data/china.json',
            )
                .then((res) => res.json())
                .then((mapData) => {
                    const chart = new Chart({
                        container: 'container1',
                        autoFit: true,
                        height: 600,
                        padding: [55, 20],
                    });
                    chart.tooltip({
                        showTitle: false,
                        showMarkers: false,
                        shared: true,
                    });
                    // 同步度量
                    chart.scale({
                        longitude: {
                            sync: true,
                        },
                        latitude: {
                            sync: true,
                        },
                    });
                    chart.axis(false);
                    chart.legend('trend', {
                        position: 'left',
                    });

                    // 绘制世界地图背景
                    const ds = new DataSet();
                    const worldMap = ds.createView('back').source(mapData, {
                        type: 'GeoJSON',
                    });
                    const worldMapView = chart.createView();
                    worldMapView.data(worldMap.rows);
                    worldMapView.tooltip(false);
                    worldMapView
                        .polygon()
                        .position('longitude*latitude')
                        .style({
                            fill: '#fff',
                            stroke: '#ccc',
                            lineWidth: 1,
                        });
                    const userDv = ds
                        .createView()
                        .source(this.userData)
                        .transform({
                            geoDataView: worldMap,
                            field: 'region',
                            type: 'geo.region',
                            as: ['longitude', 'latitude'],
                        });

                    const userView = chart.createView();
                    userView.data(userDv.rows);
                    userView.scale({
                        region: {
                            alias: '地区',
                        },
                        totalCustomer: {
                            alias: '客户人数',
                        },
                    });
                    userView
                        .polygon()
                        .position('longitude*latitude')
                        .color('region')
                        .tooltip('region*totalCustomer')
                        .style({
                            fillOpacity: 0.85,
                        })
                        .label('region', {
                            offset: 0,
                            style: {
                                fontWeight: 500,
                                fill: '#000000',
                            },
                        })
                        .animate({
                            leave: {
                                animation: 'fade-out',
                            },
                        });
                    userView.interaction('element-active');

                    chart.render();
                });
        },
        getChartData(data) {
            this.userData = data;
            this.init();
        },
    },
};
</script>
