import type {
  OrdersCreateRequest,
  OrdersFindByUserIdRequest,
  OrdersGetRequest,
  OrdersUpdateRequest,
} from "./orders-request.types";
import type {
  OrdersCreateResponse,
  OrdersFindByUserIdResponse,
  OrdersGetResponse,
  OrdersUpdateResponse,
} from "./orders-response.types";

/**
 * Port: orders persistence. Implementations use Drizzle in db/main.
 */
export interface OrdersRepository {
  create(request: OrdersCreateRequest): Promise<OrdersCreateResponse>;
  findByUserId(
    request: OrdersFindByUserIdRequest
  ): Promise<OrdersFindByUserIdResponse>;
  get(request: OrdersGetRequest): Promise<OrdersGetResponse>;
  update(request: OrdersUpdateRequest): Promise<OrdersUpdateResponse>;
}
