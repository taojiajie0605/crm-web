<template>
    <div class="follow-up">
        <a-modal
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            title="跟进"
        >
            <a-row align="left">
                <a-col :span="8">
                    <a-select
                        default-value="call"
                        style="font-size: 12px; width: 100px;"
                    >
                        <a-select-option value="call">打电话</a-select-option>
                        <a-select-option value="interview"
                            >见面拜访</a-select-option
                        >
                        <a-select-option value="email">发邮件</a-select-option>
                        <a-select-option value="msg">发短信</a-select-option>
                        <a-select-option value="ac">活动</a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="16">
                    <a-date-picker
                        placeholder="请选择下次联系时间"
                        @change="selectDate"
                    />
                </a-col>
            </a-row>
            <a-row>
                <a-select
                    @change="selectCommonText(change)"
                    default-value="常用语"
                    class="ac-showbox1-item3-select"
                >
                    <a-select-option value="text1">
                        客户意向较强，成交几率大
                    </a-select-option>
                    <a-select-option value="text2">
                        客户意向适中，后续继续跟进
                    </a-select-option>
                    <a-select-option value="text3">
                        电话无人接听
                    </a-select-option>
                    <a-select-option value="text4">
                        客户无意向
                    </a-select-option>
                </a-select>
            </a-row>
            <a-row>
                <a-input class="ac-showbox1-input" />
            </a-row>
            <a-row>
                <a-col :span="8" align="left">
                    <a-upload>
                        <a-button class="ac-showbox1-ico">
                            <a-icon type="picture" style="font-size: 12px;" />
                            图片
                        </a-button>
                    </a-upload>
                </a-col>
                <a-col :span="8" align="left">
                    <a-upload>
                        <a-button class="ac-showbox1-ico">
                            <a-icon
                                type="folder-open"
                                style="font-size: 12px;"
                            />
                            附件
                        </a-button>
                    </a-upload>
                </a-col>
                <a-col :span="8" align="right">
                    <a-button class="ac-showbox1-ico">
                        <a-icon type="api" style="font-size: 12px;" />
                        关联商机
                    </a-button>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: 'FollowUp',
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        handleOk() {
            this.visible = false;
        },
        handleCancel() {
            this.visible = false;
        },
        selectCommonText(e) {
            console.log(e);
        },
    },
};
</script>

<style scoped>
.ac-showbox1 {
    width: 100%;
    height: 150px;
    border: 1px solid #dedede;
    border-radius: 4px;
    padding: 10px;
}
.ac-showbox1-item3-select {
    width: 250px;
    margin-top: 20px;
}
.ac-showbox1-input {
    width: 100%;
    margin-top: 10px;
    height: 50px;
    border: 0px;
    border-radius: 0px;
    border-bottom: 1px solid #dedede;
}
.ac-showbox1-ico {
    height: 24px;
    margin-top: 10px;
}
</style>
