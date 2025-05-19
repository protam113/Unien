import { Category } from './types';

/**
 * ==========================
 * 📌 @Contact
 * ==========================
 */

export const ContactColumns = [
  { key: 'number', label: 'Id', className: 'font-medium' },
  { key: 'detail', label: 'Chi Tiết', className: 'font-medium' },
  { key: 'name', label: 'Tên', className: 'font-medium' },
  { key: 'phone_number', label: 'Tel', className: 'font-medium' },
  { key: 'email', label: 'Email', className: 'font-medium' },
  { key: 'service', label: 'Dịch Vụ', className: 'font-medium' },
  { key: 'status', label: 'Trạng Thái', className: 'font-medium' },
];

/**
 * ==========================
 * 📌 @CATEGORY
 * ==========================
 */

export const CategoryColumns = [
  {
    key: '_id',
    label: 'ID',
    className: 'font-mono text-sm text-muted-foreground',
  },
  { key: 'name', label: 'Title', className: 'font-medium' },
  { key: 'status', label: 'Status', className: 'font-medium' },
  { key: 'actions', label: 'Actions', className: 'text-right' },
];

/**
 * ==========================
 * 📌 @props CategoryTableProps
 * ==========================
 */

export interface CategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: string) => void;
}

/**
 * ==========================
 * 📌 @FAQ
 * ==========================
 */

export const FaqColumns = [
  {
    key: '_id',
    label: 'ID',
    className: 'font-mono text-sm text-muted-foreground',
  },
  { key: 'question', label: 'Question', className: 'font-semibold' },

  { key: 'status', label: 'Status', className: 'font-semibold' },
  { key: 'actions', label: 'Actions', className: 'text-right' },
];

/**
 * ==========================
 * 📌 @EMPLOYEE
 * ==========================
 */

export const EmployeeColumns = [
  {
    key: 'id',
    label: 'ID',
    className: 'font-mono text-sm text-muted-foreground',
  },
  { key: 'username', label: 'Username', className: 'font-medium' },
  { key: 'name', label: 'Name', className: 'font-medium' },
  { key: 'email', label: 'Email', className: 'font-medium' },
  { key: 'role', label: 'Role', className: 'font-medium' },
];
