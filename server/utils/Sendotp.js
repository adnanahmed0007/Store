
import nodemailer from "nodemailer"
const sendotpuser = async (email, otpnuumerfloor) => {
    console.log("otp" + otpnuumerfloor)
    console.log("emai" + email)
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'kira.mitchell43@ethereal.email',
            pass: 'dXDAcvPK8hgKhSfPfa'
        }
    });
    // Wrap in an async IIFE so we can use await.
    (async () => {
        const info = await transporter.sendMail({
            from: "kira.mitchell43@ethereal.email",
            to: email.trim(),
            subject: "OTP SEND",
            text: `the otp of is ${otpnuumerfloor}`, // plain‑text body
            html: `the otp of is ${otpnuumerfloor}`, // HTML body
        });

        console.log("Message sent:", info.messageId);
    })();
}
export default sendotpuser;