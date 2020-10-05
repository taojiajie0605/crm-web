<template>
    <a-modal :footer="null" :visible="visible" @cancel="showOrCloseModal">
        <template slot="title">
            <b>审批类型</b>
        </template>
        请选择您的审批类型（管理后台可自定义配置审批类型）
        <div class="mainBody">
            <basic-form ref="basic" :current="components" />
            <div v-for="(item, index) in icons" :key="item">
                <div
                    style="
                        width: 90px;
                        text-align: center;
                        margin-bottom: 10px;
                    "
                >
                    <a-icon
                        :type="item.icon"
                        style="font-size: 30px;"
                        theme="twoTone"
                    />
                </div>
                <div
                    style="
                        width: 90px;
                        text-align: center;
                        margin-bottom: 10px;
                    "
                >
                    <a @click="showBasicModal(index)">{{ item.category }}</a>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<script>
import BasicForm from './BasicModal';
//import GeneralApproval from './GeneralApproval';
export default {
    components: {
        BasicForm,
        //        GeneralApproval,
    },
    data() {
        return {
            visible: false,
            components: 1,
            icons: [
                {
                    icon: 'folder',
                    category: '普通审批',
                },
                {
                    icon: 'skin',
                    category: '请假审批',
                },
                {
                    icon: 'switcher',
                    category: '出差审批',
                },
                {
                    icon: 'tablet',
                    category: '加班审批',
                },
                {
                    icon: 'wallet',
                    category: '差旅报销',
                },
                {
                    icon: 'shop',
                    category: '借款申请',
                },
            ],
        };
    },
    methods: {
        showOrCloseModal() {
            this.visible = !this.visible;
        },
        showBasicModal(index) {
            this.$refs.basic.showOrCloseModal();
            this.components = index;
        },
    },
};
</script>
<style scoped>
.mainBody {
    margin-top: 25px;
    display: flex;
    align-items: left;
    flex-wrap: wrap;
    justify-content: left;
}
</style>
