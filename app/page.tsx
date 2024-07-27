"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

const ProtectedPage = () => {
  const session = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <div className="w-full">
      <h1>Protected Content</h1>
      <p>This content is only visible to authenticated users.</p>
    </div>
  );
};

export default ProtectedPage;
