"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StageCompleteButtonProps {
  oid: string;
  order: any;
}

export default function StageCompleteButton({
  oid,
  order,
}: StageCompleteButtonProps) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const handleStageComplete = async () => {
    setDisabled(true);
    const response = await axios.put("/api/order", {
      data: { oid, status: Number(order.status) + 1 },
    });
    console.log(response);
    setDisabled(false);
    router.refresh();
  };
  return order.status < 2 ? (
    <button
      disabled={disabled}
      onClick={handleStageComplete}
      className="disabled:opacity-50 ml-4 transition text-green-600 border border-green-600 hover:bg-green-600 hover:text-white px-2 py-1 rounded-md"
    >
      {order.status == 0 ? "Process Order" : "Deliver Order"}
    </button>
  ) : null;
}
