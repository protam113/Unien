import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import appData from '@/data/app.data.json';
import { ROUTES } from '@/lib';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} />
              <div className="ml-2 col ">
                <h2 className="text-2xl font-bold">Unien</h2>
                <p className="text-lg">{appData.AppData.slogan}</p>
              </div>
            </div>
            <p className="text-gray-300 max-w-md">{appData.AppData.footer}</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="hover:text-gray-400 transition-colors"
                >
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="hover:text-gray-400 transition-colors"
                >
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="hover:text-gray-400 transition-colors"
                >
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="hover:text-gray-400 transition-colors"
                >
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
              <div className="bg-main border  px-5 py-2 text-white font-semibold shadow-md hover:bg-[#e88410] transition-all duration-300 ease-in-out">
                <Link
                  href={ROUTES.CONTACT}
                  className="hover:text-white transition-colors"
                >
                  Liên Hệ
                </Link>
              </div>
            </div>
          </div>

          {/* Main Pages */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold"></h3>
            <div className="grid grid-cols gap-x-8 gap-y-2">
              <Link href="#" className="hover:text-main transition-colors">
                Về Chúng Tôi
              </Link>
              <Link href="#" className="hover:text-main transition-colors">
                Dịch Vụ & Công Nghiệp
              </Link>
              <Link href="#" className="hover:text-main transition-colors">
                Dự Án
              </Link>
              <Link href="#" className="hover:text-main transition-colors">
                Bài Viết
              </Link>
            </div>
          </div>

          {/* Utility Pages */}
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <p className="text-gray-400 ">
                Người Đại Diện :
                <span className="text-white"> Nguyễn Đức Hiệp</span>
              </p>
              <p className="text-gray-400">
                Địa Chỉ :
                <span className="text-white"> {appData.AppData.address}</span>
              </p>
              <p className="text-gray-400 ">
                Email:<span className="text-white"> unienvn@gmail.com</span>
              </p>
              <p className="text-gray-400 ">Tel:</p>
              <p className="text-gray-400 ">
                MST : <span className="text-white"> 3703266418</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white">
            Copyright {new Date().getFullYear()} © Unien
          </p>
          <div className="mt-4 md:mt-0">
            <Link
              href="https://vietstrix.com"
              target="_blank"
              className="text-sm text-gray-200 bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-600"
            >
              by <span className="font-bold">Vietstrix</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
