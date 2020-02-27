import Vue from 'vue';
import Highlighter from 'web-highlighter';
import App from './App.vue';
import './index.less';
import '../assets/iconfont/index.less';
import { storage } from '@/utils';

function initTipWarp() {
    const $div = document.createElement('div');
    const $template = document.createElement('div');
    $div.id = '_marker_tip_warp';
    $template.id = '_marker_app';
    $div.appendChild($template);
    document.body.appendChild($div);
}

async function appInit() {
    const store = await storage;
    const shadowRoot = document.querySelector('#_marker_tip_warp').attachShadow({mode: 'open'});
    Vue.use({
        install(Vue) {
            Vue.prototype.$shadowRoot = shadowRoot;
            Vue.prototype.$chrome = chrome; // eslint-disable-line
            Vue.prototype.$highlighter = new Highlighter({
                $root: window.document.body || window.document.documentElement,
            });
            Vue.prototype.$storage = store;
        }
    })
    new Vue({
        render: h => h(App),
    }).$mount('#_marker_app')
}

setTimeout(() => {
    initTipWarp();
    appInit();
}, 1500);

