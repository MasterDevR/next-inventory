import Image from "next/image";
import React from "react";

const UserIcon = () => {
  return (
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      {/* user image */}

      <div className="w-10 rounded-full">
        <Image
          height={50}
          width={50}
          alt="Tailwind CSS Navbar component"
          src="https://firebasestorage.googleapis.com/v0/b/inventory-f426a.appspot.com/o/item-image%2Fnotebook.jpg%20%22%20%22%201722180341626?alt=media&token=ede52a19-bc84-4c7a-bd8c-ec0756e97a05"
        />
      </div>
    </div>
  );
};

export default UserIcon;
