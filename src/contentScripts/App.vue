<template>
  <div id="_marker_app">
        <transition name="slide-fade">
            <div class="tip_warp" v-show="showTip" ref="tip">
                <Tip id="_marker_tip">
                    <div class="item-warp">
                        <HightLightItem class="tip-item" />
                        <DeleteItem v-show="showDelete" class="tip-item" :id="highLightId" />
                    </div>
                </Tip>
            </div>
        </transition>
  </div>
</template>

<script>
import Highlighter from 'web-highlighter';
import Tip from '@/components/Tip.vue';
import HightLightItem from '@/components/HightLightItem.vue';
import DeleteItem from '@/components/DeleteItem.vue';
import { getPosition } from '@/utils';

export default {
    name: 'marker_app',
    data() {
        return {
            showTip: false,
            showDelete: false,
            mousePosition: null,
            highLightId: null, // 当前选中的高亮备注id
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
                const { id } = data;
                console.log('Highlighter.event.CLICK');
                e.stopPropagation();
                this.highLightId = id;
                const $dom = this.$highlighter.getDoms(id)[0];
                if ($dom) {
                    const { top, left } = getPosition($dom);
                    this.setTipPosition({
                        top: top - 50,
                        left,
                    });
                    this.showDelete = true;
                }
            });
        },
        handleDocClick() {
            const selection = window.getSelection();
            if (!selection.isCollapsed) {
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
        }
    },
    watch: {
        showTip(isTipShow) {
            if (!isTipShow) {
                setTimeout(() => {
                    this.showDelete = false;
                }, 300)
            }
        }
    },
    components: {
        Tip,
        HightLightItem,
        DeleteItem,
    }
}
</script>

<style lang="less" scoped>
    #_marker_app {
        .tip_warp {
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