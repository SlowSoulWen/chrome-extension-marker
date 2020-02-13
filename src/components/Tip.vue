<template>
    <div class="default-tip-style">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'tip',
}
</script>

<style lang="less" scoped>
    .default-tip-style {
        display: flex;
        padding: 0 12px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px;
        box-sizing: border-box;
        position: absolute;
        border-radius: 4px;
        height: 40px;
        background: rgba(0, 0, 0, 0.84);
        text-align: center;

        .icon {
            color: #fff;
            font-size: 18px;

            &:not(:first-child) {
                margin-left: 15px;
            }
        }
    }
</style>