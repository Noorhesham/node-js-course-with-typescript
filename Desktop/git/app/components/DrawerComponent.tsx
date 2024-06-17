import React, { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FetchDrawer from "./FetchDrawer";

const DrawerComponent = ({ trigger, name, id }: { trigger: ReactNode; id: string; name?: string }) => {
  return (
    <Drawer>
      <DrawerTrigger>{trigger}</DrawerTrigger>
      <DrawerContent className=" bg-gray-100   ">
        <DrawerClose className=" text-xl text-1  p-2 rounded-xl absolute top-5 right-10 font-bold">X</DrawerClose>
        <div className="mx-auto max-h-[75vh] overflow-y-scroll w-full max-w-64 md:max-w-[30rem] xl:max-w-[40rem]">
          <DrawerHeader>
            <DrawerTitle>Variations of {name}</DrawerTitle>
            <DrawerDescription>Choose your desired options.</DrawerDescription>
          </DrawerHeader>
          <FetchDrawer id={id} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
