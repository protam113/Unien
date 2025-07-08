/**
 * ==========================
 *  @PRODUCT
 * ==========================
 */

import { Pagination } from '../base/base.type';
import { ChildCategory, UserDataComponents } from '../types';

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
  status: string;
  price: number;
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
 *  @PRODUCT_CREATE
 * ==========================
 */

export interface CreateProductItem {
  title: string;
  files: File[] | File;
  content: string;
  price: string;
  category: string;
  status?: string;
  description: string;
}
