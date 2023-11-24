import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
	process.env.GITHUB_BRANCH ||
	process.env.VERCEL_GIT_COMMIT_REF ||
	process.env.HEAD ||
	"main";

export default defineConfig({
	branch,

	// Get this from tina.io
	clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
	// Get this from tina.io
	token: process.env.TINA_TOKEN,

	build: {
		outputFolder: "admin",
		publicFolder: "public",
	},
	media: {
		tina: {
			mediaRoot: "",
			publicFolder: "public",
		},
	},
	// See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
	schema: {
		collections: [
			{
				label: "Notes",
				name: "notes",
				path: "content/notes",
				format: "md",
				ui: {
					filename: {
						readonly: true,
						slugify: (values) => {
							const date = new Date(values.date);
							return `${date.getFullYear()}/${values?.name
								?.toLowerCase()
								.replace(/ /g, "-")}`;
						},
					},
					router: ({ document }) =>
						`/notes/${document._sys.breadcrumbs.join("/")}`,
				},
				defaultItem: () => ({
					date: new Date().toISOString(),
				}),
				fields: [
					{
						type: "string",
						label: "Name",
						name: "title",
						required: true,
						isTitle: true,
					},
					{
						label: "Date",
						name: "date",
						type: "datetime",
						required: true,
						ui: {
							dateFormat: "YYYY/MM/DD",
							timeFormat: "HH:mm",
						},
					},
					{
						type: "rich-text",
						name: "body",
						label: "Body",
						isBody: true,
					},
				],
			},
		],
	},
});
