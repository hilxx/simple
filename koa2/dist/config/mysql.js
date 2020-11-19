"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = process.env.NODE_ENV;
var devConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'myblog',
};
var prodConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '07626683.',
    database: 'myblog',
};
exports.default = env === 'dev' ? devConfig : prodConfig;
