import { get } from "../utils/httpService";

const SERVICE_URLS = {
  getUserInfo: () => `/user/info`,
};

export const getUserInfo = () => get(SERVICE_URLS.getUserInfo());
