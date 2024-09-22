"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { toast } from "react-toastify";
import { MdPhoto } from "react-icons/md";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormInput from "./FormInput";
import Loader from "./Loader";
import { StudentProfile } from "./User";
import ComboboxForm from "./ComboboxForm";
import { axiosPrivate } from "@/lib/axiosInestance";
import useCountryCity from "../hooks/useCountryCity";
import { DialogClose } from "@/components/ui/dialog";

const UserSchema = z.object({
  name: z.string().nonempty("الاسم مطلوب"),
  phone: z.string().min(5, "رقم الهاتف مطلوب ويجب أن يكون على الأقل 5 أرقام"),
  parent_phone: z.string().min(5, "رقم هاتف الوالدين مطلوب ويجب أن يكون على الأقل 5 أرقام"),
  city_id: z.union([z.string().min(1, "المدينة مطلوبة"), z.number().min(1, "المدينة مطلوبة")]),
  governorate_id: z.union([z.string().min(1, "المحافظة مطلوبة"), z.number().min(1, "المحافظة مطلوبة")]),
  level_name: z.string().optional(),
  level_id: z.any().optional(),
});

const UserUpdateForm = ({ userData }: { userData: StudentProfile }) => {
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<File>();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: userData?.name || "",
      phone: userData?.phone || "",
      parent_phone: userData?.parent_phone || "",
      city_id: userData?.city_id || "",
      governorate_id: userData?.governorate_id || "",
      level_name: userData?.level_name || "",
      level_id: userData?.level_id || "",
    },
  });

  const router = useRouter();
  const { control, handleSubmit } = form;
  const { countries, cities, isLoadingCountries, setSelectedCountry } = useCountryCity(userData.governorate_id);
  const formData = new FormData();

  const onSubmit = async (data: z.infer<typeof UserSchema>) => {
    // Convert values to string before appending to formData
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("parent_phone", data.parent_phone);
    formData.append("city_id", String(data.city_id));
    formData.append("governorate_id", String(data.governorate_id));
    formData.append("level_id", data.level_name || "");
    formData.append("gender", String(userData.gender));
    formData.append("type", String(userData.type));
    if (image) formData.append("avatar", image);

    startTransition(async () => {
      try {
        const res = await axiosPrivate.put(`students/me`, formData);
        console.log(res);
        if (res.status === 200) {
          toast.success("تم تحديث بيانات المستخدم");
          queryClient.invalidateQueries({ queryKey: ["me"] });
        }
      } catch (error: any) {
        console.log(error);
        // toast.error(error.response.data);
      }
    });
    router.refresh();
  };

  const governorates = countries?.governorates || [];

  if (isLoadingCountries) return <Loader />;

  return (
    <div className="py-4 px-8">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-7 mb-5 mt-3 items-center">
          <label htmlFor="img" className="h-32 group rounded-full border border-gray-400 w-32 relative">
            <Image
              src={(image && URL.createObjectURL(image)) || userData?.avatar || "/avatarDefault.jpg"}
              alt="صورة المستخدم"
              fill
              className={`rounded-full group-hover:opacity-90 duration-150 cursor-pointer absolute object-cover object-center ${
                isPending && "animate-pulse opacity-90"
              }`}
            />
            <MdPhoto className="text-3xl opacity-0 group-hover:opacity-100 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <input
              id="img"
              onChange={(e) => {
                e.target.files && setImage(e.target.files[0]);
              }}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
          <FormInput disabled={isPending} control={control} className="w-full" name="name" label="الاسم" type="text" />
          <FormInput
            disabled={isPending}
            control={control}
            className="w-full"
            name="phone"
            label="رقم الهاتف"
            type="text"
          />
          <FormInput
            disabled={isPending}
            control={control}
            className="w-full"
            name="parent_phone"
            label="رقم هاتف الوالدين"
            type="text"
          />
          <FormInput
            disabled={true}
            control={control}
            className="w-full"
            name="level_name"
            label="اسم المستوى"
            type="text"
          />
          <ComboboxForm
            onChange={() => {
              setSelectedCountry(Number(form.getValues("governorate_id")));
            }}
            label="اختر المحافظة"
            name="governorate_id"
            options={governorates.map((gov: any) => ({ label: gov.name, value: gov.id }))}
            placeholder={"اختر المحافظة"}
          />
          <ComboboxForm
            name="city_id"
            label="المدينة"
            placeholder={"اختر المدينة"}
            options={cities.map((city: any) => ({ label: city.name, value: city.id }))}
          />

          {Object.keys(form.formState.errors).map((field: any) => (
            <div key={field} className="flex items-center text-yellow-600">
              <AlertTriangle className="mr-2" />
              {/*@ts-ignore */}
              {form.formState?.errors[field]?.message}
            </div>
          ))}
          <div className=" flex items-center gap-4 self-start ">
            <Button className="w-full" type="submit" variant={"default"}>
              إرسال
            </Button>
            <DialogClose asChild>
              <Button variant="outline">اغلاق</Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserUpdateForm;
