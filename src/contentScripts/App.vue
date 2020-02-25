<template>
    <div id="_marker_app">
        <transition name="slide-fade">
            <div class="tip_warp" v-show="showTip" ref="tip">
                <Tip id="_marker_tip">
                    <div class="item-warp">
                        <HightLightItem v-if="!isEditMode" :color="currentColor" class="tip-item" />
                        <NoteItem :color="currentColor" :id="this.highLightId" @edit="handleEdit" class="tip-item" />
                        <DeleteItem v-if="isEditMode" class="tip-item" :id="this.highLightId" @delete="handleDelete" />
                        <ColorSelectorItem v-if="!isEditMode" v-model="currentColor" :colors="colors" class="tip-item" />
                    </div>
                </Tip>
            </div>
        </transition>
        <transition name="slide-fade">
            <div class="editor_warp" v-show="showEditor" ref="editor">
                <Editor :defaultNote="defaultNote" :id="this.highLightId" @note="handleSubmitNote" @cancel="handleCancelNote()" @delete="handleDelete" v-if="showEditor" />
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
import { getPosition, createStyleSheet } from '@/utils';

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
            defaultNote: '',
        }
    },
    mounted() {
        window.document.addEventListener('click', this.handleDocClick);
        window.document.addEventListener('mousemove', this.handleMouseMove);
        this.initStyleSheet();
        this.initHighLightFromStroage();
        this.initHighLightEvent();
    },
    methods: {
        initStyleSheet() {
            this.colors.forEach(color => {
                createStyleSheet(color);
            });
        },
        initHighLightFromStroage() {
            const allHighLights = this.$storage.local.get();
            Object.keys(allHighLights).forEach(key => {
                const { sources, bgColor: { name } } = allHighLights[key];
                sources.forEach(source => {
                    const { startMeta, endMeta, text, id } = source;
                    this.$highlighter.setOption({
                        style: {
                            className: `highlight-style-${name}`
                        }
                    })
                    this.$highlighter.fromStore(startMeta, endMeta, text, id);
                })
            })
        },
        initHighLightEvent() {
            this.$highlighter.on(Highlighter.event.CLICK, (data, inst, e) => {
                e.stopPropagation();
                this.defaultNote = '';
                if (this.showEditor) {
                    this.showEditor = false;
                    return;
                }
                const { id } = data;
                this.highLightId = id;
                const { note } = this.$storage.local.get(id);
                if (note) {
                    // 已经有备注
                    this.defaultNote = note;
                    this.handleEdit(data);
                } else {
                    this.isEditMode = true;
                    const $dom = this.$highlighter.getDoms(id)[0];
                    if ($dom) {
                        const { top, left } = getPosition($dom);
                        this.setTipPosition({
                            top: top - 50,
                            left,
                        });
                    }
                }
            });
            this.$highlighter.on(Highlighter.event.CREATE, async ({ sources, type }) => {
                const source = sources[0]
                const { id } = source;
                await this.$storage.local.set({
                    [id]: {
                        sources,
                        type,
                        bgColor: this.currentColor
                    }
                });
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
                this.defaultNote = '';
                this.showEditor = false;
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
        handleEdit(source) {
            const { id } = source;
            const $dom = this.$highlighter.getDoms(id)[0];
            if ($dom) {
                const { top, left } = getPosition($dom);
                this.setEditorPosition({
                    top: top - 140,
                    left,
                });
                this.highLightId = id;
            }
        },
        async handleSubmitNote(text) {
            // 保存备注文本
            if (text || this.highLightId) {
                const data = this.$storage.local.get(this.highLightId);
                await this.$storage.local.set({
                    [this.highLightId]: {
                        ...data,
                        note: text,
                    }
                });
            }
            this.handleCancelNote();
        },
        handleCancelNote() {
            // 取消备注
            this.showEditor = false;
            this.highLightId = null;
            this.defaultNote = '';
        },
        async handleDelete(id) {
            // 删除高亮的存储数据
            await this.$storage.local.remove(id);
            this.handleCancelNote();
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