import db from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const category = await db
      .promise()
      .query("INSERT INTO category (name) VALUES (?)", [name]);
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await db.promise().query("SELECT * FROM category");
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { cat_id, name } = await req.json();
    const category = await db
      .promise()
      .query("UPDATE category SET name=? WHERE cat_id=?", [name, cat_id]);
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { cat_id } = await req.json();
    const category = await db
      .promise()
      .query("DELETE FROM category WHERE cat_id=?", [cat_id]);
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
