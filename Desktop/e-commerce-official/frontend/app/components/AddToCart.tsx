"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ModalCustom from "./defaults/ModalCustom";
import Link from "next/link";
import { fetchData } from "../actions/Server";
import { useAuth } from "../context/AuthProvider";
import Counter from "./Counter";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AddToCart = ({
  id,
  max,
  disabled,
  inventory,
  reverse = false,
}: {
  id: number;
  max?: number;
  cartCount?: number;
  inCart?: boolean;
  cartId?: any;
  inventory?: any;
  disabled?: boolean;
  reverse?: boolean;
}) => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const cartCount = auth?.user?.cart.find((c: any) => c.productId.toString() === id)?.quantity;
  if (auth?.loading) return null;
  else if (auth?.accessToken === null) {
    return (
      <ModalCustom
        content={
          <div className="flex flex-col gap-5">
            <p>You are not logged in</p>
            <Link href="/login">Login</Link>
          </div>
        }
        btn={<Button className="mt-3">Add To Cart</Button>}
      />
    );
  } else
    return cartCount > 0 ? (
      <div className=" flex items-center ">
        <div className=" flex self-center mx-auto  items-center gap-2">
          <h2 className=" text-sm text-gray-200 lg:text-black font-medium">amount</h2>
          <Counter id={id} defaultcount={cartCount} max={max} value={cartCount} />
        </div>
      </div>
    ) : (
      <Button
        className=" mt-3"
        onClick={async () => {
          const res = await axiosPrivate.post("/user/cart/addToCart", { productId: id, newCount: 1 });
          console.log(res);
          if (res.status === 200) setAuth({ user: res.data.data.user });
        }}
      >
        Add To Cart
      </Button>
    );
};

export default AddToCart;
