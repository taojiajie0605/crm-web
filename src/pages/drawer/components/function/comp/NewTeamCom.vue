<template>
    <div class="new-team-com">
        <a-modal
            title="添加成员"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <a-row>
                选择团队成员
                <a-popover
                    title="团队成员"
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
            </a-row>
            <a-row class="blank" />
            <a-row>
                权限
                <a-radio-group @change="readWriteChange">
                    <a-radio value="1">只读</a-radio>
                    <a-radio value="2">读写</a-radio>
                </a-radio-group>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
import { request, METHOD } from '@/utils/request';
export default {
    name: 'NewTeamCom',
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
        checkbox() {},
        fetch(params = {}) {
            this.loading = true;
            request('/SearchTeamMate', METHOD.POST, {
                ...params,
            }).then((data) => {
                this.loading = false;
                this.data = data.data.answer;
            });
        },
        onSearch() {},
        readWriteChange() {},
    },
};
</script>

<style scoped>
.blank {
    margin-top: 20px;
}
</style>
