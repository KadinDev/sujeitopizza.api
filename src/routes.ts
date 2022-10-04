import { Router } from 'express'
import multer from 'multer'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { CreateCategoryController } from './controllers/cetegory/CreateCategoryController'
import { ListAllCategoryController } from './controllers/cetegory/ListAllCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'
import { AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { ListAllOrderController } from './controllers/order/ListAllOrderController'
import { DetailsOrderController } from './controllers/order/DetailsOrderController'
import { FinishedOrderController } from './controllers/order/FinishedOrderController'

import { isAuthenticated } from './middlewares/isAuthenticated'

// esse uploadConfig temos dentro do upload do multer
import uploadConfig from './config/multer'

const router = Router()

// agora aqui forneço o nome da pasta que quero salvar as imagens
const upload = multer(uploadConfig.upload("./tmp"))

// ROTAS USER //
router.post('/session', new AuthUserController().handleLoginUser )
router.post('/users', new CreateUserController().handleCreateUser )
router.get('/me', isAuthenticated, new DetailUserController().handleDetailUser )

// ROTAS CETEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle )
router.get('/categories', isAuthenticated, new ListAllCategoryController().handle )

// ROTAS PRODUCT

/*  upload.single("file") ->  estou informando pelo single que quero receber
somente 1 foto(tem outras opções tbm), e o ("file"), estou informando que irei receber
a imagem através do nome file */ 
router.post('/product', isAuthenticated, upload.single("file"), new CreateProductController().handle )
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle )

// ROTAS PEDIDOS
router.post('/order', isAuthenticated, new CreateOrderController().handle )
router.delete('/order', isAuthenticated, new RemoveOrderController().handle )
router.post('/order/add', isAuthenticated, new AddItemController().handle )
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle )
router.put('/order/send', isAuthenticated, new SendOrderController().handle )
router.get('/orders', isAuthenticated, new ListAllOrderController().handle )
router.get('/orders/details', isAuthenticated, new DetailsOrderController().handle )
router.put('/orders/finished', isAuthenticated, new FinishedOrderController().handle )

export { router }