<template>
    <div>
        <a-modal :visible="visible" @ok="handleOk" @cancel="showOrCloseModal">
            <b slot="title">提示 </b>
            类别名称
            <a-input v-model="productClass" />
        </a-modal>
        <a-button @click="showOrCloseModal" type="link">+添加一级分类</a-button>
        <a-tree
            style="font-size: 18px; width: 150px;"
            v-model="checkedKeys"
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :tree-data="treeData"
            @expand="onExpand"
            @select="onSelect"
        >
            <template slot="custom" slot-scope="item">
                <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link">
                        {{ item.title }}
                        <a-icon type="down" />
                    </a>
                    <a-menu @click="onNewType" slot="overlay">
                        <a-menu-item key="0">
                            <a>新建平级分类</a>
                        </a-menu-item>
                        <a-menu-item @click="onNewSubType" key="1">
                            新建子分类
                        </a-menu-item>
                        <a-menu-item key="2" @click="onEditType">
                            <a>编辑分类</a>
                        </a-menu-item>
                        <a-menu-item @click="onDeleteType" key="3"
                            >删除分类</a-menu-item
                        >
                    </a-menu>
                </a-dropdown>
            </template>
        </a-tree>
    </div>
</template>

<script>
const treeData = [
    {
        title: '默认',
        key: '0-0',
        scopedSlots: { title: 'custom' },
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                scopedSlots: { title: 'custom' },
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                        children: [],
                        scopedSlots: { title: 'custom' },
                    },
                    {
                        title: '0-0-0-1',
                        key: '0-0-0-1',
                        children: [],
                        scopedSlots: { title: 'custom' },
                    },
                    {
                        title: '0-0-0-2',
                        key: '0-0-0-2',
                        children: [],
                        scopedSlots: { title: 'custom' },
                    },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                scopedSlots: { title: 'custom' },
                children: [
                    {
                        title: '0-0-1-0',
                        key: '0-0-1-0',
                        children: [],
                        scopedSlots: { title: 'custom' },
                    },
                    {
                        title: '0-0-1-1',
                        key: '0-0-1-1',
                        children: [],
                        scopedSlots: { title: 'custom' },
                    },
                    {
                        title: '0-0-1-2',
                        key: '0-0-1-2',
                        children: [],
                        scopedSlots: { title: 'custom' },
                    },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
                children: [],
                scopedSlots: { title: 'custom' },
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        scopedSlots: { title: 'custom' },
        children: [
            {
                title: '0-1-0-0',
                key: '0-1-0-0',
                children: [],
                scopedSlots: { title: 'custom' },
            },
            {
                title: '0-1-0-1',
                key: '0-1-0-1',
                children: [],
                scopedSlots: { title: 'custom' },
            },
            {
                title: '0-1-0-2',
                key: '0-1-0-2',
                children: [],
                scopedSlots: { title: 'custom' },
            },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
        scopedSlots: { title: 'custom' },
        isEdit: true,
        children: [],
    },
];

function searchInData(selectedKeys, parentItem = false) {
    const keys = selectedKeys.split('-');
    let item = treeData;
    let parent = treeData;
    for (let i = 0; i < keys.length; i++) {
        item = item.filter((value, index) => {
            const temp = value.key.split('-');
            for (let j = 0; j < temp.length; j++)
                if (temp[j] !== keys[j]) return false;
            return true;
        });
        if (i === keys.length - 2) break;
        if (item[0].children.length !== 0) {
            parent = item;
            item = item[0].children;
        }
    }
    if (parentItem) return parent[0];
    return item[0];
}

export default {
    data() {
        return {
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            productClass: '',
            treeData,
            visible: false,
            classModal: false,
            checkedKeys: '',
            currentItem: {},
        };
    },
    methods: {
        onNewType() {
            const type = searchInData(this.selectedKeys[0], true);
            const number = type.children.length;
            type.children.push({
                key: type.key + number,
                title: this.productClass,
                scopedSlots: { title: 'custom' },
            });
        },
        showOrCloseModal() {
            this.visible = !this.visible;
        },
        handleOk() {
            this.treeData.push({
                title: `${this.productClass}`,
                key: treeData.length + 1,
                scopedSlots: { title: 'custom' },
            });
            this.showOrCloseModal();
        },
        onExpand(expandedKeys) {
            this.expandedKeys = expandedKeys;
            this.autoExpandParent = false;
        },
        onNewSubType(event) {
            this.showOrCloseModal();
        },
        onEditType() {
            const type = searchInData(this.selectedKeys[0]);
            this.productClass = type.title;
            this.showOrCloseModal();
        },
        onDeleteType() {
            const [selectedKeys] = this.selectedKeys;
            let index;
            // console.log(selectedKeys);
            // console.log(this.selectedKeys);
            if (selectedKeys) {
                let type = searchInData(this.selectedKeys[0], true);
                if (type.children) {
                    type = type.children;
                }
                index = type.findIndex((item) => {
                    // console.log(selectedKeys);
                    return item.key === selectedKeys;
                });
                type.splice(index, 1);
            }
        },
        onSelect(selectedKeys, info) {
            if (selectedKeys[0]) {
                this.selectedKeys = selectedKeys;
                // const temp = searchInData(selectedKeys[0]);
            }
        },
    },
};
</script>
