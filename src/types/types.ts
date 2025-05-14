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
  phoneNumber: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FetchManagerListResponse {
  pagination: Pagination;
  results: ManagerData[];
}

export interface CreateManagerData {
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface FetchCategoryListResponse {
  pagination: Pagination;
  results: Category[];
}

export interface CreateCategoryItem {
  name: string;
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
  createdAt: string;
  updatedAt: string;
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
 *  @TRACKING
 * ==========================
 */
interface DeviceData {
  mobile: number;
  desktop: number;
  tablet: number;
  other: number;
}

interface AnalyticsItem {
  _id: string;
  postId: string;
  title: string;
  slug: string;
  type: string;
  views: number;
  byDevice: DeviceData;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsData {
  results: AnalyticsItem[];
  pagination: Pagination;
}

/**
 * ==========================
 *  @CREATE_TRACKING
 * ==========================
 */
export interface CreateTracing {
  slug: string;
  type: string;
  byDevice: string;
}
