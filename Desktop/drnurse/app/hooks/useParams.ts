import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useParams = (paramName: string, initialValue: any) => {
  const [param, setParam] = useState<string>(initialValue);
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleParam = (newParam: string,name?:string) => {
    setParam(newParam);
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(name||paramName, newParam);
    router.push(`?${updatedParams.toString()}`, { scroll: false });
  };
  const deleteParam = (param: string) => {
    const existingUuid = searchParams.get(param);
    if (existingUuid) {
      const updatedParams = new URLSearchParams(searchParams.toString());
      updatedParams.delete(param);
      router.replace(`?${updatedParams.toString()}`, { scroll: false });
    }
  };
  useEffect(() => {
    const existingParam = searchParams.get(paramName);
    if (existingParam) {
      setParam(existingParam);
    }
  }, [searchParams, paramName]);

  return [param, handleParam,deleteParam] as const;
};
