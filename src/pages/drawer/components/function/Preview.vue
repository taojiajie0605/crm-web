<template>
    <div class="preview">
        <div class="details-info-staf"></div>
        <div class="details-info-text">活动信息</div>
        <a-row>
            <a-col :span="6">
                <div class="preview-card">
                    <a-col :span="6">
                        <a-icon
                            type="eye"
                            theme="filled"
                            style="
                                color: white;
                                font-size: 40px;
                                padding-left: 20px;
                                padding-top: 20px;
                                padding-right: 20px;
                            "
                        />
                    </a-col>
                    <a-col :span="6" />
                    <a-col :span="12">
                        <h3 style="color: white; padding-top: 10px;">提交数</h3>
                        <h3 style="color: white;">{{ commits }}</h3>
                    </a-col>
                </div>
            </a-col>
            <a-col :span="6">
                <div class="preview-card2">
                    <a-col :span="6">
                        <a-icon
                            type="eye"
                            theme="filled"
                            style="
                                color: white;
                                font-size: 40px;
                                padding-left: 20px;
                                padding-top: 20px;
                                padding-right: 20px;
                            "
                        />
                    </a-col>
                    <a-col :span="6" />
                    <a-col :span="12">
                        <h3 style="color: white; padding-top: 10px;">浏览量</h3>
                        <h3 style="color: white;">{{ views }}</h3>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <div class="blank"></div>
        <div class="details-info-staf"></div>
        <div class="details-info-text">发布信息</div>
    </div>
</template>

<script>
export default {
    name: 'Preview',
    //提交数等数据由这里传入或者直接后台获取
    props: [],
    data() {
        return {
            views: 123,
            commits: 233333,
        };
    },
};
</script>

<style scoped>
.details-info-staf {
    height: 20px;
    width: 5px;
    border-radius: 3px;
    background-color: blue;
    display: inline-block;
}
.details-info-text {
    display: inline-block;
    padding-left: 20px;
    font-size: 16px;
    font-weight: 600;
    position: relative;
    top: -3px;
}
.blank {
    height: 40px;
}
.preview-card {
    width: 250px;
    height: 80px;
    border: 1px solid #dedede;
    border-radius: 10px;
    margin-top: 20px;
    background-color: #c84afd;
}
.preview-card2 {
    width: 250px;
    height: 80px;
    border: 1px solid #dedede;
    border-radius: 10px;
    margin-top: 20px;
    background-color: #19b5f6;
}
</style>
