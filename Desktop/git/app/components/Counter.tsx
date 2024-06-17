import React from "react";
import ButtonRounded from "./ButtonRounded";
import { FaShoppingCart } from "react-icons/fa";

const Counter = ({ count, setCount,max }: { count: number; setCount: (c: any) => any ,max:number}) => {

  const handleClick = () => {
    if (count > 0) setCount((c:number) => c + 1);
    else return;
  };
  const decrease = () => {
    if (count < 0) return;
    else setCount((c:number) => c - 1);
  };
  return (
    <div className="">
      {count === 0 ? (
        <ButtonRounded onClick={() => setCount((c:number) => c + 1)} icon={<FaShoppingCart />} text="Add" className=" " />
      ) : (
        <div className="flex items-center text-lg m-auto border border-gray-400  px-2 py-1 font-semibold rounded-lg bg-gray-50 text-1  gap-4">
          <button className=" px-2   hover:text-gray-200 duration-150 rounded-lg " onClick={decrease}>
            -
          </button>
          <span className="font-semibold duration-200">{count}</span>
          <button disabled={count>=max}
            className=" px-2  hover:text-gray-200 duration-150 rounded-lg "
            onClick={handleClick}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Counter;
