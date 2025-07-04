import Link from 'next/link';

interface ContactSectionProps {
  href: string;
  title: string;
}

export default function ContactSection({ href, title }: ContactSectionProps) {
  return (
    <div className="bg-black py-12 px-6 md:px-12 rounded-xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-white text-xl md:text-2xl font-medium leading-relaxed">
            Nếu bạn đã sẵn sàng thay đổi hoặc có ý tưởng mà bạn tin tưởng, hãy
            nói về điều đó. Liên hệ với chúng tôi và chờ phản hồi nhanh chóng.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-main hover:bg-main-600 text-black font-medium px-6 py-3 rounded-full transition-colors"
          >
            Liên Hệ Ngay
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform translate-y-[1px]"
            >
              <path
                d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-white hover:text-gray-300 font-medium transition-colors"
          >
            Xem Thêm {title}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
