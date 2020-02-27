<template>
    <div class="delete-item" @click="handleDelete">
        <i class="icon">&#xe6b0;</i>
    </div>
</template>

<script>

export default {
    name: 'delete-item',
    props: {
        id: String
    },
    methods: {
        handleDelete() {
            if (!this.id) return;
            this.$highlighter.remove(this.id);
            this.$emit('delete', this.id);
        }
    }
}
</script>

<style lang="less" scoped>
    .delete-item {
        .icon {
            color: #fff;
            font-size: 18px;
        }
    }
</style>
