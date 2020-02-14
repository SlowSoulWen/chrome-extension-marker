<template>
    <div class="note-item">
        <button @click="handleNote()" class="note-btn">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bi"></use>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: 'note-item',
    props: {
        color: {
            type: Object,
        }
    },
    methods: {
        handleNote() {
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
            const source = this.$highlighter.fromRange(selection.getRangeAt(0));
            window.getSelection().removeAllRanges();
            this.$emit('edit', source);
        }
    }
}
</script>

<style lang="less" scoped>
    .note-item {
        .icon {
            color: #fff;
            font-size: 18px;
        }
    }
</style>