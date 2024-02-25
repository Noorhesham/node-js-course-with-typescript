import { FaPlay, FaGithub } from 'react-icons/fa';
import { useParams } from 'react-router';
import { useMoveBack } from '../hooks/useMoveBack';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Projects as Detailed } from '../constants/constans';

function Projects() {
  const { id } = useParams();
  const moveback = useMoveBack();
  const project = Detailed.find((projct) => projct.id === +id);

  return (
    <div>
      <h1
        className=" capitalize text-center my-20 mt-24 text-7xl font-semibold text-violet-700 dark:text-gray-100 relative
            after:absolute lg:after:w-[15%] after:h-1 after:top-[50%] after:bg-pink-600 after:right-[20%]
            before:absolute lg:before:w-[15%] before:h-1 before:top-[50%] before:bg-pink-600 before:mr-2 before:left-[20%]"
      >
        {project?.name}
      </h1>
      <section className=" flex-col py-10 px-16 bg-slate-800 items-center   relative">
        <button
          onClick={moveback}
          className="flex  w-fit transition-all duration-75 left-[10%] mb-5 relative text-white hover:bg-pink-600 bg-pink-500 py-2 px-3 rounded-lg gap-3"
        >
          <IoMdArrowRoundBack className=" text-white text-3xl" />
          <span>Back</span>
        </button>
        <div className=" flex flex-col items-center justify-center">
          <div className=" flex items-center lg:flex-row flex-col justify-center gap-5">
            <img src={project.img} className=" w-[90%] lg:w-[60rem] rounded-xl" />
            {project.video && (
              <iframe
                src={project.video}
                className="rounded-xl w-[90%] lg:w-[56rem] overflow-y-scroll "
                width="560"
                height="314"
                style="border:none;"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen="true"
              ></iframe>
            )}
          </div>
          <div
            className={`md:py-10 md:px-16 py-4 px-8  flex flex-col justify-center items-start  ${
              project.video ? ' items-start lg:ml-[10rem]' : 'items-center '
            }`}
          >
            <h2 className={` flex gap-5 text-pink-500 capitalize text-5xl  place-self-start  mb-7 ${!project.video && 'lg:ml-[23rem]'}`}>
              overview
              <a href={project.git}>
                <FaGithub className=" bg-white py-1 rounded-full transition-all hover:text-purple-500" />
              </a>
              <a href={project.link}>
                <FaPlay className=" bg-white py-3  rounded-full transition-all hover:text-purple-500" />
              </a>
            </h2>
            <ul className=" grid md:grid-cols-3 grid-cols-2  items-center gap-5 ">
              {project.tech.map((tech) => (
                <li className="text-center py-2 px-10 rounded-full bg-gray-300 dark:bg-slate-600 dark:text-gray-100  inline-block">
                  {tech}
                </li>
              ))}
            </ul>
            <p className="lg:w-[60%] w-full text-gray-200 mt-10 text-3xl leading-relaxed">{project.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Projects;
