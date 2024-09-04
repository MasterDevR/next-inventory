import { useEffect, useState } from "react";
import axios from "axios";
import Select from "./select";
const SelectRole = () => {
  const [userRole, setUserRole] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockTypes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/get-user-role`
        );
        setUserRole(response.data.result); // Adjust according to the response structure
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch stock types");
        setLoading(false);
      }
    };

    fetchStockTypes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    // <select
    //   className="select select-bordered w-full "
    //   defaultValue=""
    //   name="role"
    //   required
    // >
    //   <option value="" disabled>
    //     Select User Role.
    //   </option>
    //   {userRole.map((item, index) => (
    //     <option key={index} value={item.id} className=" uppercase">
    //       {item.name}
    //     </option>
    //   ))}
    // </select>
    <Select data={userRole} title={"Select Stock Type"} />
  );
};

export default SelectRole;
