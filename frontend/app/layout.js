import "./globals.css";
import { Dataprovider } from "@/components/datacontext";
import { EdgeStoreProvider } from "@/components/edgestore.js";
import { SpeedInsights } from '@vercel/speed-insights/next';
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scrollbar-custom">
      <body className="bg-home bg-no-repeat bg-cover bg-center  bg-gray-800 bg-opacity-50">
        <Dataprovider>
          <EdgeStoreProvider>
            {children}
            <SpeedInsights />
            </EdgeStoreProvider>
        </Dataprovider>
      </body>
    </html>
  );
}
