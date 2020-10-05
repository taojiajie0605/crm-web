<template>
    <div class="ac-date">
        <a-row>
            <div class="ac-date-tag">
                <slot name="acDateTag"></slot>
            </div>
        </a-row>
        <div class="blank"></div>
        <div>
            <slot name="acDateContent"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AcDate',
};
</script>

<style scoped>
.ac-date-tag {
    width: 110px;
    background-color: #f1f5fd;
    border-radius: 10px;
    height: 20px;
    font-weight: 600;
    padding-left: 20px;
}
.blank {
    height: 20px;
}
</style>
