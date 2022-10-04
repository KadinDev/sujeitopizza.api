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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken"); // para criar tokens
class AuthUserService {
    loginUser({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            // verificar se o email existe
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error("Usuário incorreto!");
            }
            // verificar se a senha está correta
            // password = a info que estou mandando pelo body
            // user.password = minha senha cadastrada no banco de dados
            const checkPassword = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!checkPassword) {
                throw new Error("Senha está incorreta!");
            }
            // gerar um token JWT e devolver os dados do usuário como id, name, email
            // token gerado com base no nome e email
            // toda vez que o user fizer login, vai gerar um novo token para ele
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email
            }, 
            //variavel de ambiente que fiz em .env na raiz do projeto
            /* no tsconfig.json, você deixa o strict como false "strict": false,
            para o process.env.JWT_SECRET não da erro
            */
            process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: '30d' //quando vai expirar esse token
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
