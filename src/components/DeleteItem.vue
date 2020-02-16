<template>
    <div class="delete-item" @click="handleDelete">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lajitong"></use>
        </svg>
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
