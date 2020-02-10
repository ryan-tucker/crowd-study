const express = require('express')
const Question = require('../models/question')

const router = express.Router()

router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find()    
        res.send(questions)
    } catch (e) {
        res.status(404).send()
    }
})

//Probably just keep in for me now
router.post('/questions', async (req, res) => {
    try {
        const question = new Question(req.body)
        await question.save()
        //Can check if user is certified or not.
        //Then send either just the questions or the answers as well
        res.status(201).send(question)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router