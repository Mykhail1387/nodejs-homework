import bcrypt from 'bcrypt';
import { salt } from '../config/index';
import { loginValidation } from './auth.validator';
import User from '../users/user.model';
import { createToken } from '../services/auth.services';
import { generateAvatar } from '../avatarGenerstor/avatarGenerator';


export const registrationController = async (req, res) => {
    try {
        const { email } = req.body;
        const conflictUser = await User.getUser({ email });
        if (conflictUser) {
            res.status(409).json({
                message: 'Email in use'
            })
            return;
        }
        const avatarURL = await generateAvatar(email);

        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const user = { ...req.body, password: hashPassword, subscription: 'free', avatarURL: avatarURL };
        await User.createUser(user);
        res.status(201).json({ email: user.email, subscription: user.subscription, avatarURL: user.avatarURL })
    } catch (e) {
        console.log('error=', e)
        res.status(400).send('bad requestrt')

    }
}
export const loginController = async (req, res) => {
    try {
        const { errors } = await loginValidation.validate(req.body);
        if (errors) {
            res.status(400).send('bad request');
            return;
        }

        const { email, password } = req.body;
        const user = await User.getUser({ email });
        if (!user) {
            res.status(400).send('User not found');
            return;
        }


        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).send('password is wrong');
            return;
        }

        const token = await createToken({ id: user._id, subscription: user.subscription });

        res.json({ token: token, user: { email: user.email, subscription: user.subscription } });
    } catch (e) {
        res.status(400).send(e.details[0].message)
    }
}