"use strict";
// conexão com o banco de dados
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
exports.default = prismaClient;
