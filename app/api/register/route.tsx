import User from "@/components/model/user";
import encryptPassword from "@/components/util/bcrypt/encrypt-password";
import { connection } from "@/components/util/db/mongodb";

export async function POST(req: Request) {
  try {
    await connection();

    const { data } = await req.json();

    if (!Array.isArray(data)) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Invalid data format. Expected an array of users.",
        }),
        { status: 400 }
      );
    }

    const users = await Promise.all(
      data.map(async (user: any) => {
        const hashedPassword = await encryptPassword(user.password);
        return {
          password: hashedPassword,
          dept_id: user.dept_id,
          dept_code: user.dept_code,
          department: user.department,
          role: user.role,
        };
      })
    );

    await User.insertMany(users);

    return new Response(
      JSON.stringify({ status: 200, message: "Users created successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ status: 500, message: "Internal Server Error." }),
      { status: 500 }
    );
  } finally {
  }
}
