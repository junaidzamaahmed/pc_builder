import db from "@/lib/db";
import { cookies } from "next/headers";
import AddToBuild from "./_components/addToBuild";

export default async function CartComp({ params }: { params: { id: string } }) {
  let products: any = [];
  const cookie = cookies();

  const cat_id = params.id.split("_")[0];
  const build_id = params.id.split("_")[1];

  const response = await db
    .promise()
    .query(`SELECT * from product where cat_id=${cat_id}`);
  products = response[0];

  return (
    <>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Choose component
          </h2>
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
                  <p className="text-gray-500 mb-4">{product.price} Taka</p>
                  <AddToBuild
                    cat_id={Number(cat_id)}
                    build_id={Number(build_id)}
                    pid={product.pid}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
