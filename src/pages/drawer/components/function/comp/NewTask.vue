<template>
    <div class="new-task">
        <a-modal
            title="新建任务"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <a-row>
                <a-input class="new-task-input" />
            </a-row>
            <a-row style="margin-top: 20px;">
                <a-col :span="16" align="left">
                    <a-date-picker />
                </a-col>
                <a-col :span="8" align="right">
                    <a-popover
                        title="员工"
                        v-model="teammateVisible"
                        trigger="click"
                    >
                        <div slot="content">
                            <a-row>
                                <a-input-search
                                    placeholder="搜索员工"
                                    @search="onSearch"
                                />
                            </a-row>
                            <div v-for="item in data" :key="item">
                                <a-checkbox @change="checkBoxChange()">
                                    {{ item.name }}
                                </a-checkbox>
                                <br />
                            </div>
                        </div>
                        <a-button>选择员工</a-button>
                    </a-popover>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
export default {
    name: 'NewTask',
    props: ['records'],
    data() {
        return {
            visible: false,
            teammateVisible: false,
            data: [],
        };
    },
    mounted() {
        this.fetch({
            custid: this.records.id,
        });
    },
    methods: {
        handleOk() {
            this.visible = false;
        },
        handleCancel() {
            this.visible = false;
        },
        onSearch() {},
        fetch(params = {}) {
            this.loading = true;
            request('/SearchTeamMate', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.answer;
            });
        },
        checkBoxChange() {}, //选择员工后的操作
    },
};
</script>

<style scoped>
.new-task-input {
    border-radius: 0px;
    border: 0px;
    border-bottom: 1px solid #dedede;
    width: 100%;
}
</style>
