import { connection } from "@/components/util/db/mongodb";
import User from "@/components/model/user"; // Adjust the import to match your setup
import bcrypt from "bcrypt";
import encryptPassword from "@/components/util/bcrypt/encrypt-password";
export async function POST(req: Request) {
  console.log("im in");
  try {
    await connection();
    const { username, password } = await req.json();

    // const res = await encryptPassword("password");
    const user = await User.findOne({ dept_id: username });
    // const newUser = await User.create({
    //   password: res,
    //   dept_id: "000-000-111",
    //   dept_code: "CET",
    //   department: "College Of Engineering And Technology",
    //   role: "user",
    // });
    // console.log(newUser);
    const result = await bcrypt
      .compare(password, user.password)
      .then(function (result) {
        return result;
      });
    console.log("result : ", result);
    console.log("result : ", user.password);
    if (!user && !result) {
      return Response.json({ status: 404, message: "Invalid Credentials" });
    }

    return Response.json({
      status: 200,
      data: {
        id: user._id,
        dept_code: user.dept_code,
        department: user.department,
        role: user.role,
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ status: 500, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
