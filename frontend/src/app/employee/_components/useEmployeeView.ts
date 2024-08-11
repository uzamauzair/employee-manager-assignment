"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { toggleView } from "@/redux/slices/viewGridSlice";

export const useEmployeeView = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isGridView = useSelector((state: RootState) => state.view.isGridView);

    const handleViewToggle = () => {
        dispatch(toggleView());
    };

    return {
        isGridView,
        handleViewToggle,
    };
};
