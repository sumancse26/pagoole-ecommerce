const authConfig = {
    trustHost: true,

    session: { strategy: 'jwt' },

    pages: { signIn: '/login', error: '/error' },

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
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.is_active = user.is_active;
            }
            return token;
        },

        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.is_active = token.is_active;
            }
            return session;
        }
    }
};

export default authConfig;
