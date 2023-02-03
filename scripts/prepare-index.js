import path from "path";
import { promises as fs } from "fs";
import { globby } from "globby";
import grayMatter from "gray-matter";

export function getVersionFromURL(pathname) {
	const versionCodeMatch = pathname.match(/\/v([0-9].[0-9].[0-9])\//);
	return versionCodeMatch ? versionCodeMatch[1] : '_latest_';
}
export function getLangFromURL(pathname) {
	const langCodeMatch = pathname.split("/")
	return langCodeMatch[0]
}



(async function () {
  // prepare the dirs
  const srcDir = path.join(process.cwd(), "src");
  const publicDir = path.join(process.cwd(), "public");
  const contentDir = path.join(srcDir, "pages");
  const contentFilePattern = path.join(contentDir, "**", "*.mdx");
  console.log(contentFilePattern)
  const indexFile = path.join(publicDir, "search-index.json");
  const getSlugFromPathname = (pathname) => {
    let parts = pathname.split("/")
    let initSlice = parts.findIndex( p => p == "pages")

    let slug = parts.slice(initSlice + 1)
    return slug.join("/").replace(".mdx", "")
  }

    //path.basename(pathname, path.extname(pathname));

  const contentFilePaths = await globby([contentFilePattern]);
  console.log(contentFilePaths)

  if (contentFilePaths.length) {
    const files = contentFilePaths.map(
      async (filePath) => await fs.readFile(filePath, "utf8")
    );
    const index = [];
    let i = 0;
    for await (let file of files) {
      const {
        data: { title, excerpt, tags },
        content,
      } = grayMatter(file);
      let indexedItem = {
        slug: getSlugFromPathname(contentFilePaths[i]),
        category: "documentation",
        title,
        excerpt,
        tags,
        body: content,
      }

      indexedItem.version = getVersionFromURL(indexedItem.slug)
      indexedItem.lang = getLangFromURL(indexedItem.slug)
      console.log("slug: ", indexedItem.slug)
      index.push(indexedItem);
      i++;
    }
    await fs.writeFile(indexFile, JSON.stringify(index));
    console.log(
      `Indexed ${index.length} documents from ${contentDir} to ${indexFile}`
    );
  }
})();
