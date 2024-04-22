"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  trx_id: z.string().min(2).max(50),
});

export default function Checkout({ params }: { params: { id: string } }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const order = await axios.post("/api/order", {
        ...values,
        isPC: params.id.split("_")[0] == "pc",
        uid: Cookies.get("uid"),
        build_id: Number(params.id.split("_")[1]),
      });
      router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  }

  const id = params.id.split("_");
  return (
    <div className="py-20 px-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="trx_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction ID</FormLabel>
                <FormControl>
                  <Input placeholder="XZxDSdsdsabdsadNXZJKX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>{" "}
    </div>
  );
}
