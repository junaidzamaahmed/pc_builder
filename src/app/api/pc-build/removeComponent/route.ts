import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const pcBuild = await db
      .promise()
      .query("DELETE FROM build_contains WHERE build_id=? and cat_id=?", [
        req.headers.get("build_id"),
        req.headers.get("cat_id"),
      ]);
    return NextResponse.json(pcBuild);
  } catch (error) {
    console.log("[PC_BUILD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
