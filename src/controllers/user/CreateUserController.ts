import {Request, Response} from 'express'

import { CreateUserService } from '../../services/user/CreateUserService'

// Criando User
class CreateUserController{
    async handleCreateUser(req: Request, res: Response){
        const { name, email, password} = req.body

        const createUserService = new CreateUserService()

        const user = await createUserService.createUser({
            name,
            email,
            password
        })

        return res.json(user)
    }
}

export { CreateUserController }