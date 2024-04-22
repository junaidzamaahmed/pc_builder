import React from "react";
import EditProduct from "./_components/editProduct";
import db from "@/lib/db";

export default async function EditProductPage({
  params: { pid },
}: {
  params: { pid: string };
}) {
  const product = await db
    .promise()
    .query("SELECT * FROM product WHERE pid = ?", [pid]);
  return <EditProduct product={product[0][0]} />;
}
