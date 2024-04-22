"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// const FormSchema = z.object({
//   categories: z
//     .array(z.string())
//     .refine((value) => value.some((item) => item), {
//       message: "You have to select at least one item.",
//     }),
// });

export default function Shop() {
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {},
  // });
  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   console.log(data);
  // }
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [disabled, setDisabled] = useState(false);

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
    await axios.post("/api/cart/cart-products", {
      cid: cartData.data[0].cid,
      pid: pid,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const prod = await axios.get("/api/product");
      const cat = await axios.get("/api/category");
      const brd = await axios.get("/api/brand");
      setProducts(prod.data);
      setCategories(cat.data[0]);
      setBrands(brd.data[0]);
    };
    fetchData();
  }, []);
  return (
    <>
      {/* <aside className="bg-gray-100 border-t border-gray-200 p-6 md:p-8 lg:p-12">
        <h2 className="text-2xl font-bold mb-6">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Category</h3>
            <div className="space-y-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="categories"
                    render={() => (
                      <FormItem>
                        {categories.map((item: any) => (
                          <FormField
                            key={item.cat_id}
                            control={form.control}
                            name="categories"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.cat_id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        item.cat_id
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.cat_id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.cat_id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />{" "}
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Price Range</h3>
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Checkbox id="price-range-1" />
                <span>$0 - $50</span>
              </Label>
              <Label className="flex items-center space-x-2">
                <Checkbox id="price-range-2" />
                <span>$50 - $100</span>
              </Label>
              <Label className="flex items-center space-x-2">
                <Checkbox id="price-range-3" />
                <span>$100+</span>
              </Label>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Brand</h3>
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <Checkbox id="brand-1" />
                <span>Brand 1</span>
              </Label>
              <Label className="flex items-center space-x-2">
                <Checkbox id="brand-2" />
                <span>Brand 2</span>
              </Label>
              <Label className="flex items-center space-x-2">
                <Checkbox id="brand-3" />
                <span>Brand 3</span>
              </Label>
            </div>
          </div>
        </div>
      </aside> */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                key={product.pid}
              >
                <img
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  height="300"
                  src={product.imageUrl}
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width="300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-500 mb-4">{product.price}</p>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => addToCart(product.pid)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
