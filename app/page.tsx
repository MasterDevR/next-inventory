"use client";
import React from "react";
import LoginForm from "@/app/auth/signin/LoginForm";
import { useSession } from "next-auth/react";
import LandingPage from "@/components/ui/landing-page.tsx/landing-page";

const Page = () => {
  const { status } = useSession();

  return (
    <div>{status === "authenticated" ? <LandingPage /> : <LoginForm />}</div>
  );
};

export default Page;
