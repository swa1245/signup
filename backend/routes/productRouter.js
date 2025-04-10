const express = require('express')
const authent = require('../middlewares/auth')
const router = express.Router()

router.get('/pro',authent,(req,res)=>{
    res.status(200).json([
        {
            name:"s",
            age:18
        },
        {
            name:"se",
            age:19
        },
    ])
})

module.exports = router