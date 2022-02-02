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
      return "chart-line text-success";

    case "Cash_Only":
      return "euro-line";

    case "Online_Auction":
      return "gavel text-primary";

    case "Auction":
      return "gavel text-success";

    case "Auction_Unsold":
      return "gavel text-danger";

    case "HMO":
      return "users";

    case "Empty":
      return "empty";

    case "Knotweed":
      return "knotweed";
    // TODO
    case "Listed":
      return "";

    case "New_Home":
      return "home text-success";

    case "Refurb":
      return "hammer";

    case "Probate":
      return "file-contract text-success";

    case "Reposessed":
      return "ban text-danger";

    case "Retirement":
      return "retirement";

    case "Shared":
      return "handshake";

    case "Shared_Ownership":
      return "shared-ownership";

    case "Tenanted":
      return "tenanted";

    case "Portfolio":
      return "portfolio";

    case "Plot":
      return "drafting-compass";

    case "Online_Viewing":
      return "online-viewing";
    
    case "Full_Planning":
      return "full-planning"
  }
};

export const getTagText = (keyword) => {
  keyword = keyword.replace("_", " ");
  keyword = keyword.replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
  return keyword;
};
