/**
 * External API response shapes (TypeScript only; validation in services).
 * Naming convention: ClassName(method) + MethodName + Response.
 * AddressesApi -> AddressesListResponse / AddressesCreateResponse / ...
 */

export interface AddressesListResponse {
  addresses: {
    /** Snowflake ID, string in JSON */
    id: string;
    userId: string;
    receiverName: string;
    phone: string;
    country: string;
    province: string;
    city: string;
    district?: string | null;
    street: string;
    postalCode?: string | null;
    isDefault: boolean;
    /** ISO 8601 datetime string */
    createdAt: string;
    /** ISO 8601 datetime string */
    updatedAt: string;
  }[];
  total: number;
}

export interface AddressesCreateResponse {
  city: string;
  country: string;
  /** ISO 8601 datetime string */
  createdAt: string;
  district?: string | null;
  /** Snowflake ID, string in JSON */
  id: string;
  isDefault: boolean;
  phone: string;
  postalCode?: string | null;
  province: string;
  receiverName: string;
  street: string;
  /** ISO 8601 datetime string */
  updatedAt: string;
  userId: string;
}

export interface AddressesUpdateResponse {
  city: string;
  country: string;
  /** ISO 8601 datetime string */
  createdAt: string;
  district?: string | null;
  /** Snowflake ID, string in JSON */
  id: string;
  isDefault: boolean;
  phone: string;
  postalCode?: string | null;
  province: string;
  receiverName: string;
  street: string;
  /** ISO 8601 datetime string */
  updatedAt: string;
  userId: string;
}

export interface AddressesDeleteResponse {
  success: boolean;
}
