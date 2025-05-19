'use client';

import { useState } from 'react';
import { CheckCircle, Eye, EyeOff, Mail } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useChangePassword, useGetVerifyCode } from '@/hooks/auth/useAuth';
import { ChangePassword, VerifyCode } from '@/types/types';
import Link from 'next/link';

// Password schema with validation
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Verification code schema
const verificationSchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 digits'),
});

export default function UpdatePasswordPage() {
  const [step, setStep] = useState<'password' | 'verification' | 'success'>(
    'password'
  );
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: changePassword } = useChangePassword();
  const { mutate: checkVerifyCode } = useGetVerifyCode();

  // Form for password update
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Form for verification code
  const verificationForm = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
    },
  });

  // Handle password form submission
  function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      // Create a blog item object matching the CreateBlogItem type
      const updatePassword: ChangePassword = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };
      changePassword(updatePassword);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setStep('verification');
    }
  }

  // Handle verification form submission
  function onVerificationSubmit(values: z.infer<typeof verificationSchema>) {
    try {
      const checkCode: VerifyCode = {
        code: values.code,
      };
      checkVerifyCode(checkCode);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setStep('success');
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-screen 0">
      <div className="container max-w-md py-10">
        {step === 'password' && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Cập Nhật Mật Khẩu</CardTitle>
              <CardDescription>
                Thay đổi mật khẩu tài khoản của bạn. Bạn sẽ cần xác minh thay
                đổi này.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="Enter current password"
                              type={showCurrentPassword ? 'text' : 'password'}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {showCurrentPassword
                                ? 'Hide password'
                                : 'Show password'}
                            </span>
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="Enter new password"
                              type={showNewPassword ? 'text' : 'password'}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {showNewPassword
                                ? 'Hide password'
                                : 'Show password'}
                            </span>
                          </Button>
                        </div>
                        <FormDescription>
                          Password must be at least 8 characters with uppercase,
                          lowercase, and numbers.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="Confirm new password"
                              type={showConfirmPassword ? 'text' : 'password'}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {showConfirmPassword
                                ? 'Hide password'
                                : 'Show password'}
                            </span>
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Continue
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {step === 'verification' && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Verify Password Change</CardTitle>
              <CardDescription>
                Enter the 6-digit verification code sent to your email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...verificationForm}>
                <form
                  onSubmit={verificationForm.handleSubmit(onVerificationSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={verificationForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verification Code</FormLabel>
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <FormControl>
                            <Input
                              placeholder="Enter 6-digit code"
                              maxLength={6}
                              className="text-center text-lg tracking-widest"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          The code was sent to your email address. It will
                          expire in 10 minutes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-2">
                    <Button type="submit" className="w-full">
                      Verify and Change Password
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setStep('password')}
                    >
                      Back to Password Form
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {step === 'success' && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Password Updated</CardTitle>
              <CardDescription>
                Your password has been successfully updated.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                <CheckCircle className="h-10 w-10" />
              </div>
              <p className="text-center text-muted-foreground">
                Your account is now secured with your new password. You can use
                it to log in to your account.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/admin" className="w-full bg-lime-400">
                Back to Dashboard
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
