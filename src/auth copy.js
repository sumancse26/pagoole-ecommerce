import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getUserByEmail, registerUser } from '@/lib/actions/userActions';

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
        strategy: 'jwt',
        // maxAge: 1,
        maxAge: 1 * 24 * 60 * 60, // 1 days
        updateAge: 7 * 24 * 60 * 60 // 7 days
    },
    pages: {
        signIn: '',
        error: '/error'
    },
    cookies: {
        sessionToken: {
            name: 'token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production'
            }
        }
    },
    callbacks: {
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

                    if (!dbUser) {
                        throw new Error('User could not be found or created.');
                    }

                    user.id = dbUser.id;
                    user.role = 2;

                    return true;
                } catch (error) {
                    console.error('Error in signIn callback:', error);
                    return false;
                }
            }
            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    }
});
