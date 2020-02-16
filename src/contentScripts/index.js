import Vue from 'vue';
import Highlighter from 'web-highlighter';
import App from './App.vue';
import './index.less';
import '../assets/iconfont';
import { storage } from '@/utils';

function initTipWarp() {
    const $div = document.createElement('div');
    $div.id = '_marker_tip_warp';
    document.body.appendChild($div);
}

async function appInit() {
    const store = await storage;
    Vue.use({
        install(Vue) {
            Vue.prototype.$chrome = chrome; // eslint-disable-line
            Vue.prototype.$highlighter = new Highlighter({
                $root: window.document.body || window.document.documentElement,
            });
            Vue.prototype.$storage = store;
        }
    })
    new Vue({
        render: h => h(App),
    }).$mount('#_marker_tip_warp')
}

setTimeout(() => {
    initTipWarp();
    appInit();
}, 1500);

