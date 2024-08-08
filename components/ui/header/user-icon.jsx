"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UserIcon = () => {
  const session = useSession();

  return (
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      {/* user image */}

      <div className="w-10 h-10 rounded-full">
        <Image
          height={50}
          width={50}
          priority
          alt="Tailwind CSS Navbar component"
          src="https://firebasestorage.googleapis.com/v0/b/inventory-f426a.appspot.com/o/file%2Fpencil.png?alt=media&token=679d7eb1-d3a9-44ac-8431-18b66953d9dd"
        />
      </div>
      {session.status === "loading" && (
        <div className="skeleton h-4 w-28"></div>
      )}
    </div>
  );
};

export default UserIcon;
