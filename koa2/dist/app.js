"use strict";
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
var koa_1 = __importDefault(require("koa"));
var koa_views_1 = __importDefault(require("koa-views"));
var koa_json_1 = __importDefault(require("koa-json"));
var koa_onerror_1 = __importDefault(require("koa-onerror"));
var koa_body_1 = __importDefault(require("koa-body"));
var koa_logger_1 = __importDefault(require("koa-logger"));
var koa_generic_session_1 = __importDefault(require("koa-generic-session"));
var koa_redis_1 = __importDefault(require("koa-redis"));
var redis_1 = __importDefault(require("./config/redis"));
var koa_morgan_1 = __importDefault(require("koa-morgan"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var user_1 = __importDefault(require("./routes/user"));
var blog_1 = __importDefault(require("./routes/blog"));
var app = new koa_1.default();
var NODE_ENV = process.env.NODE_ENV;
// error handler
koa_onerror_1.default(app);
// middlewares
app
    .use(koa_body_1.default())
    .use(koa_json_1.default())
    .use(koa_logger_1.default())
    .use(require('koa-static')(__dirname + '../public'))
    .use(koa_views_1.default(__dirname + '/views', {
    extension: 'pug'
}));
//section
app.keys = ['wanglaoban'];
app.use(koa_generic_session_1.default({
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    },
    store: koa_redis_1.default({
        all: redis_1.default
    })
}));
//logger
app.use(function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var start, ms;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                start = Date.now();
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                ms = Date.now() - start;
                console.log(ctx.method + " " + ctx.url + " - " + ms + "ms");
                return [2 /*return*/];
        }
    });
}); });
if (NODE_ENV === 'dev') {
    app.use(koa_morgan_1.default('dev'));
}
else {
    var logFilename = path_1.default.resolve(__dirname, 'logs', 'access.log');
    var writeStream = fs_1.default.createWriteStream(logFilename, {
        flags: 'a'
    });
    app.use(koa_morgan_1.default('combined', {
        stream: writeStream
    }));
}
//routes
app
    .use(blog_1.default.routes()).use(blog_1.default.allowedMethods())
    .use(user_1.default.routes()).use(user_1.default.allowedMethods());
// error - handling
app.on('error', function (err, ctx) {
    console.error('server error', err, ctx);
});
exports.default = app;
