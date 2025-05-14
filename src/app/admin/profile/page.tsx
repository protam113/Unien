'use client';

import BackButton from '@/components/button/BackButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/authStore';
import { User, Phone, Mail, Shield } from 'lucide-react';

const ProfilePage = () => {
  // This would typically come from an API or context
  const userInfo = useAuthStore((state) => state.userInfo);

  // Get initials for avatar fallback
  const getInitials = (name: string | undefined) => {
    if (!name) return '';
    return name
      .split(' ')
      .map((part: string) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <main className="mx-auto py-8 px-4">
      <BackButton />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column - Avatar and basic info */}
            <div className="md:w-1/3">
              <Card>
                <CardContent className="pt-6 flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src="/Logo.png" alt={userInfo?.name} />
                    <AvatarFallback className="text-2xl">
                      {getInitials(userInfo?.name)}
                    </AvatarFallback>
                  </Avatar>

                  <h2 className="text-2xl font-bold text-center">
                    {userInfo?.name}
                  </h2>
                  <p className="text-muted-foreground text-center mb-2">
                    @{userInfo?.username}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge
                      variant="outline"
                      className="px-2 py-1 flex items-center gap-1"
                    >
                      <Shield className="h-3 w-3" />
                      {userInfo?.role}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Detailed information */}
            <div className="md:w-2/3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Full Name
                          </p>
                          <p className="font-medium">{userInfo?.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{userInfo?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{userInfo?.phoneNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
