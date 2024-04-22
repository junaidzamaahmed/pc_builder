import db from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { price, uid } = await req.json();
    const pcBuild = await db
      .promise()
      .query("INSERT INTO pc_build (price,uid) VALUES (?,?)", [price, uid]);
    return NextResponse.json(pcBuild);
  } catch (error) {
    console.log("[PC_BUILD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const pcBuild = await db
      .promise()
      .query("SELECT * FROM pc_build WHERE uid = ?", [req.headers.get("uid")]);
    return NextResponse.json(pcBuild[0]);
  } catch (error) {
    console.log("[PC_BUILD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { build_id, price, uid } = await req.json();
    const pcBuild = await db
      .promise()
      .query("UPDATE pc_build SET price=?,uid=? WHERE build_id=?", [
        price,
        uid,
        build_id,
      ]);
    return NextResponse.json(pcBuild);
  } catch (error) {
    console.log("[PC_BUILD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { build_id } = await req.json();
    const pcBuild = await db
      .promise()
      .query("DELETE FROM pc_build WHERE build_id=?", [build_id]);
    return NextResponse.json(pcBuild);
  } catch (error) {
    console.log("[PC_BUILD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
