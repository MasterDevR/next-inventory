"use client";

import ChangePassword from "@/components/ui/form/change-password";
import ChangeEmail from "@/components/ui/form/change-email";
const page = () => {
  return (
    <div className="space-y-10  pb-56">
      <ChangePassword />
      <ChangeEmail />
    </div>
  );
};

export default page;
