"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface IncreaseQuantityProps {
  pid: number;
}

export default function RemoveFromCart({ pid }: IncreaseQuantityProps) {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const addToCart = async (pid: number) => {
    if (!Cookies.get("uid")) {
      router.push("/login");
    }
    const cart = await axios.get(`/api/cart/${Cookies.get("uid")}`);
    if (cart.data.length === 0) {
      await axios.post("/api/cart", {
        uid: Cookies.get("uid"),
        price: 0,
      });
    }
    const cartData = await axios.get(`/api/cart/${Cookies.get("uid")}`);
    await axios.delete("/api/cart/cart-products", {
      // cid: cartData.data[0].cid,
      // pid: pid,
      headers: { cid: cartData.data[0].cid, pid: pid },
    });
    router.refresh();
  };

  return (
    <Button
      className="w-full mt-2 bg-red-500"
      size="sm"
      onClick={() => addToCart(pid)}
    >
      Remove
    </Button>
  );
}
