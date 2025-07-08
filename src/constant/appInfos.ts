import type { Metadata, Viewport } from 'next';
import { SeoList } from '@/lib/responses/seoLib';

export const appInfo = {
  logo: '/Logo.svg',
  title: 'Unien',
  description:
    '  Với uy tín trên thị trường, Công ty TNHH Điện Tự Động  Unien được biết đến là nhà cung cấp chuyên nghiệp với sản phẩm và dịch vụ chất lượng cao. Giải pháp kỹ thuật tối ưu cho khách hàng và đối tác trong lĩnh vực Lò Hơi Công Nghiệp.',
  domain: 'https://unien.com',
  ogImage: '/Logo.svg',
  themeColor: '#ffffff',
  keywords: [
    // Từ khóa tiếng Anh
    'boiler system',
    'industrial boiler',
    'electric boiler',
    'biomass boiler',
    'steam boiler',
    'boiler installation',
    'boiler maintenance',
    'thermal energy solutions',
    'solar energy',
    'rooftop solar system',
    'solar power installation',
    'renewable energy solutions',
    'solar inverter',
    'solar panel system',
    'off-grid solar system',
    'hybrid solar solution',
    'power distribution',
    'electrical cabinet',
    'electrical panel design',
    'electrical control panel',
    'industrial electrical equipment',
    'switchgear solutions',
    'electrical solutions',
    'energy-saving systems',

    // Từ khóa tiếng Việt
    'lò hơi công nghiệp',
    'nồi hơi điện',
    'nồi hơi tầng sôi',
    'lò hơi đốt củi',
    'lò hơi đốt than',
    'lò hơi đốt dầu',
    'sửa chữa lò hơi',
    'bảo trì lò hơi',
    'lắp đặt lò hơi',
    'giải pháp nhiệt công nghiệp',
    'điện mặt trời áp mái',
    'hệ thống điện mặt trời',
    'lắp đặt điện mặt trời',
    'pin năng lượng mặt trời',
    'inverter năng lượng mặt trời',
    'giải pháp năng lượng tái tạo',
    'hệ thống điện công nghiệp',
    'tủ điện công nghiệp',
    'tủ điện điều khiển',
    'tủ điện phân phối',
    'thiết kế tủ điện',
    'lắp đặt tủ điện',
    'thiết bị điện công nghiệp',
    'vật tư thiết bị điện',
    'giải pháp điện toàn diện',
    'thiết bị đóng cắt',
    'tụ bù điện',
    'giải pháp tiết kiệm điện',
  ],
};

// Đảm bảo các giá trị không null/undefined
export const metadata: Metadata = {
  title: appInfo.title,
  description: appInfo.description,
  keywords: appInfo.keywords,
  applicationName: appInfo.title,
  generator: 'Next.js',

  icons: {
    icon: appInfo.logo,
    apple: appInfo.logo,
    shortcut: appInfo.logo,
  },
  // Remove themeColor from here

  openGraph: {
    type: 'website',
    title: appInfo.title,
    description: appInfo.description,
    siteName: appInfo.title,
    url: appInfo.domain,
    images: [
      {
        url: `${appInfo.domain}${appInfo.ogImage}`,
        width: 1200,
        height: 630,
        alt: appInfo.title,
      },
    ],
    locale: 'vi_VN',
  },

  twitter: {
    card: 'summary_large_image',
    title: appInfo.title,
    description: appInfo.description,
    images: [`${appInfo.domain}${appInfo.ogImage}`],
    creator: '@unien',
    site: '@unien',
  },

  alternates: {
    canonical: appInfo.domain,
    languages: {
      'en-US': `${appInfo.domain}/en`,
      'vi-VN': `${appInfo.domain}`,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'verification_token',
    yandex: 'verification_token',
  },

  category: 'boiler',
  creator: 'Unien',
  publisher: 'Unien',
};

// Move themeColor to viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: appInfo.themeColor,
};

export const siteBaseUrl = 'https://unien.vn';

// Function to generate metadata for child pages
export function PageMetadata(
  pageTitle: string,
  pageDescription?: string
): Metadata {
  const { seo } = SeoList(0);

  // Add null checks and type safety
  const siteTitle = seo?.site_title ?? appInfo.title;
  const siteDescription =
    pageDescription ?? seo?.site_description ?? appInfo.description;
  const siteKeywords = seo?.keywords?.length ? seo.keywords : appInfo.keywords;
  const siteDomain = seo?.domain ?? appInfo.domain;

  return {
    title: `${pageTitle} | ${siteTitle}`,
    description: siteDescription,
    keywords: siteKeywords,
    applicationName: siteTitle,
    generator: 'Next.js',

    icons: {
      icon: appInfo.logo,
      apple: appInfo.logo,
      shortcut: appInfo.logo,
    },
    // Don't include themeColor here either

    openGraph: {
      type: 'website',
      title: `${pageTitle} | ${siteTitle}`,
      description: siteDescription,
      siteName: siteTitle,
      url: siteDomain,
      images: [
        {
          url: `${siteDomain}${appInfo.ogImage}`,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
      locale: 'vi_VN',
    },

    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | ${siteTitle}`,
      description: siteDescription,
      images: [`${siteDomain}${appInfo.ogImage}`],
      creator: '@unien',
      site: '@unien',
    },

    alternates: {
      canonical: siteDomain,
      languages: {
        'en-US': `${siteDomain}/en`,
        'vi-VN': `${siteDomain}`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    verification: {
      google: 'verification_token',
      yandex: 'verification_token',
    },

    category: 'Boiler',
    creator: '@unien',
    publisher: 'Unien',
  };
}
