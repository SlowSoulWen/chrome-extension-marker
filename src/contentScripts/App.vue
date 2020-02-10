<template>
  <div id="_marker_app">
        <transition name="slide-fade">
            <div class="tip_warp" v-show="showTip" ref="tip">
                <Tip id="_marker_tip" />
            </div>
        </transition>
  </div>
</template>

<script>
import Tip from '@/components/Tip.vue';
import Highlighter from 'web-highlighter';

export default {
  name: 'marker_app',
  data() {
      return {
          showTip: false,
          highlighter: null,
          mousePosition: null,
      }
  },
  mounted() {
    window.document.addEventListener('click', this.handleDocClick);
    window.document.addEventListener('mousemove', this.handleMouseMove);
    this.highlighter = new Highlighter();
  },
  methods: {
        handleDocClick() {
            const selection = window.getSelection();
            if (!selection.isCollapsed) {
                // 用户拖蓝
                this.$refs.tip.style.top = `${this.mousePosition.top - 50}px`;
                this.$refs.tip.style.left = `${this.mousePosition.left + 5}px`;
                this.showTip = true;
            } else {
                this.showTip = false;
            }
        },
        handleMouseMove() {
            this.mousePosition = this.getMousePosition();
        },
        getMousePosition(event) {
            const e = event || window.event;
            const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            const x = e.pageX || e.clientX + scrollX;
            const y = e.pageY || e.clientY + scrollY;
            return { 'left': x, 'top': y };
        },
  },
  components: {
    Tip
  }
}
</script>

<style lang="less" scoped>
    #_marker_app {
        .tip_warp {
            z-index: 9999;
            position: absolute;
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