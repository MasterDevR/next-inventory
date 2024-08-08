"use client";

import useInventoryStore from "@/components/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const ProtectedPage = () => {
  const { role } = useInventoryStore();
  const session = useSession();
  useEffect(() => {
    console.log(role);
    console.log(session.data?.user.Role.name);
  }, [, role]);
  return (
    <div className="w-full">
      <h1>Protected Content</h1>
      <p>This content is only visible to authenticated users.</p>
    </div>
  );
};

export default ProtectedPage;
