import { Palette } from "../config";
import CustomTinaMarkdown from "./custom-tina-markdown";

const NoteEntry = ({ title, date, body, asList = true, _sys }) => {
	const dateObj = new Date(date);
	const formattedDate = Intl.DateTimeFormat(["en-GB", "en"], {
		dateStyle: "medium",
	}).format(dateObj);

	const formattedTime = Intl.DateTimeFormat("en-GB", {
		timeStyle: "short",
	}).format(dateObj);

	const note = (
		<>
			<h2>{title}</h2>
			<h3>
				<a href={"/notes/" + _sys.breadcrumbs.join("/")}>
					<strong>{formattedDate}</strong> at {formattedTime}
				</a>
			</h3>
			<div>
				<CustomTinaMarkdown content={body} />
			</div>

			<style jsx>
				{`
					h2 {
						font-size: 18px;
						color: ${Palette.journal};
						margin: 0;
					}
					h3 {
						color: ${Palette.readingLink};
						font-size: 13px;
						font-weight: normal;
						margin: 0 0 -8px;
					}

					h3 strong,
					h3 a {
						color: ${Palette.readingLink};
					}

					div {
						margin: 8px 0 36px;
						font-size: 20px;
					}
				`}
			</style>
		</>
	);

	if (asList) return <li>{note}</li>;
	else return <div>{note}</div>;
};

export default NoteEntry;
