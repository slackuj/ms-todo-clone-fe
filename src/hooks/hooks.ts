// this file serves as a central hub for re-exporting pre-typed Redux hooks
import type {AppDispatch, RootState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();