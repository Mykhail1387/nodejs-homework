import User from './user.model';
import path from 'path';

export const getUsersController = async (req, res) => {
    try {
        const users = await User.getUsers(req.query);
        res.json(users)
        console.log('getUsers:', users);
    } catch (err) {
        console.log(err);
        res.status(500).send('bad request')
    }
}

export const createUserController = async (req, res) => {
    try {
        const createdUser = await User.createUser(req.body);
        res.json(createdUser);
        console.log('createUserController:', createdUser);
    } catch (err) {
        res.status(500).send('server error');
    }
}

export const getUserByIdController = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        res.json(user);
        console.log('getUserByIdController:', user);
    } catch (err) {
        res.status(500).send('server error');
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const user = await User.deleteUser(req.params.id);
        res.json(user);
        console.log('deleteUserController:', user);
    } catch (err) {
        res.status(500).send('server error');
    }
}

export const updateUserController = async (req, res) => {
    try {
        const user = await User.updateUser(req.body);
        res.json(user);
    } catch (err) {
        console.log('err', err)
        res.status(500).send('server error');
    }
}

export const uploadAvatarController = async (req, res, next) => {
    try {
        const { path } = req.file;

        const currentUser = await User.getUserById(req.userInfo.id);
        const argsUserForUpdate = {
            id: currentUser._id,
            avatarURL: path
        };
        const updatedUser = User.updateUser(argsUserForUpdate);

        res.status(200).json(updatedUser._update);
        next()
    } catch (err) {
        console.log('e', err)
        res.status(500).send(err)
    }
}
