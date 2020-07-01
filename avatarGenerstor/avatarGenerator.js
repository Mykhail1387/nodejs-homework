import AvatarGenerator from 'avatar-generator';

import path from 'path';
import fs from 'fs';
const { promises: fsPromises } = fs;

export const generateAvatar = async (email) => {

    const avatar = new AvatarGenerator({
        parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'],
        partsLocation: path.join(__dirname, '../node_modules/avatar-generator/img'),
        imageExtension: '.png'
    });

    const variant = 'male';
    const avatarName = `${email.split('@')[0] + Date.now()}.png`;
    const image = await avatar.generate(email, variant);

    const tmpPath = `tmp/${avatarName}`;
    const publicPath = `public/images/${avatarName}`;

    await image.png().toFile(`tmp/${avatarName}`);

    await fsPromises.copyFile(tmpPath, publicPath);
    await fsPromises.unlink(tmpPath);

    return `http://localhost:3000/images/${avatarName}`;

}