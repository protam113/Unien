'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  ChevronDown,
  ChevronUp,
  Smartphone,
  Monitor,
  Tablet,
  HardDrive,
  Eye,
  Clock,
} from 'lucide-react';
import { TrackingList } from '@/lib/responses/trackingLib';

export default function HomeDashboard() {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Update params for data fetching
  const params = {
    limit: 5,
  };

  const { trackings, isLoading, isError } = TrackingList(1, params, 0);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Check if an item was created within the last 24 hours
  const isRecentlyCreated = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    return diffInHours <= 24;
  };

  // Toggle expanded row
  const toggleRowExpand = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Show loading state
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            Content Analytics Dashboard
          </CardTitle>
          <CardDescription>Loading data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Show error state
  if (isError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            Content Analytics Dashboard
          </CardTitle>
          <CardDescription className="text-red-500">
            Error loading data. Please try again.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead className="w-[250px]">Slug</TableHead>
                <TableHead className="w-[100px] cursor-pointer">
                  <div className="flex items-center">Type</div>
                </TableHead>
                <TableHead className="w-[80px] text-right cursor-pointer">
                  <div className="flex items-center justify-end">
                    <Eye className="mr-2 h-4 w-4" />
                    Views
                  </div>
                </TableHead>
                <TableHead className="w-[180px] cursor-pointer">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Created
                  </div>
                </TableHead>

                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trackings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                trackings.map((item) => (
                  <React.Fragment key={item._id}>
                    <TableRow
                      key={item._id}
                      className={
                        isRecentlyCreated(item.createdAt) ? 'bg-green-50' : ''
                      }
                    >
                      <TableCell className="font-medium">
                        {item.title}
                        {isRecentlyCreated(item.createdAt) && (
                          <Badge
                            variant="outline"
                            className="ml-2 bg-green-100 text-green-800 border-green-200"
                          >
                            New
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="block max-w-[200px] truncate">
                                {item.slug}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{item.slug}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.type === 'blog' ? 'default' : 'secondary'
                          }
                        >
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{item.views}</TableCell>
                      <TableCell>{formatDate(item.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleRowExpand(item._id)}
                          >
                            {expandedRows[item._id] ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedRows[item._id] && (
                      <TableRow>
                        <TableCell colSpan={7} className="p-0 border-t-0">
                          <div className="p-4 bg-muted/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Card>
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-sm font-medium">
                                    By Device
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex items-center">
                                      <Smartphone className="h-4 w-4 mr-2 text-muted-foreground" />
                                      <span className="text-sm">Mobile:</span>
                                      <span className="ml-auto font-medium">
                                        {item.byDevice.mobile}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <Monitor className="h-4 w-4 mr-2 text-muted-foreground" />
                                      <span className="text-sm">Desktop:</span>
                                      <span className="ml-auto font-medium">
                                        {item.byDevice.desktop}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <Tablet className="h-4 w-4 mr-2 text-muted-foreground" />
                                      <span className="text-sm">Tablet:</span>
                                      <span className="ml-auto font-medium">
                                        {item.byDevice.tablet}
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <HardDrive className="h-4 w-4 mr-2 text-muted-foreground" />
                                      <span className="text-sm">Other:</span>
                                      <span className="ml-auto font-medium">
                                        {item.byDevice.other}
                                      </span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
