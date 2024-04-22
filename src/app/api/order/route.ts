import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uid, trx_id, isPC, build_id } = await req.json();
    const order = await db
      .promise()
      .query("INSERT INTO `order` (uid,trx_id,isPC) VALUES (?,?,?)", [
        uid,
        trx_id,
        isPC,
      ]);
    if (isPC) {
      const order = await db
        .promise()
        .query("SELECT * FROM `order` WHERE uid=? order by date desc", [uid]);
      const products = await db
        .promise()
        .query("SELECT * FROM `build_contains` WHERE build_id=?", [build_id]);
      products[0].forEach(async (product: any) => {
        await db
          .promise()
          .query(
            "INSERT INTO `order_contains` (oid,pid,quantity) VALUES (?,?,?)",
            [order[0][0].oid, product.pid, product.quantity]
          );
      });
    } else {
      const order = await db
        .promise()
        .query("SELECT * FROM `order` WHERE uid=? order by date desc", [uid]);
      const products = await db
        .promise()
        .query("SELECT * FROM `cart_products` WHERE cid=?", [build_id]);
      products[0].forEach(async (product: any) => {
        await db
          .promise()
          .query(
            "INSERT INTO `order_contains` (oid,pid,quantity) VALUES (?,?,?)",
            [order[0][0].oid, product.pid, product.quantity]
          );
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const order = await db.promise().query("SELECT * FROM `order`");
    return NextResponse.json(order[0]);
  } catch (error) {
    console.log("[ORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { oid } = await req.json();
    const order = await db
      .promise()
      .query("DELETE FROM `order` WHERE oid=?", [oid]);
    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { data } = await req.json();
    const order = await db
      .promise()
      .query("UPDATE `order` SET status=? WHERE oid=?", [
        String(data.status),
        data.oid,
      ]);
    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
