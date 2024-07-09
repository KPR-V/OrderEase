import "./globals.css";
import { Dataprovider } from "@/components/datacontext";
import { EdgeStoreProvider } from "@/components/edgestore.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scrollbar-custom">
      <body className="bg-home bg-no-repeat bg-cover bg-center  bg-gray-800 bg-opacity-50">
        <Dataprovider>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </Dataprovider>
      </body>
    </html>
  );
}
