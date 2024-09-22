import Heading from "@/app/components/Heading";
import MaxWidthWrapper from "@/app/components/MaxWidthWrapper";
import MotionContainer from "@/app/components/MotionContainer";
import MotionItem from "@/app/components/MotionItem";
import Paragraph from "@/app/components/Paragraph";
import { BASE_URL } from "@/lib/QueryFunctions";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Container from "postcss/lib/container";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const data = await fetch(`${BASE_URL}levels/${params.id}/lessons`).then((res) => res.json());
  const lessons = data.data.lessons;
  console.log(lessons);
  return (
    <section dir="rtl" className="  min-h-screen">
      <MaxWidthWrapper className=" ">
        <Heading title="حصص الصف " />
        <MotionContainer className=" hidden lg:grid  lg:grid-cols-3 gap-8">
          {lessons
            .reverse()
            .map((level: { name: string; id: string; thumbnail: string; description: string; price: number }) => (
              <MotionItem key={level.id}>
                <Link href={`/lesson/${level.id}`}>
                  <div className=" w-full relative h-80">
                    <Image src={level.thumbnail} alt={level.name} fill className=" object-contain rounded-2xl" />
                  </div>
                  <h1>{level.name}</h1>
                  <Paragraph text={level.description} />
                  <p>{formatPrice(level.price)}</p>
                </Link>
              </MotionItem>
            ))}
        </MotionContainer>{" "}
      </MaxWidthWrapper>
    </section>
  );
};

export default page;
