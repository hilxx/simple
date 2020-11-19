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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xssWrap = exports.escapeWrap = void 0;
var mysql_1 = __importStar(require("mysql"));
var xss_1 = __importDefault(require("xss"));
var mysql_2 = __importDefault(require("../../config/mysql"));
var con = mysql_1.default.createConnection(mysql_2.default);
/* 连接 */
con.connect();
exports.default = (function (sql) {
    return new Promise(function (resolve, reject) {
        con.query(sql, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
});
exports.escapeWrap = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return rest.map(function (item) { return item && mysql_1.escape(item); });
};
exports.xssWrap = function () {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    return rest.map(function (item) { return item && xss_1.default(item); });
};
