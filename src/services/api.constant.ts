export const _API_ = {
  AUTH: {
    LOGIN: "auth/login",
    LOGOUT: "auth/logout",
    REGISTER: "auth/register",
    VERIFY: "auth/verify",
    RESEND: "auth/resend",
    GET_USER_INFORMATION: "auth/get-user-information",
    ME: "auth/me",
  },
  ENTERPRISE: {
    CREATE: "enterprises/create",
    GET_LIST: "enterprises/list",
    UPDATE: "enterprises/update/",
    DELETE: "enterprises/soft-delete/",
    GET_DETAIL: "enterprises/detail/",
    CHANGE_STATUS: "enterprises/change-status/",
    GET_NEW_PASSWORD: "enterprises/get-new-password",
  },
  USER: {
    CHANGE_PASSWORD: "users/change-password",
    UPDATE_PROFILE: "user-profiles",
    CHANGE_AVATAR: "user-profiles/avatar",
  },
  REQUEST_DPP: {
    CREATE: "request-dpp/create",
    GET_LIST: "request-dpp/list",
    UPDATE: "request-dpp/update",
    DELETE: "request-dpp/soft-delete",
    GET_DETAIL: "request-dpp/detail",
    CHANGE_STATUS: "request-dpp/change-status",
  },
  DPP: {
    CREATE: "dpp/create",
    GET_LIST: "dpp/list",
    UPDATE: "dpp/update",
    DELETE: "dpp/soft-delete",
    GET_DETAIL: "dpp/detail",
    GET_DETAIL_BY_CODE: "dpp/detail-by-code",
    CHANGE_STATUS: "dpp/change-status",
  },
  PROVINCE: {
    GET_LIST: "provinces/list",
  },
  DISTRICT: {
    GET_LIST: "districts/list",
  },
  WARD: {
    GET_LIST: "wards/list",
  },
  PRODUCT_CATEGORY: {
    GET_LIST: "product-category/list",
    GET_DETAIL: "product-category/detail",
    GET_LIST_WITH_PRODUCT: "product-categories/with-product",
  },
  ADDRESS: {
    GET_ALL_PROVINCE: "locations/all-province",
    GET_BY_PARENT: "locations/all-by-parent",
  },
  PRODUCT: {
    GET_BY_CATEGORY: "products/get-by-category",
  },
  FORUM: {
    GET_LIST_POST: "posts/get-list",
    GET_DETAIL: "posts/detail",
    CREATE_COMMENT: "posts/comment",
    CREATE_POST: "posts",
    UPDATE_POST: "posts/update",
    LIKE: "posts/toggle-favorite",
    CREATE_VIEW: "posts/view",
  },
  FIELD_CONFIG: {
    GET_LIST: "field-config/list",
  },
  INVOICE: {
    GET_LIST_REQUEST: "invoices/get-list-request",
    GET_LIST_CONFIRM: "invoices/get-list-confirm",
    GET_LIST_COMPLETE: "invoices/get-list-complete",
    GET_LIST_CANCEL: "invoices/get-list-cancel",
    GET_ALL: "invoices/get-all",
    GET_LIST: "invoices/get-list",
    CANCEL: "invoices/update-status",
    DETAIL: "invoices/detail",
  },
  CART: {
    CART_LIST: "carts/list-item",
  },
  FORM_CONFIG: {
    CREATE: "form-config/create",
    GET_LIST: "form-config/list",
    GET_LIST_FORM_VERSION: "form-config/list-form-version",
    CHANGE_STATUS: "form-config/change-status",
    DELETE: "form-config/soft-delete",
    COPY: "form-config/copy",
    GET_DETAIL: "form-config/detail",
    GET_DETAIL_BY_CATEGORY_ID: "form-config/detail-by-product-category",
    UPDATE: "form-config/update",
  },
  TITLE: {
    CREATE: "title/create",
    GET_LIST: "title/list",
    CHANGE_STATUS: "title/change-status",
    DELETE: "title/soft-delete",
    COPY: "title/copy",
    GET_DETAIL: "title/detail",
    UPDATE: "title/update",
  },
};

export const _BASE_URL_ = import.meta.env.VITE_BASE_URL;

export interface IResponse<T = any> {
  data: T;
  message: string;
  status: 200 | 400 | 401 | 403 | 413 | 404 | 500 | 502 | 409;
}
