import { Request, Response } from 'express'
import { DetailUserService } from '../../services/user/DetailUserService'

class DetailUserController {
    async handleDetailUser( req: Request, res: Response ){

        /* o req.user_id foi o que configurei no @types e no middlewares */
        const user_id = req.user_id

        const detailUserService = new DetailUserService()

        const user = await detailUserService.detailUser(user_id)

        return res.json(user)
    }
}

export {DetailUserController}