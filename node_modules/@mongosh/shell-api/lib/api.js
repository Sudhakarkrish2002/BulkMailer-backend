"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellApi = exports.ReplicaSet = exports.Shard = exports.Mongo = exports.Streams = void 0;
var streams_1 = require("./streams");
Object.defineProperty(exports, "Streams", { enumerable: true, get: function () { return streams_1.Streams; } });
const shard_1 = __importDefault(require("./shard"));
exports.Shard = shard_1.default;
const replica_set_1 = __importDefault(require("./replica-set"));
exports.ReplicaSet = replica_set_1.default;
const shell_api_1 = __importDefault(require("./shell-api"));
exports.ShellApi = shell_api_1.default;
const mongo_1 = __importDefault(require("./mongo"));
exports.Mongo = mongo_1.default;
//# sourceMappingURL=api.js.map