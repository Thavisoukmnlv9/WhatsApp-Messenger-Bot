"use client";

import { useSession } from "next-auth/react";
import { type ReactNode } from "react";
import { defineAbilityFor } from "./builder";
import { AbilityContext } from "./context";

export function AbilityProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const ability = defineAbilityFor(
    session?.user?.role || "ADMIN",
    session?.user?.id || "",
  );
  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}
