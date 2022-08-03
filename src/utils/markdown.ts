import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { ProjectData } from "./types";

export function getMarkdown() {
  const files = fs.readdirSync(path.resolve(`src/content`));

  const projects = files.map(file => {
    const slug = file.replace(".md", "");
    const rawFile = fs.readFileSync(
      path.resolve(`src/content/${file}`),
      "utf-8"
    );
    const parsedMarkdown = matter(rawFile);

    return {
      slug,
      data: parsedMarkdown.data as ProjectData,
      content: ""
    };
  });

  return projects;
}

export function getSingleMarkdown(slug: string) {
  const file = fs.readFileSync(path.resolve(`src/content/${slug}.md`), "utf-8");
  const parsedMarkdown = matter(file);

  return {
    slug,
    data: parsedMarkdown.data as ProjectData,
    content: marked.parse(parsedMarkdown.content)
  };
}
