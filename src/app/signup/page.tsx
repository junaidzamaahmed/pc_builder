"use client";

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
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  phone: z.string().min(11, {
    message: "Phone must be at least 11 characters.",
  }),
  email: z.string().email({
    message: "Invalid email.",
  }),
  full_name: z.string().min(3, {
    message: "Full name must be at least 3 characters.",
  }),
});

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post("/api/user", values);
      Cookies.set("email", response.data.email, { expires: 100 });
      Cookies.set("full_name", response.data.full_name, { expires: 100 });
      Cookies.set("phone", response.data.phone, { expires: 100 });
      Cookies.set("role", response.data.role, { expires: 100 });
      Cookies.set("uid", response.data.uid, { expires: 100 });
      router.push("/");
    } catch (error: any) {
      if (error.response.data === "User already exists") {
        form.setError("email", {
          message: "Email already exists.",
        });
      }
    }
  }

  return (
    <section className="bg-[#091235] bg-center bg-cover bg-no-repeat h-[75vh] w-[98vw] relative flex items-center">
      <div className="w-[99vw] h-[75hv] bg-black opacity-50 absolute top-0 left-0"></div>
      <div className="relative text-white text-center flex flex-col gap=4 mx-auto border-2 rounded-md px-4 w-[90vw] lg:w-[30%] py-6 shadow-xl shadow-yellow-500">
        <h1 className="text-2xl uppercase font-semibold">Sign Up</h1>
        <p className="mb-4">Create your account in just a minute</p>
        <div className="flex flex-col gap-2 w-[70%] mx-auto text-left">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Full Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left">Phone</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormDescription>
                By clicking the submit button, you agree to our terms and
                conditions.
              </FormDescription>
              <div className="text-center">
                <Button
                  className=" text-[#091235] bg-yellow-400 px-4 py-2 rounded-md text-xl w-[200px] mx-auto hover:bg-transparent hover:text-white border-yellow-600 border-2"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
