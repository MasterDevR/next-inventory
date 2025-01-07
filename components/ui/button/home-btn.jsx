import React from "react";
import { useRouter } from "next/navigation";

const HomeBtn = () => {
  const router = useRouter();
  return (
    <button
      className="btn btn-error btn-outline"
      onClick={() => router.push("/")}
    >
      Home
    </button>
  );
};

export default HomeBtn;
