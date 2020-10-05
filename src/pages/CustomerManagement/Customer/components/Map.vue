<template>
    <div class="app-container">
        <el-autocomplete
            v-model="mapLocation.address"
            :fetch-suggestions="querySearch"
            placeholder="请输入详细地址"
            style="width: 100%;"
            :trigger-on-focus="false"
            @select="handleSelect"
        />
        <div style="margin: 5px;" @mousewheel.prevent>
            <baidu-map
                class="bm-view"
                :center="mapCenter"
                :zoom="mapZoom"
                :scroll-wheel-zoom="true"
                ak="baidu-ak"
                @ready="handlerBMap"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mapZoom: 15,
            mapCenter: { lng: 0, lat: 0 },
            mapLocation: {
                address: undefined,
                coordinate: undefined,
            },
        };
    },
    methods: {
        handlerBMap({ BMap, map }) {
            this.BMap = BMap;
            this.map = map;
            if (
                this.mapLocation.coordinate &&
                this.mapLocation.coordinate.lng
            ) {
                this.mapCenter.lng = this.mapLocation.coordinate.lng;
                this.mapCenter.lat = this.mapLocation.coordinate.lat;
                this.mapZoom = 15;
                map.addOverlay(
                    new this.BMap.Marker(this.mapLocation.coordinate),
                );
            } else {
                this.mapCenter.lng = 113.271429;
                this.mapCenter.lat = 23.135336;
                this.mapZoom = 10;
            }
        },
        querySearch(queryString, cb) {
            const that = this;
            const myGeo = new this.BMap.Geocoder();
            myGeo.getPoint(
                queryString,
                function (point) {
                    if (point) {
                        that.mapLocation.coordinate = point;
                        that.makerCenter(point);
                    } else {
                        that.mapLocation.coordinate = null;
                    }
                },
                this.locationCity,
            );
            const options = {
                onSearchComplete: function (results) {
                    if (local.getStatus() === 0) {
                        // 判断状态是否正确
                        const s = [];
                        for (let i = 0; i < results.getCurrentNumPois(); i++) {
                            const x = results.getPoi(i);
                            const item = {
                                value: x.address + x.title,
                                point: x.point,
                            };
                            s.push(item);
                            cb(s);
                        }
                    } else {
                        cb();
                    }
                },
            };
            const local = new this.BMap.LocalSearch(this.map, options);
            local.search(queryString);
        },
        handleSelect(item) {
            const { point } = item;
            this.mapLocation.coordinate = point;
            this.makerCenter(point);
        },
        makerCenter(point) {
            if (this.map) {
                this.map.clearOverlays();
                this.map.addOverlay(new this.BMap.Marker(point));
                this.mapCenter.lng = point.lng;
                this.mapCenter.lat = point.lat;
                this.mapZoom = 15;
            }
        },
    },
};
</script>

<style>
.bm-view {
    width: 100%;
    height: 500px;
}
</style>
