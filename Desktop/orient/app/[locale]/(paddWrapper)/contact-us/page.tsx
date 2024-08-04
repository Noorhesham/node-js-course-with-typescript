"use client";
import React, { useRef } from "react";
import { Form } from "@formio/react";
import { Button } from "@/components/ui/button"; // Ensure this is your custom button component

const Page = () => {
  const formRef = useRef(null);

  const form = {
    type: "form",
    display: "form",
    components: [
      {
        label: "Email",
        key: "email",
        type: "textfield",
        input: true,
      },
      {
        label: "Message",
        key: "message",
        type: "textfield",
        input: true,
        required: true,
      },
    ],
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleCustomSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <div>
      <Form ref={formRef} onSubmit={onSubmit} form={form} />
      <Button onClick={handleCustomSubmit} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Custom Submit
      </Button>
    </div>
  );
};

export default Page;
