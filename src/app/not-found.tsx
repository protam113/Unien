import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <h1
          className="text-[220px] font-bold leading-none tracking-tighter animate-fade-in-down"
          style={{ animationDelay: '0.2s', animationDuration: '0.8s' }}
        >
          404
        </h1>
        <h2
          className="text-4xl font-bold animate-fade-in-up"
          style={{ animationDelay: '0.4s', animationDuration: '0.8s' }}
        >
          We lost this page
        </h2>
        <p
          className="text-muted-foreground animate-fade-in-up"
          style={{ animationDelay: '0.6s', animationDuration: '0.8s' }}
        >
          The page you are looking for doesn&apos;t exist or has been moved.
          <br />
          But you&apos;ll definitely love our works.
        </p>
        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
          style={{ animationDelay: '0.8s', animationDuration: '0.8s' }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-main px-6 py-3 font-medium text-black transition-colors hover:bg-[#b1ef62] hover:scale-105 transform  md:transition-transform duration-300 animate-pulse-subtle"
          >
            BACK TO HOMEPAGE
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 font-medium transition-colors hover:bg-gray-100 hover:scale-105 transform md:transition-transform duration-300"
          >
            SEE OUR SERVICES
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
