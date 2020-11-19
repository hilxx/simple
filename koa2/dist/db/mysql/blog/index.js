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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticle = exports.removeArticle = exports.createArticle = exports.getDetail = exports.getList = void 0;
var __1 = __importStar(require(".."));
__exportStar(require("./@types"), exports);
var SELECT = "select * from blogs where 1=1 ", INSERT = "insert into blogs ", DELETE = "delete from blogs where ", UPDATE = "update blogs set ";
exports.getList = function (_a) {
    var _b;
    var author = _a.author, keywords = _a.keywords;
    var query = SELECT;
    _b = __1.escapeWrap(author, keywords), author = _b[0], keywords = _b[1];
    if (author)
        query = query + ("and author=" + author + " ");
    if (keywords)
        query = query + ("and title like " + keywords + " ");
    query = query + 'order by createtime desc';
    return __1.default(query);
}, exports.getDetail = function (_a) {
    var id = _a.id;
    var query = SELECT + ("and id=" + id);
    return __1.default(query).then(function (data) { return data[0]; });
};
exports.createArticle = function (_a) {
    var _b;
    var title = _a.title, content = _a.content, author = _a.author;
    _b = __1.escapeWrap.apply(void 0, __1.xssWrap(title, content, author)), title = _b[0], content = _b[1], author = _b[2];
    return __1.default(INSERT + "(title, content, author, createtime) "
        + ("values(" + title + ", " + content + ", " + author + ", " + Date.now() + ")")).then(function (insertdata) { return insertdata.affectedRows > 0; });
};
exports.removeArticle = function (_a) {
    var id = _a.id;
    return __1.default(DELETE + " id=" + id).then(function (deleteData) { return deleteData.affectedRows > 0; });
};
exports.updateArticle = function (_a) {
    var _b;
    var id = _a.id, content = _a.content, title = _a.title;
    _b = __1.escapeWrap.apply(void 0, __1.xssWrap(content, title)), content = _b[0], title = _b[1];
    return __1.default(UPDATE
        + ("content=" + content + ", title=" + title + " where id=" + id)).then(function (updateData) { return updateData.affectedRows > 0; });
};
