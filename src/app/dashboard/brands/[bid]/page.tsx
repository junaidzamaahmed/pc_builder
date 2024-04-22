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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";

function EditBrand({ params }: { params: { bid: string } }) {
  const formSchema = z.object({
    name: z.string().min(1).max(100),
    bid: z.number().min(1),
  });

  const router = useRouter();
  let cat = params.bid.split("_");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { bid: Number(cat[0]), name: cat[1] },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.put("/api/brand", values);
      router.refresh();
      router.push("/dashboard/brands");
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div>
      <Link
        href="/dashboard/brands"
        className="flex items-center mb-4 text-blue-500"
      >
        <ArrowLeft size={20} />
        <span className="ml-2">Back to brands</span>
      </Link>
      <h1 className="text-2xl font-bold">Edit Brands</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand name</FormLabel>
                <FormControl>
                  <Input placeholder="eg. Gigabyte" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default EditBrand;
