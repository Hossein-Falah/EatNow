"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
new server_1.Application(Number(process.env.PORT));
