'use client';

import RadiatingLoader from '@/components/loading/radiating-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const { login, checkAuth } = useAuthStore();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login(username, password);
      await checkAuth();

      if (!useAuthStore.getState().isAuthenticated) {
        setIsSubmitting(false);
        return;
      }

      setTimeout(() => {
        setIsSubmitting(false);
        router.push('/admin');
      }, 2000);
    } catch {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div>
        <RadiatingLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side with illustration */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-lime-500 text-white">
        <div className="max-w-md mx-auto text-center space-y-6">
          <Image
            src="/Logo.png"
            alt="Decorative bird illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h2 className="text-2xl font-medium">Hust4L</h2>
          <p className="text-sm text-white/80">
            Eidum et malesuada fames ac ante ipsum primis in faucibus
            suspendisse porta
          </p>
          {/* Dots navigation */}
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-lime-700 mb-6">Hust4L</h1>
            <h2 className="text-xl text-gray-600">Welcome to Hust4l</h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="email">
                Username
              </label>
              <Input
                id="username"
                placeholder="Hust4l account"
                className="w-full p-2 border rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                className="w-full p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full font-bold text-xl bg-lime-500 hover:bg-lime-700 text-white"
              disabled={isSubmitting}
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
