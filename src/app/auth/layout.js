// app/login/layout.js
export const metadata = {
    title: 'Login'
};

export default function LoginLayout({ children }) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
                <main>{children}</main>
            </body>
        </html>
    );
}
