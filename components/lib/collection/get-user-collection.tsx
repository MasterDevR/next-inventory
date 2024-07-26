import User from "../../model/user";
import { connection } from "@/components/util/db/mongodb";

const findUser = async () => {
  try {
    await connection();

    const user = await User.find();

    console.log(user);
  } catch (err) {
    console.error("Error during login:", err);
    return new Response(
      JSON.stringify({ status: 500, message: "Internal server error" }),
      { status: 500 }
    );
  }
};

export default findUser;
