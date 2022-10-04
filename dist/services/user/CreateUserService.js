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
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs"); // para criptografar senha
class CreateUserService {
    // assim informa que precisa fornecer essas infos(name, email, password)
    createUser({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new Error("Email incorreto!");
            }
            // verificar se o email já existe
            const emailAlreadyExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (emailAlreadyExists) {
                throw new Error("Já existe um usuário com o e-mail iformado!");
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8); //o número da criptografia
            const user = yield prisma_1.default.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    created_at: true,
                    updated_at: true,
                    // a senha não devolve, fica oculta
                }
            });
            return { user };
        });
    }
}
exports.CreateUserService = CreateUserService;
