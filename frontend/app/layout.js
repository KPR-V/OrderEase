import "./globals.css";
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-home bg-cover bg-center bg-gray-800 bg-opacity-50">
                {children}
            </body>
        </html>
    );
}
