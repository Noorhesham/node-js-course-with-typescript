import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { ButtonCustom } from "@/components/ButtonCustom";
import { ChevronLeft, Home } from "lucide-react";

const projects = [
  {
    id: "q-north",
    name: "Q North Project",
    image: "/p1.png",
  },
  {
    id: "q-six",
    name: "Q Six Project",
    image: "/p2.png",
  },
];

export default function Projects() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-[#003B5C] overflow-hidden">
      <MaxWidthWrapper className="relative flex flex-col gap-8 mt-24 z-10">
        <Header view={false} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {projects.map((project, index) => (
            <Link to={`/${placeId}/${project.id}`} key={project.id}>
              <motion.div
                className="group relative aspect-video rounded-[32px] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className=" flex items-stretch  absolute bottom-6 left-0">
                  <img src="/q.png" className=" h-12" alt="" />
                  <h2 className="text-2xl bg-main2 h-full  px-10 py-2 rounded-r-2xl text-white font-semibold">
                    {project.name}
                  </h2>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>{" "}
        <div className="z-50 w-full -bottom-20 left-28 absolute">
          <div className="special-font flex items-center gap-4 z-50">
            <ButtonCustom variant="outline" size="lg" onClick={() => navigate(`/places`)} className="backdrop-blur-sm">
              Prev <ChevronLeft className="h-4 w-4" />
            </ButtonCustom>
          </div>

          <Button
            onClick={() => navigate("/")}
            variant="default"
            size="lg"
            className="fixed !px-4 !py-6 cursor-pointer hover:bg-white hover:text-gray-800 bottom-8 right-36 duration-200 rounded-full text-white bg-main2 z-50 backdrop-blur-sm"
          >
            <Home className="h-8 w-8" />
          </Button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
