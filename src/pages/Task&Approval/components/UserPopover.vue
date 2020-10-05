<template>
    <a-popover :visible="visible">
        <template slot="content">
            <a-card size="small" title="员工" style="width: 300px;">
                <template slot="actions">
                    已选择{{ checkedKeys.length }}项
                    <a @click="onClear">清空</a>
                </template>
                <div>
                    <a-input-search
                        style="margin-bottom: 8px;"
                        placeholder="Search"
                        @change="onChange"
                    />
                    <a-tree
                        showIcon="false"
                        :expanded-keys="expandedKeys"
                        :auto-expand-parent="autoExpandParent"
                        :selected-keys="selectedKeys"
                        checkable
                        v-model="checkedKeys"
                        :tree-data="gData"
                        @expand="onExpand"
                        @check="onCheck"
                    >
                        <template slot="title" slot-scope="{ title }">
                            <span>
                                <a-button
                                    type="primary"
                                    shape="circle"
                                    icon="user"
                                    size="small"
                                />
                                {{ title }}
                            </span>
                        </template>
                    </a-tree>
                </div>
            </a-card>
        </template>
        <slot></slot>
    </a-popover>
</template>

<script>
const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item) => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};
const x = 3;
const y = 2;
const z = 1;
const gData = [
    {
        title: 'dksjf',
        key: '0-0',
        scopedSlots: { title: 'title' },
    },
    {
        title: 'sidjfkd',
        key: '0-1',
        scopedSlots: { title: 'title' },
    },
    {
        title: 'sdkfjwie',
        key: '0-2',
        scopedSlots: { title: 'title' },
    },
    {
        title: 'iowersdk',
        key: '0-3',
        scopedSlots: { title: 'title' },
    },
];

export default {
    props: {
        userName: String,
    },
    model: {
        prop: 'userName',
        event: 'change',
    },
    data() {
        return {
            expandedKeys: [],
            selectedKeys: [],
            searchValue: '',
            checkedKeys: [],
            autoExpandParent: true,
            checkCount: 0,
            gData,
            visible: false,
        };
    },
    methods: {
        showOrCloseModal() {
            this.visible = !this.visible;
        },
        onExpand(expandedKeys) {
            this.expandedKeys = expandedKeys;
            this.autoExpandParent = false;
        },
        onCheck(checkedKeys, info) {
            this.$emit('change', this.checkedKeys.join('-'));
            this.checkedKeys = checkedKeys;
        },
        onClear() {
            this.checkedKeys = [];
        },
        onChange(e) {
            const value = e.target.value;
            const expandedKeys = this.gData
                .map((item) => {
                    if (item.title.indexOf(value) > -1) {
                        return getParentKey(item.key, gData);
                    }
                    return null;
                })
                .filter((item, i, self) => item && self.indexOf(item) === i);
            Object.assign(this, {
                expandedKeys,
                searchValue: value,
                autoExpandParent: true,
            });
        },
    },
};
</script>
<style scoped></style>
