<template>
    <a-modal
        :visible="visible"
        centered
        destroyOnClose
        width="900px"
        :maskStyle="{ 'background-color': '#fff' }"
        :bodyStyle="{
            height: '800px',
            'overflow-x': 'auto',
            'padding-bottom': '10px;',
        }"
        @cancel="showOrCloseModal"
        @ok="handleOk"
    >
        <template v-if="current === 0">
            <template slot="title"><b>新建普通审批</b></template>
            <general-approval ref="general" />
        </template>
        <template v-else-if="current === 1">
            <template slot="title"><b>新建请假审批</b></template>
            <leave-request-form ref="leave" />
        </template>
        <template v-else-if="current === 2">
            <template slot="title"><b>新建出差审批</b></template>
            <evection-form ref="evection" />
        </template>
        <template v-else-if="current === 3">
            <template slot="title"><b>新建加班审批</b></template>
            <overtime-form ref="overtime" />
        </template>
        <template v-else-if="current === 4">
            <template slot="title"><b>新建差旅报销</b></template>
            <travel-form ref="travel" />
        </template>
        <template v-else-if="current === 5">
            <template slot="title"><b>新建借款申请</b></template>
            <borrow-form ref="borrow" />
        </template>
        <div class="clearfix">
            <a-button
                icon="plus"
                style="margin-top: 10px; margin-bottom: 10;"
                type="link"
                size="small"
                >添加图片</a-button
            >
            <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                list-type="picture-card"
                :file-list="imageList"
                @preview="handlePreview"
                @change="handleImageChange"
            >
                <div v-if="imageList.length < 8">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">Upload</div>
                </div>
            </a-upload>
            <a-modal
                :visible="previewVisible"
                :footer="null"
                @cancel="handleCancel"
            >
                <img alt="example" style="width: 100%;" :src="previewImage" />
            </a-modal>
        </div>
        <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
            <a-button type="link">
                <a-icon type="upload" />
                添加附件
            </a-button>
        </a-upload>
        <br />
        <info-popover ref="info" />
        <br />
        <br />
        <b>审核信息</b><br />
        <small>审核人</small>
        <br />
        <a-select
            v-model="auditor"
            maxTagCount="1"
            mode="multiple"
            style="width: 100%;"
            placeholder="select one country"
            option-label-prop="label"
        >
            <a-select-option value="china" v-model="auditor" label="China">
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
        <br />
    </a-modal>
</template>

<script>
import Userpopover from '../../components/UserPopover';
import GeneralApproval from './GeneralApproval';
import LeaveRequestForm from './LeaveRequsetForm';
import EvectionForm from './EvectionForm';
import OvertimeForm from './OvertimeForm';
import BorrowForm from './BorrowForm';
import TravelForm from './TravelForm';

import InfoPopover from './InfoPopover';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const approvalType = '普通审批 请假审批 出差审批 加班审批 差旅报销 借款申请'.split(
    ' ',
);
const formType = 'general leave evection overtime travel borrow'.split(' ');

const icons = 'folder skin switcher tablet wallet shop'.split(' ');
export default {
    //props: ['current'],
    props: {
        current: {
            type: Number,
            default: 1,
        },
    },
    components: {
        Userpopover,
        TravelForm,
        LeaveRequestForm,
        GeneralApproval,
        EvectionForm,
        BorrowForm,
        OvertimeForm,
        InfoPopover,
    },
    mounted() {
        //console.log(this.$parent);
    },
    data() {
        return {
            visible: false,
            userName: '',
            auditor: '',
            previewVisible: false,
            previewImage: '',
            fileList: [],
            imageList: [
                {
                    uid: '-4',
                    name: 'image.png',
                    status: 'done',
                    url:
                        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-5',
                    name: 'image.png',
                    status: 'error',
                },
            ],
        };
    },
    methods: {
        showOrCloseModal() {
            this.visible = !this.visible;
        },
        handleOk() {
            this.showOrCloseModal();
            const item = eval(
                'this.$refs.' + formType[this.current] + '.getContent()',
            );
            // console.log(this.$refs);
            console.log(this.item);

            const currentTime = (function () {
                const time = new Date();
                return (
                    time.getFullYear() +
                    '-' +
                    time.getMonth() +
                    '-' +
                    time.getDate()
                );
            })();
            const id = this.$store.getters['task/getTask'].length;
            const info = [...this.$refs.info.getCurrentInfo()];
            this.$store.commit('task/setTask', {
                name: 'wtre',
                auditor: this.auditor,
                matter: item,
                type: approvalType[this.current],
                check: '待审批',
                time: currentTime,
                icon: icons[this.current],
                id: id + 1,
                status: 'waiting',
                info: info,
            });
        },
        handleCancel() {
            console.log(this.$refs);

            this.previewVisible = false;
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        handleImageChange({ fileList }) {
            this.imageList = fileList;
        },
        handleFileChange({ fileList }) {
            this.fileList = fileList;
        },
    },
};
</script>
