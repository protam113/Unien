/**
 * ==========================
 *  @FILTERS
 * ==========================
 */

export interface Filters {
  [key: string]: string | number | string[] | undefined;
}

/**
 * ==========================
 *  @PAGINATION
 * ==========================
 */

export interface Pagination {
  page: number;
  page_size: number;
  total: number;
  total_page: number;
}

/**
 * ==========================
 *  @UPDATE_STATUS
 * ==========================
 */

export interface UpdateStatus {
  status: string;
}
