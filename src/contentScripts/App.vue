<template>
  <div id="_marker_app">
        <transition name="slide-fade">
            <div class="tip_warp" v-show="showTip" ref="tip">
                <Tip id="_marker_tip">
                    <div class="item-warp">
                        <HightLightItem v-if="!isEditMode" :color="currentColor" class="tip-item" />
                        <NoteItem :color="currentColor" @edit="hanleEdit" class="tip-item" />
                        <DeleteItem v-if="isEditMode" class="tip-item" :id="highLightId" />
                        <ColorSelectorItem v-if="!isEditMode" v-model="currentColor" :colors="colors" class="tip-item" />
                    </div>
                </Tip>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="editor_warp" v-show="showEditor" ref="editor">
                <Editor v-if="showEditor" />
            </div>
        </transition>
  </div>
</template>

<script>
import Highlighter from 'web-highlighter';
import Tip from '@/components/Tip.vue';
import HightLightItem from '@/components/HightLightItem.vue';
import DeleteItem from '@/components/DeleteItem.vue';
import NoteItem from '@/components/NoteItem.vue';
import ColorSelectorItem from '@/components/ColorSelectorItem.vue';
import Editor from '@/components/Editor.vue';
import { getPosition } from '@/utils';

const COLORS = [{
    color: '#FFFF99',
    activeColor: '#FFFF99',
    name: 'yellow',
}, {
    color: '#00FFCC',
    activeColor: '#00FFCC',
    name: 'green',
}, {
    color: '#FFCCCC',
    activeColor: '#FFCCCC',
    name: 'pink',
}];

export default {
    name: 'marker_app',
    data() {
        return {
            showTip: false,
            showEditor: false,
            mousePosition: null,
            highLightId: null, // 当前选中的高亮备注id
            isEditMode: false, // 当前处于选中高亮区的编辑模式
            colors: COLORS,
            currentColor: COLORS[0], // 当前选择的高亮颜色
        }
    },
    mounted() {
        window.document.addEventListener('click', this.handleDocClick);
        window.document.addEventListener('mousemove', this.handleMouseMove);
        this.initHighLightEvent();
    },
    methods: {
        initHighLightEvent() {
            this.$highlighter.on(Highlighter.event.CLICK, (data, inst, e) => {
                e.stopPropagation();
                if (this.showEditor) return;
                const { id } = data;
                this.highLightId = id;
                this.isEditMode = true;
                const $dom = this.$highlighter.getDoms(id)[0];
                if ($dom) {
                    const { top, left } = getPosition($dom);
                    this.setTipPosition({
                        top: top - 50,
                        left,
                    });
                }
            });
        },
        handleDocClick() {
            const selection = window.getSelection();
            if (!selection.isCollapsed && !this.showEditor) {
                const { top, left } = this.mousePosition;
                this.setTipPosition({
                    top: top - 50,
                    left: left + 5,
                });
            } else {
                this.showTip = false;
            }
        },
        handleMouseMove(e) {
            this.mousePosition = this.getMousePosition(e);
        },
        getMousePosition(event) {
            const e = event || window.event;
            const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            const x = e.pageX || e.clientX + scrollX;
            const y = e.pageY || e.clientY + scrollY;
            return { 'left': x, 'top': y };
        },
        setTipPosition(position) {
            const { top, left } = position;
            this.$refs.tip.style.top = `${top}px`;
            this.$refs.tip.style.left = `${left}px`;
            this.showTip = true;
        },
        setEditorPosition(position) {
            const { top, left } = position;
            this.$refs.editor.style.top = `${top}px`;
            this.$refs.editor.style.left = `${left}px`;
            this.showEditor = true;
            this.showTip = false;
        },
        hanleEdit(source) {
            const { id } = source;
            const $dom = this.$highlighter.getDoms(id)[0];
            if ($dom) {
                const { top, left } = getPosition($dom);
                this.setEditorPosition({
                    top: top - 110,
                    left,
                });
            }
        }
    },
    watch: {
        showTip(isTipShow) {
            if (!isTipShow) {
                setTimeout(() => {
                    this.isEditMode = false;
                }, 300)
            }
        }
    },
    components: {
        Tip,
        HightLightItem,
        DeleteItem,
        NoteItem,
        ColorSelectorItem,
        Editor,
    }
}
</script>

<style lang="less" scoped>
    #_marker_app {
        .tip_warp,
        .editor_warp {
            z-index: 9999;
            position: absolute;
        }
        .item-warp {
            display: flex;
            justify-content: center;
            align-items: center;

            .tip-item {
                &:not(:first-child) {
                    margin-left: 15px;
                }
            }
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