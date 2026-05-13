import type {
  ProductsCreateRequest,
  ProductsGetRequest,
  ProductsUpdateRequest,
} from "./products-request.types";
import type {
  ProductsCreateResponse,
  ProductsGetResponse,
  ProductsUpdateResponse,
} from "./products-response.types";

/**
 * Port: products persistence. Implementations use Drizzle in db/main.
 */
export interface ProductsRepository {
  create(request: ProductsCreateRequest): Promise<ProductsCreateResponse>;
  get(request: ProductsGetRequest): Promise<ProductsGetResponse>;
  update(request: ProductsUpdateRequest): Promise<ProductsUpdateResponse>;
}
