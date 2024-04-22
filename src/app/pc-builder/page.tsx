import db from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import RemoveComponent from "./_components/removeComponent";

export default async function PCBuilder() {
  const cookie = cookies();

  let pcBuild = await db
    .promise()
    .query(`SELECT * FROM pc_build WHERE uid = ${cookie.get("uid")?.value}`);
  if (pcBuild[0].length === 0) {
    await db
      .promise()
      .query(`INSERT INTO pc_build (uid) VALUES (${cookie.get("uid")?.value})`);
    pcBuild = await db
      .promise()
      .query(`SELECT * FROM pc_build WHERE uid = ${cookie.get("uid")?.value}`);
  }

  const build_contains = await db
    .promise()
    .query("SELECT * FROM build_contains where build_id = ?", [
      pcBuild[0][0].build_id,
    ]);
  const hasCPU = build_contains[0].filter((comp: any) => comp.cat_id === 2);
  const cpu =
    hasCPU.length > 0
      ? await db
          .promise()
          .query("SELECT * from product where pid=?", [hasCPU[0].pid])
      : null;
  const hasCooler = build_contains[0].filter((comp: any) => comp.cat_id === 5);
  const cooler =
    hasCooler.length > 0
      ? await db
          .promise()
          .query("SELECT * from product where pid=?", [hasCooler[0].pid])
      : null;
  const hasMotherboard = build_contains[0].filter(
    (comp: any) => comp.cat_id === 1
  );
  const motherboard =
    hasMotherboard.length > 0
      ? await db
          .promise()
          .query("SELECT * from product where pid=?", [hasMotherboard[0].pid])
      : null;
  const hasRAM = build_contains[0].filter((comp: any) => comp.cat_id === 6);
  const ram =
    hasRAM.length > 0
      ? await db
          .promise()
          .query("SELECT * from product where pid=?", [hasRAM[0].pid])
      : null;
  const hasStorage = build_contains[0].filter((comp: any) => comp.cat_id === 7);
  const storage =
    hasStorage.length > 0
      ? await db
          .promise()
          .query("SELECT * from product where pid=?", [hasStorage[0].pid])
      : null;
  const hasGraphicsCard = build_contains[0].filter(
    (comp: any) => comp.cat_id === 8
  );
  const graphicsCard =
    hasGraphicsCard.length > 0
      ? await db
          .promise()
          .query("SELECT * from product where pid=?", [hasGraphicsCard[0].pid])
      : null;
  const hasPowerSupply = build_contains[0].filter(
    (comp: any) => comp.cat_id === 9
  );
  const powerSupply =
    hasPowerSupply.length > 0
      ? await db
          .promise()
          .query("SELECT * from product where pid=?", [hasPowerSupply[0].pid])
      : null;
  const hasCasing = build_contains[0].filter((comp: any) => comp.cat_id === 10);
  const casing =
    hasCasing.length > 0
      ? await db
          .promise()
          .query("SELECT * from product where pid=?", [hasCasing[0].pid])
      : null;
  const hasMonitor = build_contains[0].filter(
    (comp: any) => comp.cat_id === 11
  );
  const monitor =
    hasMonitor.length > 0
      ? await db
          .promise()
          .query("SELECT * from product where pid=?", [hasMonitor[0].pid])
      : null;

  // Total price
  let totalPrice = 0;
  if (cpu) totalPrice += cpu[0][0].price;
  if (cooler) totalPrice += cooler[0][0].price;
  if (motherboard) totalPrice += motherboard[0][0].price;
  if (ram) totalPrice += ram[0][0].price;
  if (storage) totalPrice += storage[0][0].price;
  if (graphicsCard) totalPrice += graphicsCard[0][0].price;
  if (powerSupply) totalPrice += powerSupply[0][0].price;
  if (casing) totalPrice += casing[0][0].price;
  if (monitor) totalPrice += monitor[0][0].price;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold py-10">PC Builder</h1>
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Total Price</h2>
        <h2 className="text-lg font-semibold">{totalPrice} Taka</h2>
        <Link href={`/checkout/pc_${pcBuild[0][0].build_id}`}>
          <button className="bg-[#091235] text-white rounded p-2 h-10 mb-2">
            Order Now
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-12 p-6 gap-4 border border-black">
        <div className="col-span-3">
          <img
            className="w-24 h-24 object-cover rounded"
            src={
              cpu
                ? cpu[0][0].imageUrl
                : "https://cdn.iconscout.com/icon/free/png-256/free-pc-1717555-1461311.png"
            }
          />
        </div>
        <div className="col-span-6 flex align-middle h-full">
          <h3 className="text-lg font-semibold">
            {cpu && cpu[0][0] ? cpu[0][0].name : "CPU"}
          </h3>
        </div>
        <div className="col-span-3 h-full">
          {!cpu ? (
            <Link href={`/choose-product/2_${pcBuild[0][0].build_id}`}>
              <button className="bg-[#091235] text-white rounded p-2 h-10">
                Choose
              </button>
            </Link>
          ) : (
            <RemoveComponent cat_id={2} build_id={pcBuild[0][0].build_id} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 p-6 gap-4 border border-black">
        <div className="col-span-3">
          <img
            className="w-24 h-24 object-cover rounded"
            src={
              cooler
                ? cooler[0][0].imageUrl
                : "https://cdn.iconscout.com/icon/free/png-256/free-pc-1717555-1461311.png"
            }
          />
        </div>
        <div className="col-span-6 flex align-middle h-full">
          <h3 className="text-lg font-semibold">
            {cooler && cooler[0][0] ? cooler[0][0].name : "Cooler"}
          </h3>
          <p>{cooler && cooler[0][0] && cooler[0][0].price}</p>
        </div>
        <div className="col-span-3 h-full">
          {!cooler ? (
            <Link href={`/choose-product/5_${pcBuild[0][0].build_id}`}>
              <button className="bg-[#091235] text-white rounded p-2 h-10">
                Choose
              </button>
            </Link>
          ) : (
            <RemoveComponent cat_id={5} build_id={pcBuild[0][0].build_id} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 p-6 gap-4 border border-black">
        <div className="col-span-3">
          <img
            className="w-24 h-24 object-cover rounded"
            src={
              motherboard
                ? motherboard[0][0].imageUrl
                : "https://cdn.iconscout.com/icon/free/png-256/free-pc-1717555-1461311.png"
            }
          />
        </div>
        <div className="col-span-6 flex align-middle h-full">
          <h3 className="text-lg font-semibold">
            {motherboard && motherboard[0][0]
              ? motherboard[0][0].name
              : "Motherboard"}
          </h3>
        </div>
        <div className="col-span-3 h-full">
          {!motherboard ? (
            <Link href={`/choose-product/1_${pcBuild[0][0].build_id}`}>
              <button className="bg-[#091235] text-white rounded p-2 h-10">
                Choose
              </button>
            </Link>
          ) : (
            <RemoveComponent cat_id={1} build_id={pcBuild[0][0].build_id} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 p-6 gap-4 border border-black">
        <div className="col-span-3">
          <img
            className="w-24 h-24 object-cover rounded"
            src={
              ram
                ? ram[0][0].imageUrl
                : "https://cdn.iconscout.com/icon/free/png-256/free-pc-1717555-1461311.png"
            }
          />
        </div>
        <div className="col-span-6 flex align-middle h-full">
          <h3 className="text-lg font-semibold">
            {ram && ram[0][0] ? ram[0][0].name : "RAM"}
          </h3>
        </div>
        <div className="col-span-3 h-full">
          {!ram ? (
            <Link href={`/choose-product/6_${pcBuild[0][0].build_id}`}>
              <button className="bg-[#091235] text-white rounded p-2 h-10">
                Choose
              </button>
            </Link>
          ) : (
            <RemoveComponent cat_id={6} build_id={pcBuild[0][0].build_id} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 p-6 gap-4 border border-black">
        <div className="col-span-3">
          <img
            className="w-24 h-24 object-cover rounded"
            src={
              storage
                ? storage[0][0].imageUrl
                : "https://cdn.iconscout.com/icon/free/png-256/free-pc-1717555-1461311.png"
            }
          />
        </div>
        <div className="col-span-6 flex align-middle h-full">
          <h3 className="text-lg font-semibold">
            {storage && storage[0][0] ? storage[0][0].name : "Storage"}
          </h3>
        </div>
        <div className="col-span-3 h-full">
          {!storage ? (
            <Link href={`/choose-product/7_${pcBuild[0][0].build_id}`}>
              <button className="bg-[#091235] text-white rounded p-2 h-10">
                Choose
              </button>
            </Link>
          ) : (
            <RemoveComponent cat_id={7} build_id={pcBuild[0][0].build_id} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 p-6 gap-4 border border-black">
        <div className="col-span-3">
          <img
            className="w-24 h-24 object-cover rounded"
            src={
              graphicsCard
                ? graphicsCard[0][0].imageUrl
                : "https://cdn.iconscout.com/icon/free/png-256/free-pc-1717555-1461311.png"
            }
          />
        </div>
        <div className="col-span-6 flex align-middle h-full">
          <h3 className="text-lg font-semibold">
            {graphicsCard && graphicsCard[0][0]
              ? graphicsCard[0][0].name
              : "Graphics Card"}
          </h3>
        </div>
        <div className="col-span-3 h-full">
          {!graphicsCard ? (
            <Link href={`/choose-product/8_${pcBuild[0][0].build_id}`}>
              <button className="bg-[#091235] text-white rounded p-2 h-10">
                Choose
              </button>
            </Link>
          ) : (
            <RemoveComponent cat_id={8} build_id={pcBuild[0][0].build_id} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 p-6 gap-4 border border-black">
        <div className="col-span-3">
          <img
            className="w-24 h-24 object-cover rounded"
            src={
              powerSupply
                ? powerSupply[0][0].imageUrl
                : "https://cdn.iconscout.com/icon/free/png-256/free-pc-1717555-1461311.png"
            }
          />
        </div>
        <div className="col-span-6 flex align-middle h-full">
          <h3 className="text-lg font-semibold">
            {powerSupply && powerSupply[0][0]
              ? powerSupply[0][0].name
              : "Power Supply"}
          </h3>
        </div>
        <div className="col-span-3 h-full">
          {!powerSupply ? (
            <Link href={`/choose-product/9_${pcBuild[0][0].build_id}`}>
              <button className="bg-[#091235] text-white rounded p-2 h-10">
                Choose
              </button>
            </Link>
          ) : (
            <RemoveComponent cat_id={9} build_id={pcBuild[0][0].build_id} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 p-6 gap-4 border border-black">
        <div className="col-span-3">
          <img
            className="w-24 h-24 object-cover rounded"
            src={
              casing
                ? casing[0][0].imageUrl
                : "https://cdn.iconscout.com/icon/free/png-256/free-pc-1717555-1461311.png"
            }
          />
        </div>
        <div className="col-span-6 flex align-middle h-full">
          <h3 className="text-lg font-semibold">
            {casing && casing[0][0] ? casing[0][0].name : "Casing"}
          </h3>
        </div>
        <div className="col-span-3 h-full">
          {!casing ? (
            <Link href={`/choose-product/10_${pcBuild[0][0].build_id}`}>
              <button className="bg-[#091235] text-white rounded p-2 h-10">
                Choose
              </button>
            </Link>
          ) : (
            <RemoveComponent cat_id={10} build_id={pcBuild[0][0].build_id} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 p-6 gap-4 border border-black">
        <div className="col-span-3">
          <img
            className="w-24 h-24 object-cover rounded"
            src={
              monitor
                ? monitor[0][0].imageUrl
                : "https://cdn.iconscout.com/icon/free/png-256/free-pc-1717555-1461311.png"
            }
          />
        </div>
        <div className="col-span-6 flex align-middle h-full">
          <h3 className="text-lg font-semibold">
            {monitor && monitor[0][0] ? monitor[0][0].name : "Monitor"}
          </h3>
        </div>
        <div className="col-span-3 h-full">
          {!monitor ? (
            <Link href={`/choose-product/11_${pcBuild[0][0].build_id}`}>
              <button className="bg-[#091235] text-white rounded p-2 h-10">
                Choose
              </button>
            </Link>
          ) : (
            <RemoveComponent cat_id={11} build_id={pcBuild[0][0].build_id} />
          )}
        </div>
      </div>
    </div>
  );
}
