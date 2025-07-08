/**
 * ==========================
 *  @CATEGORY
 * ==========================
 */

import { Pagination } from '../base/base.type';
import { UserDataComponents } from '../types';

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
