import { connection } from "@/components/util/db/mongodb";
import User from "@/components/model/user"; // Adjust the import to match your setup
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  console.log("im in");
  try {
    await connection();
    const { username, password } = await req.json();

    const user = await User.findOne({ dept_id: username });
    const result = await bcrypt
      .compare(password, user.password)
      .then(function (result) {
        return result;
      });
    if (!user && !result) {
      return Response.json({ status: 404, message: "Invalid Credentials" });
    }

    return Response.json({
      status: 200,
      data: {
        id: user._id,
        dept_code: user.dept_code,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    return new Response(
      JSON.stringify({ status: 500, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
