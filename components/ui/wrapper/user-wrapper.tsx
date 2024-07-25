import React, { ReactNode } from "react";

interface wrapprProps {
  children: ReactNode;
}
const wrapper = ({ children }: wrapprProps) => {
  return <div className="h-screen bg-blue-200">{children}</div>;
};

export default wrapper;
