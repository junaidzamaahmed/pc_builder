"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  cat_id: string;
}

export default function DeleteButton({ cat_id }: DeleteButtonProps) {
  const router = useRouter();
  const handleDelete = async () => {
    const response = await axios.delete("/api/category", { data: { cat_id } });
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
