const express = require('express')

const userRouter = require('./routers/user')
const questionRouter = require('./routers/question')
const answerRouter = require('./routers/answer')

require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(questionRouter)
app.use(answerRouter)

app.listen(port)