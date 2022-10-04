"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const CreateCategoryController_1 = require("./controllers/cetegory/CreateCategoryController");
const ListAllCategoryController_1 = require("./controllers/cetegory/ListAllCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListAllOrderController_1 = require("./controllers/order/ListAllOrderController");
const DetailsOrderController_1 = require("./controllers/order/DetailsOrderController");
const FinishedOrderController_1 = require("./controllers/order/FinishedOrderController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
// esse uploadConfig temos dentro do upload do multer
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
// agora aqui forneço o nome da pasta que quero salvar as imagens
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
// ROTAS USER //
router.post('/session', new AuthUserController_1.AuthUserController().handleLoginUser);
router.post('/users', new CreateUserController_1.CreateUserController().handleCreateUser);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handleDetailUser);
// ROTAS CETEGORY
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get('/categories', isAuthenticated_1.isAuthenticated, new ListAllCategoryController_1.ListAllCategoryController().handle);
// ROTAS PRODUCT
/*  upload.single("file") ->  estou informando pelo single que quero receber
somente 1 foto(tem outras opções tbm), e o ("file"), estou informando que irei receber
a imagem através do nome file */
router.post('/product', isAuthenticated_1.isAuthenticated, upload.single("file"), new CreateProductController_1.CreateProductController().handle);
router.get('/category/product', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
// ROTAS PEDIDOS
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete('/order', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle);
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListAllOrderController_1.ListAllOrderController().handle);
router.get('/orders/details', isAuthenticated_1.isAuthenticated, new DetailsOrderController_1.DetailsOrderController().handle);
router.put('/orders/finished', isAuthenticated_1.isAuthenticated, new FinishedOrderController_1.FinishedOrderController().handle);
