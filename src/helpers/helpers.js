export const jsonToQueryString = (data) => {
  if (!data) {
    return "";
  }
  const params = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
  return "?" + new URLSearchParams(params).toString();
};

export const findIcon = (keyword) => {
  switch (keyword) {
    case "Park_Home":
      return "caravan";

    case "BTL":
      return "house-user";

    case "Investment":
      return "chart-line";

    case "Cash_Only":
      return "euro-line";

    case "Auction":
      return "gavel text-primary";

    case "Auction":
      return "gavel text-success";

    case "Auction_Unsold":
      return "gavel text-danger";

    case "HMO":
      return "users";

    case "Empty":
      return "empty";
  }
};

export const getTagText = (keyword) => {
  keyword = keyword.replace("_", " ");
  keyword = keyword.replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
  return keyword;
};
