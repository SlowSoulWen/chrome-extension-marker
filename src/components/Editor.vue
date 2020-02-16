<template>
    <div @click.stop="handleEditorContentClick" class="highlight-editor">
        <div class="editor-options-warp">
            <svg @click.stop="handleSubmit" class="icon" aria-hidden="true">
                <use xlink:href="#icon-quxiaobixiu"></use>
            </svg>
            <svg @click.stop="handleCancel" class="icon" aria-hidden="true">
                <use xlink:href="#icon-quxiao"></use>
            </svg>
            <svg @click.stop="handleDelete" class="icon" aria-hidden="true">
                <use xlink:href="#icon-lajitong-copy"></use>
            </svg>
        </div>
        <textarea v-model="noteTxt" class="txt-content" name="editor" id="editor"></textarea>
    </div>
</template>

<script>

export default {
    name: 'highlight-editor',
    props: {
        defaultNote: {
            type: String,
            default: '',
        },
        id: {
            type: String,
        }
    },
    data() {
        return {
            noteTxt: this.defaultNote,
        }
    },
    methods: {
        handleSubmit() {
            this.$emit('note', this.noteTxt);
        },
        handleCancel() {
            this.$emit('cancel');
        },
        handleDelete() {
            if (!this.id) return;
            this.$highlighter.remove(this.id);
            this.$emit('delete', this.id);
        },
        handleEditorContentClick() {
            // nothing
        }
    }
}
</script>

<style lang="less" scoped>
.highlight-editor {
    border-radius: 6px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    filter: drop-shadow(1px 1px 6px rgba(0, 0, 0, .4));
    background-color: rgba(255, 204, 102, 0.95);
    width: 300px;
    height: 130px;
    padding: 10px;

    &:after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 17px;
        padding: 6px;
        background: inherit;
        border: inherit;
        border-right: 0;
        border-bottom: 0;
        transform: rotate(45deg);
    }

    .icon {
        font-size: 16px;
        margin-left: 6px;
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
            color: #FF9966;
        }
    }

    .editor-options-warp {
        display: flex;
        justify-content: flex-end;
    }

    .txt-content {
        background-color:  transparent;
        outline: none;
        border-style: none;
        overflow: scroll;
    }

    #editor {
        flex: 1;
    }
}
</style>