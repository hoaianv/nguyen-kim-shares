"use client";

import { IMember } from "@/interfaces/models/member.interfaces";
import { useAuthStore } from "@/stores/useAuth";
import { useEffect } from "react";

export function AuthInitializer({ user }: { user: IMember | null }) {
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return null;
}
