const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.post('/users', async (req,res) => {
    const user = new User(req.body)
    console.log(user)
    try {
        const token = await user.generateAuthToken()
        await user.save()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})


module.exports = router