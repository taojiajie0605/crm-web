<template>
    <div>
        <a-modal
            title="新建商机"
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
                        <a-form-item label="商机名称" required>
                            <a-input v-model="form.buopname" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="客户名称" required>
                            <a-input
                                v-model="form.custname"
                                @click="showpopover"
                                allowClear="true"
                                style="cursor: pointer;"
                                placeholder="+ 点击添加"
                                @change="handlecustchange"
                            />
                            <CustomerPopover
                                ref="CustomerPopover"
                                @Surepopover="Surepopover"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="商机金额">
                            <a-input-number
                                style="width: 100%;"
                                v-model="form.buopmoney"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="预计成交日期">
                            <a-date-picker
                                v-model="form.expecteddate"
                                style="width: 312px;"
                                show-time
                                placeholder="选择日期"
                                @change="onDateChange"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="商机状态组" required>
                            <a-select
                                :default-value="form.buopstate"
                                placeholder="请选择"
                                @change="buopstateSelect(value)"
                            >
                                <a-select-option value="1">
                                    销售流程商机组
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="商机阶段" required>
                            <a-select
                                :default-value="form.buopstage"
                                placeholder="请选择"
                                @change="buopstageSelect(value)"
                            >
                                <a-select-option value="1">
                                    验证客户
                                </a-select-option>
                                <a-select-option value="2">
                                    需求分析
                                </a-select-option>
                                <a-select-option value="3">
                                    方案/报价
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="备注">
                            <a-textarea v-model="form.remarks" :rows="4" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <!--添加产品-->
                <div
                    style="
                        display: flex;
                        justify-content: right;
                        width: 100%;
                        margin-bottom: 10px;
                    "
                >
                    <a-button type="primary" @click="showProjpopover">
                        添加产品
                    </a-button>
                    <ProjPopover
                        ref="ProjPopover"
                        @Surepopover="SureProjpopover"
                    />
                </div>
                <!--表单-->
                <a-table
                    :columns="columns"
                    :data-source="form.projlist"
                    :pagination="false"
                >
                    <!--售价-->
                    <span slot="price" slot-scope="record">
                        <input
                            style="width: 100%;"
                            v-model="record.price"
                            @change="changeprice(record)"
                        />
                    </span>
                    <!--数量-->
                    <div slot="quantity" slot-scope="text, record">
                        <input
                            style="width: 100%;"
                            v-model="record.quantity"
                            @change="changequantity(record)"
                        />
                    </div>
                    <!--折扣-->
                    <span slot="discount" slot-scope="text, record">
                        <input
                            style="width: 100%;"
                            v-model="record.discount"
                            @change="changediscount(record)"
                        />
                    </span>
                    <!--合计-->
                    <span slot="total" slot-scope="record">
                        {{ record.total }}
                    </span>
                </a-table>
                <div
                    style="
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;
                        margin-right: 10px;
                    "
                >
                    <div>
                        整单折扣（%）：
                        <input
                            v-model="form.totaldiscount"
                            @change="changetotaldiscount"
                        />
                    </div>
                    <div class="flex">
                        已选中产品：
                        <div style="color: red;">
                            {{ form.projlist ? form.projlist.length : '0' }}
                        </div>
                        <span style="margin-right: 5px;">种</span>
                        <span style="margin-right: 5px;">总金额：</span>
                        <input
                            v-model="form.buopmoney"
                            @change="changetotalmoney"
                        />
                        元
                    </div>
                </div>
                <div style="margin-top: 10px;"></div>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
//import {request, METHOD} from '@/utils/request'
import CustomerPopover from '@/components/comps/CustomerPopover'; //添加客户名称
import ProjPopover from '@/components/comps/ProjPopover'; //添加产品
//表格标题
const columns = [
    {
        title: '产品名称',
        dataIndex: 'productname',
        key: 'buopproductnamename',
        width: '100px',
    },
    {
        title: '产品类别',
        dataIndex: 'producttype',
        key: 'producttype',
        width: '100px',
    },
    {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
        width: '100px',
    },
    {
        title: '标准价格',
        dataIndex: 'productprice',
        key: 'productprice',
    },
    {
        title: '售价',
        scopedSlots: { customRender: 'price' },
        key: 'price',
    },
    {
        title: '数量',
        scopedSlots: { customRender: 'quantity' },
        dataIndex: 'quantity',
    },
    {
        title: '折扣（%）',
        scopedSlots: { customRender: 'discount' },
        dataIndex: 'discount',
    },
    {
        title: '合计',
        scopedSlots: { customRender: 'total' },
        key: 'total',
    },
];
export default {
    name: 'NewBusinessOp',
    components: { CustomerPopover, ProjPopover },
    props: ['form'],
    data() {
        return {
            //编辑弹出框
            visible: false, //点编辑是否可见
            confirmLoading: false, //编辑页提交加载

            columns, //表格标题
        };
    },
    methods: {
        //商机状态组单选框选择
        buopstateSelect(value) {
            //console.log(value);
            this.form.buopstate = value;
            //console.log(this.form.scope);
        },
        //商机阶段选框选择
        unitSelect(value) {
            //console.log(value);
            this.form.buopstage = value;
        },
        //预计成交日期改变
        onDateChange(date, dateString) {
            this.form.expecteddate = dateString;
        },

        //客户名称弹出框方法
        showpopover() {
            this.$refs.CustomerPopover.visible = true;
        },
        //客户名称弹出框子调用方法
        Surepopover(cust) {
            this.$set(this.form, 'custname', cust[0].custname);
            this.$set(this.form, 'custid', cust[0].id);
            //console.log(cust[0]);
        },
        handlecustchange() {
            if (this.form.custname === '') {
                this.form.custid = '';
            }
        },

        //添加产品弹出框方法
        showProjpopover() {
            //console.log('1111111111');
            this.$refs.ProjPopover.visible = true;
        },
        //添加产品弹出框子调用方法
        SureProjpopover(projlist) {
            this.form.buopmoney = 0;
            for (let i = 0; i < projlist.length; i++) {
                projlist[i].price = projlist[i].productprice;
                projlist[i].quantity = 1;
                projlist[i].discount = 0;
                projlist[i].total = (
                    (projlist[i].price *
                        projlist[i].quantity *
                        (100 - projlist[i].discount)) /
                    100
                ).toFixed(3);
                this.form.buopmoney += projlist[i].total * 1;
            }
            this.$set(this.form, 'projlist', projlist);
        },

        //改变价格
        changeprice(record) {
            //console.log('111');
            for (let i = 0; i < this.form.projlist.length; i++) {
                if (this.form.projlist[i].id === record.id) {
                    //改变折扣
                    this.form.projlist[i].discount = (
                        100 -
                        (this.form.projlist[i].price /
                            this.form.projlist[i].productprice) *
                            100
                    ).toFixed(3);
                    //改变合计
                    this.form.projlist[i].total = (
                        this.form.projlist[i].price *
                        this.form.projlist[i].quantity
                    ).toFixed(3);
                    //改变总金额
                    this.form.buopmoney = 0;
                    for (let j = 0; j < this.form.projlist.length; j++) {
                        this.form.buopmoney += this.form.projlist[j].total * 1;
                        console.log(this.form.buopmoney);
                    }
                    if (this.form.totaldiscount) {
                        this.form.buopmoney = (
                            (this.form.buopmoney *
                                (100 - this.form.totaldiscount)) /
                            100
                        ).toFixed(3);
                    }
                    //console.log(this.form.projlist[i].discount);
                }
            }
            this.form.projlist = JSON.parse(JSON.stringify(this.form.projlist));
        },
        //改变数量
        changequantity(record) {
            //console.log(record);
            for (let i = 0; i < this.form.projlist.length; i++) {
                if (this.form.projlist[i].id === record.id) {
                    //改变合计
                    this.form.projlist[i].total = (
                        this.form.projlist[i].price *
                        this.form.projlist[i].quantity
                    ).toFixed(3);
                    //改变总金额
                    this.form.buopmoney = 0;
                    for (let j = 0; j < this.form.projlist.length; j++) {
                        this.form.buopmoney += this.form.projlist[j].total * 1;
                        console.log(this.form.buopmoney);
                    }
                    if (this.form.totaldiscount) {
                        this.form.buopmoney = (
                            (this.form.buopmoney *
                                (100 - this.form.totaldiscount)) /
                            100
                        ).toFixed(3);
                    }
                    //console.log(this.form.projlist[i].discount);
                }
            }
            this.form.projlist = JSON.parse(JSON.stringify(this.form.projlist));
        },
        //改变折扣
        changediscount(record) {
            for (let i = 0; i < this.form.projlist.length; i++) {
                if (this.form.projlist[i].id === record.id) {
                    //改变售价
                    this.form.projlist[i].price = (
                        ((100 - this.form.projlist[i].discount) *
                            this.form.projlist[i].productprice) /
                        100
                    ).toFixed(3);
                    //console.log(this.form.projlist[i].discount);
                }
                if (this.form.projlist[i].id === record.id) {
                    //改变合计
                    this.form.projlist[i].total = (
                        this.form.projlist[i].price *
                        this.form.projlist[i].quantity
                    ).toFixed(3);
                    //改变总金额
                    this.form.buopmoney = 0;
                    for (let j = 0; j < this.form.projlist.length; j++) {
                        this.form.buopmoney += this.form.projlist[j].total * 1;
                        console.log(this.form.buopmoney);
                    }
                    if (this.form.totaldiscount) {
                        this.form.buopmoney = (
                            (this.form.buopmoney *
                                (100 - this.form.totaldiscount)) /
                            100
                        ).toFixed(3);
                    }
                    //console.log(this.form.projlist[i].discount);
                }
            }
            this.form.projlist = JSON.parse(JSON.stringify(this.form.projlist));
        },
        //改变总金额
        changetotalmoney() {
            //console.log('111');
            let oldtotalmoney = 0;
            //console.log(oldtotalmoney);
            for (let i = 0; i < this.form.projlist.length; i++) {
                oldtotalmoney += this.form.projlist[i].total * 1;
                //console.log(oldtotalmoney);
            }
            //console.log(oldtotalmoney);
            this.form.totaldiscount = 0;
            this.form.totaldiscount = (
                100 -
                (this.form.buopmoney / oldtotalmoney) * 100
            ).toFixed(3);
            //console.log(this.form.totaldiscount);
            this.form = JSON.parse(JSON.stringify(this.form));
        },
        //改变整单折扣
        changetotaldiscount() {
            //console.log('111');
            let oldtotalmoney = 0;
            //console.log(oldtotalmoney);
            for (let i = 0; i < this.form.projlist.length; i++) {
                oldtotalmoney += this.form.projlist[i].total * 1;
                //console.log(oldtotalmoney);
            }
            this.form.buopmoney = (
                ((100 - this.form.totaldiscount) * oldtotalmoney) /
                100
            ).toFixed(3);
            //console.log(this.form.totaldiscount);
            this.form = JSON.parse(JSON.stringify(this.form));
        },

        //提交/取消表单
        handleOk() {
            if (this.form.buopname === '' || this.form.buopname === undefined) {
                this.$message.error('商机名称不能为空');
            } else if (
                this.form.custname === '' ||
                this.form.custname === undefined
            ) {
                this.$message.error('客户名称不能为空');
            } else if (
                this.form.buopstate === '' ||
                this.form.buopstate === undefined
            ) {
                this.$message.error('商机状态组不能为空');
            } else if (
                this.form.buopstage === '' ||
                this.form.buopstage === undefined
            ) {
                this.$message.error('商机阶段不能为空');
            } else {
                this.confirmLoading = true;
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
    },
};
</script>

<style lang="less" scoped>
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
}
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
