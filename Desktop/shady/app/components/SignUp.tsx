"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomForm from "@/app/components/CustomForm";
import Link from "next/link";
import { motion, useAnimate } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { splitStringUsingRegex } from "@/lib/utils";
import { BASE_URL, useGetCities, useGetCountries } from "@/lib/QueryFunctions";
import Loader from "./Loader";
import axios from "axios";
import { toast } from "react-toastify";
import cookies from "js-cookie";
import useCountryCity from "../hooks/useCountryCity";
// Regex for Egyptian phone numbers
const egyptPhoneRegex = /^(010|011|012|015)\d{8}$/;

// Zod schema for signup form validation
const signupSchema = z
  .object({
    name: z.string().min(1, { message: " الاسم مطلوب رباعي" }),
    phone: z
      .string()
      .min(1, { message: "رقم الهاتف مطلوب" })
      .regex(egyptPhoneRegex, { message: "رقم الهاتف غير صالح" }),
    parent_phone: z
      .string()
      .min(1, { message: "رقم هاتف ولي الأمر مطلوب" })
      .regex(egyptPhoneRegex, { message: "رقم هاتف ولي الأمر غير صالح" }),
    password: z.string().min(1, { message: "كلمة المرور مطلوبة" }),
    password_confirmation: z.string().min(1, { message: "تأكيد كلمة المرور مطلوب" }),
    level_id: z.union([
      z.string().min(1, { message: "المستوى مطلوب" }),
      z.number().min(1, { message: "المستوى مطلوب" }),
    ]),
    city_id: z.union([
      z.string().min(1, { message: "المدينة مطلوبة" }),
      z.number().min(1, { message: "المدينة مطلوبة" }),
    ]),

    governorate_id: z.union([
      z.string().min(1, { message: "المحافظة مطلوبة" }),
      z.number().min(1, { message: "المحافظة مطلوبة" }),
    ]),
    gender: z.string().min(1, { message: "الجنس مطلوب" }),
    type: z.string().min(1, { message: "النوع مطلوب" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["password_confirmation"],
  });

const Signup = () => {
  //getting the countries and cities
  const { countries, cities, isLoadingCountries, isLoadingCities, selectedCountry, setSelectedCountry } =
    useCountryCity();
  console.log(countries);
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      phone: "",
      parent_phone: "",
      password: "",
      password_confirmation: "",
      level_id: "",
      city_id: "",
      governorate_id: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const [serverError, setServerError] = useState<string[] | string | null>(null);
  const [isPending, startTransition] = useTransition();
  //animation code
  const [scope, animate] = useAnimate();
  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };
  const chars = splitStringUsingRegex("إنشاء حساب");
  const logoRef = useRef(null);

  useEffect(() => {
    const handleAnimate = async () => {
      if (logoRef.current) {
        await animate(logoRef.current, { x: [500, 0], opacity: [0, 1] }, { duration: 1 });
        await animate(logoRef.current, { rotate: [0, 0, 360] }, { duration: 0.5 });
      }
    };

    handleAnimate();
  }, []);

  //submit code
  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    startTransition(async () => {
      try {
        const res = await axios.post(`${BASE_URL}register`, data);
        if (res.status === 200) {
          toast.success(res.data.message);
          cookies.set("token", res.data.data.token);
          router.push("/");
        } else setServerError(res.data.message);
      } catch (error: any) {
        setServerError(error.response.data.message);
      }
    });
  };
  //setting cities on country change

  // setting pre register data (mostly cached)
  const governorates = countries?.governorates;
  const levels = countries?.levels;
  const signupArray = [
    {
      name: "name",
      placeholder: "قم بإدخال اسمك",
      label: " الاسم رباعي",
    },
    {
      name: "phone",
      placeholder: "قم بإدخال رقم الهاتف",
      label: "رقم الهاتف",
      flex: true,
    },
    {
      name: "parent_phone",
      placeholder: "قم بإدخال رقم هاتف ولي الأمر",
      label: "رقم هاتف ولي الأمر",
      flex: true,
    },
    {
      name: "password",
      type: "password",
      password: true,
      noProgress: true,
      placeholder: "قم بإدخال كلمة المرور",
      label: "كلمة المرور",
      flex: true,
    },
    {
      name: "password_confirmation",
      type: "password",
      password: true,
      noProgress: true,
      placeholder: "قم بإعادة إدخال كلمة المرور",
      label: "تأكيد كلمة المرور",
      flex: true,
    },

    {
      name: "gender",
      label: "النوع",
      select: true,
      placeholder: "قم بإختيار النوع",
      options: [
        { label: "ذكر", value: "male" },
        { label: "انثى", value: "female" },
      ],
      flex: true,
    },
    {
      name: "type",
      label: "نوع الدراسة",
      select: true,
      options: [
        { label: "اونلاين", value: "online" },
        { label: "في السنتر", value: "offline" },
      ],
    },
    {
      name: "level_id",
      select: true,
      flex: true,
      placeholder: "قم بإختيار المرحلة الدراسية",
      label: "المرحلة الدراسية",
      options: levels && [...levels?.map((gov: any) => ({ label: gov.name, value: gov.id }))],
    },
    {
      name: "governorate_id",
      flex: true,
      select: true,
      placeholder: "قم بإختيار المحافظة",
      label: "المحافظة",
      options: governorates && [...governorates?.map((gov: any) => ({ label: gov.name, value: gov.id }))],
      onChange: (val: any) => setSelectedCountry(val),
    },
  ];
  //setting the field based on country add cities if i choose country
  const signupFields =
    selectedCountry && !isPending
      ? [
          ...signupArray,
          {
            name: "city_id",
            flex: true,
            select: true,
            placeholder: "قم بإختيار المدينة",
            label: "المدينة",
            options: cities?.map((city: any) => ({ label: city.name, value: city.id })),
          },
        ]
      : signupArray;
  return (
    <section ref={scope} className="overflow-hidden  py-20 justify-center flex flex-1 flex-col items-center">
      <div className="mx-auto flex flex-col items-center justify-center w-full">
        <div ref={logoRef} className="w-40  opacity-0  h-40 relative" id="logo">
          <Image className="rounded-full" src={"/channels4_profile (1).jpg"} alt="logo" fill />
        </div>
        {isLoadingCountries ? (
          <Loader />
        ) : (
          <>
            <div className="w-full mt-5 items-end px-5 lg:px-14 flex flex-col">
              <div className="flex items-center text-right my-4 gap-2">
                <motion.h1
                  initial="hidden"
                  animate="reveal"
                  transition={{ duration: 0.4, staggerChildren: 0.2, delay: 1 }}
                  className={`font-bold text-3xl leading-relaxed`}
                >
                  {chars.map((char, index) => (
                    <motion.span variants={charVariants} key={index}>
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
                <Image src={"/book.png"} className="w-10 h-10 aspect-square" width={200} height={200} alt={"book"} />
              </div>
              <CustomForm
                serverError={serverError}
                link="/login"
                btnText="إنشاء الحساب"
                isPending={isPending}
                form={form}
                inputs={signupFields}
                btnStyles="w-full"
                onSubmit={onSubmit}
              />
            </div>
            <div className="mt-8 text-sm flex flex-col gap-2 md:flex-row items-center">
              <Link href="/login" className="hover:underline duration-150 ml-1 text-violet-700 font-[700]">
                تسجيل الدخول
              </Link>
              <span className="font-[400] text-main2"> لديك حساب بالفعل؟ </span>
            </div>
          </>
        )}
        {serverError && <p className="text-red-500 text-center mt-3 text-sm font-semibold">{serverError}</p>}
      </div>
    </section>
  );
};

export default Signup;
