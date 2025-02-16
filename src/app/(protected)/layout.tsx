"use client";

import React from "react";

import { AppShell, Layout, ThemeProvider, UserNav } from "@/components/containers";
import { ThemeSwitch } from "@/components/containers/theme/theme-switch";
import AuthGuard from "@/lib/ability/guard";
import { queryClient } from "@/lib/interface";
import { QueryClientProvider } from "@tanstack/react-query";
import { AbilityProvider } from "../lib/ability/provider";

export default function ProtectedLayout({ children }: { children: React.ReactNode; }) {
  return (
    <AuthGuard>
      <QueryClientProvider client={queryClient}>
        <AbilityProvider>
          <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <AppShell>
              <Layout>
                <Layout.Header>
                  <div className="ml-auto flex items-center space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                  </div>
                </Layout.Header>
                <Layout.Body>
                  {children}
                </Layout.Body>
              </Layout>
            </AppShell>
          </ThemeProvider>
        </AbilityProvider>
      </QueryClientProvider>
    </AuthGuard>
  );
}
