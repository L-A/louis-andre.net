const filesMeta = preval`
module.exports = require("glob").sync("./pages/journal/*.mdx").map(
	file => {
			const META = \/const\\s+meta\\s+=\\s+({[\\s\\S]*?\\n})\/
			const SLUG = \/([^\\\/]*)(?:\\.mdx)\/
			const pageSlug = SLUG.exec(file)[1]
			const fileData = require("fs").readFileSync(file, "utf-8");
			const match = META.exec(fileData);
			if (match && typeof match[1] == "string") return {
				...eval("("+match[1]+")"),
				slug: pageSlug
			}
		}
	)
`

export default filesMeta
