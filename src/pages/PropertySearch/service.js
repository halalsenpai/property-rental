import { post, get, put, del } from "../../utils/httpService";

const SERVICE_URLS = {
  getPropertyTypes: () => `/prop_types_rules?limit=50`,
};

export const getPropertyTypes = () => get(SERVICE_URLS.getPropertyTypes());
