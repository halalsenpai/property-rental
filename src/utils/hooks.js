import { useLocation } from "react-router-dom";

// custom hooks
export const useQuery = () => new URLSearchParams(useLocation().search);
