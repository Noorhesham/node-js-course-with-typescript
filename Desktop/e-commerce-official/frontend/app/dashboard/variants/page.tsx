import { DataTable } from "@/app/components/DataTable";
import React from "react";
import { variantColumns } from "./columns";
import { fetchData } from "@/app/actions/Server";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import ModalCustom from "@/app/components/defaults/ModalCustom";
import { Button } from "@/components/ui/button";
import GlobalVariantForm from "@/app/components/GlobalVariantForm";

const page = async ({ searchParams: { limit, page } }: { searchParams: { limit?: string; page?: string } }) => {
  const variants = await fetchData({
    resourceName: "variants",
    tags: ["variants"],
  });
  const { data, totalPages } = variants;
  const { docs } = data;
  console.log(data);
  return (
    <MaxWidthWrapper>
      <ModalCustom content={<GlobalVariantForm />} btn={<Button>Create Global Variant</Button>} />
      <DataTable totalPages={totalPages} page={Number(page) || 1} columns={variantColumns} data={docs || []} />
    </MaxWidthWrapper>
  );
};

export default page;
