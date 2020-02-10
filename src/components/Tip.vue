<template>
    <div class="default-tip-style">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-hf_makebi_fill"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lajitong"></use>
        </svg>
    </div>
</template>

<script>
export default {
  name: 'tip',
}
</script>

<style lang="less" scoped>
    .default-tip-style {
        padding: 0 12px;
        display: flex;
        justify-content: center;
        align-items: center;
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

// .default-tip-style::after {
//     content: '';
//     position: absolute;
//     left: 16px;
//     bottom: -4px;
//     border-color: #444 transparent transparent;
//     border-width: 4px 4px 0;
//     border-style: solid;
//     height: 0;
//     width: 0;
// }
</style>