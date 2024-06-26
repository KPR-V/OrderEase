import "./globals.css";
import { EdgeStoreProvider } from "@/components/edgestore.js"
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-home bg-cover bg-center bg-gray-800 bg-opacity-50">
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </body>
        </html>
    );
}
