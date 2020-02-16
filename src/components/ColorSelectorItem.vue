<template>
    <div class="color-selector" @mouseover="handleSelect()" @mouseout="handleCancelSelect()">
        <transition name="slide-fade">
            <div v-show="showColorSelect" class="color-select">
                <button v-for="item in colors" :key="item.name" class="color-item" :style="{backgroundColor: item.color}" @click.stop="hanleChangeColor(item)"></button>
            </div>
        </transition>
        <div class="current-color" :style="{backgroundColor: currentColor.color}"></div>
    </div>
</template>

<script>
export default {
    name: 'color-selector',
    model: {
        prop: 'currentColor',
        event: 'colorChange',
    },
    props: {
        colors: {
            type: Array,
        },
        currentColor: {
            type: Object,
        },
    },
    data() {
        return {
            showColorSelect: false,
        }
    },
    methods: {
        handleSelect() {
            this.showColorSelect = true;
        },
        handleCancelSelect() {
            this.showColorSelect = false;
        },
        hanleChangeColor(color) {
            this.$emit('colorChange', color);
            this.handleCancelSelect();
        }
    }
}
</script>

<style lang="less" scoped>
    .color-selector {
        position: relative;
        .current-color {
            width: 16px;
            height: 16px;
            border-radius: 50%;
        }
        .color-select {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: -105px;
            left: -5px;
            width: 30px;
            height: 110px;
            .color-item {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px;
                transition: all 0.5s ease-out;
                cursor: pointer;

                &:hover {
                    box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 5px;
                }

                &:not(:last-child) {
                    margin-bottom: 15px;
                }
            }
        }
    }
</style>