'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var parser = require('cookie');
var universalCookie = require('universal-cookie');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var parser__namespace = /*#__PURE__*/_interopNamespace(parser);
var universalCookie__default = /*#__PURE__*/_interopDefaultLegacy(universalCookie);
var React__namespace = /*#__PURE__*/_interopNamespace(React);

var SET_COOKIE_HEADER = 'Set-Cookie';
var Cookie = /** @class */ (function () {
    function Cookie(ctxOrCookie) {
        this.isServer = typeof window === 'undefined';
        if (this.isServer) {
            if (typeof ctxOrCookie === 'string') {
                this.cookie = new universalCookie__default['default'](ctxOrCookie);
            }
            else if (ctxOrCookie && typeof ctxOrCookie.req !== 'undefined') {
                this.ctx = ctxOrCookie;
                this.cookie = new universalCookie__default['default'](this.ctx.req.headers.cookie);
            }
            else {
                this.cookie = new universalCookie__default['default']();
            }
        }
        else {
            var cookieString = void 0;
            if (typeof ctxOrCookie === 'string') {
                cookieString = ctxOrCookie;
            }
            this.cookie = new universalCookie__default['default'](cookieString);
        }
    }
    Cookie.fromApiRoute = function (req, res) {
        return new Cookie({ req: req, res: res });
    };
    /**
     * Returns true if the cookie value exists.
     *
     * @param name The name of the cookie.
     * @returns True if it exists, false otherwise.
     */
    Cookie.prototype.has = function (name) {
        return typeof this.get(name) !== 'undefined';
    };
    /**
     * Get value of cookie.
     *
     * @param name The name of the cookie.
     * @param options `CookieGetOptions` used in `universal-cookie`.
     * @returns The cookie value or null if not found.
     */
    Cookie.prototype.get = function (name, options) {
        return this.cookie.get(name, options);
    };
    /**
     * Get all cookies.
     *
     * @param options `CookieGetOptions` used in `universal-cookie`.
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Cookie.prototype.getAll = function (options) {
        return this.cookie.getAll(options);
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    /**
     * Set a cookie.
     *
     * @param name The name of the cookie.
     * @param value The value of the cookie.
     * @param options `CookieSetOptions` used in `universal-cookie`.
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Cookie.prototype.set = function (name, value, options) {
        // if the expires is number, then convert to Date.
        if (options && typeof options.expires === 'number') {
            options.expires = new Date(new Date() * 1 + options.expires * 864e+5);
        }
        if (this.isServer && this.ctx) {
            var cookies = this.ctx.res.getHeader(SET_COOKIE_HEADER) || [];
            this.cookie.set(name, value, options);
            cookies.push(parser__namespace.serialize(name, value, options));
            this.ctx.res.setHeader(SET_COOKIE_HEADER, cookies);
        }
        else {
            this.cookie.set(name, value, options);
        }
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    /**
     * Remove a cookie by name.
     *
     * @param name The name of the cookie.
     * @param options `CookieSetOptions` used in `universal-cookie`.
     */
    Cookie.prototype.remove = function (name, options) {
        if (!this.has(name)) {
            return;
        }
        var opt = Object.assign({
            expires: new Date(),
            path: '/',
        }, options || {});
        if (this.isServer && this.ctx) {
            this.ctx.res.setHeader(SET_COOKIE_HEADER, parser__namespace.serialize(name, '', opt));
        }
        else {
            this.cookie.remove(name, opt);
        }
    };
    return Cookie;
}());

function useCookie(ctxOrCookie) {
    return new Cookie(ctxOrCookie);
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function withCookie(ComposedComponent) {
    var _this = this;
    var name = ComposedComponent.displayName || ComposedComponent.name;
    var WithCookieWrapper = /** @class */ (function (_super) {
        __extends(WithCookieWrapper, _super);
        function WithCookieWrapper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WithCookieWrapper.prototype.render = function () {
            var cookie = new Cookie();
            return (React__namespace.createElement(ComposedComponent, __assign({ cookie: cookie }, this.props)));
        };
        WithCookieWrapper.displayName = "withCookie(" + name + ")";
        return WithCookieWrapper;
    }(React__namespace.Component));
    if (ComposedComponent.getInitialProps) {
        WithCookieWrapper.getInitialProps = function (ctx) { return __awaiter(_this, void 0, void 0, function () {
            var initialProps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.cookie = new Cookie(ctx);
                        return [4 /*yield*/, ComposedComponent.getInitialProps(ctx)];
                    case 1:
                        initialProps = _a.sent();
                        if (ctx.cookie) {
                            delete ctx.cookie;
                        }
                        return [2 /*return*/, initialProps];
                }
            });
        }); };
    }
    return WithCookieWrapper;
}

exports.Cookie = Cookie;
exports.useCookie = useCookie;
exports.withCookie = withCookie;
