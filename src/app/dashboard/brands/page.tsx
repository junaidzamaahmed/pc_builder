import db from "@/lib/db";
import Link from "next/link";
import DeleteButton from "./_components/deleteButton";

export default async function Brands() {
  let response: any;
  try {
    response = await db.promise().query("SELECT * FROM brand");
  } catch (error: any) {
    console.log(error);
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-6">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="flex justify-end p-6">
            <Link href="/dashboard/brands/add-brand">
              <button className="bg-gray-300 hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded">
                Add Brand
              </button>
            </Link>
          </div>

          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>

                {Array.isArray(response) &&
                  response[0]?.map((brand: any) => (
                    <tr key={brand.bid}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {brand.bid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {brand.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/dashboard/brands/${brand.bid}_${brand.name}`}
                        >
                          <button className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </button>
                        </Link>
                        <DeleteButton bid={brand.bid} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
