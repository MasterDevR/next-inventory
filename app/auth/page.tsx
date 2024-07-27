"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import LoginForm from "@/components/ui/form/login-form";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(session);
    if (session) {
      router.push("/");
    }
  }, [session]);

  return <LoginForm />;
};

export default Page;
