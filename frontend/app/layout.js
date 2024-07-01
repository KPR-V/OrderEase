import "./globals.css";
import { Dataprovider } from "@/components/datacontext";
import { EdgeStoreProvider } from "@/components/edgestore.js";

export const metadata = {
  title: 'Your Site Title',
  other: {
    'cryptomus': 'b99ab161',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-home bg-cover bg-center bg-gray-800 bg-opacity-50">
        <Dataprovider>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </Dataprovider>
      </body>
    </html>
  );
}
