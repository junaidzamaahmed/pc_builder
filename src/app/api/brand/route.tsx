import db from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const brand = await db
      .promise()
      .query("INSERT INTO brand (name) VALUES (?)", [name]);
    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRANDS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const brands = await db.promise().query("SELECT * FROM brand");
    return NextResponse.json(brands);
  } catch (error) {
    console.log("[BRANDS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { bid, name } = await req.json();
    const brand = await db
      .promise()
      .query("UPDATE brand SET name=? WHERE bid=?", [name, bid]);
    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRANDS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { bid } = await req.json();
    const brand = await db
      .promise()
      .query("DELETE FROM brand WHERE bid=?", [bid]);
    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRANDS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
