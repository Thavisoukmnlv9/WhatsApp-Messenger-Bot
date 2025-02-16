"use client";
import { LoginForm } from "./constainer/form";

export default function SignIn() {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="absolute inset-0 bg-white/20" />
      <LoginForm />
    </div>
  );
}

