'use client';

import { LabelList, Pie, PieChart } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { UserStatistict } from '@/lib/responses/userLib';

export default function UserRolesChart() {
  const { data, isLoading, isError } = UserStatistict(0);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const adminPercentage = Math.round((data.admin / data.totalUsers) * 100);
  const managerPercentage = Math.round((data.manager / data.totalUsers) * 100);

  return (
    <ChartContainer
      className="mb-4 max-w-[400px]"
      config={{
        admin: {
          label: 'Admin',
          color: 'hsl(221, 83%, 53%)',
        },
        manager: {
          label: 'Manager',
          color: 'hsl(142, 76%, 36%)',
        },
      }}
    >
      <PieChart>
        <Pie
          data={[
            {
              role: 'Admin',
              value: data.admin,
              percentage: adminPercentage,
              fill: 'var(--color-admin)',
            },
            {
              role: 'Manager',
              value: data.manager,
              percentage: managerPercentage,
              fill: 'var(--color-manager)',
            },
          ]}
          dataKey="value"
          nameKey="role"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ role, percentage }) => `${role}: ${percentage}%`}
          labelLine={false}
        >
          <LabelList
            dataKey="role"
            position="inside"
            fill="#FFFFFF"
            stroke="none"
            fontSize={12}
          />
        </Pie>
        <ChartLegend
          content={({ payload }) => (
            <ChartLegendContent>
              {payload?.map((entry, index) => (
                <div key={`item-${index}`} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>
                    {entry.value === data.admin ? 'Admin' : 'Manager'}:{' '}
                    {entry.value}
                  </span>
                </div>
              ))}
            </ChartLegendContent>
          )}
          className="mt-4 flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
