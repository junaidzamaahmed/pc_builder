"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  bid: string;
}

export default function DeleteButton({ bid }: DeleteButtonProps) {
  const router = useRouter();
  const handleDelete = async () => {
    const response = await axios.delete("/api/brand", { data: { bid } });
    router.refresh();
  };
  return (
    <button
      onClick={handleDelete}
      className="ml-4 text-red-600 hover:text-red-900"
    >
      Delete
    </button>
  );
}
