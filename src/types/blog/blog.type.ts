/**
 * ==========================
 *  @BLOG
 * ==========================
 */

import { Pagination } from '../base/base.type';
import { ChildCategory, UserDataComponents } from '../types';

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
