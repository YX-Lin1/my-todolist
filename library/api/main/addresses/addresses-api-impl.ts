import type { IHttpClient } from "@surgeteam/http-client/types";
import type { AddressesApi } from "./addresses-api";
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
 * Main provider addresses API implementation (e.g. /users/:userId/addresses).
 * Uses injected IHttpClient and returns external API response shapes only.
 */
export class AddressesApiImpl implements AddressesApi {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async list(request: AddressesListRequest): Promise<AddressesListResponse> {
    const res = await this.httpClient.get<AddressesListResponse>(
      `/users/${request.path.userId}/addresses`
    );
    return res.data;
  }

  async create(
    request: AddressesCreateRequest
  ): Promise<AddressesCreateResponse> {
    const res = await this.httpClient.post<AddressesCreateResponse>(
      `/users/${request.path.userId}/addresses`,
      request.data
    );
    return res.data;
  }

  async update(
    request: AddressesUpdateRequest
  ): Promise<AddressesUpdateResponse> {
    const res = await this.httpClient.patch<AddressesUpdateResponse>(
      `/users/${request.path.userId}/addresses/${request.path.addressId}`,
      request.data
    );
    return res.data;
  }

  async delete(
    request: AddressesDeleteRequest
  ): Promise<AddressesDeleteResponse> {
    const res = await this.httpClient.delete<AddressesDeleteResponse>(
      `/users/${request.path.userId}/addresses/${request.path.addressId}`
    );
    return res?.data ?? { success: true };
  }
}
