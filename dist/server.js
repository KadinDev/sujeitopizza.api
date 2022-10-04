"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors"); // essa lib sempre fica importada como 2°
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // passando assim, qualquer URL qualquer ip conseguir fazer requisição no meu back end
app.use(routes_1.router);
app.use('/files', // qual será a rota
// criando rota estática, onde vou passar a rota(/files), com o nome da foto conforma informado abaixo 
express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
// todas as rotas passarão por esse 
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        // se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        });
    }
    // esse 500 eu vi no insomnia quando testei o erro na rota 
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
app.listen(process.env.PORT, () => console.log('server online!!'));
