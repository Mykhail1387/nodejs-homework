import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';

export const sendVerificationToken = async (id, email) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const token = await jwt.sign({ id }, process.env.PRIVATE_KEY_VERIFICATION);

    const msg = {
        to: email,
        from: 'miha.mms.sv@gmail.com',
        subject: 'Verification',
        text: 'Verify your account',
        html: `<a href="http://localhost:3000/auth/verify/${token}">Confirm your account</a>`,
    };

    return await sgMail.send(msg);
}