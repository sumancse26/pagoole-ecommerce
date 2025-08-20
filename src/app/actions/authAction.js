'use server';
import { signIn } from '@/auth';
import { mailOptions, transporter } from '@/config/nodemailer';
import { register } from '@/services/users';
export const loginAction = async (formData) => {
    const result = await login(formData);
    return result;
};

export const registerAction = async (formData, isCustomer = false) => {
    const result = await register({ ...formData, isCustomer });

    return result;
};

export const mailSendingAction = async (prevState, email, otp) => {
    if (!email) return prevState;

    try {
        const res = await transporter.sendMail({
            ...mailOptions,
            to: email,
            subject: 'Reset Password',
            text: `Your OTP for reset password is ${otp}`,
            html: `<p>Your OTP for reset password is <strong>${otp}</strong>. Do not share this OTP with anyone.</p>`
        });

        if (Array.isArray(res.accepted) && res.accepted.length > 0) {
            return { success: true, message: 'Otp sent successfully', email };
        } else {
            return { success: false, message: 'Otp not sent' };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Failed to send Otp',

            error: error.message || String(error)
        };
    }
};

export const otpVerificationAction = async (prevState, otp, email) => {
    if (!otp) return prevState;
    const result = await verifyOtp({ otp, email });
    return await result;
};

export const submitOtpAction = async (prevState, formData) => {
    if (!formData) return prevState;

    const result = await submitOtp(formData);
    return result;
};

export const doLogoutAction = async () => {
    await doLogout();
    return { success: true, message: 'Logged out successfully' };
};

export const getProfileAction = async () => {
    const result = await getProfile();
    return result;
};

//social login (login with google, facebook, github, linkedin)
export const doSocialLogin = async (action, path) => {
    const res = await signIn(action, { redirectTo: path });
    return res;
};
