import db from "@/lib/db";
import Link from "next/link";
import StageCompleteButton from "./_components/stageCompleteButton";
import CancelButton from "./_components/cancelButton";

export default async function Orders() {
  let response: any;
  try {
    response = await db
      .promise()
      .query("SELECT * FROM `order`,user WHERE `order`.uid=user.uid");
    console.log(response[0]);
  } catch (error: any) {
    console.log(error);
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-6">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>

                {Array.isArray(response) &&
                  response[0]?.map((order: any) => (
                    <tr key={order.oid}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.oid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(order.date).toLocaleString()}
                      </td>
                      {order.status == 0 ? (
                        <td className="text-orange-500 px-6 py-4 whitespace-nowrap">
                          Pending
                        </td>
                      ) : order.status == 1 ? (
                        <td className="text-yellow-400 px-6 py-4 whitespace-nowrap">
                          Processing
                        </td>
                      ) : order.status == 2 ? (
                        <td className="text-green-600 px-6 py-4 whitespace-nowrap">
                          Delivered
                        </td>
                      ) : (
                        <td className="text-red-600 px-6 py-4 whitespace-nowrap">
                          Cancelled
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.amount} Taka
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* <Link href={`/dashboard/orders/${order.pid}`}>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </button>
                        </Link> */}
                        <CancelButton
                          cancelled={order.status == 3}
                          oid={order.oid}
                        />
                        <StageCompleteButton oid={order.oid} order={order} />
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
