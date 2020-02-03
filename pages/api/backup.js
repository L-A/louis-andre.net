import glob from "glob"

const runtimeRequire =
	typeof __webpack_require__ === "function" ? __non_webpack_require__ : require

const filesMeta = filesArray => {
	const metas = filesArray.map(path => runtimeRequire(path).meta)
}

export default async (req, res) => {
	glob("**/*.mdx", (err, files) => console.log(filesMeta(files)))

	res.setHeader("Content-Type", "application/json")
	// half-hour caching, serve stale if needed to remain fast
	res.setHeader("Cache-Control", `s-maxage=${30 * 60}, stale-while-revalidate`)
	res.statusCode = 200
	res.end(JSON.stringify({ foo: "bar" }))
}
