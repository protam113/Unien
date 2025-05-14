//api/api.ts

/**
 * ==========================
 * 📌 @API Services URL
 * ==========================
 *
 * @desc Base Services URL
 */

const baseURL = process.env.NEXT_PUBLIC_BASE_URL_DEV;

/**
 * ========== @Endpoints ==========
 */
const endpoints = {
  //auth
  logout: process.env.NEXT_PUBLIC_LOGOUT,
  login: process.env.NEXT_PUBLIC_LOGIN,
  changePassword: process.env.NEXT_PUBLIC_UPDATE_PASSWORD,
  verifyCode: process.env.NEXT_PUBLIC_VERIFY_CODE,

  // Auth User
  currentUser: process.env.NEXT_PUBLIC_CURRENT_USER,
  user: process.env.NEXT_PUBLIC_USER,
  managers: process.env.NEXT_PUBLIC_MANAGERS,
  manager: process.env.NEXT_PUBLIC_MANAGER,
  userStatistic: process.env.NEXT_PUBLIC_USER_STATISTIC,

  //category
  categories: process.env.NEXT_PUBLIC_CATEGORIES,
  category: process.env.NEXT_PUBLIC_CATEGORY_DETAIL,
  categoryEdit: process.env.NEXT_PUBLIC_CATEGORY,
  categoryStatus: process.env.NEXT_PUBLIC_CATEGORY_STATUS,

  // contact
  contacts: process.env.NEXT_PUBLIC_CONTACTS,
  contact: process.env.NEXT_PUBLIC_CONTACT,

  //Blog
  blogs: process.env.NEXT_PUBLIC_BLOGS,
  blogDetail: process.env.NEXT_PUBLIC_BLOG_DETAIL,
  blog: process.env.NEXT_PUBLIC_BLOG,
  blogStatus: process.env.NEXT_PUBLIC_BLOG_STATUS,

  //   Seo
  seo: process.env.NEXT_PUBLIC_SEO,

  //   faq
  faqs: process.env.NEXT_PUBLIC_FAQS,
  faq: process.env.NEXT_PUBLIC_FAQ,
  faqStatus: process.env.NEXT_PUBLIC_FAQ_STATUS,

  //   Service
  services: process.env.NEXT_PUBLIC_SERVICES,
  serviceDetail: process.env.NEXT_PUBLIC_SERVICE_DETAIL,
  service: process.env.NEXT_PUBLIC_SERVICE,
  serviceStatus: process.env.NEXT_PUBLIC_SERVICE_STATUS,

  // Project
  projects: process.env.NEXT_PUBLIC_PROJECTS,
  projectDetail: process.env.NEXT_PUBLIC_PROJECT_DETAIL,
  project: process.env.NEXT_PUBLIC_PROJECT,
  projectStatus: process.env.NEXT_PUBLIC_PROJECT_STATUS,

  // Product
  products: process.env.NEXT_PUBLIC_PRODUCTS,
  productDetail: process.env.NEXT_PUBLIC_PRODUCT_DETAIL,
  product: process.env.NEXT_PUBLIC_PRODUCT,
  productStatus: process.env.NEXT_PUBLIC_PRODUCT_STATUS,

  // Logsd
  logs: process.env.NEXT_PUBLIC_LOGS,

  // Media
  media: process.env.NEXT_PUBLIC_MEDIA,
};

export { baseURL, endpoints };
