// 基于Chrome.storage的存储
const { host, pathname } = window.location;
const namespace = host + pathname;
const $chrome = chrome; // eslint-disable-line

function getLocalStorage() {
    // $chrome.storage.local.clear(); 
    return new Promise((resolve, reject) => {
        $chrome.storage.local.get(namespace, res => {
            if (Object.getPrototypeOf(res) === Error) {
                reject(res);
                throw res;
            }
            if (!res) {
                resolve({});
            }
            resolve(res);
        })
    })
}

class Storage {
    constructor(localData) {
        this._localData = localData;
        this.local = {
            get: this._localGet.bind(this),
            set: this._localSet.bind(this),
            remove: this._localRemove.bind(this),
        }
    }

    _localGet(key) {
        if (!key) {
            return {
                ...this._localData,
            }
        }
        return this._localData[key];
    }

    _localSet(obj) {
        this._localData = {
            ...this._localData,
            ...obj,
        };
        return new Promise((resolve, reject) => {
            $chrome.storage.local.set({
                [namespace]: this._localData
            }, res => {
                if (!res) {
                    resolve(res);
                } else if (Object.getPrototypeOf(res) === Error) {
                    reject(res);
                    throw res;
                }
            })
        })
    }

    _localRemove(id) {
        delete this._localData[id];
        return new Promise((resolve, reject) => {
            $chrome.storage.local.set({
                [namespace]: this._localData
            }, res => {
                if (!res) {
                    resolve(res);
                } else if (Object.getPrototypeOf(res) === Error) {
                    reject(res);
                    throw res;
                }
            })
        })
    }
}

export default (async () => {
    const localStorage = await getLocalStorage();
    const data = localStorage[namespace] ? localStorage[namespace] : localStorage;
    console.log('data', data);
    return new Storage(data);
})()
