"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

interface CancelButtonProps {
  oid: string;
  cancelled: boolean;
}

export default function CancelButton({ oid, cancelled }: CancelButtonProps) {
  const router = useRouter();
  const handleCancel = async () => {
    const response = await axios.put("/api/order", {
      data: { oid, status: 3 },
    });
    router.refresh();
  };
  return (
    !cancelled && (
      <button
        onClick={handleCancel}
        className="ml-4 text-red-600 hover:text-red-900"
      >
        Cancel
      </button>
    )
  );
}
