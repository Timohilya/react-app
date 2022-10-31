const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const uuid = require('uuid')
const path = require('path')
const {Post, Category} = require('../models/models')
const ApiError = require('../error/apiError')

class postController {
    
    async getOne ( req, res ) {
        const {id} = req.params
        const post = await Post.findOne({where: {id}, include: Category})
        return res.json(post)
    }
    
    async getAll ( req, res ) {
        let {titleWord, categoryId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let posts;
        if ( !titleWord && !categoryId ) {
            posts = await Post.findAndCountAll({distinct:true, include: Category, limit, offset, order: [['updatedAt', 'DESC']]})
        }
        if ( titleWord && !categoryId ) {
            posts = await Post.findAndCountAll({where: {title: { [Op.like]: `%${titleWord}%` }}, distinct:true, include: Category, limit, offset, order: [['updatedAt', 'DESC']]})
        }
        if ( !titleWord && categoryId ) {
            posts = await Post.findAndCountAll({distinct:true, include: {model: Category, where: {id: categoryId}}, limit, offset, order: [['updatedAt', 'DESC']]})
        }
        if ( titleWord && categoryId ) {
            posts = await Post.findAndCountAll({where: {title: { [Op.like]: `%${titleWord}%` }}, distinct:true, include: {model: Category, where: {id: categoryId}}, limit, offset, order: [['updatedAt', 'DESC']]})
        }
        return res.json(posts)
    }

    async create ( req, res, next ) {
        try {
            let {title, description, creator, categories} = req.body

            if ( !title ) {
                return next(ApiError.badRequest('Title is not correct'))
            }
            const errTitle = await Post.findOne({where: {title}})
            if ( errTitle ) {
                return next(ApiError.badRequest('Title already exist'))
            }


            if ( !description ) {
                return next(ApiError.badRequest('Description is not correct'))
            }


            if ( !creator ) {
                return next(ApiError.badRequest('Creator is not correct'))
            }

            if ( !categories || typeof(JSON.parse(categories)) != 'object' || !Array.isArray(JSON.parse(categories).ids) ) {
                return next(ApiError.badRequest('Categories is not correct'))
            }
            categories = JSON.parse(categories).ids
            for (const id in categories) {
                if ( !Number.isInteger(categories[id]) || categories[id] < 1 ) {
                    return next(ApiError.badRequest('Categories is not correct'))
                }
            }
            async function checkCategories () {
                let result = false
                for (const id of categories) {
                    const err = await Category.findOne({where: {id: id}})
                    if ( !err ) {
                        result = true
                    }
                }
                return result
            }
            const errCategoryNotFound = await checkCategories()
            if ( errCategoryNotFound ) {
                return next(ApiError.notFound('Category not found'))
            }

            if ( !req.files ) {
                return next(ApiError.badRequest('Img is not correct'))
            }
            const {img} = req.files
            if ( !img ) {
                return next(ApiError.badRequest('Img is not correct'))
            }
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))


            const post = await Post.create({title, description, creator, img: fileName})

            const categoryRow = await Category.findAll({where: {id: categories}});
            await post.addCategory(categoryRow, { through: 'post_category'});
            
            const result = await Post.findOne({where: {id: post.id}, include: Category})

            return res.json({
                message: 'Post created',
                data: result,
            })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async delete ( req, res, next ) {
        const {id} = req.body

        // check id
        if ( !Number.isInteger(+id) || +id < 1 ) {
            return next(ApiError.badRequest('Id is not correct'))
        }

        // check on exist
        const err = await Post.findOne({where: {id}})
        if ( !err ) {
            return next(ApiError.notFound('Post not found'))
        }

        // delete
        Post.findByPk(id).then(post => {
            return Post.destroy({where: {id} });
        })
        .then(() => {
            res.status(200).json({message: 'Post deleted'});
        })  
        .catch(err => {
            next(ApiError.badRequest(e.message))
        })
    }

}

module.exports = new postController()