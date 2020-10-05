<template>
    <div>
        <a-row>
            <a-col>
                <b style="font-size: 14px;">{{ title }}</b>
                <a-switch
                    :checked="checked"
                    @change="onSwitchClick"
                />己启用自动生成规则
                <div id="number" :style="[styleDisplay]">
                    <number />
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import Number from './Number';

export default {
    props: ['title'],
    components: {
        Number,
    },
    data() {
        return {
            checked: true,
            styleDisplay: {
                display: 'block',
            },
        };
    },
    methods: {
        onSwitchClick() {
            this.checked = !this.checked;
            if (this.checked) this.styleDisplay.display = 'block';
            else this.styleDisplay.display = 'none';
        },
    },
};
</script>
<style scoped>
#number {
    background-color: #fafafa;
    width: 850px;
    padding: 10px;
    border-radius: 10px;
}
</style>
