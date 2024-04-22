import db from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await db
      .promise()
      .query("SELECT * FROM user WHERE email=?", [email]);
    if (!user[0][0]) {
      return new NextResponse("User not found", { status: 404 });
    }
    const match = await bcrypt.compare(password, user[0][0].password);
    if (!match) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.json({
      email: user[0][0].email,
      full_name: user[0][0].full_name,
      phone: user[0][0].phone,
      role: user[0][0].role,
      uid: user[0][0].uid,
    });
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
