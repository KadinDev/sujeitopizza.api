import {Request, Response} from 'express'

import { AuthUserService } from '../../services/user/AuthUserService'

class AuthUserController {
    async handleLoginUser( req: Request, res: Response){
        const { email, password} = req.body

        const loginUserService = new AuthUserService()
        
        const user = await loginUserService.loginUser({
            email,
            password
        })

        return res.json(user)
    }
}

export { AuthUserController }