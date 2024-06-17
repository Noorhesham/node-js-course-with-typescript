import React from "react";
import { useVariance } from "../utils/qureries";
import { VarianceProps } from "../types";
import { Label } from "@radix-ui/react-label";
import VarianceGroup from "./VarianceGroup";

const Variance = ({id,count, }:{id:string,count:number, }) => {
  const { data, isLoading } = useVariance(id);
  if (isLoading) return <span>loading</span>;
 const variances = data.response?.map((option: VarianceProps) => ({
    ...option,
    variation_value: option.variation_value.map((value: any) => ({
      ...value,
      parentId: option.id,  // Add a property containing option.id
    })),
  }));
  return <div className="flex flex-col gap-4">
    {variances?.map((option:VarianceProps)=><div className=" py-2 px-5 rounded-xl  bg-white" key={option.id}>
        <Label className=" text-lg px-2 py-4 font-semibold" id={option.id}>{option.variation_name}</Label>
        <VarianceGroup  options={option.variation_value}/>
    </div>)}
  </div>;
};

export default Variance;
