const {User} = require('../models/models')
const ApiError = require('../error/apiError')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class userController {
    
    async registration ( req, res, next ) {
        const {email, password, role} = req.body

        if ( !email ) {
            return next(ApiError.badRequest('Email is not correct'))
        }
        const candidat = await User.findOne({where: {email}})
        if ( candidat ) {
            return next(ApiError.badRequest('Email already exist'))
        }


        if ( !password ) {
            return next(ApiError.badRequest('Password is not correct'))
        }

        const hashPassword = await bcrypt.hash(password, 5)


        const user = await User.create({email, password: hashPassword, role})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login ( req, res, next ) {
        const {email, password} = req.body

        if ( !email ) {
            return next(ApiError.badRequest('Email is not correct'))
        }
        const user = await User.findOne({where: {email}})
        if ( !user ) {
            return next(ApiError.internal('User not found'))
        }

        if ( !password ) {
            return next(ApiError.badRequest('Password is not correct'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if ( !comparePassword ) {
            return next(ApiError.internal('Wrong password'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    
    async check ( req, res, next ) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

}

module.exports = new userController()