export const jsonToQueryString = (data) => {
  if (!data) {
    return "";
  }
  const params = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
  return "?" + new URLSearchParams(params).toString();
};
