import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { metadata as siteMetadata } from '@/constant/appInfos';
import ReactQueryProvider from './ReactQueryProvider';
import { Toaster } from 'sonner';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const geistMontserrat = Geist({
  variable: '--font-montserrat',
  subsets: ['latin'],
});
export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${geistMontserrat.variable} antialiased`}
      >
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
