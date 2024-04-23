"use client";
import { useEffect, useState } from "react";
import logo from "../../public/images/pc-logo1.png";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  const [hamburger, setHamburger] = useState(false);
  let email = "";
  const [logged, setLogged] = useState(email);
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let email = Cookies.get("email");
    setLogged(email || "");
  }, []);

  const toggle = (hamburger: boolean) => {
    setHamburger(!hamburger);
  };
  const logout = () => {
    Cookies.remove("email");
    Cookies.remove("full_name");
    Cookies.remove("phone");
    Cookies.remove("uid");
    setLogged("");
    router.refresh();
  };
  useEffect(() => {
    const cartProducts = async () => {
      let cart = await axios.get("/api/cart", {
        headers: { uid: Cookies.get("uid") },
      });
      if (!cart.data[0]?.cid) {
        const response = await axios.post("/api/cart", {
          price: 0,
          uid: Cookies.get("uid"),
        });
        cart = await axios.get("/api/cart", {
          headers: { uid: Cookies.get("uid") },
        });
      }
      const products = await axios.get("/api/cart/cart-products", {
        headers: { cid: cart.data[0].cid },
      });
      setProducts(products.data);
    };
    if (Cookies.get("uid")) {
      cartProducts();
    }
  }, []);
  return (
    <header className="py-4 px-4 sm:px-10 bg-[#091235] font-[sans-serif] min-h-[70px]">
      <div className="flex flex-wrap items-center gap-x-2 max-lg:gap-y-6">
        <Link href="/">
          <Image src={logo} alt="logo" className="w-20" />
        </Link>
        <button
          onClick={() => toggle(hamburger)}
          className="ml-auto max-lg:block hidden"
        >
          <svg
            className="w-7 h-7"
            fill="#fdd000"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <Link href={Cookies.get("uid") ? "/cart" : "/login"}>
          <div className="flex lg:ml-auto max-lg:w-full">
            <span className="relative mr-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26px"
                height="26px"
                viewBox="0 0 24 24"
                className="cursor-pointer mt-2 hover:fill-[#fdd000] inline-block"
                fill="#fff"
              >
                <path
                  d="M1 1a1 1 0 1 0 0 2h1.78a.694.694 35.784 0 1 .657.474l3.297 9.893c.147.44.165.912.053 1.362l-.271 1.087C6.117 17.41 7.358 19 9 19h12a1 1 0 1 0 0-2H9c-.39 0-.64-.32-.545-.697l.205-.818A.64.64 142.028 0 1 9.28 15H20a1 1 0 0 0 .95-.684l2.665-8A1 1 0 0 0 22.666 5H6.555a.694.694 35.783 0 1-.658-.474l-.948-2.842A1 1 0 0 0 4 1zm7 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                  data-original="#000000"
                  paintOrder="fill markers stroke"
                ></path>
              </svg>
              <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                {products.length}
              </span>
            </span>
            <div className="flex xl:w-80 max-xl:w-full bg-white px-6 py-3 rounded outline outline-transparent focus-within:outline-[#091235]">
              <input
                type="text"
                placeholder="Search"
                className="w-full text-sm bg-transparent rounded outline-none pr-2"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                className="cursor-pointer fill-black"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </div>
          </div>
        </Link>

        <ul
          id="collapseMenu"
          className={`${
            hamburger ? "" : "max-lg:hidden"
          } lg:!flex lg:ml-14 lg:space-x-5 max-lg:space-y-2 max-lg:py-4 max-lg:w-full text-[#091235]`}
        >
          <li className="bg-[#fdd000] font-sans cursor-pointer max-lg:border-b max-lg:py-2 border border-black border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-50 outline-none duration-300 group">
            <Link
              href="/about"
              className="bg-[#091235] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 duration-500"
            ></Link>
            <Link href="/about">About</Link>
            <Link
              href="/about"
              className="bg-[#091235] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 duration-500"
            ></Link>
          </li>
          <li className="bg-[#fdd000] font-sans cursor-pointer max-lg:border-b max-lg:py-2 border border-black border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-50 outline-none duration-300 group">
            <Link
              href="/pc-builder"
              className="bg-[#091235] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 duration-500"
            ></Link>
            <Link href="/pc-builder">PC Builder</Link>
            <Link
              href="/pc-builder"
              className="bg-[#091235] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 duration-500"
            ></Link>
          </li>
          <li className="bg-[#fdd000] font-sans cursor-pointer max-lg:border-b max-lg:py-2 border border-black border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <Link
              href="/offers"
              className="bg-[#091235] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 duration-500"
            ></Link>
            <Link href="/shop">Shop</Link>
          </li>
          {logged != "" ? (
            <>
              <li className="bg-[#fdd000] font-sans cursor-pointer max-lg:border-b max-lg:py-2 border border-black border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <Link
                  href="/dashboard"
                  className="bg-[#091235] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 duration-500"
                ></Link>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li
                onClick={logout}
                className="bg-[#fdd000] font-sans cursor-pointer max-lg:border-b max-lg:py-2 border border-black border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
              >
                Logout
              </li>
            </>
          ) : null}
          {!logged ? (
            <>
              <li className="bg-[#fdd000] font-sans cursor-pointer max-lg:border-b max-lg:py-2 border border-black border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <Link
                  href="/signup"
                  className="bg-[#091235] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 duration-500"
                ></Link>
                <Link href="/signup">SignUp</Link>
              </li>
              <li className="bg-[#fdd000] font-sans cursor-pointer max-lg:border-b max-lg:py-2 border border-black border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <Link
                  href="/login"
                  className="bg-[#091235] absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 duration-500"
                ></Link>
                <Link href="/login">Login</Link>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </header>
  );
}
