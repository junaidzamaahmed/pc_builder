"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  pid: string;
}

export default function DeleteButton({ pid }: DeleteButtonProps) {
  const router = useRouter();
  const handleDelete = async () => {
    const response = await axios.delete("/api/product", { data: { pid } });
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
