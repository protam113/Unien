/**
 * ==========================
 *  @FILTERS
 * ==========================
 */

export interface Filters {
  [key: string]: string | number | string[] | undefined;
}

export interface HeaderProps {
  title: string;
  className?: string;
}

export interface WelcomeBannerProps {
  message?: string;
}

/**
 * ==========================
 *  @UPLOAD_MEDIA
 * ==========================
 */

export interface UploadMedia {
  path: string;
  file: File;
}

/**
 * ==========================
 *  @PAGINATION
 * ==========================
 */

interface Pagination {
  total_page: number;
  page_size: number;
  current_page: number;
  total: number;
}

/**
 * ==========================
 *  @SEO
 * ==========================
 */

export interface SeoData {
  site_title: string;
  site_description: string;
  keywords: string[];
  domain: string;
}

export interface UpdateSeo {
  site_title?: string;
  site_description?: string;
  domain?: string;
  keywords?: string[];
  google_analytics_id?: string;
  gtm_id?: string;
  facebook_pixel_id?: string;
  search_console_verification?: string;
}

export interface UserDataComponents {
  username: string;
  role: string;
}

/**
 * ==========================
 *  @UPDATE_STATUS
 * ==========================
 */

export interface UpdateStatus {
  status: string;
}

/**
 * ==========================
 *  @AUTH
 * ==========================
 */
export interface UserData {
  _id: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface PersistedUserInfo {
  _id: string;
  role: string;
  username: string;
  name: string;
  email: string;
}

export interface UserDataStatistic {
  totalUsers: number;
  manager: number;
  admin: number;
}

/**
  change password Interface
 **/
export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyCode {
  code: string;
}

/**
 * ==========================
 *  @MANAGE
 * ==========================
 */
interface ManagerData {
  _id: string;
  username: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface FetchManagerListResponse {
  pagination: Pagination;
  results: ManagerData[];
}

export interface CreateManagerData {
  username: string;
  name: string;
  email: string;
  phone_number: string;
  password: string;
}

/**
 * ==========================
 *  @CATEGORY
 * ==========================
 */

/*
  Category Attribute Declaration
*/
export interface Category {
  _id: string;
  name: string;
  slug: string;
  type: string;
  status: string;
  user?: UserDataComponents;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface FetchCategoryListResponse {
  pagination: Pagination;
  results: Category[];
}

export interface CreateCategoryItem {
  name: string;
  type: string;
  status?: string;
}

/*
    Category Detail Attribute Declaration
  */
interface CategoryDetail {
  id: string;
  title: string;
  slug: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface FetchCategoryDetailResponse {
  status: string;
  data: CategoryDetail;
}

// ========================
// End Category
// ========================

/**
 * ==========================
 *  @CONTACT
 * ==========================
 */

interface ContactService {
  _id: string;
  title: string;
}

interface ContactList {
  _id: string;
  name: string;
  email: string;
  phone_number: string;
  message: string;
  link?: string;
  service?: ContactService;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface FetchContactListResponse {
  pagination: Pagination;
  results: ContactList[];
}

/*
  Update status
*/

export interface UpdateContactStatus {
  status: string;
}

/*
  Push contact
*/

export interface CreateContactItem {
  name: string;
  email: string;
  phone_number: string;
  message: string;
  service?: string;
}

// ========================
// End Contact
// ========================

/**
 * ==========================
 *  @PROJECT
 * ==========================
 */

interface ProjectService {
  _id: string;
  title: string;
}

interface ProjectList {
  _id: string;
  title: string;
  slug: string;
  file: string;
  content: string;
  description: string;
  service: ProjectService[];
  testimonial: string;
  brand_name: string;
  user: UserDataComponents;
  client: string;
  link?: number;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface FetchProjectListResponse {
  pagination: Pagination;
  results: ProjectList[];
}

/**
 * ==========================
 *  @PROJECT_DETAIL
 * ==========================
 */

interface ProjectDetail {
  _id: string;
  title: string;
  slug: string;
  file: string;
  content: string;
  description: string;
  service: ProjectService[];
  testimonial: string;
  brand_name: string;
  client: string;
  link?: number;
  status: string;
  user: UserDataComponents;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ProjectDetailResponse {
  status: string;
  result: ProjectDetail;
}

/**
 * ==========================
 *  @PROJECT_CREATED
 * ==========================
 */

export interface CreateProjectItem {
  title: string;
  content: string;
  file: File;
  service: string[];
  description: string;
  brand_name: string;
  status: string;
  testimonial: string;
  client: string;
  link?: string | null;
}

/**
 * ==========================
 *  @SERVICE
 * ==========================
 */

interface ServiceList {
  _id: string;
  title: string;
  content: string;
  description: string;
  file: string;
  slug: string;
  user?: UserDataComponents;
  price: number;
  status: string;
  category: ChildCategory;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface FetchServiceListResponse {
  pagination: Pagination;
  results: ServiceList[];
}

/**
 * ==========================
 *  @SERVICE_DETAIL
 * ==========================
 */

export interface ServiceDetail {
  _id: string;
  title: string;
  slug: string;
  file: string;
  content: string;
  price: number;
  status: string;
  description: string;
  category: ChildCategory;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ServiceDetailResponse {
  status: string;
  result: ServiceDetail;
}

/**
 * ==========================
 *  @SERVICE_DETAIL
 * ==========================
 */

export interface ServiceDetailResponse {
  _id: string;
  title: string;
  slug: string;
  file: string;
  content: string;
  price: number;
  category: ChildCategory;
  status: string;
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * ==========================
 *  @SERVICE_Create
 * ==========================
 */

export interface CreateServiceItem {
  title: string;
  file: File;
  content: string;
  price: string;
  category: string;
  status?: string;
  description: string;
}

/**
 * ==========================
 *  @PRODUCT
 * ==========================
 */

interface ProductList {
  _id: string;
  title: string;
  content: string;
  description: string;
  file: string[];
  slug: string;
  user?: UserDataComponents;
  price: number;
  status: string;
  category: ChildCategory;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface FetchProductListResponse {
  pagination: Pagination;
  results: ProductList[];
}

/**
 * ==========================
 *  @PRODUCT_DETAIL
 * ==========================
 */

export interface ProductDetail {
  _id: string;
  title: string;
  slug: string;
  file: string[];
  content: string;
  price: number;
  status: string;
  description: string;
  category: ChildCategory;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ProductDetailResponse {
  status: string;
  result: ProductDetail;
}

/**
 * ==========================
 *  @SERVICE_Create
 * ==========================
 */

export interface CreateProductItem {
  title: string;
  file: File[] | File;
  content: string;
  price: string;
  category: string;
  status?: string;
  description: string;
}

/**
 * ==========================
 *  @BLOG_CATEGORY
 * ==========================
 */
interface ChildCategory {
  _id: string;
  name: string;
}
/**
 * ==========================
 *  @BLOG
 * ==========================
 */

interface BlogList {
  _id: string;
  title: string;
  content: string;
  description: string;
  file: string;
  link: string;
  slug: string;
  user?: UserDataComponents;
  category: ChildCategory;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface FetchBlogListResponse {
  pagination: Pagination;
  results: BlogList[];
}

/**
 * ==========================
 *  @BLOG_DETAIL
 * ==========================
 */

export interface BlogDetail {
  _id: string;
  title: string;
  slug: string;
  content: string;
  file: string;
  category: ChildCategory;
  user?: UserDataComponents;
  status: string;
  description: string;
  link?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface BlogDetailResponse {
  status: string;
  result: BlogDetail;
}

/**
 * ==========================
 *  @BLOG_CREATED
 * ==========================
 */

export interface CreateBlogItem {
  title: string;
  content: string;
  file: File;
  category: string;
  description: string;
  status: string;
  link?: string | null;
}

export interface CopyLinkButtonProps {
  url?: string;
}

/**
 * ==========================
 * @PushButtonProps
 * ==========================
 */ export interface PushButtonProps {
  href: string;
  label: string;
}

export const CategoryColumns = [
  {
    key: '_id',
    label: 'ID',
    className: 'font-mono text-sm text-muted-foreground',
  },
  { key: 'name', label: 'Tên', className: 'font-medium' },
  { key: 'type', label: 'Thể Loại', className: 'font-medium' },
  { key: 'status', label: 'Trạng Thái', className: 'font-medium' },
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
 * 📌 @props ContactTableProps
 * ==========================
 */

export interface ContactTableProps {
  contacts: any[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: string) => void;
}
