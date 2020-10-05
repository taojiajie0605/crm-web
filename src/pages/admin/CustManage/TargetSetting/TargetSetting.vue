<template>
    <a-card>
        <div>
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="部门目标设置">
                    <a-row :gutter="[16, 32]">
                        <a-col :span="3" class="gutter-row" align="left">
                            <a-date-picker
                                format="YYYY"
                                mode="year"
                                :value="year"
                                @change="onchange"
                                @ok="onok"
                            />
                        </a-col>
                        <a-col :span="2" class="gutter-row" align="center">
                            <a-select default-value="contract">
                                <a-select-option value="contract"
                                    >合同金额</a-select-option
                                >
                                <a-select-option value="returnmoney"
                                    >回款金额</a-select-option
                                >
                            </a-select>
                        </a-col>
                        <a-col :span="2" class="gutter-row" align="center">
                            <a-select default-value="all">
                                <a-select-option value="all">
                                    全公司
                                </a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="2" class="gutter-row" align="center">
                            <a-button type="primary">搜索</a-button>
                        </a-col>
                        <a-col :span="13" />
                        <a-col :span="2" class="gutter-row">
                            <a-button
                                @click="newTarget"
                                align="right"
                                style="width: 100%;"
                                >设置目标</a-button
                            >
                        </a-col>
                    </a-row>
                    <target-table />
                </a-tab-pane>
                <a-tab-pane key="2" tab="员工目标设置">
                    <a-row :gutter="[16, 32]">
                        <a-col :span="3" class="gutter-row" align="left">
                            <div class="gutter-box">
                                <a-date-picker
                                    format="YYYY"
                                    mode="year"
                                    :value="year"
                                    @change="onchange"
                                    @ok="onok"
                                />
                            </div>
                        </a-col>
                        <a-col :span="2" class="gutter-row" align="center">
                            <div class="gutter-box">
                                <a-select default-value="contract">
                                    <a-select-option value="contract"
                                        >合同金额</a-select-option
                                    >
                                    <a-select-option value="returnmoney"
                                        >回款金额</a-select-option
                                    >
                                </a-select>
                            </div>
                        </a-col>
                        <a-col :span="2" class="gutter-row" align="center">
                            <div class="gutter-box">
                                <a-select default-value="all">
                                    <a-select-option value="all"
                                        >全公司</a-select-option
                                    >
                                </a-select>
                            </div>
                        </a-col>
                        <a-col :span="2" align="center">
                            <a-select
                                placeholder="请选择员工"
                                default-value="andy"
                            >
                                <a-select-option value="andy">
                                    andy
                                </a-select-option>
                                <a-select-option value="scott">
                                    scott
                                </a-select-option>
                            </a-select>
                        </a-col>
                        <a-col :span="2" class="gutter-row" align="center">
                            <div class="gutter-box">
                                <a-button type="primary">搜索</a-button>
                            </div>
                        </a-col>
                        <a-col :span="11" />
                        <a-col :span="2" class="gutter-row" align="right">
                            <div class="gutter-box">
                                <a-button @click="newTarget">设置目标</a-button>
                            </div>
                        </a-col>
                    </a-row>
                    <target-table />
                </a-tab-pane>
            </a-tabs>
        </div>
        <div ref="newModal">
            <a-modal
                :visible="newVisible"
                title="设置目标"
                @ok="handleOk"
                @cancel="handleCancel"
                :getContainer="this.$refs.newModal"
                width="960px"
            >
                <a-row :gutter="[16, 32]">
                    <a-col :span="12" align="left">
                        考核部门
                        <a-select default-value="all" style="width: 300px;">
                            <a-select-option value="all"
                                >全公司</a-select-option
                            >
                        </a-select>
                    </a-col>
                    <a-col :span="12" align="left">
                        考核指标
                        <a-select
                            placeholder="选择考核指标"
                            style="width: 300px;"
                        >
                            <a-select-option value="contract">
                                合同金额
                            </a-select-option>
                            <a-select-option value="returnmoney">
                                回款金额
                            </a-select-option>
                        </a-select>
                    </a-col>
                </a-row>
                <a-divider />
                <a-row>
                    <a-col :span="16" align="center">
                        <a-date-picker
                            format="YYYY"
                            mode="year"
                            :value="year"
                            @change="onchange"
                            @ok="onok"
                        />
                        的业务目标是￥
                        <a-input-number
                            :value="totalTarget"
                            @change="totalTargetChange"
                        />
                        元
                    </a-col>
                    <a-col :span="8">
                        <a-button type="primary" @click="averToEachMonth">
                            平均分配到每个月
                        </a-button>
                    </a-col>
                </a-row>
                <a-divider />
                <a-row :gutter="16">
                    <a-col :span="6">
                        <a-card>
                            <h4>第一季度</h4>
                            <a-input-number
                                :disabled="true"
                                style="width: 150px;"
                                v-model="targetSeason1"
                            />
                            <a-divider />
                            <a-row :gutter="[0, 16]">
                                <a-col :span="6" style="line-height: 30px;">
                                    1月份
                                </a-col>
                                <a-col :span="6">
                                    <a-input-number
                                        v-model="monthTarget.jan"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                            <a-row :gutter="[0, 16]">
                                <a-col :span="6" style="line-height: 30px;">
                                    2月份
                                </a-col>
                                <a-col :span="6">
                                    <a-input-number
                                        v-model="monthTarget.feb"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                            <a-row :gutter="[0, 16]">
                                <a-col :span="6" style="line-height: 30px;">
                                    3月份
                                </a-col>
                                <a-col :span="6">
                                    <a-input-number
                                        v-model="monthTarget.mar"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card>
                            <h4>第二季度</h4>
                            <a-input-number
                                :disabled="true"
                                style="width: 150px;"
                                v-model="targetSeason2"
                            />
                            <a-divider />
                            <a-row :gutter="[0, 16]">
                                <a-col :span="6" style="line-height: 30px;">
                                    4月份
                                </a-col>
                                <a-col :span="6">
                                    <a-input-number
                                        v-model="monthTarget.apr"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                            <a-row :gutter="[0, 16]">
                                <a-col :span="6" style="line-height: 30px;">
                                    5月份
                                </a-col>
                                <a-col :span="6">
                                    <a-input-number
                                        v-model="monthTarget.may"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                            <a-row :gutter="[0, 16]">
                                <a-col :span="6" style="line-height: 30px;">
                                    6月份
                                </a-col>
                                <a-col :span="6">
                                    <a-input-number
                                        v-model="monthTarget.jun"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card>
                            <h4>第三季度</h4>
                            <a-input-number
                                :disabled="true"
                                style="width: 150px;"
                                v-model="targetSeason3"
                            />
                            <a-divider />
                            <a-row :gutter="[0, 16]">
                                <a-col :span="6" style="line-height: 30px;">
                                    7月份
                                </a-col>
                                <a-col :span="6">
                                    <a-input-number
                                        v-model="monthTarget.jul"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                            <a-row :gutter="[0, 16]">
                                <a-col :span="6" style="line-height: 30px;">
                                    8月份
                                </a-col>
                                <a-col :span="6">
                                    <a-input-number
                                        v-model="monthTarget.aug"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                            <a-row :gutter="[0, 16]">
                                <a-col :span="6" style="line-height: 30px;">
                                    9月份
                                </a-col>
                                <a-col :span="6">
                                    <a-input-number
                                        v-model="monthTarget.sep"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                    <a-col :span="6">
                        <a-card>
                            <h4>第四季度</h4>
                            <a-input-number
                                :disabled="true"
                                style="width: 150px;"
                                v-model="targetSeason4"
                            />
                            <a-divider />
                            <a-row :gutter="[0, 16]">
                                <a-col :span="7" style="line-height: 30px;">
                                    10月份
                                </a-col>
                                <a-col :span="5">
                                    <a-input-number
                                        v-model="monthTarget.oct"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                            <a-row :gutter="[0, 16]">
                                <a-col :span="7" style="line-height: 30px;">
                                    11月份
                                </a-col>
                                <a-col :span="5">
                                    <a-input-number
                                        v-model="monthTarget.nov"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                            <a-row :gutter="[0, 16]">
                                <a-col :span="7" style="line-height: 30px;">
                                    12月份
                                </a-col>
                                <a-col :span="5">
                                    <a-input-number
                                        v-model="monthTarget.dec"
                                        @change="inputChange"
                                    />
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
            </a-modal>
        </div>
    </a-card>
</template>

<script>
import TargetTable from './components/TargetTable';
export default {
    data() {
        return {
            newVisible: false,
            value: '',
            open: false,
            quota: '请选择考核指标',
            // monthTarget: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            monthTarget: {
                jan: 0,
                feb: 0,
                mar: 0,
                apr: 0,
                may: 0,
                jun: 0,
                jul: 0,
                aug: 0,
                sep: 0,
                oct: 0,
                nov: 0,
                dec: 0,
            },
            settedTotalTarget: 0,
            totalTarget: 0,
            targetSeason1: 0,
            targetSeason2: 0,
            targetSeason3: 0,
            targetSeason4: 0,
        };
    },
    computed: {},
    methods: {
        newTarget() {
            this.newVisible = true;
        },
        handleOk(e) {
            this.newVisible = false;
        },
        handleCancel(e) {
            this.newVisible = false;
        },
        totalTargetChange(e) {
            this.totalTarget = e;
        },
        averToEachMonth() {
            this.settedTotalTarget = this.totalTarget;
            const aver = parseFloat((this.settedTotalTarget / 12).toFixed(2));
            this.monthTarget.jan = aver;
            this.monthTarget.feb = aver;
            this.monthTarget.mar = aver;
            this.monthTarget.apr = aver;
            this.monthTarget.may = aver;
            this.monthTarget.jun = aver;
            this.monthTarget.jul = aver;
            this.monthTarget.aug = aver;
            this.monthTarget.sep = aver;
            this.monthTarget.oct = aver;
            this.monthTarget.nov = aver;
            this.monthTarget.dec = aver;
            this.targetSeason1 =
                this.monthTarget.jan +
                this.monthTarget.feb +
                this.monthTarget.mar;
            this.targetSeason2 =
                this.monthTarget.apr +
                this.monthTarget.may +
                this.monthTarget.jun;
            this.targetSeason3 =
                this.monthTarget.jul +
                this.monthTarget.aug +
                this.monthTarget.sep;
            this.targetSeason4 =
                this.monthTarget.oct +
                this.monthTarget.nov +
                this.monthTarget.dec;
        },
        inputChange() {
            //实属无奈，用for的话会失效
            let sum = 0;
            sum =
                this.monthTarget.jan +
                this.monthTarget.feb +
                this.monthTarget.mar +
                this.monthTarget.apr +
                this.monthTarget.may +
                this.monthTarget.jun +
                this.monthTarget.jul +
                this.monthTarget.aug +
                this.monthTarget.sep +
                this.monthTarget.oct +
                this.monthTarget.nov +
                this.monthTarget.dec;
            this.totalTarget = this.settedTotalTarget = sum;
            this.targetSeason1 =
                this.monthTarget.jan +
                this.monthTarget.feb +
                this.monthTarget.mar;
            this.targetSeason2 =
                this.monthTarget.apr +
                this.monthTarget.may +
                this.monthTarget.jun;
            this.targetSeason3 =
                this.monthTarget.jul +
                this.monthTarget.aug +
                this.monthTarget.sep;
            this.targetSeason4 =
                this.monthTarget.oct +
                this.monthTarget.nov +
                this.monthTarget.dec;
        },
        onchange() {
            this.$message.success('日期选择成功');
        },
        onok() {
            console.log('日期选择成功');
        },
    },
    components: {
        TargetTable,
    },
    watch: {
        monthTarget: {
            handler(val) {
                this.targetSeason1 =
                    this.monthTarget[0] +
                    this.monthTarget[1] +
                    this.monthTarget[2];
                this.targetSeason2 =
                    this.monthTarget[3] +
                    this.monthTarget[4] +
                    this.monthTarget[5];
                this.targetSeason3 =
                    this.monthTarget[6] +
                    this.monthTarget[7] +
                    this.monthTarget[8];
                this.targetSeason4 =
                    this.monthTarget[9] +
                    this.monthTarget[10] +
                    this.monthTarget[11];
            },
        },
    },
};
</script>

<style lang="stylus" scoped></style>
