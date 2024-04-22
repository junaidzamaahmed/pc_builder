"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RemoveComponentProps {
  build_id: number;
  cat_id: number;
}
export default function RemoveComponent({
  build_id,
  cat_id,
}: RemoveComponentProps) {
  const router = useRouter();

  const handleRemove = async () => {
    try {
      await axios.delete("/api/pc-build/removeComponent", {
        headers: {
          build_id: build_id,
          cat_id: cat_id,
        },
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      onClick={handleRemove}
      className="bg-red-600 text-white rounded p-2 h-10"
    >
      Remove
    </button>
  );
}
