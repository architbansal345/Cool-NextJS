import nodemailer from 'nodemailer'
import User from '../models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType , userId}:any) => {
    try {
        const hashed = await bcryptjs.hash(userId.toString(),10);
        if(emailType == "VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifiedToken:hashed,
                VerifiedExpiry:Date.now()+ 3600000
            })
            
        }else if(emailType == "RESET"){
            await User.findByIdAndUpdate(userId , {
                forgotPassword:hashed,
                forgotPasswordExpiry:Date.now()+3600000
            })
        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "6e0ad827041ceb",
              pass: "c7824ec73f1622"
            }
          });
        const emailOptions = {
            from:'archit@gmail.com',
            to:email,
            subject:emailType==="VERIFY"?"VERIFY Your EMAIL":"RESET PASSWORD",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashed}">here</a>to ${emailType=="VERIFY"?"verify your email":"reset your password"}</p>`
            }
        const sendmail = await transport.sendMail(emailOptions);
        return sendmail;
    } catch (error:any) {
        throw new Error(error.message);
    }
}
