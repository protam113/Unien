'use client';

import PushButton from '@/components/button/PushButton';
import Container from '@/components/container/Container';
import Heading from '@/components/design/Heading';
import ServiceListDataAdmin from '@/components/pages/admin/service/ServiceList';
import React from 'react';

const Page = () => {
  return (
    <Container>
      <div className="flex items-center justify-between mb-4">
        <Heading
          name="Dịch Vụ"
          desc="Quản lý tất cả các dịch vụ có sẵn trên nền tảng. Bạn có thể tạo, cập nhật hoặc xóa các dịch vụ và đảm bảo rằng mỗi dịch vụ đều được mô tả rõ ràng và cập nhật cho người dùng."
        />
        <PushButton href="/admin/service/create_service" label="Tạo Dịch Vụ" />
      </div>

      <ServiceListDataAdmin />
    </Container>
  );
};

export default Page;
