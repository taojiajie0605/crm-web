<template>
    <a-card>
        <template slot="title">
            <div class="flex" align="left" style="float: left;">
                <a-icon
                    type="tags"
                    style="color: #00bfff; font-size: 30px; margin-right: 6px;"
                />
                标签
                <!--设置图标-->
                <a-dropdown class="tool">
                    <a-icon
                        type="setting"
                        style="
                            color: #99a9bf;
                            font-size: 15px;
                            margin-left: 6px;
                            cursor: pointer;
                        "
                    />
                    <a-menu slot="overlay">
                        <a-menu-item @click="handleCreate">
                            创建新标签
                            <CreateLabel
                                ref="CreateLabel"
                                :editlabel="CreateLabel"
                                @fetchEditLabel="fetchCreateLabel"
                            />
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
            </div>
        </template>
        <a-spin :spinning="spinning">
            <a-tabs>
                <a-tab-pane :key="index" v-for="(column, index) in labels">
                    <span slot="tab">
                        <a-icon type="tags" :style="'color:' + column.color" />
                        {{ column.title }}
                    </span>
                    <TabLabel
                        ref="TabLabel"
                        :label="column"
                        @onselectlables="onselectlables"
                    />
                </a-tab-pane>
            </a-tabs>
        </a-spin>
    </a-card>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import TabLabel from './components/TabLabel'; //标签展示
import CreateLabel from './components/cmp/EditLabel'; //新建标签

export default {
    components: { TabLabel, CreateLabel },
    data() {
        return {
            spinning: false, //加载中
            labels: {}, //所有标签

            CreateLabel: {}, //创建标签
        };
    },
    //初始查询
    mounted() {
        this.fetch({});
    },
    methods: {
        //查询所有标签
        fetch() {
            //console.log('111');
            this.spinning = true;
            //console.log('params:', params);
            request('/alllabels', METHOD.POST, {}).then((data) => {
                this.labels = data.data.return;
                this.spinning = false;
            });
        },
        //查询所有标签子调用
        onselectlables() {
            //console.log('112221');
            this.spinning = true;
            //console.log('params:', params);
            request('/alllabels', METHOD.POST, {}).then((data) => {
                this.labels = data.data.return;
                this.spinning = false;
            });
        },

        //新建标签弹出框方法
        handleCreate() {
            this.$refs.CreateLabel.visible = true;
            this.CreateLabel = {
                title: '',
                colorid: '1',
                color: 'rgb(245, 34, 45)',
            };
        },
        //新建标签子调用方法
        fetchCreateLabel(lable) {
            request('/Editlabel', METHOD.POST, {
                lable: lable,
            }).then((data) => {
                this.$message.success(data.data.msg);
                this.fetch(); //刷新tabs的标签
            });
        },
    },
};
</script>

<style scoped>
.flex {
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
}
</style>
