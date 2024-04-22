import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { uid: string } }
) {
  try {
    const cart = await db
      .promise()
      .query("SELECT * FROM cart WHERE uid = ?", [params.uid]);
    return NextResponse.json(cart[0]);
  } catch (error) {
    console.log("[CART]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
