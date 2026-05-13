/**
 * API request shapes (TypeScript only) for addresses.
 * Naming convention: ClassName(method) + MethodName + Request.
 * AddressesApi -> AddressesListRequest / AddressesCreateRequest / ...
 */

export interface AddressesListRequest {
  /** Snowflake ID, transmitted as string in JSON */
  path: { userId: string };
}

export interface AddressesCreateRequest {
  data: {
    receiverName: string;
    phone: string;
    country: string;
    province: string;
    city: string;
    district?: string | null;
    street: string;
    postalCode?: string | null;
    isDefault?: boolean;
  };
  /** Snowflake ID, transmitted as string in JSON */
  path: { userId: string };
}

export interface AddressesUpdateRequest {
  data: {
    receiverName?: string;
    phone?: string;
    country?: string;
    province?: string;
    city?: string;
    district?: string | null;
    street?: string;
    postalCode?: string | null;
    isDefault?: boolean;
  };
  /** Snowflake ID, transmitted as string in JSON */
  path: { userId: string; addressId: string };
}

export interface AddressesDeleteRequest {
  /** Snowflake ID, transmitted as string in JSON */
  path: { userId: string; addressId: string };
}
