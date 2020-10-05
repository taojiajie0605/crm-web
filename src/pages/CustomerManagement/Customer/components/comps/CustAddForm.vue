<template>
    <div>
        <a-modal
            title="新建客户"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            okText="保存"
            @cancel="handleCancel"
            width="950px"
            :maskStyle="{ 'background-color': '#fff' }"
        >
            <a-form
                :form="form"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 17 }"
                class="scroll"
            >
                <div class="head">
                    <a-icon type="caret-right" />
                    基本信息
                </div>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="客户名称" required>
                            <a-input v-model="form.custname" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="客户来源">
                            <a-select
                                :default-value="form.custsource"
                                placeholder="请选择"
                                @change="custsourceSelect(value)"
                            >
                                <a-select-option value="1">
                                    促销
                                </a-select-option>
                                <a-select-option value="2">
                                    搜索引擎
                                </a-select-option>
                                <a-select-option value="3">
                                    广告
                                </a-select-option>
                                <a-select-option value="4">
                                    转介绍
                                </a-select-option>
                                <a-select-option value="5">
                                    线上注册
                                </a-select-option>
                                <a-select-option value="6">
                                    线上询价
                                </a-select-option>
                                <a-select-option value="7">
                                    预约上门
                                </a-select-option>
                                <a-select-option value="8">
                                    陌拜
                                </a-select-option>
                                <a-select-option value="9">
                                    电话咨询
                                </a-select-option>
                                <a-select-option value="10">
                                    邮件咨询
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="手机">
                            <a-input v-model="form.phone" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="电话">
                            <a-input v-model="form.telephone" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="网址">
                            <a-input v-model="form.website" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="邮箱">
                            <a-input v-model="form.email" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="客户行业">
                            <a-select
                                :default-value="form.custindustry"
                                placeholder="请选择"
                                @change="custindustrySelect(value)"
                            >
                                <a-select-option value="1">
                                    IT
                                </a-select-option>
                                <a-select-option value="2">
                                    金融业
                                </a-select-option>
                                <a-select-option value="3">
                                    房地产
                                </a-select-option>
                                <a-select-option value="4">
                                    商业服务
                                </a-select-option>
                                <a-select-option value="5">
                                    运输/物流
                                </a-select-option>
                                <a-select-option value="6">
                                    生产
                                </a-select-option>
                                <a-select-option value="7">
                                    政府
                                </a-select-option>
                                <a-select-option value="8">
                                    文化传媒
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="客户级别">
                            <a-select
                                :default-value="form.custlevel"
                                placeholder="请选择"
                                @change="custlevelSelect(value)"
                            >
                                <a-select-option value="1">
                                    A(重点客户)
                                </a-select-option>
                                <a-select-option value="2">
                                    B(普通客户)
                                </a-select-option>
                                <a-select-option value="3">
                                    C(非优先客户)
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="下次联系时间">
                            <a-date-picker
                                v-model="form.nexttime"
                                style="width: 312px;"
                                show-time
                                placeholder="选择时间"
                                @change="onDateChange"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="备注">
                            <a-textarea v-model="form.remarks" :rows="4" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="地区定位">
                            <a-cascader
                                :options="options"
                                :default-value="this.form.areaposition"
                                @change="onChange"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="详细地址">
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
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'
//import options from './sheng';
export default {
    name: 'CustAddForm',
    props: ['form'],
    components: {},
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            //地图数据
            mapZoom: 15,
            mapCenter: { lng: 0, lat: 0 },
            mapLocation: {
                address: this.form.detailaddress,
                coordinate: undefined,
            },

            //省市区
            options: [
                {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                        {
                            value: 'hangzhou',
                            label: 'Hangzhou',
                            children: [
                                {
                                    value: 'xihu',
                                    label: 'West Lake',
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 'jiangsu',
                    label: 'Jiangsu',
                    children: [
                        {
                            value: 'nanjing',
                            label: 'Nanjing',
                            children: [
                                {
                                    value: 'zhonghuamen',
                                    label: 'Zhong Hua Men',
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        //客户来源单选框选择
        custsourceSelect(value) {
            //console.log(value);
            this.form.custsource = value;
            //console.log(this.form.scope);
        },
        //客户行业单选框选择
        custindustrySelect(value) {
            //console.log(value);
            this.form.custindustry = value;
            //console.log(this.form.scope);
        },
        //客户级别单选框选择
        custlevelSelect(value) {
            //console.log(value);
            this.form.custsource = value;
        },
        //下次联系时间改变
        onDateChange(date, dateString) {
            this.form.nexttime = dateString;
        },

        //提交/取消表单
        handleOk() {
            const regPos = /^\d+(\.\d+)?$/; //非负浮点数
            const reg = /^[a-zA-Z0-9]+@[a-z0-9]{2,5}\.[a-z]{2,3}(\.[a-z]{2,3})?$/; //邮箱
            if (this.form.custname === '' || this.form.custname === undefined) {
                this.$message.error('客户名称不能为空');
            } else if (
                this.form.phone !== '' &&
                this.form.phone !== undefined &&
                !regPos.test(this.form.phone)
            ) {
                this.$message.error('手机格式有误');
            } else if (
                this.form.telephone !== '' &&
                this.form.telephone !== undefined &&
                !regPos.test(this.form.telephone)
            ) {
                this.$message.error('电话格式有误');
            } else if (
                this.form.email !== '' &&
                this.form.email !== undefined &&
                !reg.test(this.form.email)
            ) {
                this.$message.error('邮箱格式有误');
            } else {
                this.confirmLoading = true;
                this.form.detailaddress = this.mapLocation.address;
                //console.log("1111111111111111111",this.form)
                this.$emit('fetchadd', this.form);
                //console.log("1111111111111111111")
                this.visible = false;
                this.confirmLoading = false;
            }
        },
        handleCancel() {
            this.visible = false;
        },

        //4个地图调用方法
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

        //省市区改变
        onChange(value) {
            //console.log(value);
            this.form.areaposition = value;
        },
    },
};
</script>

<style lang="less" scoped>
.status {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head {
    font-weight: bold;
    color: #000;
    margin: 20px 0 10px 0;
}
.list {
    .item {
        padding: 5px 0;
        .title {
            display: inline-block;
            width: 30%;
        }
        .content {
            color: #000;
        }
    }
}
//地图设置
.bm-view {
    width: 100%;
    height: 200px;
}
//滚动条css
.scroll {
    height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
}
.scroll::-webkit-scrollbar {
    width: 8px;
}
.scroll::-webkit-scrollbar-track {
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
}
.scroll::-webkit-scrollbar-thumb {
    background-color: rgba(95, 95, 95, 0.4);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;

    &:hover {
        background-color: rgba(95, 95, 95, 0.7);
    }
}
</style>
