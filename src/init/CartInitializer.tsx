"use client";

import { ICart } from "@/interfaces/models/ICart.interfaces";
import { useAuthStore } from "@/stores/useAuth";
import { useCartStore } from "@/stores/useCartStore";
import { useEffect } from "react";

export function CartInitializer({ data }: { data: ICart | null }) {
  const { setInitCart } = useCartStore();
  const { user, authenticated } = useAuthStore();

  useEffect(() => {
    if (data && authenticated) {
      setInitCart(data);
    }
  }, [user?.id, authenticated]);

  return null;
}
