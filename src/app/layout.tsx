import { Montserrat } from 'next/font/google';
import '../assetts/style/globals.css';
import {
  metadata as siteMetadata,
  viewport as siteViewport,
} from '@/constant/appInfos';
import ReactQueryProvider from './ReactQueryProvider';
import { Toaster } from 'sonner';
import Script from 'next/script';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body className={` ${montserrat.className}  antialiased`}>
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ReactQueryProvider>

        <Script id="add-mdl-class" strategy="afterInteractive">
          {`document.documentElement.classList.add('mdl-js');`}
        </Script>
      </body>
    </html>
  );
}
