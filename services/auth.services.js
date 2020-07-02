import jwt from 'jsonwebtoken';

export const createToken = async (userData) => {
    return jwt.sign(userData, process.env.PRIVATE_KEY, { expiresIn: 2 * 24 * 60 * 60 })
}


// , { algorithm: 'RS256' }, { expieresIn: '1h' }