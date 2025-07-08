/**
 * ==========================
 *  @CONTACT
 * ==========================
 */

import { Pagination } from '../base/base.type';

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
