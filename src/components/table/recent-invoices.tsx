'use client';

import { Badge } from '@/components/ui/badge';
import { ContactList } from '@/lib/responses/contactLib';
import { Loader2 } from 'lucide-react';
import NoResultsFound from '@/components/design/NoResultsFound';

export function RecentInvoices() {
  const { contacts, isLoading, isError } = ContactList(
    1,
    {
      limit: 5,
    },
    0
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <NoResultsFound />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-sm font-medium text-muted-foreground">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Email Address</th>
            <th className="px-4 py-3">Contact Date</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((invoice) => (
            <tr key={invoice._id} className="border-b text-sm">
              <td className="px-4 py-3 font-medium">{invoice._id}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span>{invoice.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {invoice.email}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {invoice.createdAt}
              </td>
              <td className="px-4 py-3">
                <Badge
                  variant={
                    (invoice as any).status === 'pending'
                      ? 'default'
                      : 'secondary'
                  }
                  className={
                    (invoice as any).status === 'Paid'
                      ? 'bg-green-50 text-green-600 hover:bg-green-50 hover:text-green-600'
                      : ''
                  }
                >
                  {(invoice as any).status || 'N/A'}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
