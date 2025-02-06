"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { fetchData } from "../actions/Server";
import { useToast } from "@/hooks/use-toast";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Counter = ({
  value,
  max,
  defaultcount,
  id,
}: {
  value: number;
  max?: number;
  defaultcount?: number;
  id?: any;
}) => {
  const router = useRouter();
  const [count, setCount] = React.useState(defaultcount || 1);
  const { toast } = useToast();
  const axiosPrivate = useAxiosPrivate();

  const debouncedMutate = React.useCallback(
    debounce(async (newCount) => {
      const res =
        newCount > count
          ? await axiosPrivate.post("/user/cart/addToCart", { productId: id, newCount })
          : await axiosPrivate.post("/user/cart/removeFromCart", { productId: id, newCount });
      toast({
        title: "Success",
        description: res.data.message,
      });
      setCount(newCount);
    }, 300),
    [value]
  );

  const handleCountChange = (newCount: number) => {
    setCount(newCount);
    debouncedMutate(newCount);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={"outline"}
        className="rounded-full p-2 h-7 border-main2 text-main2 w-7"
        onClick={() => handleCountChange(count - 1)}
      >
        -
      </Button>
      <p className="text-sm text-white  ">{count < 10 ? `0${count}` : count}</p>
      <Button
        variant={"outline"}
        className="rounded-full p-2 h-7 border-main2 text-main2 w-7"
        onClick={() => handleCountChange(count + 1)}
        disabled={count >= (max ?? Infinity)}
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
