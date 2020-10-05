<template>
    <div>
        <a-popover :overlayStyle="{ width: 300 + 'px' }" trigger="click">
            <template slot="content">
                <a-row>
                    <a-col :span="24">
                        创建新标签
                        <hr />
                        <a-input />
                    </a-col>
                </a-row>
                <a-row :gutter="[16, 16]">
                    <a-col :span="24">
                        <div style="float: right;">
                            <a-space>
                                <a-button type="primary">保存</a-button>
                                <!-- <a-button>取消</a-button> -->
                            </a-space>
                        </div>
                    </a-col>
                </a-row>
            </template>
            <a-button icon="plus" type="link"> 标签 </a-button>
        </a-popover>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentComponent: 1,
            color: 'rgb(245, 34, 45)',
            labelList: ['标签1', '标签2'],
        };
    },
    mounted() {
        this.labelList = this.$store.getters['label/getLabels'];
        //console.log(this.labelList);
    },
    methods: {
        changeCurrentComponent(index) {
            this.currentComponent = index;
        },
        changeColor(values, colors) {
            this.color = this.calculateColor(colors);
        },
        calculateColor(colors) {
            let red = 0;
            let green = 0;
            let blue = 0;
            let values;
            colors.forEach((color) => {
                values = color.split('(')[1].split(')')[0].split(',');
                red = Math.max(red, parseInt(values[0]));
                green += Math.max(green, parseInt(values[1]));
                blue += Math.max(blue, parseInt(values[2]));
            });
            return 'rgb(' + red + ',' + green + ',' + blue + ')';
        },
    },
};
</script>

<style lang="less" scoped>
.view-color {
    margin-top: 48px;
    display: inline-block;
    height: 96px;
    width: 96px;
    border-radius: 48px;
    border: 1px dashed gray;
}
</style>
