<template>
    <a-row>
        <a-col :span="5">
            <div style="background-color: white;">
                <a-tabs>
                    <a-tab-pane tab="合同" key="1">
                        <a-menu>
                            <a-menu-item
                                v-for="(item, index) in contact"
                                @click="insertTag($event)"
                                :key="index"
                                >{{ item }}</a-menu-item
                            >
                        </a-menu>
                    </a-tab-pane>
                    <a-tab-pane tab="客户" key="2">
                        <a-menu>
                            <a-menu-item
                                v-for="(item, index) in customer"
                                @click="insertTag($event)"
                                :key="index"
                                >{{ item }}</a-menu-item
                            >
                        </a-menu>
                    </a-tab-pane>
                    <a-tab-pane tab="联系人" key="3" />
                    <a-tab-pane tab="产品" key="4" />
                </a-tabs>
            </div>
        </a-col>
        <a-col :offset="1" :span="18">
            <div id="app" style="background-color: white;">
                <vue-editor
                    ref="editor"
                    @selection-change="currentPos"
                    style="height: 850px;"
                    v-model="content"
                />
            </div>
        </a-col>
    </a-row>
</template>
<script>
import { VueEditor } from 'vue2-editor';

const customer = '客户名称 客户来源 客户行业 客户级别 手机 电话 网址 邮箱 备注 详细地址 区域'.split(
    ' ',
);
const contact = '合同编号 合同金额 商机名称 负责人 下单时间 合同开始时间 合同结束时间 客户签约人 公司签约人 备注 创建人 创建时间 更新时间 未收款金额 合同类型'.split(
    ' ',
);
export default {
    data() {
        return {
            contact: contact,
            customer,
            cursor: 0,
            content: '<h1>some</h1>',
        };
    },
    components: {
        VueEditor,
    },
    methods: {
        // change() {
        //     console.log(this.content);
        //     if (this.content == '<h1><br></h1>') {
        //         console.log('111');
        //         this.content = '<h1></h1>';
        //     }
        // },
        currentPos(range) {
            this.cursor = range['index'];
            console.log(this.cursor);
            console.log(this.content.length);
            if (this.cursor == 0) {
                this.cursor = this.content.length - 9;
            }
        },
        insertTag(event) {
            // if (this.content == '<h1></h1>') {
            //     console.log('111');
            //     return;
            // }
            if (this.cursor == 0) {
                this.cursor = this.content.length - 9;
            }
            console.log(this.contact[event['key']]);
            let posInHtml = 0;
            let i = 0;
            const temp = [];
            while (i <= this.content.length) {
                if (this.content[i] == '<') temp.push('<');
                else {
                    if (this.content[i] == '>') {
                        if (temp.pop() == '<') {
                            posInHtml++;
                            i++;
                        }
                    } else {
                        if (temp.length == 0) posInHtml++;
                    }
                }
                if (posInHtml == this.cursor) break;
                i++;
            }
            console.log(this.content[7]);
            console.log(i);
            //console.log('1111');
            const newString =
                this.content.slice(0, i + 1) +
                `{ ${this.contact[event['key']]} }` +
                this.content.slice(i + 1);
            console.log(newString);
            this.content = newString;
        },
    },
};
</script>

<style lang="less" scoped></style>
