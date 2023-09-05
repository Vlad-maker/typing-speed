import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// типизированные версии
// встроенных Redux хуков useDispatch и useSelector

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
