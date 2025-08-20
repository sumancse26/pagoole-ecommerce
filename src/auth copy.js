// src/auth.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        // 🔹 Runs whenever NextAuth creates/updates the JWT
        async jwt({ token }) {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const cookieToken = await cookies()?.get('token')?.value;

            if (cookieToken) {
                try {
                    const { payload } = await jwtVerify(cookieToken, secret);
                    // const payload = jwtDecode(cookieToken);

                    console.log('cookie payload', payload);
                    return { ...token, ...payload };
                } catch (err) {
                    console.error('Failed to decode token cookie:', err);
                }
            }

            return token;
        },

        // 🔹 Runs whenever NextAuth returns a session
        async session({ session, token }) {
            if (token?.user_id) {
                session.user = {
                    ...session.user,
                    id: token.user_id,
                    role: token.role
                };
            }
            return session;
        }
    }
});
