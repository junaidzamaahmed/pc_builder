import db from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cid, pid } = await req.json();
    const productCheck = await db
      .promise()
      .query("SELECT * FROM cart_products WHERE cid=? AND pid=?", [cid, pid]);
    if (productCheck[0].length == 0) {
      const cartProduct = await db
        .promise()
        .query("INSERT INTO cart_products (cid,pid,quantity) VALUES (?,?,?)", [
          cid,
          pid,
          1,
        ]);
      return NextResponse.json(cartProduct);
    } else {
      const cartProduct = await db
        .promise()
        .query("UPDATE cart_products SET quantity=? WHERE cid=? AND pid=?", [
          productCheck[0][0].quantity + 1,
          cid,
          pid,
        ]);
      return NextResponse.json(cartProduct);
    }
  } catch (error) {
    console.log("[CART_PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const cartProducts = await db
      .promise()
      .query("SELECT * FROM cart_products WHERE cid = ?", [
        req.headers.get("cid"),
      ]);
    return NextResponse.json(cartProducts[0]);
  } catch (error) {
    console.log("[CART_PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { cid, pid, quantity } = await req.json();
    const cartProduct = await db
      .promise()
      .query("UPDATE cart_products SET quantity=? WHERE cid=? AND pid=?", [
        quantity,
        cid,
        pid,
      ]);
    return NextResponse.json(cartProduct);
  } catch (error) {
    console.log("[CART_PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    // const { cid, pid } = await req.json();
    const cartProduct = await db
      .promise()
      .query("DELETE FROM cart_products WHERE cid=? AND pid=?", [
        req.headers.get("cid"),
        req.headers.get("pid"),
      ]);
    return NextResponse.json(cartProduct);
  } catch (error) {
    console.log("[CART_PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
