const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    timeOfLogin: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    authToken: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})




userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ phone: this.phone }, process.env.SECRET_KEY);
        this.authToken = this.authToken.concat({ token: token });
        await this.save()
        return token;
    }
    catch (err) {
        console.error(err)
    }
}


const User = mongoose.model('USER', userSchema)

module.exports = User;