import Container from "@/app/components/Container";
import GridContainer from "@/app/components/defaults/GridContainer";
import Head1 from "@/app/components/defaults/Head1";
import MaxWidthWrapper from "@/app/components/defaults/MaxWidthWrapper";
import Paragraph from "@/app/components/defaults/Paragraph";
import UpdateUserForm from "@/app/components/UpdateUserForm";
import UserCard from "@/app/components/UserCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  return (
    <MaxWidthWrapper className=" flex  flex-col">
      <div className=" ">
        <Tabs dir="rtl" defaultValue="me" className="w-full">
          <TabsList className="flex gap-4">
            <TabsTrigger value="me" className="px-4 flex-1 py-2">
              اعدادات الحساب
            </TabsTrigger>
            <TabsTrigger value="history" className="px-4 flex-1 py-2">
              تاريخي المرضي
            </TabsTrigger>
          </TabsList>
          <TabsContent value="me" dir="rtl">
            <GridContainer cols={3} className="   gap-5  items-center  mx-auto ">
              <UserCard
                user={{ firstName: "محمد", lastName: "محمد", phoneNumber: "0123456789", photo: "/doctor2.png" }}
              />
              <UpdateUserForm
                user={{ firstName: "محمد", lastName: "محمد", phoneNumber: "0123456789", photo: "/doctor2.png" }}
              />
            </GridContainer>
          </TabsContent>
          <TabsContent className="flex flex-col gap-4 mt-3" value="history" dir="rtl">
            <Head1 title="التاريخ المرضي" size="text-xl" />
            <div className=" flex flex-col gap-4">
              <Container className=" flex flex-col gap-2 items-start">
                <Head1 color="text-gray-800" title=" (2024/01/01) صداع نصفي شديد" size="text-xl" />
                <Paragraph description="عاني المريض من صداع شديد لمده ايام متواصله وتم وصف علاج له" />
                <Button>تحميل ملف التشخيص</Button>
              </Container>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
