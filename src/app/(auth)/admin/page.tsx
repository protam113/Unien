import React from 'react';
import Container from '@/components/container/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RecentInvoices } from '@/components/table/recent-invoices';
import Header from '@/components/design/Header';
import WelcomeBanner from '@/components/container/welcome-banner';

const Page = () => {
  return (
    <Container>
      <div className="mb-5">
        <WelcomeBanner />
      </div>
      <Header title="Hust4l Area" />

      <Card className=" mb-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Contacts</CardTitle>
          <CardTitle>
            <a
              href="/admin/contact"
              className="text-sm text-muted-foreground hover:text-primary hover:underline"
            >
              View All
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
