import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { metadata as siteMetadata } from '@/constant/appInfos';

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
        {children}
      </body>
    </html>
  );
}
