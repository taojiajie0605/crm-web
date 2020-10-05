<template>
    <div>
        <a-modal
            title="新建合同"
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
                        <a-form-item label="合同编号" required>
                            <a-input v-model="form.contractnumber" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="合同名称" required>
                            <a-input v-model="form.contractname" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="客户名称" required>
                            <CustomerPopover
                                style="margin-left: 200px;"
                                ref="CustomerPopover"
                                @Surepopover="Surepopover"
                            />
                            <a-input
                                placeholder="+ 点击添加"
                                v-model="form.custname"
                                @click="showpopover"
                                allowClear="true"
                                style="cursor: pointer;"
                                @change="handlecustchange"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="商机名称">
                            <a-input
                                :disabled="form.custname ? false : true"
                                placeholder="+ 点击添加"
                                v-model="form.buopname"
                                @click="showBuoppopover"
                                allowClear="true"
                                style="cursor: pointer;"
                            />
                            <BuopPopover
                                ref="BuopPopover"
                                :custid="custid"
                                @Surepopover="SureBuoppopover"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="合同金额" required>
                            <a-input-number
                                style="width: 100%;"
                                v-model="form.contractmoney"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="下单时间" required>
                            <a-date-picker
                                v-model="form.ordertime"
                                style="width: 312px;"
                                show-time
                                placeholder="选择日期"
                                @change="onOrderDateChange"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="合同开始时间">
                            <a-date-picker
                                v-model="form.contractstarttime"
                                style="width: 312px;"
                                show-time
                                placeholder="选择日期"
                                @change="onStartDateChange"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="合同结束时间">
                            <a-date-picker
                                v-model="form.contractendtime"
                                style="width: 312px;"
                                show-time
                                placeholder="选择日期"
                                @change="onEndDateChange"
                            />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="客户签约人">
                            <a-input
                                :disabled="form.custname ? false : true"
                                placeholder="+ 点击添加"
                                v-model="form.custsigner"
                                @click="showContactspopover"
                                allowClear="true"
                                style="cursor: pointer;"
                            />
                            <ContactsPopover
                                style="margin-left: 200px;"
                                ref="ContactsPopover"
                                :custid="custid"
                                @Surepopover="SureContactspopover"
                            />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="公司签约人">
                            <a-tree-select
                                show-search
                                :dropdown-style="{
                                    maxHeight: '400px',
                                    overflow: 'auto',
                                }"
                                placeholder="选择员工"
                                allow-clear
                                multiple
                                tree-default-expand-all
                                v-model="form.compsigner"
                                maxTagCount="2"
                            >
                                <a-tree-select-node
                                    key="0-1"
                                    value="部门1"
                                    title="部门1"
                                >
                                    <a-tree-select-node
                                        key="0-1-1"
                                        value="员工1"
                                        title="员工1"
                                    />
                                    <a-tree-select-node
                                        key="0-1-2"
                                        value="员工2"
                                        title="员工2"
                                    />
                                </a-tree-select-node>
                                <a-tree-select-node
                                    key="0-2"
                                    value="部门2"
                                    title="部门2"
                                >
                                    <a-tree-select-node
                                        key="0-2-1"
                                        value="员工3"
                                        title="员工3"
                                    />
                                    <a-tree-select-node
                                        key="0-2-2"
                                        value="员工4"
                                        title="员工4"
                                    />
                                </a-tree-select-node>
                            </a-tree-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="12">
                        <a-form-item label="备注">
                            <a-textarea v-model="form.remarks" :rows="4" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="合同类型">
                            <a-select
                                :default-value="form.contracttype"
                                placeholder="请选择"
                                @change="contracttypeSelect(value)"
                            >
                                <a-select-option value="1">
                                    自销合同
                                </a-select-option>
                                <a-select-option value="2">
                                    代理合同
                                </a-select-option>
                                <a-select-option value="3">
                                    服务合同
                                </a-select-option>
                                <a-select-option value="4">
                                    快销合同
                                </a-select-option>
                            </a-select>
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
import BuopPopover from '@/components/comps/BuopPopover'; //添加商机名称
import ContactsPopover from '@/components/comps/ContactsPopover'; //添加联系人/签约人
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
    components: { CustomerPopover, BuopPopover, ContactsPopover, ProjPopover },
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
        //预计成交日期改变
        onOrderDateChange(date, dateString) {
            this.form.ordertime = dateString;
        },
        //预计成交日期改变
        onStartDateChange(date, dateString) {
            this.form.contractstarttime = dateString;
        },
        //预计成交日期改变
        onEndDateChange(date, dateString) {
            this.form.contractendtime = dateString;
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
                this.form.contractnumber = '';
                this.form.contractnumberid = '';
                this.form.custsigner = '';
                this.form.custsignerid = '';
            }
        },

        //商机名称弹出框方法
        showBuoppopover() {
            this.$refs.BuopPopover.visible = true;
        },
        //商机名称弹出框子调用方法
        SureBuoppopover(cust) {
            this.$set(this.form, 'buopname', cust[0].buopname);
            this.$set(this.form, 'buopid', cust[0].id);
            //console.log(cust[0]);
        },

        //客户签约人弹出框方法
        showContactspopover() {
            this.$refs.ContactsPopover.visible = true;
        },
        //客户签约人弹出框子调用方法
        SureContactspopover(cust) {
            this.$set(this.form, 'custsigner', cust[0].name);
            this.$set(this.form, 'custsignerid', cust[0].id);
            //console.log(cust[0]);
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
            if (
                this.form.contractnumber === '' ||
                this.form.contractnumber === undefined
            ) {
                this.$message.error('合同编号不能为空');
            } else if (
                this.form.contractname === '' ||
                this.form.contractname === undefined
            ) {
                this.$message.error('合同名称不能为空');
            } else if (
                this.form.custname === '' ||
                this.form.custname === undefined
            ) {
                this.$message.error('客户名称不能为空');
            } else if (
                this.form.contractmoney === '' ||
                this.form.contractmoney === undefined
            ) {
                this.$message.error('合同金额不能为空');
            } else if (
                this.form.ordertime === '' ||
                this.form.ordertime === undefined
            ) {
                this.$message.error('下单时间不能为空');
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
