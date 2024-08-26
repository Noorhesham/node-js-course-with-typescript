import Container from "@/app/components/Container";
import FunctionalButton from "@/app/components/FunctionalButton";
import GridContainer from "@/app/components/GridContainer";
import Head1 from "@/app/components/Head1";
import { Location } from "@/app/components/Icons";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { EditIcon, FolderSync, Lock } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col">
      <Container className=" flex justify-between bg-light">
        <div className=" flex gap-1 flex-col items-start">
          <Head1 size="sm" text="General Practitioner" />
          <p className=" text-muted-foreground uppercase">National university health system</p>
          <div className=" flex items-center gap-2">
            <Location />
            <p>Mecca, Sudia Arabic</p>
          </div>
        </div>
        <div className="flex  items-center gap-3">
          <FunctionalButton btnText="Edit" icon={<EditIcon />} link="#" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className=" bg-gray-300 text-main2  p-2 rounded-xl">
                  <FolderSync />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Locked</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className=" bg-red-300 text-gray-800  p-2  rounded-xl">
                  <Lock />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Locked</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Container>
      <GridContainer cols={5}></GridContainer>
    </div>
  );
};

export default page;
