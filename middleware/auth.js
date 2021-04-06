const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")

        if(!token) return res.status(400).json({msg: "Invalid ghalta loula."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log(user);

            if(err) return res.status(400).json({msg: "Invalid Authentication.ghalta theni"})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth