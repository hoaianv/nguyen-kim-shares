"use client";

import { IMenu } from "@/interfaces/models/IMenu.interface";
import { useCategoriesStore } from "@/stores/useCategories";
import { useEffect } from "react";

export function CategoriesInitializer({ data }: { data: IMenu[] | null }) {
    const { setCategories } = useCategoriesStore();

    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data, setCategories]);

    return null;
}
