const uuid = require('uuid')
const path = require('path')
const {Post, Category} = require('../models/models')
const ApiError = require('../error/apiError')

class postController {
    
    async getAll ( req, res ) {
        let {creator, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let posts;
        if ( !creator ) {
            posts = await Post.findAndCountAll({include: Category, limit, offset})
        }
        if ( creator ) {
            posts = await Post.findAndCountAll({where: {creator}, include: Category, limit, offset})
        }
        return res.json(posts)
    }

    async create ( req, res, next ) {
        try {
            let {title, link, description, creator, categories} = req.body
            const {img} = req.files

            if ( !title ) {
                return next(ApiError.badRequest('title is not correct'))
            }
            const errTitle = await Post.findOne({where: {title}})
            if ( errTitle ) {
                return next(ApiError.badRequest('title already exist'))
            }


            if ( !link ) {
                return next(ApiError.badRequest('link is not correct'))
            }
            const errLink = await Post.findOne({where: {link}})
            if ( errLink ) {
                return next(ApiError.badRequest('link already exist'))
            }


            if ( !description ) {
                return next(ApiError.badRequest('description is not correct'))
            }


            if ( !creator ) {
                return next(ApiError.badRequest('creator is not correct'))
            }


            if ( !categories || typeof(JSON.parse(categories)) != 'object' || !Array.isArray(JSON.parse(categories).ids) ) {
                return next(ApiError.badRequest('categories is not correct'))
            }
            categories = JSON.parse(categories).ids
            categories.forEach(async id => {
                if ( ( !Number.isInteger(id) || id < 1 ) ) {
                    return next(ApiError.badRequest('categories is not correct'))
                }
            })
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

            
            if ( !img ) {
                return next(ApiError.badRequest('img is not correct'))
            }
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))


            const post = await Post.create({title, link, description, creator, img: fileName})

            const categoryRow = await Category.findAll({where: {id: JSON.parse(categories)}});
            await post.addCategory(categoryRow, { through: 'post_category'});
            
            const result = await Post.findOne({where: {id: post.id}, include: Category})

            return res.json(result)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async delete ( req, res, next ) {
        const {id} = req.body

        // check id
        if ( !Number.isInteger(+id) || +id < 1 ) {
            return next(ApiError.badRequest('id is not correct'))
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