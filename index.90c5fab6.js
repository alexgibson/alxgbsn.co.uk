// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"lnJyT":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "9f8c1bcd90c5fab6";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"hYrgI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _asciiTs = require("./ascii.ts");
var _asciiTsDefault = parcelHelpers.interopDefault(_asciiTs);
function chooseAscii(Ascii) {
    const index = Math.floor(Math.random() * Ascii.length);
    return Ascii[index];
}
function render(Ascii) {
    console.log(chooseAscii(Ascii));
}
render((0, _asciiTsDefault.default));

},{"./ascii.ts":"f6CeV","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f6CeV":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const triforce = `
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28FE}\u{28F7}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2844}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28E0}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F0}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28C6}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F4}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28E6}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28EC}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{28E5}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28FE}\u{28FF}\u{28F7}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28FE}\u{28FF}\u{28F7}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{28A0}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28F7}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28FE}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2844}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{28E0}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2844}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28C4}\u{2800}\u{2800}
    \u{2800}\u{28F0}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28C4}\u{2800}\u{2800}\u{28E0}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28C6}\u{2800}
    \u{28B4}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2846}\u{28B0}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2866}
`;
const majora = `
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{2844}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{2844}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{28F7}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28FF}\u{2847}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{28FF}\u{2847}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28FC}\u{28FF}\u{2847}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28FF}\u{28FF}\u{28FF}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{28FF}\u{28FF}\u{2847}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28A0}\u{28C4}\u{28FF}\u{28FF}\u{28FF}\u{28DF}\u{28E0}\u{2880}\u{2864}\u{2880}\u{2800}\u{2880}\u{2800}\u{28E4}\u{2870}\u{28C4}\u{28FB}\u{28FF}\u{28FF}\u{28FF}\u{28E0}\u{28C0}\u{2840}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F0}\u{281E}\u{28CB}\u{28AD}\u{28B9}\u{288E}\u{287D}\u{28AD}\u{287B}\u{28BF}\u{2847}\u{28CF}\u{28BD}\u{28CF}\u{2847}\u{28B8}\u{287F}\u{289B}\u{287D}\u{28BB}\u{287D}\u{284F}\u{2869}\u{28F9}\u{2837}\u{28C6}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{283E}\u{28A1}\u{283E}\u{283F}\u{282C}\u{2837}\u{283E}\u{283F}\u{283F}\u{28A5}\u{28C4}\u{2820}\u{28F8}\u{28FF}\u{28FF}\u{28E1}\u{2880}\u{28E0}\u{2824}\u{283F}\u{2836}\u{2837}\u{283C}\u{2825}\u{283F}\u{28A7}\u{2858}\u{2807}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2800}\u{285F}\u{28F2}\u{2836}\u{281F}\u{2813}\u{2836}\u{28E4}\u{2848}\u{28B3}\u{285C}\u{28FF}\u{285F}\u{28F1}\u{280B}\u{28C0}\u{2874}\u{2816}\u{281B}\u{2833}\u{28B6}\u{2852}\u{287F}\u{28B8}\u{2841}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28FF}\u{2880}\u{287F}\u{2801}\u{2800}\u{2880}\u{28C0}\u{2800}\u{2808}\u{28BB}\u{2844}\u{28BB}\u{28B8}\u{28A7}\u{2847}\u{28F0}\u{280F}\u{2800}\u{2800}\u{28C0}\u{2800}\u{2800}\u{2839}\u{28F7}\u{2808}\u{2847}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28E0}\u{28E4}\u{2840}\u{28FF}\u{2838}\u{2847}\u{2800}\u{2800}\u{288F}\u{28EA}\u{2806}\u{2800}\u{28B8}\u{2847}\u{28B8}\u{28B8}\u{28B8}\u{2800}\u{28FF}\u{2800}\u{2800}\u{28A8}\u{28DA}\u{2807}\u{2800}\u{2800}\u{28FF}\u{2800}\u{2847}\u{28F6}\u{28F6}\u{28E4}\u{28C4}\u{2840}
    \u{2800}\u{2800}\u{2880}\u{28E4}\u{28FE}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2839}\u{2844}\u{283B}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{28E0}\u{28BE}\u{2847}\u{2838}\u{28DC}\u{28F8}\u{2803}\u{28BB}\u{28A7}\u{2840}\u{2800}\u{2800}\u{2800}\u{2880}\u{28FC}\u{2803}\u{28F8}\u{28BB}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28F6}\u{28E4}\u{2840}
    \u{2800}\u{281A}\u{281B}\u{281B}\u{281B}\u{2809}\u{2809}\u{2809}\u{28E9}\u{28F7}\u{28DD}\u{28A6}\u{2848}\u{281B}\u{2832}\u{2836}\u{283F}\u{2837}\u{2836}\u{2867}\u{2800}\u{2803}\u{2812}\u{2800}\u{287F}\u{2836}\u{283F}\u{2837}\u{2836}\u{281E}\u{280B}\u{28E1}\u{289E}\u{28F5}\u{28FF}\u{28E4}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2801}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28E0}\u{28FE}\u{28FF}\u{28FF}\u{28FF}\u{28F7}\u{28EF}\u{28DB}\u{28D2}\u{2812}\u{2812}\u{2832}\u{28C4}\u{2800}\u{28A0}\u{28FE}\u{28F7}\u{28C6}\u{2800}\u{2874}\u{2812}\u{2812}\u{2812}\u{28DA}\u{28EB}\u{28F5}\u{287F}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28E6}\u{2840}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{28E0}\u{28FE}\u{283F}\u{281F}\u{281B}\u{2809}\u{2801}\u{28F8}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2887}\u{285F}\u{2880}\u{28FF}\u{28FF}\u{28DF}\u{28FF}\u{2840}\u{28A7}\u{28BB}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28E6}\u{2840}\u{2800}\u{2809}\u{2819}\u{281B}\u{283B}\u{2826}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28FE}\u{28FF}\u{28FF}\u{287F}\u{281B}\u{28FF}\u{28E5}\u{285F}\u{28E0}\u{28FE}\u{28FF}\u{28FF}\u{287F}\u{28FF}\u{28F7}\u{2848}\u{28B3}\u{28FD}\u{28FF}\u{2819}\u{283B}\u{28BF}\u{28FF}\u{28FF}\u{28C4}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F0}\u{28FF}\u{283F}\u{280B}\u{2801}\u{2800}\u{28B0}\u{28FF}\u{28FF}\u{28FF}\u{283F}\u{28FF}\u{28FF}\u{28FF}\u{28DF}\u{28FF}\u{28FF}\u{287F}\u{28FF}\u{28FF}\u{28FF}\u{28E7}\u{2800}\u{2800}\u{2808}\u{281B}\u{283F}\u{28E6}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{280B}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28FF}\u{28FF}\u{287F}\u{2803}\u{2800}\u{2808}\u{2819}\u{283F}\u{287F}\u{281B}\u{2801}\u{2800}\u{2808}\u{283B}\u{28FF}\u{28FF}\u{2844}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B0}\u{28FF}\u{281F}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2819}\u{28BF}\u{2847}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2838}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2819}
`;
const link = `
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F7}\u{28C4}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B0}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2819}\u{28CE}\u{2819}\u{2832}\u{28A4}\u{28C4}\u{28C0}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{285E}\u{2808}\u{2833}\u{28A6}\u{28C0}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28C0}\u{28C0}\u{28C0}\u{28C8}\u{28F7}\u{28C4}\u{2840}\u{2808}\u{2809}\u{2809}\u{281B}\u{2813}\u{2812}\u{2832}\u{2836}\u{28A4}\u{28C4}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2847}\u{2800}\u{2800}\u{2800}\u{2808}\u{281B}\u{2833}\u{2836}\u{2826}\u{2824}\u{2824}\u{2836}\u{2812}\u{281B}\u{281B}\u{2809}\u{2809}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{2819}\u{2833}\u{28E4}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2847}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2819}\u{28A6}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2818}\u{28C7}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2819}\u{28A6}\u{2840}\u{2800}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28C0}\u{2864}\u{2816}\u{280B}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{283B}\u{28F4}\u{28F7}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{28F6}\u{2824}\u{2824}\u{2824}\u{2816}\u{2812}\u{281A}\u{281B}\u{280B}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28BB}\u{2818}\u{2847}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2847}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2846}\u{2838}\u{2846}\u{2800}\u{2800}\u{2880}\u{2800}
    \u{28FF}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2807}\u{2800}\u{28B3}\u{2800}\u{2880}\u{28FE}\u{2800}
    \u{28B9}\u{2844}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{28E0}\u{281E}\u{28FE}\u{2800}
    \u{2808}\u{28F7}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{280B}\u{28F4}\u{2803}\u{2800}
    \u{28C0}\u{2818}\u{28E7}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28F4}\u{2847}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F8}\u{2876}\u{2803}\u{2800}\u{2800}
    \u{2809}\u{28BF}\u{287B}\u{28F7}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28C0}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28C0}\u{28E4}\u{281E}\u{2809}\u{2800}\u{28BB}\u{2844}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F0}\u{28FF}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2809}\u{283B}\u{28F7}\u{2844}\u{2800}\u{2800}\u{2800}\u{28F0}\u{2802}\u{2800}\u{2800}\u{2880}\u{28E0}\u{28F4}\u{2876}\u{2836}\u{2836}\u{2836}\u{28B6}\u{28F6}\u{28F6}\u{287F}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{283B}\u{28FF}\u{28F6}\u{28F6}\u{28F6}\u{28FE}\u{28FF}\u{28F7}\u{28F6}\u{28F6}\u{28F6}\u{28EE}\u{28FF}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{28E7}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2819}\u{28A6}\u{2840}\u{2880}\u{2847}\u{2800}\u{2820}\u{28A4}\u{28E4}\u{28C0}\u{28C0}\u{28C0}\u{28C0}\u{2800}\u{2800}\u{28C0}\u{28C0}\u{28C0}\u{28C0}\u{28C0}\u{28E4}\u{28E4}\u{28E4}\u{2836}\u{2812}\u{281B}\u{280B}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2819}\u{28B7}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2844}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2844}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{28C0}\u{2864}\u{283C}\u{281B}\u{28FB}\u{2803}\u{2800}\u{2800}\u{28B8}\u{2801}\u{2889}\u{28ED}\u{28ED}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FD}\u{28EF}\u{28C9}\u{28C0}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{2864}\u{28F4}\u{28F6}\u{28F6}\u{28FE}\u{28FE}\u{28F6}\u{28F6}\u{28F6}\u{2836}\u{2836}\u{2826}\u{2824}\u{28C0}\u{2840}\u{2819}\u{283B}\u{28E6}\u{28C4}\u{2846}\u{2800}\u{2800}\u{28FF}\u{28C0}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2803}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2818}\u{28BF}\u{2847}\u{2800}\u{2812}\u{28FF}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2840}\u{2800}\u{2818}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2801}\u{2800}\u{2800}\u{28B9}\u{2800}\u{2800}\u{2800}\u{2800}\u{28BF}\u{2800}\u{2838}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2847}\u{2800}\u{2800}\u{2800}\u{2800}\u{28E0}\u{2807}\u{2800}\u{2800}\u{2800}\u{28B9}\u{2847}\u{2800}\u{2800}\u{28BF}\u{2849}\u{2819}\u{2832}\u{2836}\u{283E}\u{28A4}\u{28C0}\u{2840}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{283B}\u{28E6}\u{2800}\u{28FF}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2847}\u{28C4}\u{2800}\u{2819}\u{283B}\u{283F}\u{283F}\u{280B}\u{2800}\u{2800}\u{28E0}\u{280F}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{28A7}\u{2840}\u{2808}\u{281B}\u{283F}\u{283F}\u{281F}\u{280B}\u{2800}\u{2800}\u{2800}\u{2800}\u{2874}\u{280B}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2847}\u{2800}\u{2800}\u{28B8}\u{281B}\u{2813}\u{2812}\u{2802}\u{2800}\u{2880}\u{287F}\u{2803}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{281B}\u{28BF}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2847}\u{2818}\u{28A7}\u{28C4}\u{2800}\u{2800}\u{2800}\u{28C0}\u{28E4}\u{28FE}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2819}\u{28E6}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28E0}\u{2874}\u{281E}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2847}\u{2800}\u{2800}\u{28B8}\u{2847}\u{2800}\u{2800}\u{28E0}\u{2874}\u{281B}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2840}\u{2800}\u{2800}\u{28B8}\u{2847}\u{2800}\u{2800}\u{2819}\u{281B}\u{281B}\u{281B}\u{2889}\u{287C}\u{2801}\u{28E0}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2839}\u{28CC}\u{281B}\u{2833}\u{2836}\u{283F}\u{281B}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2847}\u{2800}\u{2800}\u{28B8}\u{2877}\u{2816}\u{289B}\u{285F}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2838}\u{2847}\u{2800}\u{2800}\u{28B8}\u{28F7}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2809}\u{2800}\u{2800}\u{2818}\u{2833}\u{2826}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{2833}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2847}\u{2800}\u{2800}\u{2818}\u{2847}\u{2800}\u{28F8}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28E7}\u{2800}\u{2800}\u{28B8}\u{28FF}\u{28C6}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2888}\u{28FF}\u{2800}\u{2800}\u{2800}\u{2847}\u{2880}\u{2847}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2838}\u{2847}\u{2800}\u{28B8}\u{28FF}\u{283B}\u{28E7}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{2847}\u{2880}\u{28C0}\u{28C0}\u{28C0}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28E0}\u{2874}\u{281F}\u{28BB}\u{2800}\u{2800}\u{28B0}\u{2847}\u{28B8}\u{2847}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28BB}\u{28C4}\u{28B8}\u{2819}\u{2847}\u{285F}\u{28BF}\u{28E6}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{281B}\u{280B}\u{2809}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28C0}\u{28E0}\u{2834}\u{281B}\u{2809}\u{2800}\u{28E0}\u{28FF}\u{28C7}\u{2800}\u{28B8}\u{2801}\u{2838}\u{2847}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2839}\u{280F}\u{2880}\u{28F7}\u{2803}\u{2800}\u{284F}\u{2819}\u{2837}\u{28F6}\u{28E4}\u{28C0}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28C0}\u{28C0}\u{28E4}\u{28F4}\u{2876}\u{281B}\u{2809}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B0}\u{2803}\u{2800}\u{2839}\u{28C4}\u{28FE}\u{28C0}\u{2840}\u{28B3}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{285F}\u{2800}\u{2800}\u{28E7}\u{2800}\u{2800}\u{28C0}\u{28EC}\u{284D}\u{2819}\u{281B}\u{2813}\u{2812}\u{2812}\u{2832}\u{28F6}\u{28F6}\u{2812}\u{2812}\u{281A}\u{281B}\u{280B}\u{2809}\u{2809}\u{2800}\u{2818}\u{28FF}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{2847}\u{2800}\u{2800}\u{2800}\u{2839}\u{280F}\u{2808}\u{2809}\u{281B}\u{2813}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2818}\u{2801}\u{2840}\u{2800}\u{287C}\u{281E}\u{280B}\u{2801}\u{2800}\u{283B}\u{2844}\u{2800}\u{2800}\u{2880}\u{28E4}\u{281E}\u{2801}\u{28B9}\u{2846}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B9}\u{2857}\u{2826}\u{28E4}\u{2840}\u{2800}\u{28B8}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F7}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{2879}\u{28E6}\u{2816}\u{2809}\u{2800}\u{2800}\u{28E0}\u{28FE}\u{2847}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F8}\u{2809}\u{28E6}\u{2840}\u{2819}\u{2833}\u{28FC}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2898}\u{28F7}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28FE}\u{2807}\u{2801}\u{2800}\u{2800}\u{2800}\u{28F4}\u{2847}\u{28FF}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B0}\u{2847}\u{28B0}\u{280F}\u{283B}\u{28E6}\u{2840}\u{2809}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28FE}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{28F7}\u{2840}\u{2800}\u{2800}\u{2880}\u{287C}\u{280B}\u{28F7}\u{2838}\u{28C6}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B0}\u{280F}\u{28A0}\u{285F}\u{2800}\u{2800}\u{2808}\u{283B}\u{28E6}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28E0}\u{2824}\u{2836}\u{283B}\u{28BF}\u{281B}\u{281B}\u{281B}\u{280B}\u{2819}\u{281B}\u{28BB}\u{285F}\u{281B}\u{2812}\u{283E}\u{28E7}\u{28E4}\u{2858}\u{28F7}\u{2858}\u{28C6}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F4}\u{280B}\u{28E0}\u{285F}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{283B}\u{28C6}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{287F}\u{2836}\u{28B6}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28F7}\u{2876}\u{2836}\u{28FF}\u{2847}\u{2819}\u{28B7}\u{28CC}\u{2833}\u{28C4}\u{2864}\u{281E}\u{2881}\u{28FC}\u{280F}\u{2800}\u{2800}\u{28E4}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{28B7}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B8}\u{2847}\u{2800}\u{2800}\u{2800}\u{2808}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{2809}\u{2800}\u{2800}\u{2800}\u{2820}\u{28FF}\u{28DB}\u{2836}\u{28FE}\u{284F}\u{2813}\u{283E}\u{2836}\u{2836}\u{28BF}\u{2841}\u{28E0}\u{28B6}\u{28F6}\u{280B}\u{28F7}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{28BB}\u{2844}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2838}\u{2847}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{28C7}\u{28FC}\u{28F7}\u{28EF}\u{28FF}\u{28E6}\u{28E4}\u{2844}\u{2800}\u{2800}\u{283B}\u{28C7}\u{285C}\u{2801}\u{2880}\u{28FF}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28BB}\u{2844}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28B7}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F8}\u{28FF}\u{28E4}\u{28C0}\u{2800}\u{2800}\u{2808}\u{2819}\u{281B}\u{2800}\u{2800}\u{2800}\u{2808}\u{28A3}\u{28C4}\u{287E}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28BB}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2838}\u{28E7}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F0}\u{28DF}\u{28F5}\u{28FF}\u{2809}\u{2819}\u{2836}\u{28A4}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28BB}\u{2844}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28BE}\u{28C7}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
`;
const hyrule = `
    \u{28C0}\u{28C0}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28F4}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28C0}
    \u{2838}\u{28FF}\u{28FF}\u{28F6}\u{28E4}\u{28C4}\u{28C0}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28FE}\u{28FF}\u{28FF}\u{28C6}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28C0}\u{28E4}\u{28F6}\u{28FF}\u{28FF}\u{284F}
    \u{2800}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28F6}\u{28E6}\u{28C4}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{2864}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28FE}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28E6}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28E0}\u{28E4}\u{28F6}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2801}
    \u{2800}\u{28B8}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28F6}\u{28E6}\u{28C4}\u{28C0}\u{2800}\u{2880}\u{28F4}\u{285F}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{28DF}\u{281B}\u{281B}\u{281B}\u{281B}\u{281B}\u{281B}\u{28E3}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2839}\u{28F7}\u{2840}\u{2800}\u{2880}\u{28E0}\u{28F4}\u{28F6}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{284F}\u{2800}
    \u{2800}\u{2800}\u{2809}\u{281B}\u{281B}\u{281B}\u{283B}\u{283F}\u{283F}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2801}\u{2800}\u{2800}\u{2800}\u{28F0}\u{28FF}\u{28FF}\u{28E6}\u{2800}\u{2800}\u{2800}\u{2800}\u{28F0}\u{28FF}\u{28FF}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{283F}\u{283F}\u{283F}\u{281B}\u{281B}\u{281B}\u{2809}\u{2801}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{2809}\u{2809}\u{281B}\u{281B}\u{283B}\u{283F}\u{28FF}\u{28FF}\u{2840}\u{2800}\u{2800}\u{28F4}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28F7}\u{2840}\u{2800}\u{28FC}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28E6}\u{2800}\u{2800}\u{2800}\u{28FF}\u{28FF}\u{287F}\u{283F}\u{281B}\u{281B}\u{2809}\u{2809}\u{2809}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28C0}\u{28C0}\u{28C0}\u{28C0}\u{28E4}\u{28E4}\u{28E4}\u{28E4}\u{28F6}\u{28FF}\u{28FF}\u{2847}\u{2800}\u{283C}\u{283F}\u{283F}\u{283F}\u{283F}\u{283F}\u{283F}\u{2837}\u{283E}\u{283F}\u{283F}\u{283F}\u{283F}\u{283F}\u{283F}\u{2837}\u{2800}\u{28B0}\u{28FF}\u{28FF}\u{28F7}\u{28E6}\u{28E4}\u{28E4}\u{28E4}\u{28C0}\u{28C0}\u{28C0}\u{28C0}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{28BF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{28BF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{287F}\u{281F}\u{281B}\u{2809}\u{2881}\u{28F9}\u{28FF}\u{28FF}\u{28FF}\u{28F6}\u{28C4}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{28C6}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28E0}\u{28F4}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2840}\u{2809}\u{2819}\u{283B}\u{283F}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{2803}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2818}\u{28FF}\u{28FF}\u{283F}\u{281F}\u{281B}\u{2809}\u{2801}\u{2800}\u{2800}\u{28C0}\u{28F4}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28F7}\u{2840}\u{2800}\u{2880}\u{28FE}\u{28FF}\u{28C6}\u{2800}\u{2800}\u{28F4}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28E6}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2809}\u{281B}\u{283B}\u{283F}\u{28FF}\u{28FF}\u{2807}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2880}\u{28E0}\u{28FE}\u{28FF}\u{28FF}\u{28FF}\u{287F}\u{280B}\u{28F8}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{287F}\u{2803}\u{2880}\u{28FE}\u{28FF}\u{28FF}\u{28FF}\u{2844}\u{2800}\u{283F}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28EF}\u{2808}\u{28BF}\u{28FF}\u{28FF}\u{28FF}\u{28F7}\u{28E4}\u{2840}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2809}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28C0}\u{28F4}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{280B}\u{2800}\u{28A0}\u{28FF}\u{28FF}\u{28FF}\u{284F}\u{2800}\u{2800}\u{2880}\u{28FC}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28F7}\u{2840}\u{2800}\u{2800}\u{2818}\u{28FF}\u{28FF}\u{28FF}\u{2846}\u{2800}\u{2819}\u{28BF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28E6}\u{28C4}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2819}\u{283B}\u{28FF}\u{28FF}\u{28FF}\u{281F}\u{2801}\u{2800}\u{2800}\u{28FE}\u{28FF}\u{28FF}\u{28FF}\u{2800}\u{2800}\u{2800}\u{28BF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{28FF}\u{287F}\u{2802}\u{2800}\u{2800}\u{28BF}\u{28FF}\u{28FF}\u{28FF}\u{2840}\u{2800}\u{2800}\u{2819}\u{28FF}\u{28FF}\u{28FF}\u{283F}\u{280B}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2819}\u{2801}\u{2800}\u{2800}\u{2800}\u{28F8}\u{28FF}\u{28FF}\u{28FF}\u{2847}\u{2800}\u{28A0}\u{28E4}\u{2840}\u{2809}\u{28BB}\u{28FF}\u{28FF}\u{28FF}\u{280B}\u{2800}\u{28E0}\u{28C4}\u{2800}\u{2818}\u{28FF}\u{28FF}\u{28FF}\u{28E7}\u{2800}\u{2800}\u{2800}\u{2808}\u{280B}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2809}\u{2809}\u{2819}\u{281B}\u{2800}\u{28A0}\u{28FF}\u{28FF}\u{2803}\u{2800}\u{28B8}\u{28FF}\u{28FF}\u{28FF}\u{2800}\u{2808}\u{28BF}\u{28FF}\u{28C7}\u{2800}\u{281B}\u{280B}\u{2809}\u{2809}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{28A0}\u{28FF}\u{28FF}\u{2803}\u{2800}\u{2800}\u{28B8}\u{28FF}\u{28FF}\u{28FF}\u{2802}\u{2800}\u{2808}\u{28BB}\u{28FF}\u{28E6}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2830}\u{28FF}\u{28FF}\u{287F}\u{283F}\u{283F}\u{283F}\u{28FF}\u{28FF}\u{2846}\u{2800}\u{2800}\u{2808}\u{28BF}\u{28FF}\u{2803}\u{2800}\u{2800}\u{2830}\u{28FF}\u{28FF}\u{283F}\u{283F}\u{283F}\u{28BF}\u{28FF}\u{28FF}\u{2817}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
    \u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{283B}\u{28A7}\u{2840}\u{2800}\u{2800}\u{2818}\u{2809}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{2803}\u{2800}\u{2800}\u{2800}\u{2800}\u{2808}\u{281B}\u{2800}\u{2800}\u{2800}\u{28E0}\u{281F}\u{2801}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}\u{2800}
`;
const Ascii = [
    triforce,
    majora,
    link,
    hyrule
];
exports.default = Ascii;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["lnJyT","hYrgI"], "hYrgI", "parcelRequire94c2")

//# sourceMappingURL=index.90c5fab6.js.map
