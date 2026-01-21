// Shared type definitions for the EBYF Info application

export interface Role {
  id?: string;
  role: {
    id?: string;
    name: string;
  };
  startedAt?: string;
  endedAt?: string;
}

export interface User {
  id: string;
  name?: string;
  number?: number;
  phone?: string;
  email?: string;
  veng?: {
    id?: string;
    name?: string;
  } | string;
  roles?: Role[];
  image?: string;
  fbLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = unknown> {
  members?: T;
  totalMembers?: number;
  totalItems?: number;
  lastSync?: string;
  error?: string;
}

export interface FilterOptions {
  includedRoles?: string[];
  excludedRoles?: string[];
  keywords?: string;
  searchQuery?: string;
}

export interface UserFormData {
  name: string;
  image?: string;
  phone?: string;
  email?: string;
  role?: string;
  position?: string;
  veng?: string;
  fb?: string;
}

export interface FeedbackData {
  name?: string;
  email?: string;
  phone?: string;
  message: string;
  anonymous: boolean;
}