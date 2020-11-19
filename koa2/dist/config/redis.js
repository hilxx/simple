"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env = process.env.NODE_ENV;
var devConfig = {
    mysql: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'myblog',
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
    }
};
var prodConfig = {
    mysql: {
        host: '127.0.0.1',
        port: 6379,
    },
    redis: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '07626683.',
        database: 'myblog',
    }
};
exports.default = env === 'dev' ? devConfig : prodConfig;
