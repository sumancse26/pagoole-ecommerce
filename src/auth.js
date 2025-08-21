import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { SignJWT, jwtVerify } from 'jose';
import { getUserByEmail, registerUser } from '@/lib/actions/userActions';

const signingSecret = new TextEncoder().encode(process.env.JWT_SIGNING_SECRET);

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    session: { strategy: 'jwt' },
    pages: { signIn: '/login', error: '/error' },
    cookies: {
        sessionToken: {
            name: 'token',
            options: { httpOnly: true, sameSite: 'lax', path: '/', secure: process.env.NODE_ENV === 'production' }
        }
    },
    jwt: {
        encode: async ({ token, maxAge }) => {
            return await new SignJWT(token)
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime(Math.floor(Date.now() / 1000) + (maxAge || 30 * 24 * 60 * 60))
                .sign(signingSecret);
        },
        decode: async ({ token }) => {
            if (!token) return null;
            try {
                const { payload } = await jwtVerify(token, signingSecret, { algorithms: ['HS256'] });
                return payload;
            } catch (error) {
                console.error('--- JWT DECODE FAILED ---:', error.message);
                return null;
            }
        }
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },

        async signIn({ user, account, profile }) {
            if (account.provider === 'google' && profile?.email) {
                try {
                    let dbUser = await getUserByEmail(profile.email);
                    if (!dbUser) {
                        dbUser = await registerUser({
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture
                        });
                    }
                    if (!dbUser) return false;

                    user.id = dbUser.id;
                    user.role = dbUser.is_admin;
                    return true;
                } catch (error) {
                    console.error('Error in signIn callback:', error);
                    return false;
                }
            }
            return true;
        }
    }
});
