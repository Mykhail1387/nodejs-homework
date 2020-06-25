import Joi from 'joi';

const contactValidShema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
})

export const contactValidateMiddleware = (req, res, next) => {
    const { error } = contactValidShema.validate(req.body);
    if (error) {
        res.status(403).send('bad request');
        return;
    }

    next();
}
