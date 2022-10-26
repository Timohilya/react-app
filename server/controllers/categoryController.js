const {Category} = require('../models/models')
const ApiError = require('../error/apiError')

class categoryController {

    async getAll ( req, res ) {
        const categories = await Category.findAll()
        return res.json(categories)
    }
    
    async create ( req, res, next ) {
        const {name} = req.body

        // check name
        if ( !name ) {
            return next(ApiError.badRequest('name is not correct'))
        }

        const category = await Category.create({name})
        return res.json(category)
    }
    
    async delete ( req, res, next ) {
        const {id} = req.body

        // check id
        if ( !Number.isInteger(+id) || +id < 1 ) {
            return next(ApiError.badRequest('id is not correct'))
        }

        // check on exist
        const category = await Category.findOne({where: {id}})
        if ( !category ) {
            return next(ApiError.notFound('Category not found'))
        }

        // delete
        Category.findByPk(id).then(category => {
            return Category.destroy({where: {id} });
        })
        .then(() => {
            res.status(200).json({message: 'Category deleted'});
        })  
        .catch(err => {
            next(ApiError.badRequest(e.message))
        })
    }

}

module.exports = new categoryController()