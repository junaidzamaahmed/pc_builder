"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface IncreaseQuantityProps {
  pid: number;
  build_id: number;
  cat_id: number;
}

export default function AddToBuild({
  pid,
  build_id,
  cat_id,
}: IncreaseQuantityProps) {
  const router = useRouter();

  const addToCart = async (pid: number) => {
    if (!Cookies.get("uid")) {
      router.push("/login");
    }
    const response = await axios.post("/api/add-to-build", {
      pid: pid,
      build_id: build_id,
      cat_id: cat_id,
    });
    router.push("/pc-builder");
  };

  return (
    <Button className="w-full" size="sm" onClick={() => addToCart(pid)}>
      Add to build
    </Button>
  );
}
