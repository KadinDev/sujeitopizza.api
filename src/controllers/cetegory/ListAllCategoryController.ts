import { Request, Response } from 'express'

import { ListAllCategoryService } from '../../services/cetegory/ListAllCategoryService'

class ListAllCategoryController {
    async handle( req: Request, res: Response ){

        const selectAllCategory = new ListAllCategoryService()

        const category = await selectAllCategory.execute()

        return res.json(category)
    }
}

export { ListAllCategoryController }