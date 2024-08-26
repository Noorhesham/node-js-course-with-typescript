import { resetPasswordSchemaPrepare } from "@/app/schema";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Server } from "../../Server";
import { z } from "zod";
import { toast } from "react-toastify";
import CustomForm from "@/app/components/CustomForm";
import { useRouter, useSearchParams } from "next/navigation";

const Prepare = ({ setMethods, handleParam, setMessage }: { setMethods: any; handleParam: any; setMessage: any }) => {
  const [useEmail, setUseEmail] = useState(false);
  const [error, setServerError] = useState<string[] | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const forgotArray = [
    {
      name: "username",
      placeholder: "Email",
      type: "prepare",
      phone: !useEmail,
    },
  ];
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(resetPasswordSchemaPrepare),
    defaultValues: {
      username: "",
      useEmail: false,
    },
    mode: "onChange",
  });
  const onSubmit = (data: z.infer<typeof resetPasswordSchemaPrepare>) => {
    startTransition(async () => {
      const res = await Server({
        resourceName: "reset",
        body: { ...data, type: "prepare" },
      });

      if (!res.status) setServerError(res.errors.length > 0 ? res.errors : res.message);
      if (res.status) {
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.set("level", "forgot");
        updatedParams.set("uuid", res.uuid);
        updatedParams.set("username", data.username);
        router.push(`?${updatedParams.toString()}`, { scroll: false });
        console.log(res);
        setMethods(res.forgot_password_methods);
        setMessage(res.message);

        toast.success(`${res.message} ...`);
      }
    });
  };
  return (
    <>
      <div className="text-main2  mt-8 self-center mx-auto text-base flex items-center gap-2">
        <p className="text-main2 font-medium text-sm">BY PHONE</p>
        <Switch
          noSwitch={true}
          checked={useEmail}
          onCheckedChange={() => {
            setUseEmail((e) => !e);
            form.setValue("useEmail", !useEmail);
          }}
        />
        <p className="text-main2 font-medium text-sm">BY EMAIL</p>
      </div>
      <div className=" w-full mt-5 px-5 md:px-14 flex flex-col ">
        <CustomForm
          isPending={isPending}
          btnStyles=" w-full"
          serverError={error}
          btnText="SEND"
          form={form}
          inputs={forgotArray}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default Prepare;
