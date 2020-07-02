import jwt from 'jsonwebtoken';
import User from '../users/user.model';

export const tokenMiddleware = async (req, res, next) => {
    const { authorization: token } = req.headers;
    if (!token) {
        res.status(401).json({
            message: 'Not authorized'
        });
        return;
    }

    try {
        const userInfo = await jwt.verify(token, process.env.PRIVATE_KEY);
        req.userInfo = userInfo;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).send('Invalid token');
    }
}

export const subscriptionMiddleware = subscriptionList => (req, res, next) => {
    const { subscription } = req.userInfo;
    if (!subscriptionList.includes(subscription)) {
        res.status(403).send('Forbiden');
        return;
    }
    next();
}

export const tokenCheck = async (req, res, next) => {
    const { id } = req.userInfo;
    const user = await User.getUserById(id);
    if (!user) {
        res.status(401).json({
            message: 'Not authorized'
        })
    };
    req.token = null;
    res.status(204).send();
    next();
}

export const currentUser = async (req, res, next) => {
    const { id } = req.userInfo;
    const user = await User.getUserById(id);

    const { email, subscription, avatarURL } = user;
    res.status(200).json({ email, subscription, avatarURL })
}