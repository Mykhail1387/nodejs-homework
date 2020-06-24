import Joi from 'joi';

const userValidShema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

export const userValidateMiddleware = (req, res, next) => {
    const { error } = userValidShema.validate(req.body);
    if (error) {
        res.status(403).send('bad request');
        return;
    }

    next();
}
