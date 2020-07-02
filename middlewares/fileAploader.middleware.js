import multer from 'multer';
import path from 'path';

export const avatarUploader = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'tmp')
        },
        filename: (req, file, cb) => {
            const userId = req.userInfo.id;
            const ext = path.parse(file.originalname).ext;
            cb(null, `${userId}${ext}`)
        }
    });
    return multer({ storage })
} 