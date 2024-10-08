"use client"
import React, { Suspense, useEffect, useState } from "react";
import ProjectDescription from "./ProjectDescription";
import { useRouter, useSearchParams } from "next/navigation";
import { projects } from "@/constants";
import Project from "./Project";

const ProjectsBig = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState("");
  useEffect(
    function () {
      const id = searchParams.get("projectBig");
      //@ts-ignore
      if (id) setSelectedProject(projects.find(project=>project.id===+id));
      else setSelectedProject('')
    },
    [searchParams]
  );
  const handleProjectClick = (clickedProject: any) => {
    setSelectedProject(clickedProject);
    const projectId = clickedProject.id;
    router.push(`/?projectBig=${projectId}`, { scroll: false });
  };
  const handleBackClick = () => {
    setSelectedProject("");
    router.push("/", { scroll: false });
  };
  return (
    <Suspense fallback={<img src="/loading.png" alt="loading" className=" text-5xl animate-spin fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"/>}>
      <div className="flex flex-wrap items-center justify-center w-full px-3 p-4 gap-x-24 gap-y-2  mt-24">
      {selectedProject ? (
        <ProjectDescription moveback={handleBackClick} project={selectedProject} />
      ) : (
        projects
          .slice(0,4)
          .map((project: any) => (
            <Project onClick={() => handleProjectClick(project)} key={project.id} project={project} />
          ))    
      )}
    </div>
    </Suspense>
  );
};

export default ProjectsBig;
