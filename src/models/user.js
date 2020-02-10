const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema( {
    username: {
        type: String,
        default: 'Anonymous',
        minlength: 1,
        maxlength: 15,
        required: true
    },
    trusted: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('answers', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'author'
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON = async function () {
    const user = this
    const userObject = user.toObject()
    delete user.tokens

    return userObject
}

const User = mongoose.model('User', userSchema)

module.exports = User