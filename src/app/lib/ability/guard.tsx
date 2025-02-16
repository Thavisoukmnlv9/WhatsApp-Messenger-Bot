/* eslint-disable max-nested-callbacks */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements-per-line */
/* eslint-disable complexity */
"use client";
import { Progress } from "@/components/ui/progress";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function AuthGuard({
  children,
  requireAuth = true,
}: AuthGuardProps) {
  const { status, data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = React.useState(13);

  useEffect(() => {
    const timer = setTimeout(() => { setProgress(66); }, 500);
    return () => { clearTimeout(timer); };
  }, []);

  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (status === "loading") { return; }

    const isTokenExpired = !status || status === "unauthenticated";

    if (status === "authenticated" && !session?.user?.accessToken) {
      router.push("/login");
    }

    if (isTokenExpired && !isPublicRoute) {
      router.push("/login");
    }

    if (requireAuth) {
      if (status === "unauthenticated" && !isPublicRoute) {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      } else if (status === "authenticated" && isPublicRoute && session?.user?.accessToken) {
        router.push("/user");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [pathname, status, requireAuth, isPublicRoute, session]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Progress value={progress} className="w-[60%]" />
      </div>
    );
  }

  return <>{children}</>;
}
