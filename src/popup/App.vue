<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your popup"/>
    <transition name="slide-fade">
      <Tip v-show="showTip">
        <div>
          <HightLightItem class="tip-item" />
        </div>
      </Tip>
    </transition>
    <button @click="handleBtnClick">显示Tip</button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import Tip from '@/components/Tip.vue';
import HightLightItem from '@/components/HightLightItem.vue';

export default {
  name: 'app',
  data() {
    return {
      showTip: false,
    }
  },
  mounted() {
    // 设置badge
    this.chrome.browserAction.setBadgeText({text: 'demo'});
    this.chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
  },
  methods: {
    handleBtnClick() {
      this.showTip = !this.showTip;
    }
  },
  components: {
    HelloWorld,
    Tip,
    HightLightItem
  }
}
</script>

<style lang="less" scoped>
#app {
  width: 400px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

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
