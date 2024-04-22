import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pid, build_id, cat_id } = await req.json();
    const addToBuild = await db
      .promise()
      .query(
        "INSERT INTO build_contains (pid, build_id, cat_id,quantity) VALUES (?,?,?,?)",
        [pid, build_id, cat_id, 1]
      );
    return NextResponse.json(addToBuild);
  } catch (error) {
    console.log("[PC_BUILD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
