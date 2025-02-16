"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "./components/containers";
function handleRedirect(status: string, router: ReturnType<typeof useRouter>) {
  if (status === "unauthenticated") {
    router.push("/login");
  } else if (status === "authenticated") {
    router.push("/user");
  }
}
export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== "loading") {
      handleRedirect(status, router);
    }
  }, [status]);
  if (status === "loading") {
    return <Loading />;
  }
  return <></>;
}
