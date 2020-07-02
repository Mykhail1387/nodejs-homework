import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: String,
    password: String,
    subscription: Object,
    token: String
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
