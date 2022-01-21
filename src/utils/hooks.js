import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// custom hooks
export const useQuery = () => new URLSearchParams(useLocation().search);
