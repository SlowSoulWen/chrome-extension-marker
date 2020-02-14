<template>
    <div class="highlight-editor">
        <div class="editor-options-warp">
            
        </div>
        <textarea class="txt-content" name="editor" id="editor"></textarea>
    </div>
</template>

<script>

export default {
    name: 'highlight-editor',
    methods: {
    }
}
</script>

<style lang="less" scoped>
.highlight-editor {
    border-radius: 6px;
    position: relative;
    display: flex;
    filter: drop-shadow(1px 1px 6px rgba(0, 0, 0, .4));
    background-color: rgba(255, 204, 102, 0.95);
    width: 300px;
    height: 100px;
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