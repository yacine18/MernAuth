const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/User.model')
const auth = require('../middleware/auth')

router.get('/', auth, async(req, res) => {
    try {

        const user = await User.findById(req.user.id)
        res.json({user:{
            id: user._id,
            email: user.email
        }})

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

//register
router.post('/', async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await User.findOne({ email })
        if (!email || !password) {
            return res.status(401).json({ msg: "All Fields are Required!" })
        }
        if (user) {
            return res.status(401).json({ msg: "An Account with This Email Already Exists!" })
        }

        const salt = await bcrypt.genSalt(8)
        password = await bcrypt.hash(password, salt)

        user = new User({
            email,
            password,
        })

        await user.save()

        const payload = {
            user: {
                _id: user._id
            }
        }

        let jwtSecret = process.env.JWT_SECRET || "yassine"
        jwt.sign(
            payload,
            jwtSecret,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) {
                    return res.status(401).json({ msg: err.message })
                } else {
                    return res.status(201).json({ token })
                }

            }
        )

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

//login
router.post('/login', async (req, res) => {
    try {

        let { email, password } = req.body
        let user = await User.findOne({ email })

        if (!email || !password) {
            return res.status(401).json({ msg: "All Fields are Required!" })
        }

        if (!user) {
            return res.status(401).json({ msg: "There's No Account With This Email" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const payload = {
                user: {
                    id: user.id
                }
            }

            let jwtSecret = process.env.JWT_SECRET
            jwt.sign(
                payload,
                jwtSecret,
                { expiresIn: "1h" },
                (err, token) => {
                    if (err) {
                        return res.status(401).json({ msg: err.message })
                    } else {
                        return res.status(201).json({ token })
                    }

                }
            )
        } else {
            return res.status(401).json({ msg: "Wrong Password!" })
        }

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})





module.exports = router