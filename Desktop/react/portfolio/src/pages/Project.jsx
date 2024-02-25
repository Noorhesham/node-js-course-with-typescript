import { Outlet } from 'react-router-dom';
import { useTabs } from '../context/useTabs';
import { useActive } from '../context/useActiveLink';
import Tab from '../ui/Tab';
import TabItem from '../ui/TabItem';
import Window from '../ui/Window';
import WindowItem from '../ui/WindowItem';
import Pagination from '../ui/Pagination';
import { FaGithub } from 'react-icons/fa';
import { Projects } from '../constants/constans';
import { Suspense } from 'react';
import { RiLoader2Fill } from 'react-icons/ri';

function Project() {
  //we got tabs and when we click on it we want to set the active tab to id and render window based on that id
  //that window will filter the projects array based on the clicked id cause each project has a gen which will match the id
  const { activeTab, page, handlePagination } = useTabs();
  const { refs, addRef } = useActive();

  const FilteredProjects = activeTab !== 0 ? Projects.filter((project) => activeTab === project.gen) : Projects;
  const PaginationLength = Math.ceil(FilteredProjects.length / 6);
  const PageSize = 6;
  const Pages = [];
  for (let i = 1; i <= PaginationLength; i++) {
    Pages.push(i);
  }

  return (
    <div id="projects" ref={(el) => addRef(el)}>
      <h1
        className=" overflow-hidden capitalize text-center my-20 mt-24 text-7xl font-semibold text-violet-700 dark:text-gray-100 relative
            after:absolute lg:after:w-[20%] after:h-1 after:top-[50%] after:bg-pink-600 after:right-[20%]
            before:absolute lg:before:w-[20%] before:h-1 before:top-[50%] before:bg-pink-600 before:mr-2 before:left-[20%]"
      >
        top projects
      </h1>
      <section className="flex  flex-col gap-2">
        <a
          href="https://github.com/Noorhesham"
          target="_blank"
          className=" text-gray-800 dark:text-gray-100 font-semibold text-center capitalize text-4xl mb-10
         bg-pink-500 w-fit m-auto py-2 px-4 rounded-xl flex items-center "
        >
          View all on git hub <FaGithub />
        </a>
        <Tab>
          <TabItem id={0}>All projects</TabItem>
          <TabItem id={'React'}>React</TabItem>
          <TabItem id={'Next'}>Next-js</TabItem>
          <TabItem id={'Javascript'}>Vanilla javascript</TabItem>
          <TabItem id={'Sass'}> designs</TabItem>
        </Tab>
        <Suspense fallback={<RiLoader2Fill />}>
          <Window>
            {FilteredProjects.slice((page - 1) * PageSize, page * PageSize).map((project) => (
              <WindowItem
                id={project.id}
                gen={project.gen}
                img={project.img}
                name={project.name}
                link={project.link}
                description={project.description}
              />
            ))}
          </Window>
        </Suspense>
        <div className="flex overflow-hidden  justify-center gap-3 py-5">
          {PaginationLength > 1 && Pages.map((p) => <Pagination active={page === p} onClick={handlePagination} i={p} />)}
        </div>
      </section>
      <Outlet />
    </div>
  );
}

export default Project;
