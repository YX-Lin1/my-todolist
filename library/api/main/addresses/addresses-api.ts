import type {
  AddressesCreateRequest,
  AddressesDeleteRequest,
  AddressesListRequest,
  AddressesUpdateRequest,
} from "./addresses-request.types";
import type {
  AddressesCreateResponse,
  AddressesDeleteResponse,
  AddressesListResponse,
  AddressesUpdateResponse,
} from "./addresses-response.types";

/**
 * Port: addresses API for the main provider. Implementations use HttpClient.
 * Returns API response types only; services map to domain.
 */
export interface AddressesApi {
  create(request: AddressesCreateRequest): Promise<AddressesCreateResponse>;
  delete(request: AddressesDeleteRequest): Promise<AddressesDeleteResponse>;
  list(request: AddressesListRequest): Promise<AddressesListResponse>;
  update(request: AddressesUpdateRequest): Promise<AddressesUpdateResponse>;
}
