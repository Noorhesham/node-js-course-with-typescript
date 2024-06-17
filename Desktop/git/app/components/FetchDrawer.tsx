import React, { useEffect } from "react";
import Variance from "./Variance";
import { DrawerFooter } from "@/components/ui/drawer";
import Counter from "./Counter";
import ButtonRounded from "./ButtonRounded";
import { usePrice } from "../context/PriceContext";
import { useGetBalance } from "../utils/qureries";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const FetchDrawer = ({ id }: { id: string }) => {
  const { count, setCount, variance, resetVariance } = usePrice();
  const { data, isLoading, isError } = useGetBalance(
    variance.map((op: any) => op.value),
    id,
    count
  );
  useEffect(() => {
    resetVariance();
  }, []);
  useEffect(() => {
    if (!isLoading && !data?.response.is_available) toast.error("Product is out of stock");
  }, [isLoading]);

  return (
    <>
      <Variance count={count} id={id} />
      {isLoading ? (
        <FaSpinner className="animate-spin mx-auto text-2xl" />
      ) : (
        <DrawerFooter className="flex ml-auto self-end justify-end flex-row items-end">
          <Counter max={data.response.available_stock} count={count} setCount={setCount} />
          {data.response.is_available ? (
            <ButtonRounded
              className=" min-w-[150px]"
              disabled={isLoading}
              text={`Add Item | ${data.response.pricing_details.amount_including_tax}₹`}
            />
          ) : (
            <ButtonRounded
              className=" text-gray-50 bg-green-500 hover:bg-green-400 duration-200"
              text="Reset"
              onClick={resetVariance}
            />
          )}
        </DrawerFooter>
      )}
    </>
  );
};

export default FetchDrawer;
