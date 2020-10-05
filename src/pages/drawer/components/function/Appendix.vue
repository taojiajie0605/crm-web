<template>
    <div class="appendix">
        <a-row>
            <a-col :span="20" />
            <a-col :span="4" align="right">
                <a-upload
                    name="file"
                    :multiple="true"
                    action="#"
                    :headers="headers"
                    @change="handleChange"
                >
                    <a-button>
                        <a-icon type="upload" />
                        点击上传
                    </a-button>
                </a-upload>
            </a-col>
        </a-row>
        <a-row>
            <div class="blank"></div>
        </a-row>
        <a-row>
            <a-table :columns="columns" :data-source="data" />
        </a-row>
    </div>
</template>

<script>
const columns = [
    {
        dataIndex: 'name',
        title: 'name',
        key: 'name',
    },
];
export default {
    name: 'Appendix',
};
</script>

<style scoped>
.blank {
    width: 100%;
    height: 20px;
}
</style>
