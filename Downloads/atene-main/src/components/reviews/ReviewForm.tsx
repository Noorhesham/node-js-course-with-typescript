import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../inputs/FormInput"; // Assuming you have this component
import { Form } from "../ui/form";
import Card from "../Card";
import { Button } from "../ui/button";
import { ChevronLeft,  } from "lucide-react";

// Define the schema for validation using Zod
const reviewSchema = z.object({
  name: z.string().min(1, "أدخل الاسم").max(100, "الاسم طويل جدًا"),
  phone: z.string().min(1, "رقم الهاتف مطلوب").max(20, "رقم الهاتف طويل جدًا"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  review: z.string().min(10, "يجب أن تكون المراجعة على الأقل 10 أحرف"),
  rating: z.number().min(1, "التقييم مطلوب").max(5, "التقييم يجب أن يكون بين 1 و 5"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const ReviewForm = () => {
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  });
  const {
    handleSubmit,

    reset,
  } = form;
  const onSubmit = (data: ReviewFormData) => {
    // Logic for form submission, e.g., send data to the server.
    console.log(data);

    reset();
  };

  return (
    <>
      <Card className="flex bg-[#F2F2F2] w-full items-start gap-4">
        <img src="/image.png" alt="" />
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
            <div className="flex items-center gap-2">
              <FormInput type="text" placeholder=" أبانوب أشرف" className=" " label="اسمك" name="name" />
              <FormInput type="email" placeholder="person@gmail.com" label="البريد الإلكتروني" name="email" />
            </div>
            <FormInput area placeholder="اكتب مراجعتك ..." label=" اكتب مراجعتك" name="review" />
            <FormInput photo name="photo" />

            <FormInput rate name="rating" />
            {/* Submit Button */}
            <Button className="flex items-center gap-2  rounded-full  w-fit mr-auto">
              مراجعة ما بعد <ChevronLeft />
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default ReviewForm;
