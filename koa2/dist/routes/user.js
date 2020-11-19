"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = exports.getUserFromSession = void 0;
var koa_router_1 = __importDefault(require("koa-router"));
var User = __importStar(require("../db/mysql/user"));
var ResModel_1 = require("../class/ResModel");
var router = new koa_router_1.default({
    prefix: '/api/user'
});
var Constant;
(function (Constant) {
    Constant[Constant["USER"] = 0] = "USER";
})(Constant || (Constant = {}));
/**
 * 从session得到用户信息
 */
exports.getUserFromSession = function (ctx) { return ctx.session && ctx.session[Constant[0]]; };
exports.checkLogin = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (exports.getUserFromSession(ctx))
            return [2 /*return*/, next()];
        return [2 /*return*/, ctx.body = new ResModel_1.ErrorModel(null, '未登录')];
    });
}); };
router.get('/check_login', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isLogin;
    return __generator(this, function (_a) {
        isLogin = exports.getUserFromSession(ctx);
        ctx.body =
            isLogin
                ? new ResModel_1.SuccessModel(ctx.session[Constant[0]])
                : new ResModel_1.ErrorModel(null, '未登录');
        return [2 /*return*/];
    });
}); });
router.post('/login', function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, username, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.request.body, password = _a.password, username = _a.username;
                return [4 /*yield*/, User.login({ password: password, username: username })];
            case 1:
                data = _b.sent();
                if (!data)
                    ctx.body = new ResModel_1.ErrorModel(null, '用户名或密码错误');
                else {
                    ctx.session[Constant[0]] = data;
                    ctx.body = new ResModel_1.SuccessModel(data);
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
