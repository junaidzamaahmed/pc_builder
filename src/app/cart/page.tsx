import db from "@/lib/db";
import { cookies } from "next/headers";
import IncreaseQuantity from "./_components/increaseQuantity";
import RemoveFromCart from "./_components/removeFromCart";
import Link from "next/link";

export default async function CartComp() {
  let products: any = [];
  const cookie = cookies();

  const response = await db
    .promise()
    .query(
      "SELECT product.pid,name,imageUrl,description,product.price,inStock,bid,cat_id,cart.cid,quantity,uid FROM product, cart_products, cart WHERE product.pid = cart_products.pid AND cart_products.cid = cart.cid AND cart.uid = ?",
      [Number(cookie.get("uid")?.value)]
    );
  products = response[0];

  return (
    <>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Cart</h2>
          <Link href={`/checkout/notpc_${response}`}>
            <button className="bg-[#091235] text-white rounded p-2 h-10 mb-2">
              Order Now
            </button>
          </Link>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                key={product.pid}
              >
                <img
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  height="300"
                  src={product.imageUrl}
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width="300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-500 mb-4">{product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <IncreaseQuantity pid={product.pid} />
                  <RemoveFromCart pid={product.pid} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
