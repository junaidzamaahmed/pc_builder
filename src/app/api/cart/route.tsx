import db from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { price, uid } = await req.json();
    const cart = await db
      .promise()
      .query("INSERT INTO cart (price,uid) VALUES (?,?)", [price, uid]);
    return NextResponse.json(cart);
  } catch (error) {
    console.log("[CART]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const cart = await db
      .promise()
      .query("SELECT * FROM cart WHERE uid = ?", [req.headers.get("uid")]);
    return NextResponse.json(cart[0]);
  } catch (error) {
    console.log("[CART]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { cid, price, uid } = await req.json();
    const cart = await db
      .promise()
      .query("UPDATE cart SET price=?,uid=? WHERE cid=?", [price, uid, cid]);
    return NextResponse.json(cart);
  } catch (error) {
    console.log("[CART]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { cid } = await req.json();
    const cart = await db
      .promise()
      .query("DELETE FROM cart WHERE cid=?", [cid]);
    return NextResponse.json(cart);
  } catch (error) {
    console.log("[CART]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
