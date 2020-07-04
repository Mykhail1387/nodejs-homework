import mongoose, { Schema } from 'mongoose';
import { boolean } from 'yargs';

const userSchema = new Schema({
    email: String,
    password: String,
    avatarURL: String,
    subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free"
    },
    token: { type: String, required: false },
    verificationToken: { type: String },

});


class User {
    constructor() {
        this.user = mongoose.model('User', userSchema)
    }

    getUser = (query) => {
        return this.user.findOne(query);
    }

    getUsers = (query) => {
        return this.user.find(query, { password: false })
    }

    createUser = (user) => {
        return this.user.create(user)
    }

    getUserById = (id) => {
        return this.user.findById(id)
    }

    deleteUser = (id) => {
        return this.user.findByIdAndDelete(id)
    }

    updateUser = (user) => {
        const { id, ...userModel } = user;
        return this.user.findByIdAndUpdate(id, userModel, { new: true })
    }

}

export default new User();

