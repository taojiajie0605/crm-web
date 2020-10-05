<template>
    <div style="width: 900px;">
        <a-card>
            <template slot="title">
                <div style="display: flex; justify-content: space-between;">
                    <div style="display: flex; align-items: space-around;">
                        <div style="margin-right: 15px;">
                            <a-button size="large" type="primary" shape="circle"
                                >in</a-button
                            >
                        </div>
                        <div>
                            <large>早上好</large><br />

                            <small
                                >蓝天是宁静的，空气是清新的，阳光是明媚的
                            </small>
                        </div>
                    </div>
                    <div>
                        <a-statistic
                            title="本月完成日志"
                            value="2篇"
                            style="margin-right: 50px;"
                        />
                    </div>
                </div>
            </template>
            <div style="display:flex;align-items=space-between">
                <div style="width: 80px;">
                    <b>销售简报</b>
                </div>
                <div
                    style="
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        width: 100%;
                    "
                >
                    <a-button size="small" shape="round">
                        今日新增客户
                    </a-button>
                    <a-divider type="vertical" />
                    <a-button size="small" shape="round">
                        今日新增商机
                    </a-button>
                    <a-divider type="vertical" />
                    <a-button size="small" shape="round">
                        今日新增合同
                    </a-button>
                    <a-divider type="vertical" />
                    <a-button size="small" shape="round">
                        今日新增回款
                    </a-button>
                    <a-divider type="vertical" />
                    <a-button size="small" shape="round">
                        今日新增记录
                    </a-button>
                </div>
            </div>
        </a-card>
    </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@import '@/theme/default/style.less';
</style>
