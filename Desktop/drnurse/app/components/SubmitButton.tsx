import { Button } from "@/components/ui/button";
import React from "react";
import Spinner from "./Spinner";
import { CheckCircleIcon } from "lucide-react";

const SubmitButton = ({ text, isPending, btnStyles }: { text: string; isPending?: boolean; btnStyles?: String }) => {
  return (
    <Button
      type="submit"
      className={`  rounded-full hover:bg-main2/60 duration-150 bg-main2  text-center text-gray-50 py-2 px-8 ${btnStyles}`}
    >
      {isPending ? (
        <Spinner />
      ) : (
        <p className="flex items-center gap-2">
          {text=='SAVE CHANGES'&&<CheckCircleIcon />}
          {text}
        </p>
      )}
    </Button>
  );
};

export default SubmitButton;
