<template>
    <div class="hight-light-item" @mouseover="handleSelect()" @mouseout="handleCancelSelect()">
        <transition name="slide-fade">
            <div v-show="showColorSelect" class="color-select">
                <button v-for="item in colors" :key="item.name" @click.stop="handleHightLight(item)" class="color-item" :style="{backgroundColor: item.color}"></button>
            </div>
        </transition>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-hf_makebi_fill"></use>
        </svg>
    </div>
</template>

<script>
import { createStyleSheet } from '@/utils';

export default {
    name: 'hight-light-item',
    props: {
        colors: {
            type: Array,
            default: () => [{
                color: '#00FFCC',
                activeColor: '#00FFCC',
                name: 'green',
            }, {
                color: '#FFFF99',
                activeColor: '#FFFF99',
                name: 'yellow',
            }, {
                color: '#FFCCCC',
                activeColor: '#FFCCCC',
                name: 'pink',
            }]
        }
    },
    data() {
        return {
            showColorSelect: false,
        }
    },
    mounted() {
        this.initStyleSheet();
    },
    methods: {
        initStyleSheet() {
            this.colors.forEach(color => {
                createStyleSheet(color);
            });
        },
        handleSelect() {
            this.showColorSelect = true;
        },
        handleCancelSelect() {
            this.showColorSelect = false;
        },
        handleHightLight({ name }) {
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
        position: relative;
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
        .icon {
            color: #fff;
            font-size: 18px;
        }
        .slide-fade-enter-active {
            transition: all .2s ease;
        }
        .slide-fade-leave-active {
            transition: all .15s ease-in;
        }
        .slide-fade-enter, .slide-fade-leave-to {
            transform: translateY(10px);
            opacity: 0;
        }
    }
</style>
