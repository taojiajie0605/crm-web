<template>
    <div>
        <a-modal
            @ok="showOrCloseModal"
            @cancel="showOrCloseModal"
            v-model="visible"
            destroyOnClose
        >
            <b slot="title">添加商机组</b>
            <a-form :form="form" @submit="handleSubmit">
                <a-form-item label="商机组名称">
                    <a-input
                        style="width: 100%;"
                        v-decorator="[
                            'chanceName',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写商机组名称',
                                    },
                                ],
                            },
                        ]"
                    />
                </a-form-item>
                <a-form-item label="应用部门">
                    <a-select
                        style="width: 100%;"
                        mode="multiple"
                        v-decorator="[
                            'gender',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please select your gender!',
                                    },
                                ],
                            },
                        ]"
                        placeholder="请选择"
                        @change="handleSelectChange"
                    >
                        <a-select-option value="china" label="China">
                            <span role="img" aria-label="China"> 🇨🇳 </span>
                            China (中国)
                        </a-select-option>
                        <a-select-option value="usa" label="USA">
                            <span role="img" aria-label="USA"> 🇺🇸 </span>
                            USA (美国)
                        </a-select-option>
                        <a-select-option value="japan" label="Japan">
                            <span role="img" aria-label="Japan"> 🇯🇵 </span>
                            Japan (日本)
                        </a-select-option>
                        <a-select-option value="korea" label="Korea">
                            <span role="img" aria-label="Korea"> 🇰🇷 </span>
                            Korea (韩国)
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="阶段设置">
                    <div
                        style="
                            overflow-x: auto;
                            border: 1px solid #e6e6e6;
                            height: 300px;
                        "
                    >
                        <div
                            style="
                                height: 60px;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                                background-color: #f5f5f5;
                            "
                        >
                            <div style="text-align: center; width: 33%;">
                                阶段
                            </div>
                            <div style="text-align: center; width: 33%;">
                                阶段名称
                            </div>
                            <div style="text-align: center; width: 33%;">
                                赢单率
                            </div>
                        </div>
                        <div
                            style="
                                height: 40px;
                                display: flex;
                                width: 100%;
                                justify-content: space-around;
                                background-color: #f7f8fa;
                                align-items: center;
                            "
                            v-for="(item, index) in levelSetting"
                            :key="item"
                        >
                            <div
                                :style="{
                                    width: 100 + '%',
                                    backgroundColor: item.color,
                                }"
                            >
                                <div
                                    style="
                                        width: 100%;
                                        display: flex;
                                        justify-content: space-around;
                                    "
                                >
                                    <div
                                        style="text-align: center; width: 33%;"
                                    >
                                        阶段{{ index }}
                                    </div>
                                    <div
                                        style="text-align: center; width: 33%;"
                                    >
                                        <a-input
                                            v-model="item.levelName"
                                            style="width: 60%;"
                                        />
                                    </div>
                                    <div
                                        style="text-align: center; width: 33%;"
                                    >
                                        <a-space>
                                            <a-input-number
                                                v-model="item.levelRate"
                                                style="width: 80px;"
                                            />
                                            %
                                            <a-icon
                                                type="plus-circle"
                                                @click="addLevelSetting"
                                            />

                                            <template v-if="index !== 0">
                                                <a-icon
                                                    type="minus-circle"
                                                    @click="
                                                        removeLevelSetting(
                                                            index,
                                                        )
                                                    "
                                                />
                                            </template>
                                        </a-space>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style="
                                height: 40px;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                            "
                        >
                            <div style="text-align: center; width: 33%;">
                                结束
                            </div>
                            <div style="text-align: center; width: 33%;">
                                输单
                            </div>
                            <div style="text-align: center; width: 33%;">
                                0 %
                            </div>
                        </div>
                        <div
                            style="
                                height: 40px;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                                background-color: #f7f8fa;
                            "
                        >
                            <div style="text-align: center; width: 33%;">
                                结束
                            </div>
                            <div style="text-align: center; width: 33%;">
                                无效
                            </div>
                            <div style="text-align: center; width: 33%;">
                                0 %
                            </div>
                        </div>
                        <div
                            style="
                                height: 40px;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                            "
                        >
                            <div style="text-align: center; width: 33%;">
                                结束
                            </div>
                            <div style="text-align: center; width: 33%;">
                                赢单
                            </div>
                            <div style="text-align: center; width: 33%;">
                                100 %
                            </div>
                        </div>
                    </div>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-table bordered :columns="columns" :data-source="data">
            <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
            <span slot="action">
                <a>编辑</a>
                <a-divider type="vertical" />
                <a>删除</a>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link">停用</a>
            </span>
        </a-table>
    </div>
</template>
<script>
const columns = [
    {
        title: '商机组名称',
        dataIndex: 'name',
        key: 'name',
        // slots: { title: 'name' },
        // scopedSlots: { customRender: 'name' },
    },
    {
        title: '应用部门',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '创建时间',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '创建人',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' },
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default {
    data() {
        return {
            data,
            columns,
            visible: false,
            levelSetting: [
                {
                    levelName: 'sfkdf',
                    levalRate: 9,
                    color: '#f7f8fa',
                },
            ],
        };
    },
    methods: {
        showOrCloseModal() {
            this.visible = !this.visible;
        },
        addLevelSetting() {
            let color = '#ffffff';
            if (this.levelSetting.length % 2 === 0) color = '#f7f8fa';
            this.levelSetting.push({
                levelName: '',
                levelRate: 0,
                color: color,
            });
        },
        removeLevelSetting(index) {
            this.levelSetting.splice(index, 1);
        },
    },
};
</script>
