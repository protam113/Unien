import React from 'react';
import { Container } from '@/components/wrappers/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentInvoices } from '@/components/table/recent-invoices';
import Header from '@/components/design/Header';
import WelcomeBanner from '@/components/wrappers/welcome-banner';

const Page = () => {
  return (
    <Container>
      <div className="mb-5">
        <WelcomeBanner />
      </div>
      <Header title="Hust4l Area" />

      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Liên Hệ Mới</CardTitle>
          <CardTitle>
            <a
              href="/admin/contact"
              className="text-sm text-muted-foreground hover:text-primary hover:underline"
            >
              Xem toàn bộ
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecentInvoices />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Page;
