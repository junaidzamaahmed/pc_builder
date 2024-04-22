import db from "../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { full_name, phone, email, password } = await req.json();
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    // CHeck if user exists
    const userExists = await db
      .promise()
      .query("SELECT * FROM user WHERE email=?", [email]);
    if (userExists[0][0]) {
      return new NextResponse("User already exists", { status: 400 });
    }
    const user = await db
      .promise()
      .query(
        "INSERT INTO user (full_name,phone,email,password) VALUES (?,?,?,?)",
        [full_name, phone, email, hash]
      );
    const user1 = await db
      .promise()
      .query("SELECT * FROM user WHERE email=?", [email]);

    return NextResponse.json({
      email: user1[0][0].email,
      full_name: user1[0][0].full_name,
      phone: user1[0][0].phone,
      role: user1[0][0].role,
      uid: user1[0][0].uid,
    });
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await db.promise().query("SELECT * FROM user");
    return NextResponse.json(user[0]);
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, full_name, phone, email } = await req.json();
    const user = await db
      .promise()
      .query("UPDATE user SET full_name=?,phone=?,email=? WHERE id=?", [
        full_name,
        phone,
        email,
        id,
      ]);
    return NextResponse.json(user);
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const user = await db.promise().query("DELETE FROM user WHERE id=?", [id]);
    return NextResponse.json(user);
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
