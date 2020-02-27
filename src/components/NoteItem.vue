<template>
    <div class="note-item">
        <button @click.stop="handleNote()" class="note-btn">
            <i class="icon">&#xe63a;</i>
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bi"></use>
            </svg> -->
        </button>
    </div>
</template>

<script>
export default {
    name: 'note-item',
    props: {
        color: {
            type: Object,
        },
        id: {
            type: String,
        }
    },
    methods: {
        handleNote() {
            const selection = window.getSelection();
            if (!selection.isCollapsed) {
                this.createNewHighlight(selection);
                return;
            } else if (this.id) {
                this.$emit('edit', { id: this.id });
            }
        },
        createNewHighlight(selection) {
            const { name } = this.color;
            this.$highlighter.setOption({
                style: {
                    className: `highlight-style-${name}`
                }
            })
            const source = this.$highlighter.fromRange(selection.getRangeAt(0));
            window.getSelection().removeAllRanges();
            this.$emit('edit', source);
        },

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