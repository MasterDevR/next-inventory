// import User from "../model/user";
// import { connection } from "./db/mongodb";

// const findUser = async (credentials: any) => {
//   try {
//     await connection();

//     const
//     // const user = await User.findOne({ username });
//     // if (user && user.password === password) {
//     //   return new Response(
//     //     JSON.stringify({
//     //       status: 200,
//     //       data: {
//     //         id: user._id.toString(),
//     //         name: user.name,
//     //         email: user.email,
//     //       },
//     //     }),
//     //     { status: 200 }
//     //   );
//     } else {
//       return new Response(
//         JSON.stringify({ status: 401, message: "Invalid credentials" }),
//         { status: 401 }
//       );
//     }
//   } catch (err) {
//     console.error("Error during login:", err);
//     return new Response(
//       JSON.stringify({ status: 500, message: "Internal server error" }),
//       { status: 500 }
//     );
//   }
// };

// export default findUser;
