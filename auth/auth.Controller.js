import bcrypt from 'bcrypt';
import { salt } from '../config/index';
import { loginValidation } from './auth.validator';
import User from '../users/user.model';
import { createToken } from '../services/auth.services';
import { generateAvatar } from '../avatarGenerstor/avatarGenerator';
import { sendVerificationToken } from '../services/mail.service';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';


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
        const verificationToken = uuidv4();
        const user = { ...req.body, password: hashPassword, subscription: 'free', avatarURL: avatarURL, verificationToken: verificationToken };

        const { _id } = await User.createUser(user);
        await sendVerificationToken(_id, email);

        res.status(201).json({ email: user.email, subscription: user.subscription, avatarURL: user.avatarURL })
    } catch (e) {
        console.log('error=', e)
        res.status(400).send('bad request')

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

        if (user.verificationToken) {
            res.status(401).send("Email not verifyed!")
            return
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


export const verificationTokenController = async (req, res) => {
    const verifyToken = req.params.verificationToken;

    if (!verifyToken) {
        res.status(401).send('No token provided');
        return;
    }

    try {
        const { id } = await jwt.verify(verifyToken, process.env.PRIVATE_KEY_VERIFICATION);
        const user = await User.getUserById(id);

        if (user.verificationToken === null) {
            res.status(404).json('Your mail is verify')
            return;
        };

        if (user) {
            const argsForUpdate = {
                id: user._id,
                verificationToken: null
            }
            await User.updateUser(argsForUpdate);
            res.status(200);
        } else {
            res.status(404).send('User not found')
        }

        res.redirect('http://localhost:3000');

    } catch (err) {
        console.log(err)
        res.status(401).send('Invalid token')
    }
}




//========================================example sgMail=======================
export const sgMailController = async (req, res) => {
    const sgMail = require('@sendgrid/mail');

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const verificationToken = req.params.verificationToken;

    const msg = {
        to: 'melnychukmykhailo87@gmail.com',
        from: 'miha.mms.sv@gmail.com',
        subject: 'Hello world',
        text: 'test for Node.js',
        html: `<strong>Hi, ${verificationToken}</strong>`,
    };

    try {
        const [response] = await sgMail.send(msg);
        res.status(200).send('Mail has been sended');
    } catch (err) {
        console.log('err=', err)
        res.send('Internal server error')
    }

}