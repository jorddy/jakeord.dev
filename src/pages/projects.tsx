import SEO from "@/components/seo";
import ProjectsGrid from "@/components/projects-grid";
import { useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { HiSearch } from "react-icons/hi";
import { getProjects, Project } from "@/utils/notion";

export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await getProjects();
  return {
    props: { projects }
  };
};

const Projects = (props: { projects: Project[] }) => {
  const [filterQuery, setFilterQuery] = useState("");
  const filteredProjects = useMemo(
    () =>
      props.projects.filter(value =>
        value.title.toLowerCase().includes(filterQuery.toLowerCase())
      ),
    [filterQuery, props.projects]
  );

  return (
    <>
      <SEO title='Projects - Jake Ord' />
      <section className='py-12 space-y-6 animate-fade-up'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold'>Projects</h1>
          <p className='text-lg'>
            Cultivation of my best projects working as a UX designer.
          </p>
        </div>

        <div
          className='bg-white flex items-center gap-2 p-2 px-4 rounded-sm border 
          border-gray-900 focus-within:outline-1 focus-within:outline-dashed'
        >
          <input
            className='bg-transparent w-full focus:outline-none'
            type='text'
            placeholder='Search Projects'
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value)}
          />
          <HiSearch size={20} />
        </div>

        {filteredProjects.length === 0 && (
          <p className='font-semibold'>Found no projects with that search</p>
        )}

        {filteredProjects.length > 0 && (
          <ProjectsGrid projects={filteredProjects} />
        )}
      </section>
    </>
  );
};

export default Projects;
