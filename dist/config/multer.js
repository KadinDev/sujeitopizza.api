"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto")); // esse já vem com o Node
const path_1 = require("path"); // esse tbm já vem com o Node
const multer_1 = __importDefault(require("multer"));
exports.default = {
    upload(folder) {
        return {
            storage: multer_1.default.diskStorage({
                //__dirname, é o diretório que a gente tá(no caso aqui na pasta config)
                // ae vc informa para onde quer mandar as imagens
                destination: (0, path_1.resolve)(__dirname, '..', '..', folder),
                // criando nome único para minha imagem
                filename: (request, file, callback) => {
                    const fileMash = crypto_1.default.randomBytes(16).toString("hex");
                    const fileName = `${fileMash}-${file.originalname}`;
                    // 1° params é error(eu deixo como null pois não quero tratar)
                    return callback(null, fileName);
                }
            })
        };
    }
};
