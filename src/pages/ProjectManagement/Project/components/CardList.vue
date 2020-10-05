<template>
    <div class="card-list">
        <a-list
            :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
            :dataSource="dataSource"
        >
            <a-list-item slot="renderItem" slot-scope="item">
                <template v-if="item.add">
                    <a-button
                        class="new-btn"
                        type="dashed"
                        @click="handleCreate()"
                    >
                        <div class="flex">
                            <a-icon
                                type="plus"
                                style="margin-right: 10px;"
                            />创建新项目
                        </div>
                    </a-button>
                </template>
                <template v-else>
                    <a-card
                        :hoverable="true"
                        :style="{
                            backgroundImage: 'url(' + item.background + ')',
                        }"
                        @click="jumpto(item)"
                    >
                        <a-card-meta>
                            <div
                                style="
                                    margin-bottom: 3px;
                                    color: white;
                                    font-weight: bold;
                                "
                                slot="title"
                            >
                                {{ item.title }}
                            </div>
                            <div class="meta-content" slot="description">
                                {{ item.content }}
                            </div>
                        </a-card-meta>
                        <a slot="actions" @click.stop="ModelProj(item)"
                            >点击编辑</a
                        >
                        <a slot="actions">
                            <a-icon
                                type="star"
                                theme="filled"
                                :class="
                                    item.follow ? 'staryellow' : 'starwhite'
                                "
                                @click.stop="onConcerns(item)"
                            />
                        </a>
                    </a-card>
                </template>
            </a-list-item>
        </a-list>
        <!--编辑与新建弹出框-->
        <ModelProj
            ref="ModelProj"
            :form="currentproj"
            @fetchModelProj="fetchModelProj"
        />
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
import ModelProj from './cmp/ModelProj'; //新建/编辑客户

export default {
    components: { ModelProj },
    data() {
        return {
            dataSource: undefined, //项目列表数据
            currentproj: undefined, //当前某一个项目数据
        };
    },
    //初始请求
    mounted() {
        this.onfetch();
    },
    methods: {
        //全部项目请求
        onfetch() {
            request('/AllProj', METHOD.POST, {}).then((data) => {
                this.dataSource = data.data.proj;
                this.$emit('Changeallnumber', data.data.proj.length);
                this.dataSource.push({
                    add: true,
                });
            });
        },
        opppp() {
            console.log('6666');
            request('/AllProj', METHOD.POST, {}).then((data) => {
                this.dataSource = data.data.proj;
                this.$emit('Changeallnumber', data.data.proj.length);
                this.dataSource.push({
                    add: true,
                });
            });
        },

        //点击关注方法
        onConcerns(item) {
            this.fetchConcerns({
                ...item, //点击收藏的信息
            });
        },
        fetchConcerns(params = {}) {
            request('/AllProjConcerns', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.onfetch();
                this.$message.success(data.data.msg);
            });
        },

        //新建弹出框方法
        handleCreate() {
            this.$refs.ModelProj.visible = true;
            this.currentproj = JSON.parse(
                JSON.stringify({
                    colorid: '1',
                    color: 'rgb(245, 34, 45)',
                }),
            ); //解除绑定
        },
        //编辑弹出方法
        ModelProj(item) {
            this.$refs.ModelProj.visible = true;
            this.currentproj = JSON.parse(JSON.stringify(item)); //解除绑定
            //console.log('this.$refs.CustAddForm.visible',this.$refs.CustAddForm[0].visible);
        },
        fetchModelProj(params = {}) {
            request('/AllProjAdd', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.onfetch();
                this.$message.success(data.data.msg);
            });
        },

        //跳转到项目detail中
        jumpto(item) {
            //console.log(item);
            //项目内容放到session里
            sessionStorage.setItem('item', JSON.stringify(item));
            this.$router.push({
                path: '/e/b1',
            });
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
    /*实现水平居中*/
    justify-content: center;
}
.new-btn {
    border-radius: 2px;
    width: 100%;
    height: 187px;
}
.meta-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: white;
    font-weight: bold;
}
.staryellow {
    color: rgb(255, 166, 0);
    font-size: 22px;
}
.starwhite {
    color: grey;
    font-size: 22px;
}
</style>
