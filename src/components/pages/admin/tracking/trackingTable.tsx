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
  CalendarIcon,
} from 'lucide-react';
import { CustomPagination } from '@/components/design/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RefreshButton } from '@/components/button/RefreshButton';
import { TrackingList } from '@/lib/responses/trackingLib';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Define the Type enum
enum Type {
  All = 'all',
  Blog = 'blog',
  Service = 'service',
  Project = 'project',
}

enum Arrange {
  All = 'all',
  HighView = 'asc',
  LowView = 'desc',
}

export default function AnalyticsDashboard() {
  const [sortDirection, setSortDirection] = useState<Arrange>(Arrange.All);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedType, setSelectedType] = useState<Type>(Type.All);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // Update params for data fetching
  const params = {
    type: selectedType !== 'all' ? selectedType : undefined,
    sort: sortDirection !== 'all' ? sortDirection : undefined,
    limit: pageSize,
    startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
    endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
  };

  const { trackings, isLoading, isError, pagination } = TrackingList(
    currentPage,
    params,
    refreshKey
  );

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

  // Handle sort change

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
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
      <CardHeader>
        <CardTitle className="text-2xl">Content Analytics Dashboard</CardTitle>
        <CardDescription>
          Track performance metrics for your content across different platforms
          and devices
        </CardDescription>
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Filter status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-sm font-medium whitespace-nowrap">Show:</span>
            <Select
              onValueChange={handlePageSizeChange}
              defaultValue={String(pageSize)}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>

            <span className="text-sm font-medium whitespace-nowrap ml-4">
              Arrange:
            </span>
            <Select
              onValueChange={(value) => setSortDirection(value as Arrange)}
              defaultValue={sortDirection}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Arrange.All}>All</SelectItem>
                <SelectItem value={Arrange.HighView}>Lowest views</SelectItem>
                <SelectItem value={Arrange.LowView}>Highest views</SelectItem>
              </SelectContent>
            </Select>

            {/* Type filter */}
            <span className="text-sm font-medium whitespace-nowrap ml-4">
              Type:
            </span>
            <Select
              onValueChange={(value) => setSelectedType(value as Type)}
              defaultValue={selectedType}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Type.All}>All</SelectItem>
                <SelectItem value={Type.Blog}>Blog</SelectItem>
                <SelectItem value={Type.Service}>Service</SelectItem>
                <SelectItem value={Type.Project}>Project</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-sm font-medium whitespace-nowrap">
                Date Range:
              </span>

              {/* Start Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-[140px] justify-start text-left font-normal',
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, 'MMM dd, yyyy')
                    ) : (
                      <span>Start Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* End Date Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-[140px] justify-start text-left font-normal',
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, 'MMM dd, yyyy')
                    ) : (
                      <span>End Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => (startDate ? date < startDate : false)}
                  />
                </PopoverContent>
              </Popover>

              {/* Clear Dates Button */}
              {(startDate || endDate) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setStartDate(undefined);
                    setEndDate(undefined);
                  }}
                  className="h-9"
                >
                  Clear
                </Button>
              )}
            </div>

            <RefreshButton onClick={handleRefresh} />
          </div>
        </div>
      </CardHeader>
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
                <TableHead className="w-[180px]">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Updated
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
                      <TableCell>{formatDate(item.updatedAt)}</TableCell>
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

        <CustomPagination
          currentPage={currentPage}
          totalPage={pagination.total_page}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
}
