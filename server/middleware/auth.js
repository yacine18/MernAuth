const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {

        const token = req.header('x-auth-token')
        const jwtSecret = process.env.JWT_SECRET
        const verifiedUser = jwt.verify(token, jwtSecret)

        req.user = verifiedUser.user
        next()

    } catch (err) {
          return res.status(500).json({ msg: err.message })
    }
}