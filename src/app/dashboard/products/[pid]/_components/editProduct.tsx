"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  price: z.coerce.number().int().positive(),
  inStock: z.coerce.number().int().positive(),
  imageUrl: z.string().url(),
  bid: z.coerce.number().int().positive(),
  cat_id: z.coerce.number().int().positive(),
  pid: z.coerce.number().int().positive(),
});

interface EditProductProps {
  product: any;
}

const EditProduct = ({ product }: EditProductProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      inStock: product.inStock,
      imageUrl: product.imageUrl,
      pid: product.pid,
    },
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.put("/api/product", values);
      router.push("/dashboard/products");
    } catch (error: any) {
      console.log(error);
    }
  }
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/brand");
        const response2 = await axios.get("/api/category");
        setBrands(response.data[0]);
        setCategories(response2.data[0]);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Link
        href="/dashboard/products"
        className="flex items-center mb-4 text-blue-500"
      >
        <ArrowLeft size={20} />
        <span className="ml-2">Back to products</span>
      </Link>
      <h1 className="text-2xl font-bold">Edit Product</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="eg. Nvidia RTX 2060" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="eg. A powerful GPU for gaming."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="eg. 300" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>In stock</FormLabel>
                <FormControl>
                  <Input placeholder="eg. 10" type="number" {...field} />
                </FormControl>
                <FormDescription>Number of products in stock.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Product's image URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bid"
            defaultValue={product?.bid}
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel>Select Brand</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(product.bid)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands?.map((brand: any) => (
                      <SelectItem key={brand.bid} value={String(brand.bid)}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cat_id"
            defaultValue={product?.cat_id}
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel>Category ID</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={String(product?.cat_id)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category: any) => (
                      <SelectItem
                        key={category.cat_id}
                        value={String(category.cat_id)}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProduct;
