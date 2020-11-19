"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModel = exports.SuccessModel = exports.Model = void 0;
var Model = /** @class */ (function () {
    function Model(_a) {
        var error = _a.error, data = _a.data, msg = _a.msg;
        this.data = data;
        this.error = error;
        this.msg = msg;
    }
    return Model;
}());
exports.Model = Model;
var SuccessModel = /** @class */ (function (_super) {
    __extends(SuccessModel, _super);
    function SuccessModel(data, msg) {
        if (msg === void 0) { msg = 'success'; }
        return _super.call(this, { data: data, msg: msg, error: 0 }) || this;
    }
    return SuccessModel;
}(Model));
exports.SuccessModel = SuccessModel;
var ErrorModel = /** @class */ (function (_super) {
    __extends(ErrorModel, _super);
    function ErrorModel(data, msg) {
        if (msg === void 0) { msg = 'error'; }
        return _super.call(this, { data: data, msg: msg, error: -1 }) || this;
    }
    return ErrorModel;
}(Model));
exports.ErrorModel = ErrorModel;
