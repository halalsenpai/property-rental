import { post, get, put, del } from "../../utils/httpService";

const SERVICE_URLS = {
  getPropertyTypes: () => `/prop_types_rules?limit=50`,
  getProperties: (params) => `/properties?${params}`,
  getKeywordsRulesList: () => `/keywords_rules?limit=100`,
  getLandBounds: (coords) => `/land_bounds_polygons/${coords}`,
};

export const getPropertyTypes = () => get(SERVICE_URLS.getPropertyTypes());
export const getProperties = (params) => get(SERVICE_URLS.getProperties(params));
export const getKeywordsRulesList = () => get(SERVICE_URLS.getKeywordsRulesList());
export const getLandBounds = (coords) => get(SERVICE_URLS.getLandBounds(coords));
