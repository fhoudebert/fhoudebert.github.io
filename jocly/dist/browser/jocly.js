"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.Jocly = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      /*
       * SystemJS 6.x dropped CommonJS module support entirely (the format used
       * throughout Jocly's *.core.js/*.game.js/*-view.js/*-model.js/*-config.js
       * files, e.g. `exports.foo = ...`), which only the legacy 0.x line provided
       * automatically. This module is a minimal drop-in replacement for the two
       * SystemJS APIs actually used here (`import` and `config`/`baseURL`).
       *
       * Earlier version of this file used plain <script> tag injection with a
       * shared global `exports` variable (mirroring how Workers reuse one
       * `exports` via importScripts()). That broke as soon as a module's
       * asynchronous callbacks (Promises resolved after the script finished
       * loading) tried to read `exports` again — by then the loader had already
       * restored the global to whatever it was before, since <script> execution
       * is not something we can observe finishing synchronously, and the next
       * load may have already reassigned it in the meantime.
       *
       * This version instead fetches each module's source as text and executes
       * it wrapped as `(function(exports){ <source> \nreturn exports;})({})`,
       * via *indirect* eval (calling `globalEval(...)` through a variable rather
       * than literally writing `eval(...)`, which per the language spec forces
       * the call to run against the global scope instead of the caller's local
       * scope). This gives each module its own real `exports` object captured
       * in a closure for its entire lifetime — including any Promise callbacks
       * that resolve long after the initial load, exactly like a real CommonJS
       * `require()` would — while still letting the module's code see every
       * other global (jQuery's `$`, `THREE`, etc.) exactly as a plain <script>
       * tag would, since indirect eval runs in the real global scope rather
       * than a `new Function(...)`'s isolated parameter list (which an earlier
       * version of this file used, and which silently broke any module
       * referencing a global that hadn't been explicitly threaded through).
       */
      (function (global) {
        "use strict";

        var baseURL = "";
        var cache = {};
        var globalEval = eval; // eslint-disable-line no-eval -- indirect eval, see comment above

        function setBaseURL(url) {
          baseURL = url;
        }
        function getBaseURL() {
          return baseURL;
        }
        function importScript(relativeUrl) {
          var url = baseURL + relativeUrl;
          if (cache[url]) return cache[url];
          var resultPromise = fetch(url).then(function (response) {
            if (!response.ok) {
              throw new Error("Failed to load script: " + url + " (" + response.status + ")");
            }
            return response.text();
          }).then(function (source) {
            var wrapped = "(function(exports){\n" + source + "\n;return exports;\n})({})\n//# sourceURL=" + url;
            return globalEval(wrapped);
          });
          cache[url] = resultPromise;
          return resultPromise;
        }

        // Some third-party scripts (three.js being the case that surfaced this)
        // are UMD bundles whose own top-level wrapper checks
        // `typeof exports === "object" && typeof module !== "undefined"` to
        // decide whether to act as a CommonJS module — and if so, call their
        // factory with a *literal* `global` argument from their own bundler
        // output (e.g. `factory(void 0, ...)`), not a real reference to the
        // global object. Loading them through importScript() above satisfies
        // the `typeof exports === "object"` half of that check (since we hand
        // it an empty object) without satisfying what the script actually
        // needs to attach itself to `window`, crashing instead. These scripts
        // were never meant to be loaded as CommonJS to begin with — they're
        // plain globals, exactly like a classic <script> tag — so load them
        // that way instead, via real <script> injection.
        function loadGlobalScript(relativeUrl) {
          var url = baseURL + relativeUrl;
          if (cache[url]) return cache[url];
          var resultPromise = new Promise(function (resolve, reject) {
            var script = document.createElement("script");
            script.src = url;
            script.onload = function () {
              resolve();
            };
            script.onerror = function () {
              reject(new Error("Failed to load script: " + url));
            };
            document.head.appendChild(script);
          });
          cache[url] = resultPromise;
          return resultPromise;
        }
        global.BrowserScriptLoader = {
          setBaseURL: setBaseURL,
          getBaseURL: getBaseURL,
          "import": importScript,
          loadGlobalScript: loadGlobalScript
        };
      })(typeof window !== "undefined" ? window : this);
    }, {}],
    2: [function (require, module, exports) {
      /*    Copyright 2017 Jocly
       *
       *    This program is free software: you can redistribute it and/or  modify
       *    it under the terms of the GNU Affero General Public License, version 3,
       *    as published by the Free Software Foundation.
       *
       *    This program is distributed in the hope that it will be useful,
       *    but WITHOUT ANY WARRANTY; without even the implied warranty of
       *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
       *    GNU Affero General Public License for more details.
       *
       *    You should have received a copy of the GNU Affero General Public License
       *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
       *
       *    As a special exception, the copyright holders give permission to link the
       *    code of portions of this program with the OpenSSL library under certain
       *    conditions as described in each individual source file and distribute
       *    linked combinations including the program with the OpenSSL library. You
       *    must comply with the GNU Affero General Public License in all respects
       *    for all of the code used other than as permitted herein. If you modify
       *    file(s) with this exception, you may extend this exception to your
       *    version of the file(s), but you are not obligated to do so. If you do not
       *    wish to do so, delete this exception statement from your version. If you
       *    delete this exception statement from all source files in the program,
       *    then also delete it in the license file.
       */

      // SystemJS 6.x dropped CommonJS module support entirely (the format used by
      // jocly.core.js and friends), so it can no longer load these files at all;
      // see browser-script-loader.js for the replacement loader and the
      // reasoning behind it.
      require("./browser-script-loader.js");
      function GetScriptPath() {
        var scripts = document.getElementsByTagName('script');
        var path = scripts[scripts.length - 1].src.split('?')[0];
        var mydir = path.split('/').slice(0, -1).join('/') + '/';
        return new URL(mydir).pathname;
      }
      var joclyScriptPath = GetScriptPath();
      window.BrowserScriptLoader.setBaseURL(joclyScriptPath);
      function ExportFunction(fName) {
        exports[fName] = function () {
          var args = arguments;
          var promise = new Promise(function (resolve, reject) {
            window.BrowserScriptLoader["import"]("jocly.core.js").then(function (m) {
              m[fName].apply(m, args).then(function () {
                resolve.apply(null, arguments);
              }, function (e) {
                reject(e);
              });
            }, function (e) {
              reject(e);
            });
          });
          return promise;
        };
      }
      ["listGames", "createMatch", "getGameConfig"].forEach(function (fName) {
        ExportFunction(fName);
      });
      exports.PLAYER_A = 1;
      exports.PLAYER_B = -1;
      exports.DRAW = 2;
    }, {
      "./browser-script-loader.js": 1
    }]
  }, {}, [2])(2);
});