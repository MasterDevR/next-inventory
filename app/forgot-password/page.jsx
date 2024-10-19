"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      console.log(status);
      router.push("/not-found");
    }
  }, [status, router]);

  // Optional: Handle loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If authenticated, show the page content
  return <div>Page content for authenticated users</div>;
};

export default Page;
