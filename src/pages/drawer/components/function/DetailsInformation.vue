<template>
    <div class="details-infomation">
        <a-row>
            <a-row align="left">
                <slot name="topTitle"></slot>
            </a-row>
            <a-row>
                <a-col :span="6" class="details-info-top-left1">
                    <slot name="topContentLeft1"></slot>
                </a-col>
                <a-col :span="6" class="details-info-top-left2" align="left">
                    <slot name="topContentLeft2"></slot>
                </a-col>
                <a-col :span="6" class="details-info-top-right1">
                    <slot name="topContentRight1"></slot>
                </a-col>
                <a-col :span="6" class="details-info-top-right2" align="left">
                    <slot name="topContentRight2"></slot>
                </a-col>
            </a-row>
        </a-row>
        <a-row>
            <div class="blank"></div>
        </a-row>
        <a-row>
            <a-row align="left">
                <slot name="bottomTitle"></slot>
            </a-row>
            <a-row>
                <a-col :span="6" class="details-info-bottom-left1">
                    <slot name="bottomContentLeft1"></slot>
                </a-col>
                <a-col :span="6" class="details-info-bottom-left2" align="left">
                    <slot name="bottomContentLeft2"></slot>
                </a-col>
                <a-col :span="6" class="details-info-bottom-right1">
                    <slot name="bottomContentRight1"></slot>
                </a-col>
                <a-col
                    :span="6"
                    class="details-info-bottom-right2"
                    align="left"
                >
                    <slot name="bottomContentRight2"></slot>
                </a-col>
            </a-row>
        </a-row>
        <a-row>
            <div class="blank"></div>
        </a-row>
        <a-row>
            <a-row align="left">
                <slot name="exTitle"></slot>
            </a-row>
            <a-row>
                <slot name="exMain"></slot>
            </a-row>
            <a-row>
                <a-col :span="6" class="details-info-ex-left1">
                    <slot name="exContentLeft1"></slot>
                </a-col>
                <a-col :span="6" class="details-info-ex-left2" align="left">
                    <slot name="exContentLeft2"></slot>
                </a-col>
                <a-col :span="6" class="details-info-ex-right1">
                    <slot name="exContentRight1"></slot>
                </a-col>
                <a-col :span="6" class="details-info-ex-right2" align="left">
                    <slot name="exContentRight2"></slot>
                </a-col>
            </a-row>
        </a-row>
        <a-row>
            <div class="blank"></div>
            <div class="blank"></div>
            <div class="blank"></div>
        </a-row>
    </div>
</template>

<script>
export default {
    name: 'DetailsInformation',
};
</script>

<style scoped>
.details-info-top-left1,
.details-info-top-right1 {
    font-weight: 600;
}
.details-info-bottom-left1,
.details-info-bottom-right1 {
    font-weight: 600;
}
.details-info-ex-left1,
.details-info-ex-right1 {
    font-weight: 600;
}
.blank {
    height: 50px;
}
</style>
