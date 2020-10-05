<template>
    <div class="common-layout" :style="{ backgroundImage: pic }">
        <div class="content"><slot></slot></div>
        <!-- <page-footer :link-list="footerLinks" :copyright="copyright" /> -->
    </div>
</template>

<script>
import PageFooter from '@/layouts/footer/PageFooter';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            pic: require('../assets/img/background-login.jpg'),
        };
    },
    name: 'CommonLayout',
    components: { PageFooter },
    computed: {
        ...mapState('setting', ['footerLinks', 'copyright']),
    },
};
</script>

<style scoped lang="less">
.common-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    // background-color: @layout-body-background;
    // background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
    background-image: url('../assets/img/background-login.jpg');
    background-repeat: no-repeat;
    // background-position-x: center;
    // background-position-y: 110px;
    background-size: 100%;
    .content {
        //display: flex;
        justify-content: right;
        width: 100%;
        flex: 1;
        @media (min-width: 768px) {
            //padding: 112px 0 24px;
        }
    }
}
</style>
