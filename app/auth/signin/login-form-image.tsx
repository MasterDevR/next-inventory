"use client";
import React from "react";
import Image from "next/image";

const LoginFormImage = () => {
  return (
    <div className="flex flex-col items-center gap-y-5">
      <Image
        src="/images/inventory.png"
        alt="Universidad_de_Manila_seal.png"
        width="0"
        height="0"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        style={{ width: "100%", height: "auto" }}
      />
      <h1 className="text-2xl font-black tracking-widest text-green-950">
        UDM SYSTEM
      </h1>
    </div>
  );
};

export default LoginFormImage;
