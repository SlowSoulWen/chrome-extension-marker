<template>
    <div class="hight-light-item">
        <button class="hight-light-btn" @click="handleHightLight()">
            <i class="icon">&#xe7a8;</i>
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-hf_makebi_fill"></use>
            </svg> -->
        </button>
    </div>
</template>

<script>
export default {
    name: 'hight-light-item',
    props: {
        color: {
            type: Object,
        }
    },
    methods: {
        handleHightLight() {
            const { name } = this.color;
            const selection = window.getSelection();
            if (selection.isCollapsed) {
                return;
            }
            this.$highlighter.setOption({
                style: {
                    className: `highlight-style-${name}`
                }
            })
            this.$highlighter.fromRange(selection.getRangeAt(0));
            window.getSelection().removeAllRanges();
        }
    }
}
</script>

<style lang="less" scoped>
    .hight-light-item {
        .icon {
            color: #fff;
            font-size: 18px;
        }
    }
</style>
