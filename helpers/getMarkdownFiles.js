import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getMarkdownFiles = (dirPath) => {
	const readFilesRecursively = (dir) => {
		let files = [];
		const items = fs.readdirSync(dir, { withFileTypes: true });

		for (const item of items) {
			const fullPath = path.join(dir, item.name);
			if (item.isDirectory()) {
				files = files.concat(readFilesRecursively(fullPath));
			} else if (
				item.isFile() &&
				(item.name.endsWith(".mdx") || item.name.endsWith(".md"))
			) {
				files.push(fullPath);
			}
		}

		return files;
	};

	const files = readFilesRecursively(dirPath);

	return files.map((filePath) => {
		const fileContents = fs.readFileSync(filePath, "utf-8");
		const { data, content } = matter(fileContents);

		// slug is a common property to all content types
		const slug = path.relative(dirPath, filePath).replace(/\.mdx?$/, "").replace(/\\/g, "/");

		return {
			...data,
			body: content,
			slug: slug,
		};
	});
};
