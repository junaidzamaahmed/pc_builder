import db from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { price, name, description, imageUrl, cat_id, bid, inStock } =
      await req.json();
    const product = await db
      .promise()
      .query(
        "INSERT INTO product (price,name,description,imageUrl, cat_id,bid,inStock) VALUES (?,?,?,?,?,?,?)",
        [price, name, description, imageUrl, cat_id, bid, inStock]
      );
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await db.promise().query("SELECT * FROM product");
    return NextResponse.json(products[0]);
  } catch (error) {
    console.log("[PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { pid, price, name, description, imageUrl, cat_id, bid, inStock } =
      await req.json();
    const product = await db
      .promise()
      .query(
        "UPDATE product SET price=?,name=?,description=?,imageUrl=?,cat_id=?,bid=?,inStock=? WHERE pid=?",
        [price, name, description, imageUrl, cat_id, bid, inStock, pid]
      );
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { pid } = await req.json();
    const product = await db
      .promise()
      .query("DELETE FROM product WHERE pid=?", [pid]);
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
