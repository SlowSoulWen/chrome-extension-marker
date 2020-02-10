import Vue from 'vue';
import App from './App.vue';
import './index.less';
import '../assets/iconfont';

function initTipWarp() {
    const $div = document.createElement('div');
    $div.id = '_marker_tip_warp';
    document.body.appendChild($div);
}

initTipWarp();

Vue.use({
    install(Vue) {
        Vue.prototype.chrome = chrome; // eslint-disable-line
    }
})

new Vue({
    render: h => h(App),
}).$mount('#_marker_tip_warp')
