/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingRoot: process.cwd(),
    allowedDevOrigins: ['localhost', '127.0.0.1', '*.your-dev-domain.com', '*.ngrok.app', '*. *', '*'],

    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            { protocol: 'https', hostname: '*' },
            { protocol: 'http', hostname: '*' }
        ]
    },

    experimental: {
        serverActions: {
            allowedOrigins: ['*']
        }
    }
};

export default nextConfig;
