const {Category} = require('../models/models')
const ApiError = require('../error/apiError')

class categoryController {

    async getAll ( req, res ) {
        const categories = await Category.findAll({order: [['updatedAt', 'DESC']]})
        return res.json(categories)
    }
    
    async create ( req, res, next ) {
        const {name} = req.body

        // check name
        if ( !name ) {
            return next(ApiError.badRequest('Name is not correct'))
        }

        // check on exist
        const nameExist = await Category.findOne({where: {name}})
        if ( nameExist ) {
            return next(ApiError.badRequest('Category already exist'))
        }

        const category = await Category.create({name})
        return res.json({
            message: 'Category created',
            data: category,
        })
    }
    
    async delete ( req, res, next ) {
        const {id} = req.body

        // check id
        if ( !Number.isInteger(+id) || +id < 1 ) {
            return next(ApiError.badRequest('Id is not correct'))
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