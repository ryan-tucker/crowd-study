const express = require('express')
const Answer = require('../models/answer')
const auth = require('../middleware/auth')
const Question = require('../models/question')

const router = express.Router()

router.post('/answers', auth, async (req, res) => {
    try {
        const user = req.user
        const answer = new Answer({text: req.body.answer, author: user._id})
        const question = await Question.findById(req.body.question_id)

        await question.answers.push(user._id)
        await question.save() 
        await answer.save()
        res.status(201).send()
    } catch (e) {
        res.status(400).send()
    }
})

router.patch('/answers/:id', auth, async (req,res) => {
    const id = req.params.id
    const updates = Object.keys(req.body)
    const acceptableUpdates = ['text']
    const isValidOperation = updates.every((update) => {
        return acceptableUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send()
    }
    try {
        const answer = await Answer.findOne({_id: id, author: req.user._id})
        if (!answer) {
            return res.status(404).send()
        }
        await answer.update(req.body)
        await answer.save()
        res.status(201).send()
    } catch (e){
        res.status(401).send()
    }
})

module.exports = router